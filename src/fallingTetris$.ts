import { Observable } from "rxjs/Observable";
import { nextTetris$, getRandomType, getRandomTetris } from "./nextTetris$";
import * as diretion from "./diretion$";
import { keyA$ } from "./functionalKeys$";
import { tick$ } from "./tick$";
import { always, log, hasSameVal } from "./utils";
import { Tetris, TETRIS_TYPE } from "./Tetris";
import { heap$ } from "./heap$";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/share";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/debounceTime";

interface PositionsWithHeap {
	positions: number[];
	heap: number[];
}
const INITIAL_POSITION = 3;
const INITIAL_SHPAE = 0;
const INITIAL_TETRIS = getRandomTetris();

const left$ = diretion.left$.map(always(-1));
const right$ = diretion.right$.map(always(1));
const down$ = tick$.map(always(10));

export const position$ = down$
	.merge(nextTetris$.mapTo(4), left$, right$)

export const spin$ = keyA$
	.mapTo(1)
	.merge(nextTetris$.map(i=>i.shape))
	.scan((acc,next)=>({count:acc.count+1,shape:next}),{count:0,shape:INITIAL_TETRIS.shape})
	.startWith({count:0,shape:INITIAL_TETRIS.shape})

export const type$ = nextTetris$.map(i => i.type).startWith(INITIAL_TETRIS.type);

export const fallingTetris$ = position$.combineLatest(
	type$,
	spin$,
	(position, type, spin) => ({ type, position, spin })
)
.do(log)
	.scan(ensureNotOverPlayground,{ type: -1, position: 0, shape: 0,count:0 })
	.map(({ position, type, shape }) => {
		console.log(position, type, shape)
		// shape = shape % TETRIS_TYPE[type].length;
		return TETRIS_TYPE[type][shape].map(i => i + position);
	})
	.distinctUntilChanged()
	.combineLatest(heap$, (positions, heap) => ({ positions, heap }))
	.filter(ensureNotSpinOverHeap)
	.map(i => i.positions)
	.distinctUntilChanged();

function ensureNotOverPlayground(previous, next) {
	const { spin, position, type } = next;
	const{shape,count}=spin;
	if (previous.type !== type || position === 4) {
		return { type, position, shape ,count};
	}
	const isSpin=count!==previous;
	const nextShape = isSpin?(shape+previous.shape):previous.shape;
	const nextPostion =!isSpin ? previous.position + position : previous.position;
	const shapes=TETRIS_TYPE[type];
	const isOverBorder = shapes[nextShape%shapes.length].some(item => {
		return Math.abs(((item + nextPostion) % 10) - (nextPostion % 10)) > 4;
	});
	console.log(nextShape)
	return isOverBorder ? previous : { type, position: nextPostion, shape: nextShape ,count};
}

function ensureNotSpinOverHeap(data: PositionsWithHeap) {
	return !hasSameVal(data.heap, data.positions);
}
