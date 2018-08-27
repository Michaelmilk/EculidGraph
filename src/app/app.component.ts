import { Component, OnDestroy, OnInit } from '@angular/core';

import { BaseComponent } from "./components/common/base.component";
import { Logger } from "./helper/logger";
import { environment } from '../../config/environment/environment';
import { User } from './core/common/authUser';
import { AdalService } from '../../node_modules/adal-angular4';
import { AppService } from './app.service';

@Component({
    selector: 'my-app',
    styleUrls: ["./app.component.css"],
    templateUrl: './app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
	user: User;
    isImageLoading: boolean;
    constructor(public logger: Logger, private adalService: AdalService, private appService: AppService) {
        super(logger);
        this.logger.info(environment.enableAAD);
        if (environment.enableAAD) {
            this.adalService.init(environment.adalConfig);
        }
    }

    ngOnInit() {
        if (environment.enableAAD) {
            //don't put handleWindowCallback with init, it may cause auth error when call authed web api
            // Handle callback if this is a redirect from Azure
		    this.adalService.handleWindowCallback();
        }

		this.user = new User();
		if (this.adalService.userInfo.authenticated) {
			this.logger.info("authenticated user info", this.adalService.userInfo);
			let profile = this.adalService.userInfo.profile;
            this.user = new User(profile.name, profile.upn, this.adalService.userInfo.authenticated);
            this.isImageLoading = true;
            this.appService.getPhoto().subscribe((result: any) => {
                this.createImageFromBlob(result, this.user);
                this.isImageLoading = false;
                this.logger.info("photo", this.user);
            }, error => {
                this.isImageLoading = false;
                console.log(error);
              });
        }
        
        console.log("user",this.user)
        console.log("isImageLoading",this.isImageLoading)
    }

    //https://stackblitz.com/edit/angular-1yr75s?file=src%2Fapp%2Fapp.component.html
	createImageFromBlob(image: Blob, user: User) {
		let reader = new FileReader();
		reader.addEventListener("load", () => {
			user.icon = reader.result;
		}, false);

		if (image) {
			reader.readAsDataURL(image);
        }
	}

    logout() {
		if (this.user.authenticated) {
			this.adalService.logOut();
			this.adalService.clearCache();
		}
	}

    ngOnDestroy(): any {
    }
}
