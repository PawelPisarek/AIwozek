import Phaser from 'phaser'
import Shelf from '../sprites/Shelf';
import PlayerPackageShelfCollisionGroup from '../CollisionGroup/PlayerPackageShelfCollisionGroup'
import Player from '../sprites/Player'
import {setResponsiveWidth} from '../utils'
import {TEST1,TEST2,TEST3} from '../oil'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);	
	
    this.game.physics.p2.setImpactEvents(true);

    this.game.physics.p2.restitution = 0.8;

    this.collidesPPS = new PlayerPackageShelfCollisionGroup({
      playerCollisionGroup: this.game.physics.p2.createCollisionGroup(),
      packageCollisionGroup: this.game.physics.p2.createCollisionGroup(),
      shelfCollisionGroup: this.game.physics.p2.createCollisionGroup(),
	  playerFullCollisionGroup: this.game.physics.p2.createCollisionGroup()
    });

    this.game.physics.p2.updateBoundsCollisionGroup();





    this.packages = this.game.add.group();
    this.packages.enableBody = true;
    this.packages.physicsBodyType = Phaser.Physics.P2JS;
	
		var packageSizes={};
		packageSizes['packageSize0']=	{
	      width: 0.01,
	      length: 0.01,
	      height: 0.01,
	      category: 'AGD',
	    };
		
		packageSizes['packageSize1']=	{
	      width: 9.5,
	      length: 9.5,
	      height: 9.5,
	      category: 'AGD',
	    };
		
		packageSizes['packageSize2']=	{
	      width: 2.3,
	      length: 2.3,
	      height: 2.3,
	      category: 'AGD',
	    };
		
		packageSizes['packageSize3']=	{
	      width: 7.0,
	      length: 7.0,
	      height: 7.0,
	      category: 'AGD',
	    };
	

    this.packagesCoords=[];
    for (var i = 0; i < 4; i++)
    {
      var random = this.recursiveRandomCoordsSearch();
		  var randomX = random[0];
		  var randomY = random[1];

		  if(randomX <= 32)
			  randomX+=32;
		  else if(randomX >= 768)
			  randomX-=32;

		  if(randomY <= 32)
			  randomY+=32;
		  else if(randomY >= 768)
			  randomX-=32;

		  console.log(randomX+" "+randomY);
		  if (i==0){
			  var packager = this.packages.create(randomX, randomY, 'pack1');
		  }
		  else if (i==1){
			  var packager = this.packages.create(randomX, randomY, 'pack2');
		  }
		  else if (i==2){
			  var packager = this.packages.create(randomX, randomY, 'pack3');
		  }
		  else if (i==3){
			  var packager = this.packages.create(randomX, randomY, 'pack4');
		  }
	      
	    packager.body.setRectangle(19, 19);
	    packager.propertiesy = packageSizes['packageSize'+i];

	    this.packagesCoords.push([Math.floor(randomX / 20), Math.floor(randomY / 20)]);
		  console.log((Math.ceil(randomX / 20))+" "+(Math.ceil(randomY / 20)));
      packager.body.setCollisionGroup(this.collidesPPS.packageCollisionGroup);

      packager.body.collides([ this.collidesPPS.playerCollisionGroup, this.collidesPPS.shelfCollisionGroup]);
    }
	
	
		//POCZATEK KODU Z DRZEWEM

	var training_data = [
		{"size":"tiny", "color":"black", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"black", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"black", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"black", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"black", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"black", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"red", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"red", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"red", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"red", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"red", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"red", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"yellow", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"yellow", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"yellow", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"yellow", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"yellow", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"yellow", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"yellow", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"yellow", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"blue", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"blue", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"blue", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"blue", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"blue", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"blue", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"green", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"green", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"green", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"green", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"tiny", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"tiny", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"tiny", "color":"green", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"tiny", "color":"green", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"black", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"black", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"black", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"black", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"black", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"black", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"red", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"red", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"red", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"red", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"red", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"red", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"yellow", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"yellow", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"yellow", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"yellow", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"yellow", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"yellow", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"yellow", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"yellow", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"blue", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"blue", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"blue", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"blue", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"blue", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"blue", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"green", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"green", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"green", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"green", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"small", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"small", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"green", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"small", "color":"green", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"big", "color":"black", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"black", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"black", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"black", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"black", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"black", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"red", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"red", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"red", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"red", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"red", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"red", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"yellow", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"yellow", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"yellow", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"yellow", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"yellow", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"yellow", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"yellow", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"yellow", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"blue", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"blue", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"blue", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"blue", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"blue", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"blue", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"green", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"green", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"green", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"green", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"big", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"big", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"big", "color":"green", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"big", "color":"green", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"black", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"black", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"black", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"black", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"black", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"black", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"red", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"red", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"red", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"red", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"red", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"red", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"yellow", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"yellow", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"yellow", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"yellow", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"yellow", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"yellow", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"yellow", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"yellow", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"blue", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"blue", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"blue", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"blue", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"blue", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"blue", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"green", "refrigerated":"yes", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"green", "refrigerated":"yes", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"green", "refrigerated":"yes", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"green", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"huge", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"yes", "shelf":"hazard"},
		{"size":"huge", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"huge", "color":"green", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"},
		{"size":"huge", "color":"green", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"}

	];
	
	var test_data = [
		{"size":"tiny", "color":"red", "refrigerated":"yes", "hazardous":"no", "food":"no", "shelf":"small"},
		{"size":"huge", "color":"blue", "refrigerated":"no", "hazardous":"no", "food":"no", "shelf":"big"},
		{"size":"tiny", "color":"green", "refrigerated":"no", "hazardous":"yes", "food":"no", "shelf":"hazard"},
		{"size":"small", "color":"black", "refrigerated":"no", "hazardous":"no", "food":"yes", "shelf":"food"}
	];
	
	
	var class_name = "shelf";
	var features = ["size", "color", "refrigerated","hazardous","food"];
	
	var dt = new DecisionTreeID3(training_data, class_name, features);
	
	var packcoordsTEMP = this.packagesCoords.slice();

	var toSearch = [];
	
	var hazardousPicked=false;
	var foodPicked=false;
	for (var i = 0; i < this.packages.length; i++) {
		var colors = ["red", "blue", "green", "black", "yellow", ]
		var color = colors[(Math.random() * 100).toFixed() % 4];
		var refrigerated = ["yes", "no"][(Math.random() * 100).toFixed() % 2];
		if(hazardousPicked == false)
		{
			var hazardous = 'yes';
			var food= 'no';
			hazardousPicked = true;
		}
		else if(foodPicked == false)
		{
			var hazardous ='no';
			var food = 'yes';
			foodPicked=true;
		}
		else
		{
			var food='no';
			var hazardous='no';
		}
			
		
		var packageProperties = this.packages.getAt(i).propertiesy;
		var size = myPerceptron.activate([packageProperties.width, packageProperties.height, packageProperties.length])[0];
		console.log(size);
		if (size <= 0.25) {
			size = "tiny";
			console.log("tiny");
		} else if (size <= 0.5) {
			console.log("small");
			size = "small";
		} else if (size <= 0.75) {
			console.log("big");
			size = "big";
		} else {
			size = "huge";
			console.log("huge");
		}
		var packageFeatures = { size: size, color: color, hazardous: hazardous, food: food };
		toSearch.push(packageFeatures);
		this.packages.getAt(i).propertiesy.features = packageFeatures;
	}
	
	for(i = 0; i<this.packagesCoords.length;i++)
	{
		console.log(this.packagesCoords[i]);
	}
	
	console.log("*******************");
	for(i=0; i<4; i++){
		if (dt.predict(toSearch[i]) == "small"){
			//console.log("150-200");
			this.packagesCoords[0] = packcoordsTEMP[i];
			this.packages.getAt(i).propertiesy.destinedShelf = "small";
			//console.log("********");
		}
		else if (dt.predict(toSearch[i]) == "big"){
			//console.log("550-200");
			this.packagesCoords[1] = packcoordsTEMP[i];
			this.packages.getAt(i).propertiesy.destinedShelf = "big";
			//console.log("********");
		}
		else if (dt.predict(toSearch[i]) == "hazard"){
			//console.log("150-500");
			this.packagesCoords[2] = packcoordsTEMP[i];
			this.packages.getAt(i).propertiesy.destinedShelf = "hazard";
			//console.log("********");
		}
		else if (dt.predict(toSearch[i]) == "food"){
			//console.log("550-500");
			this.packagesCoords[3] = packcoordsTEMP[i];
			this.packages.getAt(i).propertiesy.destinedShelf = "food";
			//console.log("********");
		}
	}
	for(i = 0; i<this.packagesCoords.length;i++)
	{
		console.log(this.packagesCoords[i]);
	}
	
	var accuracy = dt.evaluate(test_data);
	var treeModel = dt.toJSON();
	
	console.log('##############################');
	console.log(treeModel);
	console.log('##############################');
	//console.log(predicted_class);
	//console.log('##############################');
	
	
	//KONIEC KODU Z DRZEWEM
	
	
	
    let shelf1 = new Shelf({
      game: this.game,
      x: 200,
      y: 200,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    let shelf2 = new Shelf({
      game: this.game,
      x: 600,
      y: 200,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    let shelf3 = new Shelf({
      game: this.game,
      x: 200,
      y: 500,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    let shelf4 = new Shelf({
      game: this.game,
      x: 600,
      y: 500,
      asset: 'shelf',
      collides: this.collidesPPS
    });
	
    this.racksCoords=[];
    this.racksCoords.push([Math.ceil(159 / 20)-1, Math.ceil(159 / 20)-1]);
    this.racksCoords.push([Math.ceil(559 / 20)-1, Math.ceil(159 / 20)-1]);
    this.racksCoords.push([Math.ceil(159 / 20)-1, Math.ceil(559 / 20)-1]);
    this.racksCoords.push([Math.ceil(559 / 20)-1, Math.ceil(459 / 20)-1]);

    [shelf1, shelf2, shelf3, shelf4].forEach((shelf)=>this.game.add.existing(shelf));


    this.player = new Player({
      game: this.game,
      x: 750,
      y: 710,
      asset: 'forkliftEmpty',
      collides: this.collidesPPS,
      packageArr: this.packagesCoords,
      rackArr: this.racksCoords,
	  decisionTree: dt
    });

    this.game.add.existing(this.player);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.dropPackage, this);


  }


  togglePause() {

    this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;

  }

  dropPackage()
  {
    if(this.player.full === true)
    {
      let newPackager = this.packages.create(this.player.position.x+60, this.player.position.y, 'package');
      newPackager.body.setRectangle(32, 32);
      newPackager.propertiesy = this.player.carrying;
      console.log('package properties: ', newPackager.propertiesy);
      console.log('zrzucono paczke: width: '+newPackager.propertiesy['width']+' length: '+newPackager.propertiesy['length']+' height: '+newPackager.propertiesy['height']+' category: '+newPackager.propertiesy['category']);
      console.log('paczka powinna być w magazynie: ', newPackager.propertiesy.destinedShelf);
      newPackager.body.setCollisionGroup(this.collidesPPS.packageCollisionGroup);
      newPackager.body.collides([this.collidesPPS.packageCollisionGroup, this.collidesPPS.playerCollisionGroup, this.collidesPPS.shelfCollisionGroup]);
      this.player.loadTexture('forkliftEmpty', 0);
      this.player.full = false;
      this.player.carrying = null;
    }

  }

  recursiveRandomCoordsSearch()
  {
	  console.log("new try");
	  var pickedX = this.game.world.randomX;
	  var pickedY = this.game.world.randomY;

	  if(pickedX <= 20)
		  return this.recursiveRandomCoordsSearch();
	  else if(pickedY <= 200)
		  return this.recursiveRandomCoordsSearch();
	  else if(pickedX >= 780)
		  return this.recursiveRandomCoordsSearch();
	  else if(pickedY >= 780)
		  return this.recursiveRandomCoordsSearch();
	  else if(pickedX >= 145 && pickedX <=255 && pickedY >= 68 && pickedY <= 332)
		  return this.recursiveRandomCoordsSearch();
	  else if(pickedX >= 545 && pickedX <= 655 && pickedY >= 68 && pickedY <= 332 )
		  return this.recursiveRandomCoordsSearch();
	  else if(pickedX >= 145 && pickedX <= 255 && pickedY >= 368 && pickedY <= 632)
		  return this.recursiveRandomCoordsSearch();
	  else if(pickedX >= 545 && pickedX <= 655 && pickedY >= 368 && pickedY <= 632)
		  return this.recursiveRandomCoordsSearch();
	  else
	  {
		  if(pickedX%20 < 10)
			  pickedX-=pickedX%20;
		  else if(pickedX%20 >=10)
			  pickedX+=20-(pickedX%20);

		  if(pickedY%20 < 10)
			  pickedY-=pickedY%20;
		  else if(pickedY%20 >=10)
			  pickedY+=20-(pickedY%20);

		  return [pickedX+10, pickedY+10];
	  }


  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32);
	  this.game.debug.text('na spacje zrzut paczki', 180, 180)
	}
  }


}
