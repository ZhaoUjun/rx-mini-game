import { Observable } from "rxjs/Observable";
import { animationFrame } from "rxjs/scheduler/animationFrame";
import { scene$ } from "./scene$";
import {render$} from '../common/render$'
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/takeWhile";

const FPS = 60;

export const game$ = render$
	.withLatestFrom(scene$, (_, scene) => scene)
	.takeWhile(scene => {
		if(scene.isOver){
			console.log(scene)
		}
		return !scene.isOver
	})
