import {Bullet, POSITION} from "../game/Bullet";
import {Player} from "../game/Player";
import { gameState } from "../game/game";

export function doesOverlap(b: Bullet, currentPlayer = "p1"): boolean {
	const bulletPosition = b.sprite.getBounds().width + b.sprite.position.x;
	const p1Position = gameState.p1.sprite.position.x + gameState.p1.sprite.getBounds().width + 30;
	const p2Position = gameState.p2.sprite.position.x - gameState.p2.sprite.getBounds().width + 30;

	let isHit = false;

	if(currentPlayer == "p1"){
		isHit = bulletPosition > p2Position;
	}else if(currentPlayer == "p2"){
		isHit = bulletPosition < p1Position;
	}

	return isHit;
}

export function pickBulletDistance(currentPlayer: Player, enemy: Player): number{
	const ranges = {
		"p1":{
			min: POSITION["p2"].x - 300,
			max: POSITION["p2"].x + 50
		},
		"p2": {
			min: 0,
			max: POSITION["p1"].x + 300
		}
	}

	const p = currentPlayer.sprite.position.x === 0 ? "p1": "p2";
	const min = ranges[p].min;
	const max = ranges[p].max;

	return Math.floor( min + Math.random() * (max - min)) + 1;
}
