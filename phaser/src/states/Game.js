import Phaser from 'phaser'
import Shelf from '../sprites/Shelf';
import PlayerPackageShelfCollisionGroup from '../CollisionGroup/PlayerPackageShelfCollisionGroup'
import Player from '../sprites/Player'
import GraphNode from '../logic/GraphNode'
import Graph from '../logic/Graph'
import neighborGraph from '../logic/neighborGraph'
import {distance} from '../utils'
import {findGraphNode} from '../utils'

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
      packager.propertiesy = {
        width: 20,
        length: 20,
        height: 60,
        category: 'AGD'
      };

      packager.body.setCollisionGroup(this.collidesPPS.packageCollisionGroup);

      packager.body.collides([this.collidesPPS.packageCollisionGroup, this.collidesPPS.playerCollisionGroup, this.collidesPPS.shelfCollisionGroup]);
    }
    let shelf1 = new Shelf({
      game: this.game,
      x: 200,
      y: 200,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    this.astar();

    let shelf2 = new Shelf({
      game: this.game,
      x: 600,
      y: 200,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    let shelf3 = new Shelf({
      game: this.game,
      x: 200,
      y: 500,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    let shelf4 = new Shelf({
      game: this.game,
      x: 600,
      y: 500,
      asset: 'shelf',
      collides: this.collidesPPS
    });

    [shelf1, shelf2, shelf3, shelf4].forEach((shelf)=>this.game.add.existing(shelf));


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

  DodajemyPoleStartoweLubWęzełdoListyOtwartych(obj) {

    this.ListaOtwartych.push(obj);
    this.start = obj;
  }
  neighbor_nodes(node,taget){


    let neighborNodes = new neighborGraph({nodes: this.graph.nodes, node: node});
    [
      {x: neighborNodes.center.x - 1, y: neighborNodes.center.y},
      {x: neighborNodes.center.x + 1, y: neighborNodes.center.y},
      {x: neighborNodes.center.x, y: neighborNodes.center.y - 1},
      {x: neighborNodes.center.x, y: neighborNodes.center.y + 1}
    ].forEach((neighbor)=> {

      neighbor = findGraphNode(this.graph.nodes, neighbor);
      if (distance(neighborNodes.center, neighbor) !== false) {
        neighborNodes.add({node: neighbor.pos, distance: distance(neighborNodes.center, neighbor)})
      }
    });
    neighborNodes.toString();
    return neighborNodes;
  }
  SzukamyPolaONajniższejWartościFnaLiścieOtwartychCzynimyJeAktualnymPolem(obj,taget){
    console.log("SzukamyPolaONajniższejWartościFnaLiścieOtwartychCzynimyJeAktualnymPolem");
    // console.log(this.neighbor_nodes(obj));
    let neighbotNodes = this.neighbor_nodes(obj,taget);
    console.log(neighbotNodes);

    var points = neighbotNodes.nodes;
    points.sort(function(a, b){return a.distance-b.distance});
    console.log(points[0]);
    obj=points[0];
    console.log(obj);


  }
  AktualnePolePrzesuwamyDoListyZamkniętych(){
    console.log("AktualnePolePrzesuwamyDoListyZamkniętych");
  }

  DlaKażdegoZ8PrzyległychPólDoPolaAktualnegoZSprawdzamy(){
    console.log("DlaKażdegoZ8PrzyległychPólDoPolaAktualnegoZSprawdzamy");

  }
  JeśliNIEMOŻNAGoPrzejśćLubJestJużNaLiścieZamkniętychIgnorujemyJeWInnymPrzypadkuSprawdzamy(){
    console.log("JeśliNIEMOŻNAGoPrzejśćLubJestJużNaLiścieZamkniętychIgnorujemyJeWInnymPrzypadkuSprawdzamy");
  }

  JeśliPoleNieJestJeszczeNaLiścieOtwartychDodajemyJeDoNiejAktualnePoleZPrzypisujemyMuXnJakoPoleRodzicaIZapisujemyJegoWartościFGiH(){
    console.log("JeśliPoleNieJestJeszczeNaLiścieOtwartychDodajemyJeDoNiejAktualnePoleZPrzypisujemyMuXnJakoPoleRodzicaIZapisujemyJegoWartościFGiH");
  }

  JeśliPoleByłoJużNaLiścieOtwartychSprawdzamyCzyAktualnaScieżkaDoTegopolaProwadzącaprzezZJestLepszaKrótszaPoprzezPorównanieJegoWartościGdlaStarejiAktualnejŚcieżkiMniejszaWartośćGoznaczaŻeŚcieżkaJestKrótszaJeśliTakZmieniamyPrzypisaniePoleRodzicaNaAktualnePoleZiPrzeliczamyWartościGiFdlaPolaJeśliWaszaListaOtwartychJestPosortowanaPodKątemWartościFTrzebaJąPonowniePrzesortowaćPoWprowadzonejZmianie(){
    console.log("JeśliPoleByłoJużNaLiścieOtwartychSprawdzamyCzyAktualnaScieżkaDoTegopolaProwadzącaprzezZJestLepszaKrótszaPoprzezPorównanieJegoWartościGdlaStarejiAktualnejŚcieżkiMniejszaWartośćGoznaczaŻeŚcieżkaJestKrótszaJeśliTakZmieniamyPrzypisaniePoleRodzicaNaAktualnePoleZiPrzeliczamyWartościGiFdlaPolaJeśliWaszaListaOtwartychJestPosortowanaPodKątemWartościFTrzebaJąPonowniePrzesortowaćPoWprowadzonejZmianie");
  }

  ZatrzymujemySieGdy(){
    console.log("ZatrzymujemySieGdy");
  }

  DodanoPoleDoceloweDoListyZamkniętychWTymPrzypadkuŚcieżkaZostałaOdnaleziona(){
    console.log("DodanoPoleDoceloweDoListyZamkniętychWTymPrzypadkuŚcieżkaZostałaOdnaleziona");
  }
  ListaOtwartychJestPustaNieIStnieje(){
    console.log("ListaOtwartychJestPustaNieIStnieje");
  }
  ZapisujemyŚcieżkęKroczącWKierunkuOdPolaDocelowegoPktBDoStartowegoPktAPrzeskakujemyZKolejnychPólNaImPrzypisanePolaRodzicówAżDoOsiągnięciaPolaStartowegoToJestWaszaŚcieżka(){
    console.log("ZapisujemyŚcieżkęKroczącWKierunkuOdPolaDocelowegoPktBDoStartowegoPktAPrzeskakujemyZKolejnychPólNaImPrzypisanePolaRodzicówAżDoOsiągnięciaPolaStartowegoToJestWaszaŚcieżka");
  }
  astar(){

    console.log("DodajemyPoleStartoweLubWęzełdoListyOtwartych");
     this.graph = new Graph();
    // for (var i = 0; i < this.graph.widthBoard; i++) {
    //   for (var j = 0; j < this.graph.heightBoard; j++) {
    //     this.graph.add(new GraphNode({x: i, y: j, type: "sasdasd"}));
    //   }
    // }
    this.graph.add(new GraphNode({x: 0, y: 0, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 0, y: 1, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 0, y: 2, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 0, y: 3, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 1, y: 0, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 1, y: 1, type: "start"}));
    this.graph.add(new GraphNode({x: 1, y: 2, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 1, y: 3, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 2, y: 0, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 2, y: 1, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 2, y: 2, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 2, y: 3, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 3, y: 0, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 3, y: 1, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 3, y: 2, type: "sasdasd"}));
    this.graph.add(new GraphNode({x: 3, y: 3, type: "sasdasd"}));


    // console.log(this.graph);
    this.graph.toString();
    
    this.ListaOtwartych = [];
    let obj = {x: 0, y: 0};
    let taget={x: 3, y: 3};
    this.DodajemyPoleStartoweLubWęzełdoListyOtwartych(obj);

    // PowtarzamyNastępujące()

        this.SzukamyPolaONajniższejWartościFnaLiścieOtwartychCzynimyJeAktualnymPolem(obj,taget);

        this.AktualnePolePrzesuwamyDoListyZamkniętych(obj);

        this.DlaKażdegoZ8PrzyległychPólDoPolaAktualnegoZSprawdzamy();

          this.JeśliNIEMOŻNAGoPrzejśćLubJestJużNaLiścieZamkniętychIgnorujemyJeWInnymPrzypadkuSprawdzamy();

          this.JeśliPoleNieJestJeszczeNaLiścieOtwartychDodajemyJeDoNiejAktualnePoleZPrzypisujemyMuXnJakoPoleRodzicaIZapisujemyJegoWartościFGiH();

          this.JeśliPoleByłoJużNaLiścieOtwartychSprawdzamyCzyAktualnaScieżkaDoTegopolaProwadzącaprzezZJestLepszaKrótszaPoprzezPorównanieJegoWartościGdlaStarejiAktualnejŚcieżkiMniejszaWartośćGoznaczaŻeŚcieżkaJestKrótszaJeśliTakZmieniamyPrzypisaniePoleRodzicaNaAktualnePoleZiPrzeliczamyWartościGiFdlaPolaJeśliWaszaListaOtwartychJestPosortowanaPodKątemWartościFTrzebaJąPonowniePrzesortowaćPoWprowadzonejZmianie()

        this.ZatrzymujemySieGdy();

          this.DodanoPoleDoceloweDoListyZamkniętychWTymPrzypadkuŚcieżkaZostałaOdnaleziona()

          this.ListaOtwartychJestPustaNieIStnieje()

    this.ZapisujemyŚcieżkęKroczącWKierunkuOdPolaDocelowegoPktBDoStartowegoPktAPrzeskakujemyZKolejnychPólNaImPrzypisanePolaRodzicówAżDoOsiągnięciaPolaStartowegoToJestWaszaŚcieżka();
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
