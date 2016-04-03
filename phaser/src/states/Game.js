import Phaser from 'phaser'
import Shelf from '../sprites/Shelf';
import PlayerPackageShelfCollisionGroup from '../CollisionGroup/PlayerPackageShelfCollisionGroup'
import Player from '../sprites/Player'
import {setResponsiveWidth} from '../utils'

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
      shelfCollisionGroup: this.game.physics.p2.createCollisionGroup()
    });

    this.game.physics.p2.updateBoundsCollisionGroup();
    
    this.packages = this.game.add.group();
    this.packages.enableBody = true;
    this.packages.physicsBodyType = Phaser.Physics.P2JS;


    for (var i = 0; i < 4; i++)
    {
      var packager = this.packages.create(this.game.world.randomX, this.game.world.randomY, 'package');
      packager.body.setRectangle(32, 32);
      packager.propertiesy={};
      packager.propertiesy['width']=20;
      packager.propertiesy['length']=20;
      packager.propertiesy['height']=60;
      packager.propertiesy['category']='AGD';

      packager.body.setCollisionGroup(this.collidesPPS.packageCollisionGroup);

      packager.body.collides([this.collidesPPS.packageCollisionGroup, this.collidesPPS.playerCollisionGroup, this.collidesPPS.shelfCollisionGroup]);
    }
    this.shelf1 = new Shelf({
      game: this.game,
      x: 200,
      y: 200,
      asset: 'shelf',
      collides: this.collidesPPS
    });
    this.game.add.existing(this.shelf1);

    this.shelf2 = new Shelf({
      game: this.game,
      x: 600,
      y: 200,
      asset: 'shelf',
      collides: this.collidesPPS
    });
    this.game.add.existing(this.shelf2);

    this.shelf3 = new Shelf({
      game: this.game,
      x: 200,
      y: 500,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    this.game.add.existing(this.shelf3);

    this.shelf4 = new Shelf({
      game: this.game,
      x: 600,
      y: 500,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    this.game.add.existing(this.shelf4);


    this.player = new Player({
      game: this.game,
      x: 400,
      y: 300,
      asset: 'forkliftEmpty',
      collides: this.collidesPPS
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
      console.log('zrzucono paczke: width: '+newPackager.propertiesy['width']+' length: '+newPackager.propertiesy['length']+' height: '+newPackager.propertiesy['height']+' category: '+newPackager.propertiesy['category']);
      newPackager.body.setCollisionGroup(this.collidesPPS.packageCollisionGroup);
      newPackager.body.collides([this.collidesPPS.packageCollisionGroup, this.collidesPPS.playerCollisionGroup, this.collidesPPS.shelfCollisionGroup]);
      this.player.loadTexture('forkliftEmpty', 0);
      this.player.full = false;
      this.player.carrying = null;
    }

  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32);
      this.game.debug.text('na spacje zrzut paczki', 180, 180)
    }
  }
}
