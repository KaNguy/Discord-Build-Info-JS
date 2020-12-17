'use strict';

module.exports = {
    ClientBuild: require('./lib/ClientBuild'),
    FormURL: require('./lib/FormURL'),
    version: require('../package.json').version
}

/*
Side note: Discord-Build-Info-JS stands for "Discord Client Build Receiver" but the entire project was named
Discord SPC for a while which stood for "Discord Stable, Canary, PTB"
 */