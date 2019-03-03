let Core = require('./core');
const memoryjs = require('memoryjs');
let RecoilControlSystemClass = {};

RecoilControlSystemClass.start = () => {
    let oldShotsFired = 0;
    let oldPunchX = 0;
    let oldPunchY = 0;

    let f = () => {
        let dwLocalPlayer = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset('dwLocalPlayer'), memoryjs.DWORD);
        let shotsFired = memoryjs.readMemory(Core.process.handle, dwLocalPlayer + Core.getOffset('m_iShotsFired'), memoryjs.DWORD);
        let dwClientState = memoryjs.readMemory(Core.process.handle, Core.engine.modBaseAddr + Core.getOffset('dwClientState'), memoryjs.DWORD);

        if (shotsFired >= 0 && shotsFired !== oldShotsFired) {
            oldShotsFired = shotsFired;

            let m_aimPunchAngleX = memoryjs.readMemory(Core.process.handle, dwLocalPlayer + Core.getOffset('m_aimPunchAngle') + 0x4, memoryjs.FLOAT) * 2;
            let m_aimPunchAngleY = memoryjs.readMemory(Core.process.handle, dwLocalPlayer + Core.getOffset('m_aimPunchAngle'), memoryjs.FLOAT) * 2;

            let dwClientState_ViewAnglesX = memoryjs.readMemory(Core.process.handle, dwClientState + Core.getOffset('dwClientState_ViewAngles') + 0x4, memoryjs.FLOAT);
            let dwClientState_ViewAnglesY = memoryjs.readMemory(Core.process.handle, dwClientState + Core.getOffset('dwClientState_ViewAngles'), memoryjs.FLOAT);

            memoryjs.writeMemory(Core.process.handle, dwClientState + Core.getOffset('dwClientState_ViewAngles') + 0x4, dwClientState_ViewAnglesX + oldPunchX - m_aimPunchAngleX, memoryjs.FLOAT);
            memoryjs.writeMemory(Core.process.handle, dwClientState + Core.getOffset('dwClientState_ViewAngles'), dwClientState_ViewAnglesY + oldPunchY - m_aimPunchAngleY, memoryjs.FLOAT);

            oldPunchX = m_aimPunchAngleX;
            oldPunchY = m_aimPunchAngleY;
        } else if (!shotsFired) {
            oldShotsFired = 0;
            oldPunchX = 0;
            oldPunchY = 0;
        }

        setTimeout(f, 0);
    };

    f();
};

module.exports = RecoilControlSystemClass;