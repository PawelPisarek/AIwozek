import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}


  create () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);


    this.game.physics.p2.setImpactEvents(true);

    this.game.physics.p2.restitution = 0.8;

    this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.packageCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.shelfCollisionGroup = this.game.physics.p2.createCollisionGroup();

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

      packager.body.setCollisionGroup(this.packageCollisionGroup);

      packager.body.collides([this.packageCollisionGroup, this.playerCollisionGroup, this.shelfCollisionGroup]);
    }
    var shelf1 = this.game.add.sprite(200, 200, 'shelf');

    this.game.physics.p2.enable(shelf1, false);
    shelf1.body.clearShapes();
    shelf1.body.loadPolygon('shelfPolygon', 'shelf');
    shelf1.body.static = true
    shelf1.body.setCollisionGroup(this.shelfCollisionGroup);
    shelf1.body.collides([this.packageCollisionGroup, this.playerCollisionGroup]);

    var shelf2 = this.game.add.sprite(600, 200, 'shelf');
    this.game.physics.p2.enable(shelf2, false);

    shelf2.body.clearShapes();
    shelf2.body.loadPolygon('shelfPolygon', 'shelf');

    shelf2.body.static = true
    shelf2.body.setCollisionGroup(this.shelfCollisionGroup);
    shelf2.body.collides([this.packageCollisionGroup, this.playerCollisionGroup]);

    var shelf3 = this.game.add.sprite(200, 500, 'shelf');
    this.game.physics.p2.enable(shelf3, false);

    shelf3.body.clearShapes();
    shelf3.body.loadPolygon('shelfPolygon', 'shelf');

    shelf3.body.static = true
    shelf3.body.setCollisionGroup(this.shelfCollisionGroup);
    shelf3.body.collides([this.packageCollisionGroup, this.playerCollisionGroup]);

    var shelf4 = this.game.add.sprite(600, 500, 'shelf');
    this.game.physics.p2.enable(shelf4, false);

    shelf4.body.clearShapes();
    shelf4.body.loadPolygon('shelfPolygon', 'shelf');

    shelf4.body.static = true
    shelf4.body.setCollisionGroup(this.shelfCollisionGroup);
    shelf4.body.collides([this.packageCollisionGroup, this.playerCollisionGroup]);


    this.forklift = this.game.add.sprite(400, 300, 'forkliftEmpty');
    this.forklift.name = 'forklift';
    this.forklift.full = false;

    this.game.physics.p2.enable(this.forklift, false);

    this.forklift.body.setRectangle(32, 32);
    this.forklift.body.fixedRotation = true;
    this.forklift.body.setCollisionGroup(this.playerCollisionGroup);
    this.forklift.body.collides(this.packageCollisionGroup, this.hitPackage, this);
    this.forklift.body.collides(this.shelfCollisionGroup);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this.dropPackage, this);


  }

  update(){

    this.forklift.body.setZeroVelocity();

    if (this.cursors.left.isDown)
    {
      this.forklift.body.moveLeft(200);
    }
    else if (this.cursors.right.isDown)
    {
      this.forklift.body.moveRight(200);
    }

    if (this.cursors.up.isDown)
    {
      this.forklift.body.moveUp(200);
    }
    else if (this.cursors.down.isDown)
    {
      this.forklift.body.moveDown(200);
    }
  }
  togglePause() {

    this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;

  }

  dropPackage()
  {
    if(this.forklift.full === true)
    {
      var newPackager = this.packages.create(this.forklift.position.x+60, this.forklift.position.y, 'package');
      newPackager.body.setRectangle(32, 32);
      newPackager.propertiesy = this.forklift.carrying;
      console.log('zrzucono paczke: width: '+newPackager.propertiesy['width']+' length: '+newPackager.propertiesy['length']+' height: '+newPackager.propertiesy['height']+' category: '+newPackager.propertiesy['category']);
      newPackager.body.setCollisionGroup(this.packageCollisionGroup);
      newPackager.body.collides([this.packageCollisionGroup, this.playerCollisionGroup, this.shelfCollisionGroup]);
      this.forklift.loadTexture('forkliftEmpty', 0);
      this.forklift.full = false;
      this.forklift.carrying = null;
    }

  }

  hitPackage(body1, body2)
  {
    if(this.forklift.full === false)
    {
      this.forklift.full=true;
      this.forklift.loadTexture('forkliftFull', 0);
      this.forklift.carrying=body2.sprite.propertiesy;
      console.log('zabrano paczke: width: '+body2.sprite.propertiesy['width']+' length: '+body2.sprite.propertiesy['length']+' height: '+body2.sprite.propertiesy['height']+' category: '+body2.sprite.propertiesy['category']);
      body2.sprite.alpha = 0;
      body2.destroy();
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.forklift, 32, 32)
      this.game.debug.text('na spacje zrzut paczki', 180, 180)
    }
  }

}
