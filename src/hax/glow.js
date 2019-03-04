const Core = require('../core');
const memoryjs = require('memoryjs');
const Player = require('../classes/player');
const State = require('../classes/static_state');

let GlowClass = {};

GlowClass.start = () => {
    let dwLocalPlayer = State.localPlayer;
    let localPlayer = new Player(dwLocalPlayer);
    let localPlayerTeam = localPlayer.m_iTeamNum;

    let f = () => {
        for (let i = 1; i < 65; i++) {
            let dwEntity = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset("dwEntityList") + (0x10 * i), memoryjs.DWORD);
            let entity = new Player(dwEntity);
            let iEntityTeam = entity.m_iTeamNum;
            let bEntityDormant = entity.m_bDormant;

            if (!bEntityDormant) {
                let iGlowIndex = entity.m_iGlowIndex;
                let color = null;

                if (iEntityTeam === localPlayerTeam)
                    color = [0, 255, 0];
                else
                    color = [1, 0, 0];

                let dwGlowObjectManager = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset("dwGlowObjectManager"), memoryjs.DWORD);
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x4), color[0], "float");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x8), color[1], "float");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0xC), color[2], "float");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x10), 1.0, "float");

                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x24), 1, "bool");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x25), 0, "bool");
                memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (iGlowIndex * 0x38 + 0x26), 0, "bool");
            }
        }

        setTimeout(f, 5);
    };

    f();
};

module.exports = GlowClass;