'use strict';
const Core = require('../core');
const memoryjs = require('memoryjs');

class Player {
    constructor(memoryAddress) {
        this.memoryAddress = memoryAddress;
    }

    get shotsFired() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset('m_iShotsFired'), memoryjs.DWORD);
    }

    get m_aimPunchAngleX() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset('m_aimPunchAngle') + 0x4, memoryjs.FLOAT);
    }

    get m_aimPunchAngleY() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset('m_aimPunchAngle'), memoryjs.FLOAT);
    }

    get m_iTeamNum() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_iTeamNum"), memoryjs.DWORD);
    }

    get m_bDormant() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_bDormant"), memoryjs.DWORD);
    }

    get m_iGlowIndex() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_iGlowIndex"), memoryjs.DWORD);
    }

    get m_fFlags() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_fFlags"), memoryjs.INT);
    }
}

module.exports = Player;