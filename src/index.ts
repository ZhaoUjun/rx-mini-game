declare const wx:any;

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

export function initGame() {
	const canvas = wx.createCanvas();
	Observable.of(1, 2, 3)
		.map(x => x + "!!!")
		.do(x => {
			console.log(x);
		})
		.subscribe(next => {});

	return "begin";
}
