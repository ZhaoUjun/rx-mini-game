import { TETRIS_TYPE } from "./constant";
import { TetrisLike } from "./type";
import { heap$ } from "./heap$";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/bufferCount";

let tetrisKey = 0;

export function getRandomType(): number {
	return (~~(Math.random() * 100) % 6) + 1;
}

export function getRandomInt(max: number) {
	return ~~(Math.random() * 100) % max;
}

export function getRandomTetris(): TetrisLike {
	const type = 1 || getRandomInt(7);
	const shapes = TETRIS_TYPE[type];
	const shape = getRandomInt(shapes.length);
	return { type, shape, position: -34, key: ++tetrisKey };
}

// export const nextTetris$=new BehaviorSubject<TETRISLIKE>(getRandomTetris());
export const tetris$ = heap$
	.map(getRandomTetris)
	.startWith(getRandomTetris())
    .bufferCount(2)
	.share();

export const nextTetris$ = tetris$.map(i => i[1]);
export const currentTetris$ = tetris$.map(i => i[0]);
