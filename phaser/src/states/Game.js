import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}


  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    //this.packages = this.game.add.group();
    //this.packages.enableBody = true;

    this.package = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'package');
    this.package.name = 'package';
    this.package.size = {};
    this.package.size['width'] = 10;
    this.package.size['height'] = 20;
    this.package.size['length'] = 30;

    this.game.physics.enable(this.package, Phaser.Physics.ARCADE);
    this.package.body.collideWorldBounds = true;
    this.package.body.bounce.setTo(0.8, 0.8);

    this.forklift = this.game.add.sprite(400, 300, 'forkliftEmpty');
    this.forklift.name = 'forklift';
    this.forklift.anchor.set(0.5);

    this.game.physics.enable(this.forklift, Phaser.Physics.ARCADE);

    this.forklift.body.collideWorldBounds = true;
    this.forklift.body.bounce.set(0.8);
    this.forklift.body.allowRotation = true;
    this.forklift.body.immovable = true;
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.dropPackage, this);

  }

  update(){
    if(this.game.physics.arcade.collide(this.forklift, this.package))
    {
      this.forklift.loadTexture('forkliftFull', 0);
      this.forklift.carrying={};
      this.forklift.carrying['width']=this.package.size['width'];
      this.forklift.carrying['length']=this.package.size['length'];
      this.forklift.carrying['height']=this.package.size['height'];
      this.forklift.full = true;
      this.package.alpha = 0;

    }


    this.forklift.body.velocity.x = 0;
    this.forklift.body.velocity.y = 0;
    this.forklift.body.angularVelocity = 0;

    if (this.cursors.left.isDown)
    {
      this.forklift.body.angularVelocity = -200;
    }
    else if (this.cursors.right.isDown)
    {
      this.forklift.body.angularVelocity = 200;
    }

    if (this.cursors.up.isDown)
    {
      this.forklift.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.forklift.angle, 300));
    }
  }
  togglePause() {

    this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;

  }

  dropPackage()
  {
    if(this.forklift.full === true)
    {
      this.package = this.game.add.sprite(this.forklift.position.x+20, this.forklift.position.y, 'package');
      this.package.name = 'package';
      this.package.size = {};
      this.package.size['width'] = this.forklift.carrying['width'];
      this.package.size['height'] = this.forklift.carrying['height'];
      this.package.size['length'] = this.forklift.carrying['length'];

      this.game.physics.enable(this.package, Phaser.Physics.ARCADE);
      this.package.body.collideWorldBounds = true;
      this.package.body.bounce.setTo(0.8, 0.8);
      this.forklift.loadTexture('forkliftEmpty', 0);
      this.forklift.full = false;
      this.forklift.carrying = null;
    }

  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.forklift, 32, 32)
      this.game.debug.text('na spacje zrzut paczki', 180, 180)
    }
  }

}
