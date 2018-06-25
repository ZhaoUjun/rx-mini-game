import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	CANVAS_BG_COLOR,
	PIX_COLOR_INACTIVE,
	PIX_COLOR_ACTIVE,
	PIX_WIDTH,
	FONT_COLOR
} from "./canstant";
import {Tetris} from './Tetris'
import {diretionPosition,buttonSize} from './diretion$'
import {functionKeysPosition} from './functionalKeys$'
import { ensureInt } from "./utils";



function renderRect(
	context: CanvasRenderingContext2D,
	width: number,
	color: string,
	x: number,
	y: number
) {
	context.save();
	context.fillStyle = color;
	context.fillRect(x, y, width, width);
}

function renderAcr(context,x,y,r,text=''){
	context.save();
	context.fillStyle=PIX_COLOR_ACTIVE;
	context.beginPath();
	context.arc(x,y,r,0,2*Math.PI);
	context.fill();
	context.restore();
	context.save();
	context.font='30px Verdana';
	context.textAlign="center";
	context.fillStyle=CANVAS_BG_COLOR;
	context.fillText(text,x,y+9);
	context.restore();
}

function renderDiretionButtons(context:CanvasRenderingContext2D){
	Object.keys(diretionPosition).forEach(key=>{
		const [x,y]=diretionPosition[key];
		const texts={
			top:"▲",
			right:"▷",
			bottom:"▼",
			left:"◁"
		}
		renderAcr(context,x,y,buttonSize,texts[key])
	});
	Object.keys(functionKeysPosition).forEach(key => {
		const [x,y]=functionKeysPosition[key];
		const texts={
			a:"A",
			b:"B",
		}
		renderAcr(context,x,y,buttonSize,texts[key])
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
	context.save();
	context.fillStyle = CANVAS_BG_COLOR;
	context.fillRect(0, 0, width, height);
	context.restore();
	return { canvas, context };
}

export function renderSinglePix(
	context: CanvasRenderingContext2D,
	isActive = false,
	iniPositionX = 0,
	iniPositionY=0,
	width=PIX_WIDTH
) {
	const outerPadWidth = 2;
	const midPadWidth = 6;
	const innerPadWidth = 12;
	const outerWidth = width - outerPadWidth;
	const midWidth = width - midPadWidth;
	const innerWidth = width - innerPadWidth;
	const color = isActive ? PIX_COLOR_ACTIVE : PIX_COLOR_INACTIVE;
	const outerPosX = iniPositionX + outerPadWidth / 2;
	const outerPosY = iniPositionY + outerPadWidth / 2;
	const midPosX = iniPositionX + midPadWidth / 2;
	const midPosY = iniPositionY + midPadWidth / 2;
	const innerPosX = iniPositionX + innerPadWidth / 2;
	const innerPosY = iniPositionY + innerPadWidth / 2;
	renderRect(context, width, CANVAS_BG_COLOR, iniPositionX, iniPositionY);
	renderRect(context, outerWidth, color, outerPosX, outerPosY);
	renderRect(context, midWidth, CANVAS_BG_COLOR, midPosX, midPosY);
	renderRect(context, innerWidth, color, innerPosX, innerPosY);
}

export function renderPlayground(context:CanvasRenderingContext2D) {
	const iniPositionX=(CANVAS_WIDTH-CANVAS_HEIGHT/2)/2;
	const iniData=Array(200).fill('0');
	iniData.forEach((status,index)=>{
		const x=ensureInt(iniPositionX+(index%10)*PIX_WIDTH);
		const y=ensureInt(index/10)*PIX_WIDTH;
		renderSinglePix(context,status==='1',x,y)
	})
	renderDiretionButtons(context);
}

export function renderTetris(context:CanvasRenderingContext2D,type,postion,shape){
	const tetris=new Tetris(type,postion,shape);
	tetris.render(context)
}
