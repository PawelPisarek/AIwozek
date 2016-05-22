import Phaser from 'phaser'
import {TEST1,TEST2,TEST3} from '../oil'

export default class extends Phaser.Sprite {

    constructor({game, x, y, asset, collides}) {
        super(game, x, y, asset, collides);

        this.game = game;
        this.name = 'forklift';
        this.full = false;

        this.game.physics.p2.enable(this, false);

        this.body.setRectangle(32, 32);
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
        if (this.game.input.activePointer.isDown) {

            let mouse_x = Math.ceil(this.game.input.mousePointer.x / 20)-1;
            let mouse_y = Math.ceil(this.game.input.mousePointer.y / 20)-1;
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
            console.log(result);
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
    }

    hitPackage(body1, body2) {
        if (this.full === false) {
            this.full = true;
            this.loadTexture('forkliftFull', 0);
            this.carrying = body2.sprite.propertiesy;
            console.log('zabrano paczke: width: ' + body2.sprite.propertiesy['width'] + ' length: ' + body2.sprite.propertiesy['length'] + ' height: ' + body2.sprite.propertiesy['height'] + ' category: ' + body2.sprite.propertiesy['category']);
            var classify = myPerceptron.activate([body2.sprite.propertiesy['width'], body2.sprite.propertiesy['length'], body2.sprite.propertiesy['height']]);
            console.log('paczka została sklasyfikowala jako: ', classify > 0.5 ? 'Duża' : 'Mała');
            body2.sprite.alpha = 0;
            body2.destroy();
        }
    }

}
