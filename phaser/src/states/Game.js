import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}


  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.aliens = this.game.add.group();
    this.aliens.enableBody = true;

    for (var i = 0; i < 50; i++)
    {
      var s = this.aliens.create(this.game.world.randomX, this.game.world.randomY, 'baddie');
      s.name = 'alien' + s;
      s.body.collideWorldBounds = true;
      s.body.bounce.setTo(0.8, 0.8);
      s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
    }

    this.car = this.game.add.sprite(400, 300, 'car');
    this.car.name = 'car';
    this.car.anchor.set(0.5);

    this.game.physics.enable(this.car, Phaser.Physics.ARCADE);

    this.car.body.collideWorldBounds = true;
    this.car.body.bounce.set(0.8);
    this.car.body.allowRotation = true;
    this.car.body.immovable = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.togglePause, this);

  }

  update(){
    this.game.physics.arcade.collide(this.car, this.aliens);

    this.car.body.velocity.x = 0;
    this.car.body.velocity.y = 0;
    this.car.body.angularVelocity = 0;

    if (this.cursors.left.isDown)
    {
      this.car.body.angularVelocity = -200;
    }
    else if (this.cursors.right.isDown)
    {
      this.car.body.angularVelocity = 200;
    }

    if (this.cursors.up.isDown)
    {
      this.car.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.car.angle, 300));
    }
  }
  togglePause() {

    this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;

  }
  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.car, 32, 32)
    }
  }

}
