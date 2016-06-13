import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor({game, x, y, asset, collides, holding}) {
        super(game, x, y, asset, collides, holding);

        this.game = game
        this.anchor.setTo(0.5)
        this.game.physics.p2.enable(this, false);
        this.body.clearShapes();
        this.body.loadPolygon('shelfPolygon', 'shelf');
        this.body.static = true;
        this.body.setCollisionGroup(collides.shelfCollisionGroup);
        this.body.collides([collides.packageCollisionGroup, collides.playerCollisionGroup]);
		this.holding = holding;
    }

    update() {

    }

}
