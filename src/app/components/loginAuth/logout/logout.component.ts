import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../common/base.component";
import { Logger } from "../../../helper/logger";

@Component({
	selector: "logout",
	templateUrl: "./logout.component.html"
})
export class LogoutComponent extends BaseComponent implements OnInit {
	constructor(public logger: Logger) {
		super(logger);
	}

	ngOnInit() {}
}
