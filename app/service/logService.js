const formatDate = require('./internal/formatDate');

module.exports = class logService {
    constructor(consoleLevel = 1, fileLevel = 3) {
        this.levels = ['debug', 'info', 'warn', 'error'];
        this.console = consoleLevel;
        this.logfile = fileLevel;
    }

    debug(msg) {
        if (this.levels.indexOf('debug') >= this.console) this._writeConsole(msg, 'DEBUG');
        if (this.levels.indexOf('debug') >= this.logfile) this._writeFile(msg, 'DEBUG');
    }

    warn(warning) {
        if (this.levels.indexOf('warn') >= this.console) this._writeConsole(warning, 'WARN');
        if (this.levels.indexOf('warn') >= this.logfile) this._writeFile(warning, 'WARN');
    }

    info(msg) {
        if (this.levels.indexOf('info') >= this.console) this._writeConsole(msg, 'INFO');
        if (this.levels.indexOf('info') >= this.logfile) this._writeFile(msg, 'INFO');
    }
    error(err) {
        if (this.levels.indexOf('error') >= this.console) this._writeConsole(err, 'ERROR');
        if (this.levels.indexOf('error') >= this.logfile) this._writeFile(err, 'ERROR');
    }

    _writeConsole(msg, level) {
        console.log(`${formatDate(new Date(), 'd M Y H:i:s')} | ${level} | ${msg}`);
    }

    _writeFile(msg, level) {

    }
}