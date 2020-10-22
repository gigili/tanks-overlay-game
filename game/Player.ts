import * as PIXI from 'pixi.js'

export class Player{
	health = 100;
	sprite = null;
	constructor(public posX : number, public posY: number, private readonly isReversed = false) {
		this.health = 100;
		this.setup();
	}

	setup(){
		this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["../assets/sprites/tank.png"].texture);
		this.sprite.position.set(this.posX, this.posY);

		if(this.isReversed){
			this.sprite.scale.x = -1;
		}
	}
}
