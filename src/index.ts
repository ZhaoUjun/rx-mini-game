declare const wx:any;
declare const GameGlobal:any;
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {game$} from './game$'
import {renderScene} from './render'

// GameGlobal.global=GameGlobal;
export function initGame() {
	const canvas = wx.createCanvas();
	const context=canvas.getContext('2d')
	game$.subscribe({
		next:scene=>{
			renderScene(context,scene)
		},
		complete:()=>{
			console.log('over')
		}
	})
}

