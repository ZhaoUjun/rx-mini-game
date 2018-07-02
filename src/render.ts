import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	CANVAS_BG_COLOR,
	PIX_COLOR_INACTIVE,
	PIX_COLOR_ACTIVE,
	PIX_WIDTH,
	FONT_COLOR
} from "./constant";
import { diretionPosition, buttonSize } from "./common/diretion$";
import { functionKeysPosition } from "./common/functionalKeys$";
import { ensureInt } from "./utils";
import { Scene, TetrisLike } from "./tetris/type";
import { createPositions,createNextTetrisPositions } from "./tetris/utils";

const PIX_OUTER_PADDING = 2;
const PIX_MID_PADDING = 6;
const PIX_INNER_PADDING = 12;

function renderRect(
	context: CanvasRenderingContext2D,
	width: number,
	color: string,
	x: number,
	y: number
) {
	// context.restore();
	context.fillStyle = color;
	context.fillRect(x, y, width, width);
}

function renderAcr(context, x, y, r, text = "") {
	context.fillStyle = PIX_COLOR_ACTIVE;
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI);
	context.fill();
	context.font = "30px Verdana";
	context.textAlign = "center";
	context.fillStyle = CANVAS_BG_COLOR;
	context.fillText(text, x, y + 9);
	context.restore();
}

function renderDiretionButtons(context: CanvasRenderingContext2D) {
	Object.keys(diretionPosition).forEach(key => {
		const [x, y] = diretionPosition[key];
		const texts = {
			up: "▲",
			right: "▷",
			down: "▼",
			left: "◁"
		};
		renderAcr(context, x, y, buttonSize, texts[key]);
	});
	Object.keys(functionKeysPosition).forEach(key => {
		const [x, y] = functionKeysPosition[key];
		const texts = {
			a: "A",
			b: "B"
		};
		renderAcr(context, x, y, buttonSize, texts[key]);
	});
}

export function renderCanvas(
	canvas: HTMLCanvasElement,
	width = CANVAS_WIDTH,
	height = CANVAS_HEIGHT
) {
	canvas.width = width;
	canvas.height = height;
	const context = canvas.getContext("2d");
	context.fillStyle = CANVAS_BG_COLOR;
	context.fillRect(0, 0, width, height);
	context.restore();
	return { canvas, context };
}

export function renderSinglePix(
	context: CanvasRenderingContext2D,
	isActive = false,
	iniPositionX = 0,
	iniPositionY = 0,
	width = PIX_WIDTH
) {
	const outerWidth = width - PIX_OUTER_PADDING;
	const midWidth = width - PIX_MID_PADDING;
	const innerWidth = width - PIX_INNER_PADDING;
	const color = isActive ? PIX_COLOR_ACTIVE : PIX_COLOR_INACTIVE;
	const outerPosX = iniPositionX + PIX_OUTER_PADDING / 2;
	const outerPosY = iniPositionY + PIX_OUTER_PADDING / 2;
	const midPosX = iniPositionX + PIX_MID_PADDING / 2;
	const midPosY = iniPositionY + PIX_MID_PADDING / 2;
	const innerPosX = iniPositionX + PIX_INNER_PADDING / 2;
	const innerPosY = iniPositionY + PIX_INNER_PADDING / 2;
	renderRect(context, width, CANVAS_BG_COLOR, iniPositionX, iniPositionY);
	renderRect(context, outerWidth, color, outerPosX, outerPosY);
	renderRect(context, midWidth, CANVAS_BG_COLOR, midPosX, midPosY);
	renderRect(context, innerWidth, color, innerPosX, innerPosY);
}

export function renderPlayground(context: CanvasRenderingContext2D, activePix: number[]) {
	const iniPositionX = (CANVAS_WIDTH - CANVAS_HEIGHT / 2) / 2;
	const iniData = Array(200).fill("0");
	iniData.forEach((status, index) => {
		const x = ensureInt(iniPositionX + (index % 10) * PIX_WIDTH);
		const y = ensureInt(index / 10) * PIX_WIDTH;
		renderSinglePix(context, activePix.includes(index), x, y);
	});
	renderDiretionButtons(context);
}

export function renderScene(context: CanvasRenderingContext2D, scene: Scene) {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	context.fillStyle = CANVAS_BG_COLOR;
	context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	const playground = scene.tetris ? [...scene.tetris, ...scene.heap] : scene.heap;
	renderDiretionButtons(context);
	renderPlayground(context, playground);
	renderSocre(context, scene.score);
	renderNextTetris(context, scene.nextTetris);
}

export function renderNextTetris(context: CanvasRenderingContext2D, tetris: TetrisLike) {
	const postionX = (CANVAS_WIDTH - CANVAS_HEIGHT / 2) * 0.5 + CANVAS_HEIGHT / 2;
	context.textAlign = "left";
	context.fillStyle = PIX_COLOR_ACTIVE;
	context.fillText(`next`, postionX, 40);
	context.restore();
	const iniData = Array(16).fill("0");
	const positions=createNextTetrisPositions(tetris);
	iniData.forEach((position,index)=>{
		const x = ensureInt(postionX + (index % 4) * PIX_WIDTH);
		const y = ensureInt(index / 4) * PIX_WIDTH+60;
		renderSinglePix(context, positions.includes(index), x, y);
	})
}

export function renderSocre(context: CanvasRenderingContext2D, score: number) {
	const postionX = (CANVAS_WIDTH - CANVAS_HEIGHT / 2) * 0.25;
	context.textAlign = "left";
	context.fillStyle = PIX_COLOR_ACTIVE;
	context.fillText(`score:${score}`, postionX, 40);
}
