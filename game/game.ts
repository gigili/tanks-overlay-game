import * as PIXI from 'pixi.js'
import {Player} from "./Player";
import {Bullet} from "./Bullet";
import {doesOverlap, pickBulletDistance} from "../utils";
import {client} from "../utils/tmi";
import {GameState, Sprite, User} from "../utils/types";

const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	resolution: 1,
	transparent: true,
	//backgroundColor: 0x616161
});

PIXI.Loader.shared
	.add("../assets/sprites/tank.png")
	//.add("../assets/sprites/bullet.png")
	.add("../assets/sprites/bullets/melkey.png")
	.add("../assets/sprites/bullets/pride.png")
	.add("../assets/sprites/bullets/regular.png")
	.load(setup);

export const gameState: GameState = {
	p1: null,
	p2: null,
	bullet: null,
	isGameOver: null,
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
		scoreboard: null
	},
	players: [],
	leaderboard: [],
	gameStarting: false
};

//@ts-ignore
window.gameState = gameState;

const smallFontSize = "40px";
const largeFontSize = "80px";

const HPTextProperties = {
	align: "center",
	fontSize: smallFontSize,
	fontFamily: "Arial",
	fill: "red",
	fontWeight: "bold"
};

const WinnerTextProperties = {
	...HPTextProperties,
	fill: "green",
	fontSize: largeFontSize
};

const ScoreBoardTextProperties = {
	...HPTextProperties,
	align: "left",
	fill: "black",
	fontSize: smallFontSize
};

function setup() {

	/*if (process.env.DEVELOPMENT === "1") {
		gameState.players = [
			{username: 'p1', displayName: 'p1'},
			{username: 'p2', displayName: 'p2'},
			{username: 'gacbl', displayName: 'GacBL'},
			{username: 'thatn00b__', displayName: 'ThatN00b__'},
		];
	}*/

	gameState.labels.p1Health = new PIXI.Text("", HPTextProperties);
	gameState.labels.p1Health.position.set(60, window.innerHeight - 85);

	gameState.labels.p2Health = new PIXI.Text("", HPTextProperties);
	gameState.labels.p2Health.position.set(window.innerWidth - 115, window.innerHeight - 85);

	gameState.labels.scoreboard = new PIXI.Text("", ScoreBoardTextProperties);
	gameState.labels.scoreboard.position.set(60, window.innerHeight - 150);

	app.stage.addChild(gameState.labels.p1Health);
	app.stage.addChild(gameState.labels.p2Health);
	app.stage.addChild(gameState.labels.scoreboard);

	gameState.labels.winner = new PIXI.Text("", WinnerTextProperties);
	app.stage.addChild(gameState.labels.winner);

	let gameStarted = false;
	const startNewGameInterval = setInterval(() => {
		gameStarted = startNewGame();

		if (gameStarted) {
			clearInterval(startNewGameInterval);
		}
	}, 2000);

	app.ticker.add(delta => gameLoop(delta));
}

document.body.appendChild(app.view);

function gameLoop(deltaTime: number) {
	if (gameState.p1 === null || gameState.p2 === null) return;

	if (!gameState.isGameOver) {
		movePlayer(deltaTime);
	} else {
		cleanUp();
	}

	displayInformation();
}

function movePlayer(deltaTime: number) {
	if (doesOverlap(gameState.bullet, gameState.currentMove)) {
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
		gameState.currentMove = "p2";
		gameState.currentEnemy = gameState.p1;
	} else {
		gameState.currentMove = "p1";
		gameState.currentEnemy = gameState.p2;
	}

	if (gameState.bullet !== null) {
		gameState.bullet.sprite.isMoving = false;
	}

	gameState.moveIncrement *= -1;
}

function spawnBullet(positionKey: string) {
	if (gameState.isGameOver) return;
	const isReversed = positionKey === "p2";

	if (gameState.bullet !== null) {
		gameState.bullet.sprite.isMoving = false;
	}

	gameState.bullet = new Bullet(positionKey, isReversed);
	gameState.isBulletMoving = true;
	gameState.bulletRange = pickBulletDistance(gameState.currentMove === "p1" ? gameState.p1 : gameState.p2, gameState.currentEnemy);

	app.stage.addChild(gameState.bullet.sprite);
}

