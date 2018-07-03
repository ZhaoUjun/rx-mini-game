import { TETRIS_TYPE } from "../constant";
import { TetrisLike } from "./type";
import { heap$ } from "./heap$";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/skip";

let tetrisKey = 0;

const INIT_TETRIS_1 = getRandomTetris();
const INIT_TETRIS_2 = getRandomTetris();

export function getRandomInt(max: number) {
	return ~~(Math.random() * 100) % max;
}

export function getRandomTetris(): TetrisLike {
	const type = getRandomInt(7);
	const shapes = TETRIS_TYPE[type];
	const shape = getRandomInt(shapes.length);
	return { type, shape, position: -34, key: ++tetrisKey };
}

export const tetris$ = heap$
	.skip(1)
	.map(getRandomTetris)
	.startWith(INIT_TETRIS_2)
	.scan((acc, next) => [acc[1], next], [null, INIT_TETRIS_1])
	.share();

export const nextTetris$ = tetris$
	.map(i => i[1])
	.startWith(INIT_TETRIS_2)
	.map(i => ({ ...i, position: 0 }));

export const currentTetris$ = tetris$.map(i => i[0]);
