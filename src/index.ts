declare const wx:any;
declare const GameGlobal:any;
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {renderCanvas,renderPlayground,renderScene} from './render'
import {fallingTetris$,position$,shape$} from './fallingTetris$'
import {collision$} from './collision$'
import { heap$ } from "./heap$";

// GameGlobal.global=GameGlobal;
export function initGame() {
	const canvas = wx.createCanvas();
	const context=canvas.getContext('2d')
	// position$.subscribe(next=>{
	// 	// console.log(next)
	// })
	// shape$.subscribe(next=>{
	// 	console.log(next)
	// })
	// setTimeout(()=>{
	// 	heap$.next([12])
	// },5000)
	// renderCanvas(canvas);
	// renderPlayground(context);
	fallingTetris$.subscribe(tetris=>{
		console.log(tetris)
		renderScene(context,tetris)
	})
	collision$.subscribe(nextHeap=>{
		heap$.next(nextHeap)
	})
}

