import {CANVAS_HEIGHT,CANVAS_WIDTH} from './canstant';

export function renderCanvas(canvas,width=CANVAS_HEIGHT,height=CANVAS_HEIGHT){
    canvas.width=width;
	canvas.height=height;
	const context = canvas.getContext('2d')
	context.fillStyle = 'red'
	context.fillRect(0, 0, width, height)
	return {canvas,context}
}