import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './components/trivial/pageNotFound.component';
import { Constants } from './core/common/constants';
import { environment } from '../../config/environment/environment';
import { Logger } from './helper/logger';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AdalService, AdalGuard, AdalInterceptor } from '../../node_modules/adal-angular4';
import { AuthenticationGuard } from './components/loginAuth/authGuard';
import { LogoutComponent } from './components/loginAuth/logout/logout.component';
import { LoginComponent } from './components/loginAuth/login/login.component';
import { HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { SafeUrlPipe } from './pipe/safeUrlPipe';
import { PipeModule } from './pipe/pipe.module';
import { AppService } from './app.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        DashboardModule,
        PipeModule
    ],
    declarations: [
        AppComponent,
        LoginComponent, 
        LogoutComponent,
        PageNotFoundComponent
    ],
    providers: [
        Logger,
        { provide: 'loggerName', useValue: Constants.loggerName },
        { provide: 'loggerLevel', useValue: environment.logLevel },
        AdalService, AdalGuard, AuthenticationGuard,{ provide: HTTP_INTERCEPTORS, useClass: AdalInterceptor, multi: true },
        AppService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
