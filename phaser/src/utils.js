export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const getRandomInt = (min, max) => {
  if (max == null) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}
import GraphNode from './logic/GraphNode'

export const distance = (obj, obj2)=> {
  // import GraphNode from '../GraphNode'
  // let obj= {x:2,y:5};
  // let obj2= {x:5,y:9};
  if (!(obj  instanceof GraphNode)){
    // console.log("obiekt nie znajduje się na liscie");
    return false;
  }
  if (!(obj2 instanceof GraphNode)){
    // return "obiekt nie znajduje się na liscie";
    return false;
  }
  var obj = obj.pos;
  var obj2 = obj2.pos;
  return (Math.sqrt((obj2.x - obj.x) * (obj2.x - obj.x) + (obj2.y - obj.y) * (obj2.y - obj.y)));
}
export const  findGraphNode = (arr,obj) =>{

  for (var i = 0, len = arr.length; i < len; i++) {
    if (JSON.stringify(arr[i].pos)===JSON.stringify(obj))
    {
      return arr[i]
    }
  }
  return false;
}