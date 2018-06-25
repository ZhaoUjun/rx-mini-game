declare const wx:any;
declare const GameGlobal:any;
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {renderCanvas,renderPlayground,renderTetris} from './render'
import {fallingTetris$} from './fallingTetris$'

// GameGlobal.global=GameGlobal;
export function initGame() {
	const canvas = wx.createCanvas();
	const context=canvas.getContext('2d')
	renderCanvas(canvas);
	renderPlayground(context);
	fallingTetris$.subscribe(tetris=>{
		const {previous,current}=tetris;
		if(previous){
			previous.render(context,false);
		}
		current.render(context,true);
	})
}

