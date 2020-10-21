import * as PIXI from 'pixi.js'
import {Player} from "./player";

const type = PIXI.utils.isWebGLSupported() ? "WebGL" : "canvas";
PIXI.utils.sayHello(type);

const app = new PIXI.Application({
	width: window.screen.width,
	height: 100,
	resolution: 1,
	backgroundColor: 0x616161
});

PIXI.Loader.shared
	.add("../assets/sprites/tank.png")
	.load(setup);

let lastMove = null;
let p1 : Player;
let p2 : Player;
function setup(){
	p1 = new Player(0, -10);
	p2 = new Player(window.screen.width, -10, true);

	app.stage.addChild(p1.sprite);
	app.stage.addChild(p2.sprite);

	app.ticker.add(delta => gameLoop(delta));
}

document.body.appendChild(app.view);

function gameLoop(deltaTime) {
	if(lastMove === null || lastMove === "p2"){
		lastMove = "p1";
		p1.sprite.position.x += 1;
	}else{
		lastMove = "p2";
		p2.sprite.position.x -= 1;
	}
}
