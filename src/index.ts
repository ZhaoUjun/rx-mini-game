declare const wx:any;
declare const GameGlobal:any;
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {game$} from './game$'
import {renderScene,renderPlayground} from './render'
import { gameOver$ } from './gameOver$'

// GameGlobal.global=GameGlobal;
export function initGame() {
	const canvas = wx.createCanvas();
	const context=canvas.getContext('2d')
	game$.subscribe({
		next:scene=>{
			// console.log(scene)
			renderScene(context,scene.scene)
		},
		complete:()=>{
			console.log('over')
			renderGameOver(context)
		}
	})
}

function renderGameOver(ctx:CanvasRenderingContext2D){
	gameOver$.subscribe({
		next:scene=>{
			renderScene(ctx,scene)
		},
		complete:()=>{
			console.log('over')
		}
	})
}

