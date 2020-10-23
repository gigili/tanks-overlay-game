import * as PIXI from "pixi.js";

export const POSITION = {
	p1: {
		x: 80,
		y: 47
	},
	p2: {
		x: window.innerWidth - 120,
		y: 47
	}
};

export class Bullet {
	sprite = null;
	damage = 25;
	speed = 3;
	constructor(public positionKey, private readonly isReversed = false) {
		this.setup();
	}

	setup(){
		this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["../assets/sprites/bullet.png"].texture);
		this.sprite.position.set(POSITION[this.positionKey].x, POSITION[this.positionKey].y);
		this.sprite.spriteName = "Bullet";
		if(this.isReversed){
			this.sprite.scale.x = -1;
		}
	}
}

