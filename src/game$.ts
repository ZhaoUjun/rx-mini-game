import { Observable } from "rxjs/Observable";
import { animationFrame } from "rxjs/scheduler/animationFrame";
import { scene$, Scene } from "./scene$";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/takeWhile";

const FPS = 60;

export const game$ = Observable.interval(1000 / FPS, animationFrame)
	.withLatestFrom(scene$, (_, scene) => scene)
	.takeWhile(scene => {
		if(scene.isOver){
			console.log(scene)
		}
		return !scene.isOver
	})
	// .do(i=>console.log(i))

	// export const game$ = 
	// .takeWhile(scene => {
	// 	// console.log(scene)
	// 	// if(gameOver(scene)){
	// 	// 	console.log(scene)
	// 	// }
	// 	return !gameOver(scene)
	// });

function gameOver(scene: Scene) {
	const { heap, tetris } = scene;
	return [4,5,6].some(item => heap.includes(item));
}
