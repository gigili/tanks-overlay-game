import * as PIXI from 'pixi.js'
import {Player} from "./Player";
import {Bullet} from "./Bullet";
import {doesOverlap, pickBulletDistance} from "../utils";

const app = new PIXI.Application({
	width: window.screen.width,
	height: 100,
	resolution: 1,
	backgroundColor: 0x616161
});

PIXI.Loader.shared
	.add("../assets/sprites/tank.png")
	.load(setup);

const gameState = {
	p1: null,
	p2: null,
	bullet: null,
	isGameOver: false,
	isBulletMoving: false,
	currentMove: "p1",
	currentEnemy: null,
	bulletSpeed: 3,
	moveIncrement: 1,
	winner: null,
	damage: 50,
	bulletRange: 0
};

function setup() {
	gameState.p1 = new Player(0, -10);
	gameState.p2 = new Player(window.visualViewport.width, -10, true);

	gameState.bulletRange = pickBulletDistance(gameState.p1, gameState.p2);

	app.stage.addChild(gameState.p1.sprite);
	app.stage.addChild(gameState.p2.sprite);

	if (!gameState.isBulletMoving) {
		gameState.currentEnemy = gameState.p2;
		spawnBullet("p1");
		gameState.isBulletMoving = true;
	}

	app.ticker.add(delta => gameLoop(delta));
}

document.body.appendChild(app.view);

function gameLoop(deltaTime: number) {
	if (gameState.p1.health <= 0 || gameState.p2.health <= 0) {
		gameState.isGameOver = true;
		gameState.winner = gameState.currentMove;
	}

	if (!gameState.isGameOver) {
		movePlayer(deltaTime);
	} else {
		cleanUp();
	}
}

function movePlayer(deltaTime: number) {
	if(doesOverlap(gameState.bullet)){
		flipGameState();
		cleanUp();
		spawnBullet(gameState.currentMove);
		return;
	}

	if (gameState.isBulletMoving && moveBullet()) {
		gameState.bullet.sprite.position.x += Math.floor(gameState.moveIncrement * (deltaTime * gameState.bulletSpeed) + 1);
	} else {
		flipGameState();
		cleanUp();
		spawnBullet(gameState.currentMove);
	}
}

function moveBullet(): boolean {
	if (gameState.currentMove === "p1") {
		return gameState.bullet.sprite.position.x <= gameState.bulletRange;
	} else {
		console.log(gameState.bullet.sprite.position.x, gameState.bullet.sprite.position.x >= gameState.bulletRange)
		return gameState.bullet.sprite.position.x >= gameState.bulletRange;
	}
}

function flipGameState() {
	if (gameState.currentMove === "p1") {
		if (doesOverlap(gameState.bullet)) {
			gameState.p2.health -= gameState.damage;
		}
		gameState.currentMove = "p2";
		gameState.currentEnemy = gameState.p1;
	} else {
		if (doesOverlap(gameState.bullet)) {
			gameState.p1.health -= gameState.damage;
		}
		gameState.currentMove = "p1";
		gameState.currentEnemy = gameState.p2;
	}

	gameState.moveIncrement *= -1;
	//gameState.bullet.sprite.position.x = gameState.bullet.sprite.position.x + (10 * gameState.moveIncrement);
}

function spawnBullet(positionKey: string) {
	gameState.bullet = new Bullet(positionKey);
	gameState.isBulletMoving = true;
	gameState.bulletRange = pickBulletDistance(gameState.currentMove === "p1" ? gameState.p1 : gameState.p2, gameState.currentEnemy);
	app.stage.addChild(gameState.bullet.sprite);
}

function cleanUp() {
	/*if(app.stage.children.length > 2) {
		app.stage.removeChildAt(2);
	}*/
}
