import * as PIXI from 'pixi.js'

export class Player{
	health = 100;
	sprite = null;
	posX = 0;
	posY = 0;
	isReversed = false;
	constructor(posX : number, posY: number, isReversed = false) {
		this.health = 100;
		this.posX = posX;
		this.posY = posY;
		this.isReversed = isReversed;
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
