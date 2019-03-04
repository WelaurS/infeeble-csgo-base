const Player = require('../classes/player');
const State = require('../classes/static_state');

let RecoilControlSystemClass = {};

RecoilControlSystemClass.start = () => {
    let oldShotsFired = 0;
    let oldPunchX = 0;
    let oldPunchY = 0;

    let f = () => {
        let dwLocalPlayer = State.localPlayer;
        let player = new Player(dwLocalPlayer);

        let shotsFired = player.shotsFired;

        if (shotsFired >= 2 && shotsFired !== oldShotsFired) {
            oldShotsFired = shotsFired;

            let m_aimPunchAngleX = player.m_aimPunchAngleX * 2;
            let m_aimPunchAngleY = player.m_aimPunchAngleY * 2;

            let dwClientState_ViewAnglesX = State.viewAnglesX;
            let dwClientState_ViewAnglesY = State.viewAnglesY;

            State.viewAnglesX = dwClientState_ViewAnglesX + oldPunchX - m_aimPunchAngleX;
            State.viewAnglesY = dwClientState_ViewAnglesY + oldPunchY - m_aimPunchAngleY;

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