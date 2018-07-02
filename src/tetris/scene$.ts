import { fallingTetris$ } from "./fallingTetris$";
import { nextTetris$ } from "./tetris$";
import { heap$ } from "./heap$";
import { score$ } from "./score$";
import { heightScore$ } from "./heightScore$";
import { Scene } from "./type";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

export const scene$ = fallingTetris$
	.withLatestFrom(heap$, score$, nextTetris$,heightScore$, (tetris, heap, score, nextTetris,heightScore) => ({
		tetris,
		heap,
		score,
		nextTetris,
		heightScore
	}))
	.map(scene => ({ isOver: gameOver(scene), scene }))
	.share();

function gameOver(scene: Scene) {
	const { heap, tetris } = scene;
	return [4, 5, 6].some(item => heap.includes(item));
}
