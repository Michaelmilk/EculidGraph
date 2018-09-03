import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../common/base.component";
import { DashboardService } from "./dashboard.service";
import { Logger } from "../../helper/logger";
import * as shape from 'd3-shape';
import { AdalService } from "../../../../node_modules/adal-angular4";
import { GraphLink, GraphNode } from "../../core/graph";
import { link } from "fs";

@Component({
	selector: "dashboard",
	templateUrl: "./dashboard.component.html",
	styles: [require("./dashboard.component.scss").toString()]
})
export class DashboardComponent extends BaseComponent implements OnInit {
	query: string;
	strengthList: any[];
	isShowPane: boolean = false;

	hierarchialGraph: { links: any[], nodes: any[] };
	links: any[];
	nodes: any[];
	view: any[];
	width: number;
	height: number = 560;
	enableZoom: boolean = true;
	autoZoom: boolean = true;
	autoCenter: boolean = true;
	panOnZoom: boolean = true;
	panOffsetX: number = 100;
	panOffsetY: number = 10;
	zoom: number = 0.7;
	showLengend: boolean = true;
	colorScheme: any;
	orientation: string = "LR";
	curve: any = shape.curveLinear;
	selectedNode: any;
	selectedNodeTestLabel: string;

	isGraphReady: boolean;
	
	constructor(
		public logger: Logger,
		public adalService: AdalService,
		private dashboardService: DashboardService
	) {
		super(logger);
	}

	ngOnInit() {
		//this.isGraphReady = true;

		this.strengthList = [
			{
				strength: 'Strong',
				color: '#66BD6D'
			},
			{
				strength: 'Medium',
				color: '#0d76a5'
			},
			{
				strength: 'Weak',
				color: '#bee4f5'
			}
		];

		this.view = [this.width, this.height];

		this.colorScheme = {
			name: 'picnic',
			selectable: false,
			group: 'Ordinal',
			domain: [
				'#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
			]
		};

		this.links = [];
		this.nodes = [];

		// this.links = [
		// 	{
		// 		source: 'start',
		// 		target: '47548b76-d91c-5710-e5b2-2c9d709a3be9',
		// 		label: 'Weak'
		// 	}, {
		// 		source: 'start',
		// 		target: '2',
		// 		label: 'Strong'
		// 	}, {
		// 		source: 'start',
		// 		target: '3',
		// 		label: 'Medium'
		// 	}, {
		// 		source: 'start',
		// 		target: '4',
		// 		label: 'Strong'
		// 	}, {
		// 		source: 'start',
		// 		target: '5',
		// 		label: 'Medium'
		// 	}, {
		// 		source: '47548b76-d91c-5710-e5b2-2c9d709a3be9',
		// 		target: 'end',
		// 		label: 'Weak'
		// 	}, {
		// 		source: '2',
		// 		target: 'end',
		// 		label: 'Strong'
		// 	}, {
		// 		source: '3',
		// 		target: 'end',
		// 		label: 'Weak'
		// 	}, {
		// 		source: '4',
		// 		target: 'end',
		// 		label: 'Medium'
		// 	}, {
		// 		source: '5',
		// 		target: 'end',
		// 		label: 'Medium'
		// 	}
		// ];

		// this.links.forEach(t => {
		// 	switch (t.label) {
		// 		case "Strong":
		// 			t.color = '#66BD6D';
		// 			break;
		// 		case "Medium":
		// 			t.color = '#0d76a5'
		// 			break;
		// 		case "Weak":
		// 			t.color = '#bee4f5'
		// 			break;
		// 	}
		// });

		//label field must be there, otherwise, graph will be disappear
		// this.nodes = [
		// 	{
		// 		id: 'start',
		// 		label: 'admin@m365x342201.onmicrosoft.com',
		// 		position: 'x0',
		// 		photo: './assets/user.png'
		// 	}, {
		// 		id: '47548b76-d91c-5710-e5b2-2c9d709a3be9',
		// 		label: 'Anna',
		// 		position: 'x1',
		// 		photo: 'https://pic.qqtn.com/up/2016-10/14762726301049405.jpg'
		// 	}, {
		// 		id: '2',
		// 		label: 'Bob Li',
		// 		position: 'x2',
		// 		photo: 'http://file5.u148.net/2016/12/images/14812753384668S4GWNCTK.jpg'
		// 	}, {
		// 		id: '3',
		// 		label: 'Jane',
		// 		position: 'x3',
		// 		photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbkRJeFCVJkma35FYVR6D-feCjspyV_bSMIW9edSbSKe8ajLW'
		// 	}, {
		// 		id: '4',
		// 		label: 'Lan',
		// 		position: 'x4',
		// 		photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVV_xpOHCahrP67REZtwn_i1ZqkRzrRVvsx27sxw7IsLEnXL9H'
		// 	}, {
		// 		id: '5',
		// 		label: 'Angel',
		// 		position: 'x5',
		// 		photo: 'http://p0.ifengimg.com/pmop/2018/0212/2BEA391D6F6C6FBD0FF1EA04852FE1A3DB809AC4_size8_w402_h363.jpeg'
		// 	}, {
		// 		id: 'end',
		// 		label: 'end',
		// 		position: 'x7',
		// 		photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2tb3MZwf9s5MYp5_mAUd4JK9Pn4JqThigGXB6pmKukJQKI2A5EA'
		// 	}
		// ];

		// this.nodes.forEach(t => t.isChecked = false);

		// this.hierarchialGraph = { links: this.links, nodes: this.nodes };
		//this.assignAllNodePhoto();
	}

