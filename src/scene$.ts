import { fallingTetris$ } from "./fallingTetris$";
import { heap$ } from "./heap$";
import { score$ } from "./score$";

import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

export interface Scene {
	tetris?: number[];
	heap: number[];
	score: number;
}

export const scene$ = fallingTetris$
	.withLatestFrom(heap$, score$, (tetris, heap, score) => ({
		tetris,
		heap,
		score
	}))
	.map(scene=>({isOver:gameOver(scene),scene}))
	.share();

function gameOver(scene: Scene) {
	const { heap,tetris } = scene;
	return [4,5,6].some(item => heap.includes(item));
}