function cleanUp() {
	app.stage.children.forEach((child: Sprite, index) => {
		if (child.spriteName === "Bullet" && (child.isMoving === false || gameState.isGameOver)) {
			if (!gameState.isGameOver) {
				setTimeout(() => {
					app.stage.removeChildAt(index);
				}, 500);
			} else {
				app.stage.removeChildAt(index);
			}
		}
	});

	if (gameState.isGameOver === true && !gameState.gameStarting) {
		gameState.gameStarting = true;
		setTimeout(() => {
			startNewGame()
		}, 5500);
	}
}

function displayInformation() {
	gameState.labels.p1Health.text = `${gameState.p1.displayName}\n${gameState.p1.health}`;
	gameState.labels.p2Health.text = `${gameState.p2.displayName}\n${gameState.p2.health}`;

	const startPointP1 = gameState.p1.posX;
	const startPointP2 = gameState.p2.posX - gameState.labels.p2Health.width;

	gameState.labels.p1Health.position.set(startPointP1, window.innerHeight - gameState.labels.p1Health.height - 50);
	gameState.labels.p2Health.position.set(startPointP2 - 10, window.innerHeight - gameState.labels.p1Health.height - 50);

	const winnerText = (gameState.isGameOver === null || gameState.winner === null) ? "" : `WINNER: ${gameState.winner || ''}`;
	gameState.labels.winner.text = winnerText;
	gameState.labels.winner.anchor.set(0.5, 0.5);
	gameState.labels.winner.position.set(
		window.innerWidth / 2,
		window.innerHeight - gameState.labels.winner.height - 5
	);

	if (winnerText.length > 0) {
		setTimeout(() => {
			gameState.winner = null;
		}, 5000);
	}

	displayScoreBoard();
}

function startNewGame() {
	if (gameState.players.length < 2) return false;
	if (gameState.isGameOver === false) return false;

	const p1Name = getRandomPlayer();
	const p2Name = pickPlayer(p1Name);

	gameState.p1 = new Player(0, window.innerHeight - 100, false, p1Name);
	gameState.p2 = new Player(window.innerWidth, window.innerHeight - 100, true, p2Name);

	app.stage.addChild(gameState.p1.sprite);
	app.stage.addChild(gameState.p2.sprite);

	gameState.currentMove = "p1";
	gameState.moveIncrement = 1;
	gameState.winner = null;
	gameState.currentEnemy = gameState.p2;

	gameState.isGameOver = null;
	gameState.bulletRange = pickBulletDistance(gameState.p1, gameState.p2);
	spawnBullet("p1");
	displayInformation();

	gameState.gameStarting = false;

	return true;
}

function pickPlayer(player: string = ""): string {
	let name = "";
	while ((name === player || name == "")) {
		name = getRandomPlayer();
	}

	return name;
}

function getRandomPlayer() {
	const index = Math.floor(Math.random() * gameState.players.length);
	return gameState.players[index].displayName;
}

client.connect().catch(err => console.error(err));

client.on("message", (channel: string, userState: User, message: string, self: User) => {
	if (self) return;

	addNewPlayer(userState);

	if (userState.username === "gacbl") {
		if (message === "!newGame") {
			//client.say(channel, "We are playing a game of Tanks");
			startNewGame();
		}

		if (message === "!testL") {
			const output = [];

			gameState.leaderboard.sort((a, b) => {
				return b.score - a.score;
			});

			gameState.leaderboard.forEach((player, index) => {
				if (index < 3) {
					output.push(`${index + 1}) ${player.displayName}: ${player.score}`);
				}
			});

			if (gameState.leaderboard.length > 0) {
				client.say(channel, output.join(" | "));
			}
			//console.log(output.join(" | "));
		}
	}
});

function addNewPlayer(user: User) {
	for (let player of gameState.players) {
		if (player.username === user.username) {
			return false;
		}
	}

	const username = user.username;
	gameState.players.push({username, displayName: user["display-name"]});
}

function displayScoreBoard() {
	let scoreBoardInfo = [];

	const topPlayers = gameState.leaderboard.slice(0, 3);
	topPlayers.forEach((player, index) => {
		scoreBoardInfo.push(`${index + 1}. ${player.displayName}: ${player.score}`);
	});

	gameState.labels.scoreboard.text = scoreBoardInfo.join("\n");
	gameState.labels.scoreboard.position.set(60, window.innerHeight - gameState.labels.scoreboard.height - 250);
}
