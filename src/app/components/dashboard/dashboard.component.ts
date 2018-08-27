import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../common/base.component";
import { DashboardService } from "./dashboard.service";
import { Logger } from "../../helper/logger";
import * as shape from 'd3-shape';

@Component({
	selector: "dashboard",
	templateUrl: "./dashboard.component.html",
	styles: [require("./dashboard.component.scss").toString()]
})
export class DashboardComponent extends BaseComponent implements OnInit {
	query: string;
	strengthList: any[];
	isShow: boolean = false;

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

	constructor(
		public logger: Logger,
		private DashboardService: DashboardService
	) {
		super(logger);
	}

	ngOnInit() {
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

		this.links = [
			{
				source: 'start',
				target: '1',
				label: 'Weak'
			}, {
				source: 'start',
				target: '2',
				label: 'Strong'
			}, {
				source: 'start',
				target: '3',
				label: 'Medium'
			}, {
				source: 'start',
				target: '4',
				label: 'Strong'
			}, {
				source: 'start',
				target: '5',
				label: 'Medium'
			}, {
				source: '1',
				target: 'end',
				label: 'Weak'
			}, {
				source: '2',
				target: 'end',
				label: 'Strong'
			}, {
				source: '3',
				target: 'end',
				label: 'Weak'
			}, {
				source: '4',
				target: 'end',
				label: 'Medium'
			}, {
				source: '5',
				target: 'end',
				label: 'Medium'
			}
		];

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

		console.log("links", this.links)

		this.nodes = [
			{
				id: 'start',
				label: 'start',
				position: 'x0',
				images: 'https://pic.qqtn.com/up/2016-10/14762726301049405.jpg'
			}, {
				id: '1',
				label: 'Anna',
				position: 'x1',
				images: 'https://pic.qqtn.com/up/2016-10/14762726301049405.jpg'
			}, {
				id: '2',
				label: 'Bob Li',
				position: 'x2',
				images: 'http://file5.u148.net/2016/12/images/14812753384668S4GWNCTK.jpg'
			}, {
				id: '3',
				label: 'Jane',
				position: 'x3',
				images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbkRJeFCVJkma35FYVR6D-feCjspyV_bSMIW9edSbSKe8ajLW'
			}, {
				id: '4',
				label: 'Lan',
				position: 'x4',
				images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVV_xpOHCahrP67REZtwn_i1ZqkRzrRVvsx27sxw7IsLEnXL9H'
			}, {
				id: '5',
				label: 'Angel',
				position: 'x5',
				images: 'http://p0.ifengimg.com/pmop/2018/0212/2BEA391D6F6C6FBD0FF1EA04852FE1A3DB809AC4_size8_w402_h363.jpeg'
			}, {
				id: 'end',
				label: 'end',
				position: 'x7',
				images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2tb3MZwf9s5MYp5_mAUd4JK9Pn4JqThigGXB6pmKukJQKI2A5EA'
			}
		];

		this.hierarchialGraph = { links: this.links, nodes: this.nodes };

	}

	select(node: any) {
		if (this.isShow && this.selectedNodeTestLabel == node.label) {
			this.isShow = false;
			node.isChecked = !node.isChecked;
		}
		else {
			this.isShow = true;
			this.nodes.forEach(t => t.isChecked = false);
		}
		this.selectedNodeTestLabel = node.label;
	}

	searchInfo(query: string) {
		this.logger.info(query);
	}

}