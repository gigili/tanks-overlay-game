import * as PIXI from "pixi.js";
import { Bullet } from "../game/Bullet"
import { Player } from "../game/Player"

export type Sprite extends PIXI.Sprite = { 
  spriteName: string,
  isMoving: boolean
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
        winner: PIXI.Text | null
    },
    players: { username: string, displayName: string }[],
    leaderboard: { [key: string]: number }
}