	assignAllNodePhoto(nodes: Array<GraphNode>) {
		if (this.adalService.userInfo.authenticated) {
			nodes.forEach(t => {
				//if (t.id == "admin@m365x342201.onmicrosoft.com") {
					this.dashboardService.getPhotoByUpn(t.label).subscribe((result) => {
						this.createImageFromBlob(result, t);
						this.logger.info("photo", t);
					})
				//}
			})
		}
		
	}

	select(node: any) {
		if (this.isShowPane && this.selectedNodeTestLabel == node.label) {
			this.isShowPane = false;
			node.isChecked = false;
		}
		else {
			this.isShowPane = true;
			node.isChecked = true;
			
		}

		this.hierarchialGraph.nodes.forEach(t => {
			if(t.id == node.id){
				t.isChecked = node.isChecked;
				$(<any>'.circle'+ t.id).attr("style","");
			}
			else{
				t.isChecked = false;
				$(<any>'.circle'+ t.id).css("filter","none");
			}
		});
		this.selectedNodeTestLabel = node.label;
	}

	searchGraph(query: string) {
		this.isGraphReady = false;
		this.links = [];
		this.nodes = [];
		this.logger.info(query);
		this.dashboardService.getGraphLink(query, this.adalService.userInfo.profile.upn).subscribe((result: Array<GraphLink>) => {
			this.logger.info("graph link", result);
			this.generateGraphLink(result);
			this.generateGraphNode(result)
		});
	}

	generateGraphLink(links: Array<GraphLink>) {
		links.forEach(t => {
			if (t.source_upn == this.query) {
				t.source = "start";
			}

			if (t.target_upn == this.adalService.userInfo.profile.upn.toString().toLowerCase()) {
				t.target = "end";
			}

			this.links.push(t);
		})

		this.links.forEach(t => {
			switch (t.label) {
				case "Strong":
					t.color = '#66BD6D';
					break;
				case "Medium":
					t.color = '#0d76a5'
					break;
				case "Weak":
					t.color = '#bee4f5'
					break;
			}
		});
	}


	generateGraphNode(links: Array<GraphLink>) {
		let idToUpn = new Map<string, string>();
		links.forEach(t => {
			idToUpn.set(t.source, t.source_upn);
			idToUpn.set(t.target, t.target_upn);
		});

		this.logger.info("idtoupn", idToUpn);

		let firstNode;
		let lastNode;
		idToUpn.forEach((value, key, map) => {
			let img = "./assets/user.png";
			if (value.indexOf("@m365x342201.onmicrosoft.com") != -1) {
				img = `https://euclidepic.blob.core.windows.net/pic/${value.replace("@m365x342201.onmicrosoft.com", "")}.jpg`;
			}
			this.logger.info("value", value, this.adalService.userInfo.profile.upn.toString().toLowerCase());

			this.nodes.push(new GraphNode(key, img, value));
		});
		
		this.logger.info("nodes", this.nodes);
		this.nodes.forEach(t => t.isChecked = false);
		this.assignAllNodePhoto(this.nodes);
		this.hierarchialGraph = { links: this.links, nodes: this.nodes };
		this.isGraphReady = true;

		this.logger.info("links, nodes", this.links, this.nodes);
	}
}