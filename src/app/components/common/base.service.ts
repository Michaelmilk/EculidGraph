import { Component, OnInit } from '@angular/core';
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

import { environment } from '../../../../config/environment/environment';
import { BaseComponent } from './base.component';
import { Logger } from '../../helper/logger';

export class BaseService implements OnInit {
	serverUrl: string = environment.serverBaseUrl;


	constructor(public logger: Logger, public httpClient: HttpClient) {
	}

	ngOnInit() { }

	
}