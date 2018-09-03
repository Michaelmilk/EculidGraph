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
import { BaseService } from "../common/base.service";
import { Logger } from "../../helper/logger";
import { environment } from "../../../../config/environment/environment";
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class DashboardService extends BaseService {
	private headers = new HttpHeaders({ "Content-Type": "application/json" });
	constructor(public logger: Logger, public httpClient: HttpClient) {
		super(logger, httpClient);
	}

	public getPhotoByUpn(upn: string) {
		console.log('Get photot called');
		return this.httpClient.get(`https://graph.microsoft.com/v1.0/users/${upn}/photo/$value`,
			{
				headers: new HttpHeaders().append('Content-Type', 'image/jpg'),
				responseType: 'blob'
			}).pipe(
			catchError(err => {
				this.logger.info("error catch:", err);
				if (err.status == 403) {
					this.logger.info("error catch 403:", err);
					return EMPTY;
				} else if (err.status == 404) {
					this.logger.info("error catch: 404", err);
					return EMPTY;

				} else {
					return throwError(err);
				}
			})
		);
	}

	public getGraphLink(query: string, user: string) {
		const httpParams = new HttpParams()
			.set("search_email", query)
			.set("user_email", user);
		return this.httpClient.get(
			environment.serverBaseUrl,
			{ params: httpParams }
		);
	}
}
