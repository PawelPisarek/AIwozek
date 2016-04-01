import Phaser from 'phaser'

export default class ShelfCollisionGroup{

    constructor({shelfCollisionGroup, packageCollisionGroup, playerCollisionGroup}) {

        this.shelfCollisionGroup = shelfCollisionGroup;
        this.packageCollisionGroup = packageCollisionGroup;
        this.playerCollisionGroup = playerCollisionGroup;

    }

    update() {

    }

}
