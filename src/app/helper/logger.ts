import * as log from 'loglevel';
import { LogLevel } from '../core/enums';
import { environment } from '../../../config/environment/environment'
import { Constants } from '../core/common/constants';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class Logger {
    public logger: any;

    constructor(
        @Inject('loggerName') public loggerName?: string,
        @Inject('loggerLevel') public logLevel?: LogLevel
    ) {
        if (!loggerName) {
            loggerName = Constants.loggerName;
        }
        this.logger = log.getLogger(loggerName);
        this.configLogLevel(logLevel);
    }

    trace(msgtitle: any, ...message: Array<any>) {
        this.logger.trace(msgtitle, ...message);
    }

    debug(msgtitle: any, ...message: Array<any>) {
        this.logger.debug(msgtitle, ...message);
    }

    info(msgtitle: any, ...message: Array<any>) {
        this.logger.info(msgtitle, ...message);
    }

    warn(msgtitle: any, ...message: Array<any>) {
        this.logger.warn(msgtitle, ...message);
    }

    error(msgtitle: any, ...message: Array<any>) {
        this.logger.error(msgtitle, ...message);
    }

    getLevel(): any {
        return this.logger.getLevel();
    }

    configLogLevel(logLevel?: LogLevel) {
        var finalLogLevel = environment.logLevel;
        if (logLevel != null) {
            finalLogLevel = logLevel;
        }
        switch (finalLogLevel) {
            case LogLevel.Trace: this.logger.setLevel("trace"); break;
            case LogLevel.Debug: this.logger.setLevel("debug"); break;
            case LogLevel.Info: this.logger.setLevel("info"); break;
            case LogLevel.Warn: this.logger.setLevel("warn"); break;
            case LogLevel.Error: this.logger.setLevel("error"); break;
            default: this.logger.setLevel("trace"); break;
        }
    }
}