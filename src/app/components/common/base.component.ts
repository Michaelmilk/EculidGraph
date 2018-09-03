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
import { User } from '../../core/common/authUser';
import { SafeUrlPipe } from '../../pipe/safeUrlPipe';

export class BaseComponent implements OnInit {
    constructor(public logger: Logger) { }

    ngOnInit() { }

    //https://stackblitz.com/edit/angular-1yr75s?file=src%2Fapp%2Fapp.component.html
    createImageFromBlob(image: Blob, user: any) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            user.photo = reader.result;
            if (user.id) {
                $(<any>'.image' + user.id).attr("xlink:href", user.photo);
            }
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }
}