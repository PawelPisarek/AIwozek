import Phaser from 'phaser'
import {TEST1,TEST2,TEST3} from '../oil'

export default class extends Phaser.Sprite {

    constructor({game, x, y, asset, collides, packageArr, rackArr, decisionTree}) {
        super(game, x, y, asset, collides, packageArr, rackArr, decisionTree);

        this.game = game;
        this.name = 'forklift';
        this.full = false;
        this.decisionTree = decisionTree;

        this.decsionTree = decisionTree;

        this.packagesCoords=packageArr;
        this.racksCoords=rackArr;

        this.game.physics.p2.enable(this, false);
        this.collides = collides;
        this.body.setRectangle(20, 20);
        this.body.fixedRotation = true;
        this.body.setCollisionGroup(collides.playerCollisionGroup);
        this.body.collides(collides.packageCollisionGroup, this.hitPackage, this);
        this.body.collides(collides.shelfCollisionGroup);

        //test 1 nie ma wag

        //test2 waga 100

        //TEST3 waga 10
        var graphics = this.game.add.graphics(0, 0);
        graphics.beginFill(0x000000, 0.5);
        graphics.drawRect(170, 320, 30,60);
        graphics.endFill();
        this.graph = new Graph(TEST3);
        for(var cv=0; cv<this.packagesCoords.length; cv++)
        {
            console.log(this.graph.grid[this.packagesCoords[cv][0]][this.packagesCoords[cv][1]].weight = 100);
        }

        var graph={};
        graph[0]={};
        graph[0][0]=0;
        graph[0][1]=0;
        graph[0][2]=0;
        graph[0][3]=0;
        graph[0][4]=0;
        graph[0][5]=astar.search(this.graph, this.graph.grid[Math.ceil(this.body.y / 20)-1][Math.ceil(this.body.x / 20)-1], this.graph.grid[this.packagesCoords[0][0]][this.packagesCoords[0][1]]).length;
        graph[0][6]=astar.search(this.graph, this.graph.grid[Math.ceil(this.body.y / 20)-1][Math.ceil(this.body.x / 20)-1], this.graph.grid[this.packagesCoords[1][0]][this.packagesCoords[1][1]]).length;
        graph[0][7]=astar.search(this.graph, this.graph.grid[Math.ceil(this.body.y / 20)-1][Math.ceil(this.body.x / 20)-1], this.graph.grid[this.packagesCoords[2][0]][this.packagesCoords[2][1]]).length;
        graph[0][8]=astar.search(this.graph, this.graph.grid[Math.ceil(this.body.y / 20)-1][Math.ceil(this.body.x / 20)-1], this.graph.grid[this.packagesCoords[3][0]][this.packagesCoords[3][1]]).length;
        graph[1]={};
        graph[1][0]=0;
        graph[1][1]=0;
        graph[1][2]=0;
        graph[1][3]=0;
        graph[1][4]=0;
        graph[1][5]=0;
        graph[1][6]=astar.search(this.graph, this.graph.grid[this.racksCoords[0][0]][this.racksCoords[0][1]], this.graph.grid[this.packagesCoords[1][0]][this.packagesCoords[1][1]]).length;
        graph[1][7]=astar.search(this.graph, this.graph.grid[this.racksCoords[0][0]][this.racksCoords[0][1]], this.graph.grid[this.packagesCoords[2][0]][this.packagesCoords[2][1]]).length;
        graph[1][8]=astar.search(this.graph, this.graph.grid[this.racksCoords[0][0]][this.racksCoords[0][1]], this.graph.grid[this.packagesCoords[3][0]][this.packagesCoords[3][1]]).length;;
        graph[2]={};
        graph[2][0]=0;
        graph[2][1]=0;
        graph[2][2]=0;
        graph[2][3]=0;
        graph[2][4]=0;
        graph[2][5]=astar.search(this.graph, this.graph.grid[this.racksCoords[1][0]][this.racksCoords[1][1]], this.graph.grid[this.packagesCoords[0][0]][this.packagesCoords[0][1]]).length;
        graph[2][6]=0;
        graph[2][7]=astar.search(this.graph, this.graph.grid[this.racksCoords[1][0]][this.racksCoords[1][1]], this.graph.grid[this.packagesCoords[2][0]][this.packagesCoords[2][1]]).length;
        graph[2][8]=astar.search(this.graph, this.graph.grid[this.racksCoords[1][0]][this.racksCoords[1][1]], this.graph.grid[this.packagesCoords[3][0]][this.packagesCoords[3][1]]).length;
        graph[3]={};
        graph[3][0]=0;
        graph[3][1]=0;
        graph[3][2]=0;
        graph[3][3]=0;
        graph[3][4]=0;
        graph[3][5]=astar.search(this.graph, this.graph.grid[this.racksCoords[2][0]][this.racksCoords[2][1]], this.graph.grid[this.packagesCoords[0][0]][this.packagesCoords[0][1]]).length;
        graph[3][6]=astar.search(this.graph, this.graph.grid[this.racksCoords[2][0]][this.racksCoords[2][1]], this.graph.grid[this.packagesCoords[1][0]][this.packagesCoords[1][1]]).length;
        graph[3][7]=0;
        graph[3][8]=astar.search(this.graph, this.graph.grid[this.racksCoords[2][0]][this.racksCoords[2][1]], this.graph.grid[this.packagesCoords[3][0]][this.packagesCoords[3][1]]).length;
        graph[4]={};
        graph[4][0]=0;
        graph[4][1]=0;
        graph[4][2]=0;
        graph[4][3]=0;
        graph[4][4]=0;
        graph[4][5]=astar.search(this.graph, this.graph.grid[this.racksCoords[3][0]][this.racksCoords[3][1]], this.graph.grid[this.packagesCoords[0][0]][this.packagesCoords[0][1]]).length;
        graph[4][6]=astar.search(this.graph, this.graph.grid[this.racksCoords[3][0]][this.racksCoords[3][1]], this.graph.grid[this.packagesCoords[1][0]][this.packagesCoords[1][1]]).length;
        graph[4][7]=astar.search(this.graph, this.graph.grid[this.racksCoords[3][0]][this.racksCoords[3][1]], this.graph.grid[this.packagesCoords[2][0]][this.packagesCoords[2][1]]).length;
        graph[4][8]=0;
        graph[5]={};
        graph[5][0]=0;
        graph[5][1]=astar.search(this.graph, this.graph.grid[this.packagesCoords[0][0]][this.packagesCoords[0][1]], this.graph.grid[this.racksCoords[0][0]][this.racksCoords[0][1]]).length;
        graph[5][2]=0;
        graph[5][3]=0;
        graph[5][4]=0;
        graph[5][5]=0;
        graph[5][6]=0;
        graph[5][7]=0;
        graph[5][8]=0;
        graph[6]={};
        graph[6][0]=0;
        graph[6][1]=0;
        graph[6][2]=astar.search(this.graph, this.graph.grid[this.packagesCoords[1][0]][this.packagesCoords[1][1]], this.graph.grid[this.racksCoords[1][0]][this.racksCoords[1][1]]).length;
        graph[6][3]=0;
        graph[6][4]=0;
        graph[6][5]=0;
        graph[6][6]=0;
        graph[6][7]=0;
        graph[6][8]=0;
        graph[7]={};
        graph[7][0]=0;
        graph[7][1]=0;
        graph[7][2]=0;
        graph[7][3]=astar.search(this.graph, this.graph.grid[this.packagesCoords[2][0]][this.packagesCoords[2][1]], this.graph.grid[this.racksCoords[2][0]][this.racksCoords[2][1]]).length;
        graph[7][4]=0;
        graph[7][5]=0;
        graph[7][6]=0;
        graph[7][7]=0;
        graph[7][8]=0;
        graph[8]={};
        graph[8][0]=0;
        graph[8][1]=0;
        graph[8][2]=0;
        graph[8][3]=0;
        graph[8][4]=astar.search(this.graph, this.graph.grid[this.packagesCoords[3][0]][this.packagesCoords[3][1]], this.graph.grid[this.racksCoords[3][0]][this.racksCoords[3][1]]).length;;
        graph[8][5]=0;
        graph[8][6]=0;
        graph[8][7]=0;
        graph[8][8]=0;

        var minPath=[];
        minPath.push(0);

        for(var t=0; t<this.packagesCoords.length; t++)
        {
            this.racksCoords.push(this.packagesCoords[t]);
        }

        function findMinHamiltonianCycle(vertex)
        {

            var tempPath=[];
            for(var i=0; i < Object.keys(graph[vertex]).length; i++)
            {

                if(graph[vertex][i] > 0 && minPath.indexOf(i) == -1)
                {
                    tempPath.push(graph[vertex][i]+"###"+i);
                }
            }

            if(tempPath.length == 0)
                return 0;
            else
            {
                var tempMin = tempPath[0];
                for(var i=0; i<tempPath.length; i++)
                {
                    var tempValue=parseInt(tempPath[i].split("###")[0]);
                    if(tempValue < parseInt(tempMin.split("###")[0]))
                    {
                        tempMin=tempPath[i];
                    }
                }

                minPath.push(parseInt(tempMin.split("###")[1]));
                return findMinHamiltonianCycle(tempMin.split("###")[1]);

            }
        }


        var maxPath=[];
        maxPath.push(0);


        function findMaxHamiltonianCycle(vertex)
        {

            var tempPath=[];
            for(var i=0; i < Object.keys(graph[vertex]).length; i++)
            {

                if(graph[vertex][i] > 0 && maxPath.indexOf(i) == -1)
                {
                    tempPath.push(graph[vertex][i]+"###"+i);
                }
            }

            if(tempPath.length == 0)
                return 0;
            else
            {
                var tempMax = tempPath[0];
                for(var i=0; i<tempPath.length; i++)
                {
                    var tempValue=parseInt(tempPath[i].split("###")[0]);
                    if(tempValue > parseInt(tempMax.split("###")[0]))
                    {
                        tempMax=tempPath[i];
                    }
                }

                maxPath.push(parseInt(tempMax.split("###")[1]));
                return findMaxHamiltonianCycle(tempMax.split("###")[1]);

            }
        }


        function findRandomHamiltonianCycle(vertex)
        {

            var tempPath=[];
            for(var n=0; n < Object.keys(graph[vertex]).length; n++)
            {

                if(graph[vertex][n] > 0 && randomPath.indexOf(n) == -1)
                {
                    tempPath.push(graph[vertex][n]+"###"+n);
                }
            }

            if(tempPath.length == 0)
                return 0;
            else
            {
                var tempRandom = tempPath[Math.floor((Math.random() * tempPath.length) +0)];

                randomPath.push(parseInt(tempRandom.split("###")[1]));
                return findRandomHamiltonianCycle(tempRandom.split("###")[1]);
            }
        }


        var pathArray=[];

        for(var l=0; l<5; l++)
        {
            var randomPath=[];
            randomPath.push(0);
            findRandomHamiltonianCycle(0);

            var tempSum=0;
            for(var m = 1; m<randomPath.length; m++)
            {
                tempSum+=graph[randomPath[m-1]][randomPath[m]];
            }
            pathArray.push(randomPath+"###"+tempSum);
        }


        var bestPath=pathArray[0];

        console.log("znaleziono grafy- teraz optymalizacja");
        TwoOpt();

        function TwoOpt()
        {
            var size = Object.keys(graph).length;
            var improve = 0;

            while(improve < 20)
            {
                var best_distance = bestPath.split("###")[1];

                for(var i=1; i<(size -1)/2; i++)
                {
                    for(var k=i+1; k <size/2; k++)
                    {
                        var newCycle = TwoOptSwap((i*2)-1, (k*2));

                        var new_distance = newCycle.split("###")[1];
                        if(pathArray.indexOf(newCycle) == -1)
                            pathArray.push(newCycle);

                        if(new_distance < best_distance)
                        {
                            improve = 0;
                            best_distance = new_distance;
                            bestPath=newCycle;

                        }

                    }
                }

                improve++;
            }
        }

        function TwoOptSwap(i, k)
        {

            var size = Object.keys(graph).length;

            var newPath=[];

            var splitBestPath=bestPath.split("###")[0].split(",");

            for( var c = 0; c <= i - 1; ++c)
            {
                newPath.push(splitBestPath[c]);
            }

            for(var c=k; c>=i; c--)
            {
                c--;
                newPath.push(splitBestPath[c]);
                newPath.push(splitBestPath[c+1]);
            }
            for(var c=k+1; c< size; ++c)
            {
                newPath.push(splitBestPath[c]);
            }


            var newPathSum=0;
            for(var o = 1; o<newPath.length; o++)
            {
                newPathSum+=graph[newPath[o-1]][newPath[o]];
            }

            return newPath+"###"+newPathSum;
        }

        var validatedArray=[];
        function checkIfValid()
        {
            for(var i=0; i< pathArray.length; i++)
            {
                var isValid=true;
                var tempSplitPath=pathArray[i].split("###")[0].split(",");
                for(var j=1; j<tempSplitPath.length; j++)
                {
                    if(graph[tempSplitPath[j-1]][tempSplitPath[j]] == 0)
                        isValid = false;
                }
                if(isValid === true)
                    validatedArray.push(pathArray[i]);


            }
        }
        checkIfValid();

        var crossedPaths=[];
        var tempString="";
        function edgeCrossover()
        {
            for(var i=0; i< validatedArray.length; i++)
            {
                for(var j=0; j<validatedArray.length; j++)
                {
                    if(i != j)
                    {

                        var tempConn={};

                        var firstTempPath=validatedArray[i].split("###")[0].split(",");
                        for(var k=0; k<firstTempPath.length; k++)
                        {


                            if(firstTempPath[k+1] != null)
                            {

                                tempConn[firstTempPath[k]]=firstTempPath[k+1]+"";
                            }

                            if(k>0)
                                tempConn[firstTempPath[k]]+=","+firstTempPath[k-1];
                        }

                        var secondTempPath=validatedArray[j].split("###")[0].split(",");
                        for(var k=0; k<secondTempPath.length; k++)
                        {
                            if(secondTempPath[k+1] != null)
                            {

                                if(tempConn[secondTempPath[k]].indexOf(secondTempPath[k+1]+"") > -1)
                                {
                                    var workingTemp = tempConn[secondTempPath[k]].split(secondTempPath[k+1]+"");
                                    tempConn[secondTempPath[k]]=workingTemp.join(secondTempPath[k+1]+"+");
                                }
                                else
                                    tempConn[secondTempPath[k]]+=","+secondTempPath[k+1];
                            }

                            if(k>0)
                            {
                                if(tempConn[secondTempPath[k]].indexOf(secondTempPath[k-1]+"") > -1)
                                {
                                    var workingTemp = tempConn[secondTempPath[k]].split(secondTempPath[k-1]+"");
                                    tempConn[secondTempPath[k]]=workingTemp.join(secondTempPath[k-1]+"+");
                                }
                                else
                                    tempConn[secondTempPath[k]]+=","+secondTempPath[k-1];
                            }

                        }
                        tempString="";
                        //console.log(tempConn);
                        createCrossoverPath(tempConn, 0);
                        var sliTempString = tempString.replace(",999,","")
                        if(crossedPaths.indexOf(sliTempString) == -1)
                            crossedPaths.push(sliTempString);

                    }
                }
            }
        }

        function createCrossoverPath(connectionsMap, index)
        {
            tempString+=index+",";

            var tempIndex;
            if(Object.keys(connectionsMap).length > 0)
            {
                //console.log(connectionsMap[parseInt(connectionsMap[index][connectionsMap[index].indexOf("+") - 1])]);
                if(connectionsMap[index].indexOf("+") > -1 && connectionsMap[parseInt(connectionsMap[index][connectionsMap[index].indexOf("+") - 1])] != null)
                {

                    tempIndex = (connectionsMap[index][connectionsMap[index].indexOf("+") - 1]);
                    delete connectionsMap[index];
                    return createCrossoverPath(connectionsMap, parseInt(tempIndex));
                }
                else
                {

                    var tempWorking=connectionsMap[index].split(",");
                    var minLength="999###999";
                    for(var i=0; i<tempWorking.length; i++)
                    {

                        if(connectionsMap[tempWorking[i]] != null && connectionsMap[tempWorking[i]].length < parseInt(minLength.split("###")[0]))
                        {

                            minLength=connectionsMap[tempWorking[i]].length+"###"+tempWorking[i];
                        }
                    }
                    delete connectionsMap[index];

                    return createCrossoverPath(connectionsMap, minLength.split("###")[1]);
                }
            }
            else
            {
                return -1;
            }


        }

        edgeCrossover();

        for(var o=0; o<crossedPaths.length; o++)
        {
            var tempPathSum=0;

            for(var p=1; p<crossedPaths[o].split(",").length; p++)
            {

                tempPathSum+=graph[crossedPaths[o].split(",")[p-1]][crossedPaths[o].split(",")[p]];
                //console.log(graph[crossedPaths[o].split(",")[p-1]][crossedPaths[o].split(",")[p]]);
            }
            if(validatedArray.indexOf(crossedPaths[o]+"###"+tempPathSum) == -1)
            {
                validatedArray.push(crossedPaths[o]+"###"+tempPathSum);
            }
        }

        var effectiveArray=validatedArray[0];
        for(var o=0; o<validatedArray.length; o++) {
            if (parseInt(validatedArray[o].split("###")[1]) < parseInt(effectiveArray.split("###")[1])) {
                effectiveArray = validatedArray[o];
            }
        }

        console.log(validatedArray);
        console.log(effectiveArray);
        var splitEffectivePath=effectiveArray.split("###")[0].split(",");
        var astarPath=[];
        var previous=-1;
        for(var s=1; s<splitEffectivePath.length; s++)
        {
            if(previous == -1)
            {
                astarPath.push(astar.search(this.graph, this.graph.grid[Math.ceil(this.body.y / 20)-1][Math.ceil(this.body.x / 20)-1], this.graph.grid[this.racksCoords[splitEffectivePath[s]-1][0]][this.racksCoords[splitEffectivePath[s]-1][1]]));
            }
            else
            {
                astarPath.push(astar.search(this.graph, this.graph.grid[this.racksCoords[previous-1][0]][this.racksCoords[previous-1][1]], this.graph.grid[this.racksCoords[splitEffectivePath[s]-1][0]][this.racksCoords[splitEffectivePath[s]-1][1]]));
            }
            previous=splitEffectivePath[s];

        }
        this.resulti=[];
        var iterator=0;
        astarPath.forEach((path) => {
            path.forEach((point) => {
            var tempObj={};
            tempObj.x=point.x;
            tempObj.y=point.y;
            this.resulti.push(tempObj);
            });
            if((iterator%2) != 0)
                this.resulti.push("#");

            iterator++;
        });
        console.log(astarPath);
        console.log(this.body.moveUp);

    }

