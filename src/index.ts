declare const wx:any;

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {renderCanvas,renderPlayground,renderTetris} from './render'
import {left$} from './diretion$'
import {fallingTetris$} from './fallingTetris$'

export function initGame() {
	const canvas = wx.createCanvas();
	const context=canvas.getContext('2d')
	renderCanvas(canvas);
	renderPlayground(context);
	renderTetris(context);
	fallingTetris$.subscribe(next=>{
		console.log(next)
	})
	Observable.of(1, 2, 3)
		.map(x => x + "!!!")
		.subscribe(next => {
			console.log(next);
		});

	return "begin";
}

