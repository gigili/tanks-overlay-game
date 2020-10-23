import * as PIXI from 'pixi.js'


export class Player{
	health = 25;
	sprite = null;
	constructor(public posX : number, public posY: number, private readonly isReversed = false, public displayName : string = "") {
		this.setup();
	}

	setup(){
		this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["../assets/sprites/tank.png"].texture);
		this.sprite.position.set(this.posX, this.posY);
		this.sprite.spriteName = "Player";

		if(this.isReversed){
			this.sprite.scale.x = -1;
		}
	}
}
