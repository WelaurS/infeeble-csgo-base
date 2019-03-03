let CoreModule = {
    process: null,
    client: null,
    engine: null,
    offsets: null,
};

let memoryjs = require('memoryjs');

CoreModule.init = (process, client, engine, offsets) => {
    CoreModule.process = process;
    CoreModule.client = client;
    CoreModule.engine = engine;
    CoreModule.offsets = offsets;
};

CoreModule.start = () => {
    let bunnyhop = require('./bunnyhop');
    bunnyhop.start();

    let glow = require('./glow');
    glow.start();

    let rcs = require('./rcs');
    rcs.start();
};

CoreModule.getOffset = (name) => {
    if (!CoreModule.offsets.hasOwnProperty(name)) {
        throw `Can't allocate offset ${name}`;
    }

    return parseInt(CoreModule.offsets[name]);
};

CoreModule.readMemory = (offset, dataType) => {
    dataType = dataType || memoryjs.INT;

    return memoryjs.readMemory(CoreModule.process, offset, dataType);
};

module.exports = CoreModule;