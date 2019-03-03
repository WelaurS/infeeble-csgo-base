let Core = require('./core');
const memoryjs = require('memoryjs');
let GlowClass = {};

GlowClass.start = () => {
    let dwLocalPlayer = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset("dwLocalPlayer"), memoryjs.DWORD);
    let localPlayerTeam = memoryjs.readMemory(Core.process.handle, dwLocalPlayer + Core.getOffset("m_iTeamNum"), memoryjs.DWORD);

    let f = () => {
        for (let i = 1; i < 65; i++) {
            let dwEntity = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset("dwEntityList") + (0x10 * i), memoryjs.DWORD);
            let iEntityTeam = memoryjs.readMemory(Core.process.handle, dwEntity + Core.getOffset("m_iTeamNum"), memoryjs.DWORD);
            let bEntityDormant = memoryjs.readMemory(Core.process.handle, dwEntity + Core.getOffset("m_bDormant"), memoryjs.DWORD);

            if (!bEntityDormant) {
                let iGlowIndex = memoryjs.readMemory(Core.process.handle, dwEntity + Core.getOffset("m_iGlowIndex"), memoryjs.DWORD);
                let color = null;

                if (iEntityTeam === localPlayerTeam)
                    color = [0, 255, 0];
                else
                    color = [1, 0, 0];

                let dwGlowObjectManager = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset("dwGlowObjectManager"), memoryjs.DWORD);
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x4), color[0], "float");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x8), color[1], "float");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0xC), color[2], "float");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x10), 100.0, "float");

                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x24), 1, "bool");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x25), 0, "bool");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x26), 0, "bool");
            }
        }

        setTimeout(f, 0);
    };

    f();
};

module.exports = GlowClass;