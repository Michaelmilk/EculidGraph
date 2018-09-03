export class GraphLink {
    constructor(
        public source: string,
        public target: string,
        public label: string,
        public source_upn: string,
        public target_upn: string
    ){}
}


export class GraphNode {
    constructor(
        public id: string,
        public photo: string,
        public label: string
    ){}
}