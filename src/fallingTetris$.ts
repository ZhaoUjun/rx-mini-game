import { Observable } from "rxjs/Observable";
import { nextTetris$, getRandomTetris } from "./nextTetris$";
import * as diretion from "./diretion$";
import { keyA$ } from "./functionalKeys$";
import { tick$ } from "./tick$";
import { always, hasSameVal } from "./utils";
import { Tetris, TETRIS_TYPE } from "./Tetris";
import { heap$ } from "./heap$";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/distinctUntilChanged";


const left$ = diretion.left$.map(always(-1));
const right$ = diretion.right$.map(always(1));
const down$ = tick$.merge(diretion.down$).map(always(10));

export const position$ = down$.merge(left$, right$);

export const shape$ = keyA$.map(always(0));

const isSpin = i => i === 0;
const isNext = i => i.position;
const isOverBorder = (previous:Tetris, next: Tetris) => {
	const res = [...getRows(previous), ...getRows(next)].reduce(
		(acc, pos) => (pos === 0 || pos === 9 ? acc.add(pos) : acc),
		new Set([])
	);
	return [...res].length > 1;
};
const isOverHeap=(tetris:Tetris,heap:number[])=>{
	return hasSameVal(heap,createPositions(tetris))
}


const shapesLength = type => TETRIS_TYPE[type].length;

export const fallingTetris$ = Observable.merge(position$, nextTetris$, shape$)
	.withLatestFrom(heap$, (action, heap) => ({ action, heap }))
	.scan(ensureIsValidAction, getRandomTetris())
	.map(createPositions)
	.filter(next => !next.some(i => i > 199))
	.distinctUntilChanged()
	.share();

function ensureIsValidAction(acc, next) {
	const action=next.action;
	const heap=next.heap;
	if (isNext(action)) {
		return { ...action, position: 4 };
	} else if (isSpin(action)) {
		const nextTetris = { ...acc, shape: (acc.shape + 1) % shapesLength(acc.type) };
		return isOverBorder(acc, nextTetris)||isOverHeap(nextTetris,heap) ? acc : nextTetris;
	} else {
		const nextTetris = { ...acc, position: acc.position + action };
		return isOverBorder(acc, nextTetris)||isOverHeap(nextTetris,heap) ? acc : nextTetris;
	}
}

function getRows(tetris: Tetris) {
	return createPositions(tetris).map(i=>i%10);
}

function createPositions(tetris:Tetris):number[]{
	const { position, type, shape }=tetris
	return TETRIS_TYPE[type][shape].map(i => i + position)
}
