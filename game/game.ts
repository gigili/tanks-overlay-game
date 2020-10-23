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
	.add("../assets/sprites/bullet.png")
	.load(setup);

type GameState = {
	p1: Player | null,
	p2: Player | null,
	bullet: Bullet | null,
	isGameOver: boolean,
	isBulletMoving: boolean,
	currentMove: string,
	currentEnemy: Player | null,
	moveIncrement: number,
	winner: string | null,
	bulletRange: number
	labels: {
		p1Health: PIXI.Text | null,
		p2Health: PIXI.Text | null,
		winner: PIXI.Text | null
	}
}

const gameState: GameState = {
	p1: null,
	p2: null,
	bullet: null,
	isGameOver: false,
	isBulletMoving: false,
	currentMove: "p1",
	currentEnemy: null,
	moveIncrement: 1,
	winner: null,
	bulletRange: 0,
	labels: {
		p1Health: null,
		p2Health: null,
		winner: null,
	}
};

//@ts-ignore
window.gameState = gameState;

const HPTextProperties = {
	align: "center",
	fontSize: "15px",
	fontFamily: "Arial",
	fill: "red",
	fontWeight: "bold"
};

const WinnerTextProperties = {
	...HPTextProperties,
	fill: "green",
	fontSize: "30px"
};

function setup() {
	gameState.p1 = new Player(0, -10);
	gameState.p2 = new Player(window.visualViewport.width, -10, true);

	gameState.bulletRange = pickBulletDistance(gameState.p1, gameState.p2);

	gameState.labels.p1Health = new PIXI.Text(`HP: ${gameState.p1.health}`, HPTextProperties);
	gameState.labels.p1Health.position.set(50, 20);

	gameState.labels.p2Health = new PIXI.Text(`HP: ${gameState.p2.health}`, HPTextProperties);
	gameState.labels.p2Health.position.set(window.visualViewport.width - 105, 20);

	app.stage.addChild(gameState.labels.p1Health);
	app.stage.addChild(gameState.labels.p2Health);

	gameState.labels.winner = new PIXI.Text("", WinnerTextProperties);
	gameState.labels.winner.position.set(window.visualViewport.width / 2 - gameState.labels.winner.getLocalBounds(this).width, 100 - gameState.labels.winner.getLocalBounds(this).height - 30);
	app.stage.addChild(gameState.labels.winner);

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

	displayInformation();
}

function movePlayer(deltaTime: number) {
	if (doesOverlap(gameState.bullet)) {
		flipGameState();
		cleanUp();
		spawnBullet(gameState.currentMove);
		return;
	}

	if (gameState.isBulletMoving && moveBullet()) {
		gameState.bullet.sprite.position.x += Math.floor(gameState.moveIncrement * (deltaTime * gameState.bullet.speed));
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
		return gameState.bullet.sprite.position.x >= gameState.bulletRange;
	}
}

function flipGameState() {
	if (gameState.currentMove === "p1") {
		if (doesOverlap(gameState.bullet)) {
			gameState.p2.health -= gameState.bullet.damage;
		}
		gameState.currentMove = "p2";
		gameState.currentEnemy = gameState.p1;
	} else {
		if (doesOverlap(gameState.bullet)) {
			gameState.p1.health -= gameState.bullet.damage;
		}
		gameState.currentMove = "p1";
		gameState.currentEnemy = gameState.p2;
	}

	gameState.moveIncrement *= -1;
}

function spawnBullet(positionKey: string) {
	const isReversed = positionKey === "p2";
	gameState.bullet = new Bullet(positionKey, isReversed);
	gameState.isBulletMoving = true;
	gameState.bulletRange = pickBulletDistance(gameState.currentMove === "p1" ? gameState.p1 : gameState.p2, gameState.currentEnemy);
	app.stage.addChild(gameState.bullet.sprite);
}

function cleanUp() {
	app.stage.children.forEach((child: PIXI.Sprite, index) => {
		if (child["spriteName"] && child["spriteName"] === "Bullet") {
			app.stage.removeChildAt(index);
		}
	});
}

function displayInformation() {
	gameState.labels.p1Health.text = `HP ${gameState.p1.health}`;
	gameState.labels.p2Health.text = `HP ${gameState.p2.health}`;

	if(gameState.isGameOver){
		gameState.labels.winner.text = `WINNER: ${gameState.winner || ''}`;
	}
}
