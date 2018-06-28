declare const wx:any;
declare const GameGlobal:any;
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { scene$ } from './scene$'
import {renderScene} from './render'

// GameGlobal.global=GameGlobal;
export function initGame() {
	const canvas = wx.createCanvas();
	const context=canvas.getContext('2d')
	scene$.subscribe({
		next:scene=>{
			renderScene(context,scene)
		},
		complete:()=>{
			console.log('over')
		}
	})
}

