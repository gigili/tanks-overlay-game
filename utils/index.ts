import {Bullet, POSITION} from "../game/Bullet";
import {Player} from "../game/Player";

export function doesOverlap(b: Bullet): boolean {
	return (b.sprite.position.x > 1124 || b.sprite.position.x < 0);
}

export function pickBulletDistance(currentPlayer: Player, enemy: Player): number{
	const ranges = {
		"p1":{
			min: 700,
			max: window.visualViewport.width + 50
		},
		"p2": {
			min: -50,
			max: 300
		}
	}

	const p = currentPlayer.sprite.position.x === 0 ? "p1": "p2";
	const min = ranges[p].min;
	const max = ranges[p].max;

	return Math.floor( min + Math.random() * (max - min)) + 1;
}
