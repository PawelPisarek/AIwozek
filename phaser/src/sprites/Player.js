import Phaser from 'phaser'

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
    }

    hitPackage(body1, body2) {
        if (this.full === false) {
            this.full = true;
            this.loadTexture('forkliftFull', 0);
            this.carrying = body2.sprite.propertiesy;
            console.log('zabrano paczke: width: ' + body2.sprite.propertiesy['width'] + ' length: ' + body2.sprite.propertiesy['length'] + ' height: ' + body2.sprite.propertiesy['height'] + ' category: ' + body2.sprite.propertiesy['category']);
            body2.sprite.alpha = 0;
            body2.destroy();
        }
    }

}
