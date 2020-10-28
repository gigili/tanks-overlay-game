import * as PIXI from "pixi.js";

export const POSITION = {
	p1: {
		x: 125,
		y: window.innerHeight - 47
	},
	p2: {
		x: window.innerWidth - 130,
		y: window.innerHeight - 47
	}
};

export class Bullet {
	sprite = null;
	damage = 25;
	speed = 3;

	constructor(public positionKey, private readonly isReversed = false) {
		this.setup();
	}

	setup() {
		const spriteIndex = Math.floor(Math.random() * 3) + 1;
		let sprite = "regular";

		switch (spriteIndex) {
			case 1:
				sprite = "regular";
				break;

			case 2:
				sprite = "melkey";
				break;

			case 3:
				sprite = "pride";
				break;
		}

		this.sprite = new PIXI.Sprite(PIXI.Loader.shared.resources[`../assets/sprites/bullets/${sprite}.png`].texture);
		this.sprite.position.set(POSITION[this.positionKey].x, POSITION[this.positionKey].y);
		this.sprite.spriteName = "Bullet";
		this.sprite.isMoving = true;

		let multiplayer = 1;
		if (this.isReversed) {
			multiplayer = -1;
		}

		this.sprite.scale.set(2 * multiplayer, 2);
	}
}

