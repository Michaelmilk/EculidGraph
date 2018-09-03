import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpParams,
	HttpHeaders,
	HttpResponse
} from '@angular/common/http';
import { BaseService } from "./components/common/base.service";
import { Logger } from "./helper/logger";
import { Observable } from "../../node_modules/rxjs";

@Injectable()
export class AppService extends BaseService {
	private headers = new HttpHeaders({ "Content-Type": "application/json" });
	constructor(public logger: Logger, public httpClient: HttpClient) {
		super(logger, httpClient);
	}

	public getProfile() {
		console.log('Get Profile called');
		return this.httpClient.get("https://graph.microsoft.com/v1.0/me");
	}

	public getPhoto() {
		console.log('Get photot called');
		return this.httpClient.get("https://graph.microsoft.com/v1.0/me/photo/$value", 
			{
				headers: new HttpHeaders().append('Content-Type', 'image/jpg'), 
				responseType: 'blob'
			});
			// .pipe(
			// 	catchError((err: any) => {
			// 		 if (err.status == 401) {
			// 			 this.router.navigateByUrl('/login');
			// 			 return EMPTY;
			// 		 } else {
			// 			 return throwError(err);
			// 		 }
			// 	})
			// );
	}
}
