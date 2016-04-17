export default class Graph {

    constructor() {

        this.nodes = [];
        this.widthBoard = 4;
        this.heightBoard = 4;

    }

    add(node) {
        this.nodes.push(node);
    }

    toString() {

        let rowDebug = "";
        for (let i = 0; i < this.nodes.length; i++) {

            rowDebug += "[" + this.nodes[i].x + "," + this.nodes[i].y + "] ";
            // rowDebug += "[" + this.nodes[i].type+ "] ";
            if ((i + 1) % this.heightBoard == 0) {
                rowDebug += "\n"
            }

        }
        console.log(rowDebug);

        
    }


}
