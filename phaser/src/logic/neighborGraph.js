import Graph from './Graph'
import {findGraphNode} from '../utils'
export default class NeighborGraph extends Graph {

    constructor({nodes, node}) {
        super();
        this.center = findGraphNode(nodes, node)

    }

    toString() {


        let self = this;

        function find(node) {
            for (var i = 0, len = self.nodes.length; i < len; i++) {
                if (self.nodes[i].node.x === node.x && self.nodes[i].node.y === node.y) {
                    return self.nodes[i]
                }
            }
            return false;

        }


        let Up = find({x: self.center.x - 1, y: self.center.y});
        let Down = find({x: self.center.x + 1, y: self.center.y});
        let Left = find({x: self.center.x, y: self.center.y - 1});
        let Right = find({x: self.center.x, y: self.center.y + 1});


        ( Up != false) ? console.log("      [" + Up.node.x + "," + Up.node.y + "]       ") : null;

        let rowDebug = (Left != false) ? "  [" + Left.node.x + "," + Left.node.y + "]x" : "";
        rowDebug += (Right != false) ? " y[" + Right.node.x + "," + Right.node.y + "]" : "";
        console.log(rowDebug);
        (Down != false) ? console.log("      [" + Down.node.x + "," + Down.node.y + "]       ") : null;


    }
}