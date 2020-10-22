import * as PIXI from "pixi.js";

export const POSITION = {
	p1: {
		x: 120,
		y: 47
	},
	p2: {
		x: window.visualViewport.width - 135,
		y: 47
	}
};

export class Bullet {
	sprite = new PIXI.Graphics();

	constructor(public positionKey) {
		this.setup();
	}

	setup(){
		//this.sprite = new PIXI.Rectangle(this.posX, this.posY, 20, 20);
		this.sprite.beginFill(0x000000);
		this.sprite.drawRect(POSITION[this.positionKey].x, POSITION[this.positionKey].y, 5, 5);
		this.sprite.position.set(0, 0);
		this.sprite.endFill();
	}
}

