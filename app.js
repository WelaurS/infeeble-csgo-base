const memoryjs = require('memoryjs');
const {
    app,
    BrowserWindow
} = require('electron');

const Core = require('./src/core');
const rp = require('request-promise');

let csgoProcess = null;
let clientPanoramaDll = null;
let engineDll = null;
let offsets = null;

let init = async () => {
    while (!csgoProcess) {
        try {
            csgoProcess = memoryjs.openProcess('csgo.exe');
        } catch (e) {
        }
    }

    clientPanoramaDll = memoryjs.findModule("client_panorama.dll", csgoProcess.th32ProcessID);
    engineDll = memoryjs.findModule("engine.dll", csgoProcess.th32ProcessID);

    let hazeDumperOffsets = await rp('https://raw.githubusercontent.com/frk1/hazedumper/master/csgo.json');
    try {
        offsets = JSON.parse(hazeDumperOffsets);
        offsets = Object.assign({}, offsets.signatures, offsets.netvars);
    } catch (e) {
        throw `Can't parse offsets`;
    }

    Core.init(csgoProcess, clientPanoramaDll, engineDll, offsets);
    Core.start();

    console.log('Infeeble initiation completed');

    // memoryjs.
};

// if running under the Electron we will render GUI
// if you want to make GUI don't forget to rebuild modules:
// https://electronjs.org/docs/tutorial/using-native-node-modules#installing-modules-and-rebuilding-for-electron
if(app) {
    app.on('ready', () => {
        let win = new BrowserWindow({
            width: 800,
            height: 600
        });

        win.loadFile('src/frontend/index.html');

        init().catch(err => console.error(err));
    });
} else {
    init().catch(err => console.error(err));
}