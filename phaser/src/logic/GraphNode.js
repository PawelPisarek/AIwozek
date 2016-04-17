
export default class GraphNode {

    constructor({x, y, type}) {

        this.x = x;
        this.y = y;
        this.pos = {x:x, y:y};
        this.type = type;

    }

     dist(obj,obj2){
      return (Math.sqrt((obj2.x-obj.x)*(obj2.x-obj.x)+(obj2.y-obj.y)*(obj2.y-obj.y)));
    }
}
