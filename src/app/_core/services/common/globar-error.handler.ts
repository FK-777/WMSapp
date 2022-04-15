import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector, private platform: Platform, private router: Router) { }

    handleError(error: Error) {
        // Obtain dependencies at the time of the error
        // This is because the GlobalErrorHandler is registered first
        // which prevents constructor dependency injection
        const logger = this.injector.get(NGXLogger);
        let loggerAdditional;

        const err = {
            message: error.message ? error.message : error.toString(),
            stack: error.stack ? error.stack : '',
            user: '',
            device: this.platform.platforms().join('-')
        };

        const user = AuthService.getLoggedUser();

        if (user && user.data && user.data.id) {
            err.user = user.data.id;
        }

        if (error.hasOwnProperty('error')) {
            loggerAdditional = error[`error`];
        }

        if (loggerAdditional) {
            // Log  the error
            logger.error(err, loggerAdditional);
        } else {
            logger.error(err);
        }

        // Re-throw the error
        throw error;
    }
}