    update(){

        this.body.setZeroVelocity();

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.body.moveLeft(200);
            if (this.scale.x == 1) {
                this.scale.x = -1;
            }
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.body.moveRight(200);
            if (this.scale.x == -1) {
                this.scale.x = 1;
            }
        }


        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.body.moveUp(200);
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.body.moveDown(200);
        }
		if(document.getElementById("getit").value == 1)
        {
            document.getElementById("getit").value=0;
            document.getElementById("gettingit").value=1;
            var size =document.getElementById("size").value;
            var color =document.getElementById("color").value;
            var refrigerated =document.getElementById("refrigerated").value;
            var hazardous =document.getElementById("hazardous").value;
            var food =document.getElementById("food").value;
            var chosenpack = {size: size, color: color, "refrigerated": refrigerated, hazardous: hazardous, food: food};

            var predicted_class = this.decisionTree.predict(chosenpack);
            console.log(predicted_class);
            document.getElementById("gettingit").value=0;
			/*
			if(predicted_class == "food"){
				shelfposx = ;
				shelfposy = ;
			}
			else if(predicted_class == "hazardous"){
				shelfposx = ;
				shelfposy = ;
			}
			else if(predicted_class == "big"){
				shelfposx = ;
				shelfposy = ;
			}
			else if(predicted_class == "small"){
				shelfposx = ;
				shelfposy = ;
			}
			
            console.log(shelfposx+" "+shelfposy);
            let mouse_x = Math.ceil(shelfposx / 20)-1;
            let mouse_y = Math.ceil(shelfposy / 20)-1;
            let forklift_x = Math.ceil(this.body.x / 20)-1;
            let forklift_y = Math.ceil(this.body.y / 20)-1;
            console.log("start: " + forklift_x + " " + forklift_y + " | end: " + mouse_x + " " + mouse_y);
            let start = this.graph.grid[forklift_x][forklift_y];
            let end = this.graph.grid[mouse_x][mouse_y]; //40-46
            this.result = astar.search(this.graph, start, end);
            // console.log(this.result);
            let path = {x: forklift_x, y: forklift_y};
            let result = [];

            this.result.forEach((graph) => {
                if (graph.y > path.x) {
                    path.x = graph.y;
                    path.y = graph.x;
                    result.push('dol '+graph.weight);
                }
                if (graph.x > path.y) {
                    path.x = graph.y;
                    path.y = graph.x;
                    result.push('prawo '+graph.weight);
                }
                if (graph.y < path.x) {
                    path.x = graph.y;
                    path.y = graph.x;
                    result.push('gora '+graph.weight);
                }
                if (graph.x < path.y) {
                    path.x = graph.y;
                    path.y = graph.x;
                    result.push('lewo '+graph.weight);
                }
            });
            result.shift();
            console.log(result);*/
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.P))
        {
            let punkt = this.result.shift();

            if(punkt != null)
            {
                let forklift_y = Math.ceil(this.body.x / 20)-1;
                let forklift_x = Math.ceil(this.body.y / 20)-1;
                // console.log("punkt x: "+punkt.x+" y: "+punkt.y+" wozek: "+forklift_x+" "+forklift_y);
                if (punkt.y > forklift_x) {
                    this.body.moveDown(1139);
                    // console.log('dol');
                }
                if (punkt.x > forklift_y) {
                    this.body.moveRight(999);
                    // console.log('prawo');
                    if (this.scale.x == -1) {
                        this.scale.x = 1;
                    }
                }
                if (punkt.y < forklift_x) {
                    this.body.moveUp(1139);
                    // console.log('gora');
                }
                if (punkt.x < forklift_y) {
                    this.body.moveLeft(999);
                    // console.log('lewo');
                    if (this.scale.x == 1) {
                        this.scale.x = -1;
                    }
                }

            }


        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.O))
        {

            let punkt = this.resulti.shift();
            console.log(punkt);
            console.log(this.body.x+" "+this.body.y);
            if(punkt != null)
            {
                if(punkt == "#") {
                    this.dropPackage();
                }
                else
                {
                    let forklift_y = Math.ceil(this.body.x / 20) - 1;
                    let forklift_x = Math.ceil(this.body.y / 20) - 1;
                    // console.log("punkt x: "+punkt.x+" y: "+punkt.y+" wozek: "+forklift_x+" "+forklift_y);
                    if (punkt.y > forklift_x) {
                        this.body.moveDown(1205);
                        //console.log('dol');
                    }
                    if (punkt.x > forklift_y) {
                        this.body.moveRight(1202);
                        //console.log('prawo');
                        if (this.scale.x == -1) {
                            this.scale.x = 1;
                        }
                    }
                    if (punkt.y < forklift_x) {
                        this.body.moveUp(1205);
                        //console.log('gora');
                    }
                    if (punkt.x < forklift_y) {
                        this.body.moveLeft(1202);
                        //console.log('lewo');
                        if (this.scale.x == 1) {
                            this.scale.x = -1;
                        }
                    }
                }
            }


        }
        
    }

    hitPackage(body1, body2) {
        if (this.full === false) {
            this.full = true;
            this.loadTexture('forkliftFull', 0);
            this.carrying = body2.sprite.propertiesy;
            //console.log('zabrano paczke: width: ' + body2.sprite.propertiesy['width'] + ' length: ' + body2.sprite.propertiesy['length'] + ' height: ' + body2.sprite.propertiesy['height'] + ' category: ' + body2.sprite.propertiesy['category']);
            console.log("zabrano paczke: "+body2.x+" "+body2.y+" | "+(Math.ceil(body2.x / 20)-1)+" "+(Math.ceil(body2.y / 20)-1));
            console.log("package properties: ", body2.sprite.propertiesy);
            body2.sprite.alpha = 0;
            body2.destroy();
            //body1.setCollisionGroup(this.collides.playerFullCollisionGroup);
            //this.body.collides(this.collides.shelfCollisionGroup);
        }
    }

    dropPackage()
    {

            //let newPackager = this.packages.create(this.body.position.x+60, this.body.position.y, 'package');
            //newPackager.body.setRectangle(32, 32);
            //newPackager.propertiesy = this.body.carrying;
            //console.log('zrzucono paczke: width: '+newPackager.propertiesy['width']+' length: '+newPackager.propertiesy['length']+' height: '+newPackager.propertiesy['height']+' category: '+newPackager.propertiesy['category']);
            //newPackager.body.setCollisionGroup(this.collidesPPS.packageCollisionGroup);
            //newPackager.body.collides([this.collidesPPS.packageCollisionGroup, this.collidesPPS.playerCollisionGroup, this.collidesPPS.shelfCollisionGroup]);
            this.loadTexture('forkliftEmpty', 0);
            this.full = false;
            //this.body.carrying = null;

            this.body.setCollisionGroup(this.collides.playerCollisionGroup);
            this.body.collides(this.collides.packageCollisionGroup, this.hitPackage, this);
            this.body.collides(this.collides.shelfCollisionGroup);


    }

}
