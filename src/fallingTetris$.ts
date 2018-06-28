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
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/distinctUntilChanged";

interface PositionsWithHeap {
	positions: number[];
	heap: number[];
}

const left$ = diretion.left$.map(always(-1));
const right$ = diretion.right$.map(always(1));
const down$ = tick$.merge(diretion.down$).map(always(10));

export const position$ = down$.merge(left$, right$);

export const shape$ = keyA$.map(always(0));

const isSpin = i => i === 0;
const isNext = i => i.position;
const isOverBorder = (previous, next: Tetris) => {
	const res = [...getPsotions(previous), ...getPsotions(next)].reduce(
		(acc, next) => (next === 0 || next === 9 ? acc.add(next) : acc),
		new Set([])
	);
	return [...res].length > 1;
};
const shapesLength = type => TETRIS_TYPE[type].length;

export const fallingTetris$ = Observable.merge(position$, nextTetris$, shape$)
	.scan(ensureNotOverBorder, getRandomTetris())
	.map(({ position, type, shape }) => {
		return TETRIS_TYPE[type][shape].map(i => i + position);
	})
	.filter(next => !next.some(i => i > 199))
	.combineLatest(heap$, (positions, heap) => ({ positions, heap }))
	.filter(ensureNotSpinOverHeap)
	.map(i => i.positions)
	.distinctUntilChanged()
	.share();

function ensureNotOverBorder(acc, next) {
	if (isNext(next)) {
		return { ...next, position: 4 };
	} else if (isSpin(next)) {
		const nextTetris = { ...acc, shape: (acc.shape + 1) % shapesLength(acc.type) };
		return isOverBorder(acc, nextTetris) ? acc : nextTetris;
	} else {
		const nextTetris = { ...acc, position: acc.position + next };
		// console.log(acc,nextTetris)
		return isOverBorder(acc, nextTetris) ? acc : nextTetris;
	}
}

function ensureNotSpinOverHeap(data: PositionsWithHeap) {
	return !hasSameVal(data.heap, data.positions);
}

function getPsotions(data: Tetris) {
	const { type, position, shape } = data;
	return TETRIS_TYPE[type][shape].map(i => (i + position) % 10);
}
