import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";
import { TETRIS_TYPE, TETRISLIKE } from "./Tetris";
import { heap$ } from "./heap$";
import { log } from "./utils";

let tetrisKey = 0;

export function getRandomType(): number {
	return (~~(Math.random() * 100) % 6) + 1;
}

export function getRandomInt(max: number) {
	return ~~(Math.random() * 100) % max;
}

export function getRandomTetris(): TETRISLIKE {
	const type = 1||getRandomInt(7);
	const shapes = TETRIS_TYPE[type];
	const shape = getRandomInt(shapes.length);
	return { type, shape, position: 4, key: ++tetrisKey };
}

// export const nextTetris$=new BehaviorSubject<TETRISLIKE>(getRandomTetris());
export const nextTetris$ = heap$.map(getRandomTetris).share();
