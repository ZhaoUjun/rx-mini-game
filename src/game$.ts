import { Observable } from "rxjs/Observable";
import { animationFrame } from "rxjs/scheduler/animationFrame";
import { scene$, Scene } from "./scene$";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/takeWhile";

const FPS = 60;

export const game$ = Observable.interval(1000 / FPS, animationFrame)
	.withLatestFrom(scene$, (_, scene) => scene)
	.takeWhile(scene => !gameOver(scene));

function gameOver(scene: Scene) {
	const { heap, tetris } = scene;
	return heap.some(item => tetris.includes(item));
}
