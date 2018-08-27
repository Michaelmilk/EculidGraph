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

@Injectable()
export class DashboardService extends BaseService {
	private headers = new HttpHeaders({ "Content-Type": "application/json" });
	constructor(public logger: Logger, public httpClient: HttpClient) {
		super(logger, httpClient);
	}
}
