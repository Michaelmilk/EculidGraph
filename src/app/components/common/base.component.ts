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

import { Logger } from '../../helper/logger';

export class BaseComponent implements OnInit {
    constructor(public logger: Logger) { }

    ngOnInit() { }
}