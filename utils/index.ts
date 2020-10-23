import {Bullet, POSITION} from "../game/Bullet";
import {Player} from "../game/Player";

export function doesOverlap(b: Bullet): boolean {
	return (b.sprite.position.x > POSITION["p2"].x  || b.sprite.position.x < POSITION["p1"].x);
}

export function pickBulletDistance(currentPlayer: Player, enemy: Player): number{
	const ranges = {
		"p1":{
			min: POSITION["p2"].x - 400,
			max: POSITION["p2"].x + 50
		},
		"p2": {
			min: 0,
			max: POSITION["p1"].x + 400
		}
	}

	const p = currentPlayer.sprite.position.x === 0 ? "p1": "p2";
	const min = ranges[p].min;
	const max = ranges[p].max;

	return Math.floor( min + Math.random() * (max - min)) + 1;
}
