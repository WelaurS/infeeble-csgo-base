const keyboard = require("asynckeystate");
const State = require('../classes/static_state');
const Player = require('../classes/player');
const Control = require('../classes/static_control');

let BunnyHop = {};

BunnyHop.start = () => {
    setInterval(() => {
        if (!keyboard.getAsyncKeyState(0x20)) return;
        let player = new Player(State.localPlayer);
        let iFlags = player.m_fFlags;

        Control.dwForceJump = ((iFlags == 257) || (iFlags == 263)) ? 5 : 4;
    }, 5);
};

module.exports = BunnyHop;