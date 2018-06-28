import { fallingTetris$ } from "./fallingTetris$";
import { heap$ } from "./heap$";
import { score$ } from "./score$";

import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/do";

export interface Scene {
	tetris: number[];
	heap: number[];
	score: number;
}

export const scene$ = fallingTetris$
	.withLatestFrom(heap$, score$, (tetris, heap, score) => ({
		tetris,
		heap,
		score
	}))


