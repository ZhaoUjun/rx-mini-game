declare const wx:any;
declare const GameGlobal:any;
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {game$} from './game$'
import {renderScene} from '../render'
import { gameOver$ } from './gameOver$'
import {nextTetris$} from './tetris$'

// GameGlobal.global=GameGlobal;

export function startTeris(context:CanvasRenderingContext2D){
    // nextTetris$.subscribe(next=>{
    //     console.log(next)
    // })
    game$.subscribe({
		next:scene=>{
			renderScene(context,scene.scene)
		},
		complete:()=>{
			renderGameOver(context)
		}
    });
   
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

