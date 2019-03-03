const Core = require('./core');
const memoryjs = require('memoryjs');
const keyboard = require("asynckeystate");

let BunnyHop = {};

BunnyHop.start = () => {
    setInterval(() => {
        if(!keyboard.getAsyncKeyState(0x20)) return;
        let dwLocalPlayer = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset('dwLocalPlayer'), memoryjs.DWORD);
        let iFlags = memoryjs.readMemory(Core.process.handle, dwLocalPlayer + Core.getOffset("m_fFlags"), memoryjs.INT);

        memoryjs.writeMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset("dwForceJump"), ((iFlags == 257) || (iFlags == 263)) ? 5 : 4, memoryjs.INT);
    }, 5);
};

module.exports = BunnyHop;