import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('shelf', 'assets/images/shelf.png')
    this.load.image('package', 'assets/images/package.png')
    this.load.image('package1', 'assets/images/package1.png')
    this.load.image('package2', 'assets/images/package2.png')
    this.load.image('package3', 'assets/images/package3.png')
    this.load.image('package4', 'assets/images/package4.png')
    this.load.image('forkliftEmpty', 'assets/images/forklift_empty.png')
    this.load.image('forkliftFull', 'assets/images/forklift_full.png')
    this.load.physics('shelfPolygon', 'assets/images/shelfPolygon.json');
  }

  create () {
    this.state.start('Game')
  }

}
