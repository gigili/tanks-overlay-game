import * as PIXI from "pixi.js";
import {Bullet} from "../game/Bullet"
import {Player} from "../game/Player"

export interface Sprite extends PIXI.Sprite {
	spriteName: string,
	isMoving: boolean
}

export interface Graphics extends PIXI.Graphics {
	spriteName: string
}

export type User = {
	'badges': { 'broadcaster': string, 'warcraft': string },
	'color': string,
	'display-name': string,
	'emotes': { '25': string[] },
	'mod': true,
	'room-id': string,
	'subscriber': false,
	'turbo': true,
	'user-id': string,
	'user-type': string,
	'emotes-raw': string,
	'badges-raw': string,
	'username': string,
	'message-type': string
}

export type GameState = {
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
		winner: PIXI.Text | null,
		scoreboard: PIXI.Text | null,
		scoreboardBorder: PIXI.Rectangle | null
	},
	players: { username: string, displayName: string }[],
	leaderboard: { displayName: string, score: number }[],
	gameStarting: boolean,
	graphics: PIXI.Graphics | null,
	showScoreBoard: boolean
}
