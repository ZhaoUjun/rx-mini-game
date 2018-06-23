declare const wx:any;

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {renderCanvas,renderPlayground} from './render'

export function initGame() {
	const canvas = wx.createCanvas();
	renderCanvas(canvas);
	renderPlayground(canvas.getContext('2d'))
	Observable.of(1, 2, 3)
		.map(x => x + "!!!")
		.subscribe(next => {
			console.log(next);
		});

	return "begin";
}

