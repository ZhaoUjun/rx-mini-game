import { Observable } from "rxjs/Observable";
import { nextTetris$, getRandomType } from "./nextTetris$";
import * as diretion from "./diretion$";
import { keyA$ } from "./functionalKeys$";
import { tick$ } from "./tick$";
import { always,log } from "./utils";
import { Tetris, TETRIS_TYPE } from "./Tetris";
import {heap$} from './heap$'
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/share";
import "rxjs/add/operator/distinctUntilChanged";

const INITIAL_POSITION = 3;
const INITIAL_SHPAE = 0;

const left$ = diretion.left$.map(always(-1)).startWith(0);
const right$ = diretion.right$.map(always(1)).startWith(0);

const position$ = tick$
	.map(always(10))
	.startWith(0)
    .merge(left$, right$,nextTetris$.map(always(4)))
	// .startWith(4);

const shape$ = keyA$.scan((acc, _) => acc + 1, 0).startWith(INITIAL_SHPAE);

// const type$ = nextTetris$.startWith(getRandomType());

export const fallingTetris$ = Observable.combineLatest(
	nextTetris$,
	position$,
	shape$,
	(nextTetris, position, shape) => ({ ...nextTetris, position, shape })
)
	.scan(
		ensureNotOverPlayground,
		{ type: -1, position: 0, shape: 0 }
	)
	.distinctUntilChanged()
	.combineLatest(heap$,(tetris,heap)=>({...tetris,heap}))
	.scan(ensureNotSpinOverHeap,{previous:null,current:null})
	.map(acc=>acc.current)
	.distinctUntilChanged()


function ensureNotOverPlayground(previous:Tetris, next:Tetris) {
    const { shape, position, type } = next;
	if (previous.type !== type) {
		return next;
	}
    const nextShape = shape % TETRIS_TYPE[type].length;
    const nextPostion = nextShape===previous.shape?(previous.position + position):previous.position;
	const isOverBorder = TETRIS_TYPE[type][nextShape].some(item => {
		return Math.abs(((item + nextPostion) % 10) - (nextPostion % 10)) > 4;
    });

    return isOverBorder ? previous : { type, position: nextPostion, shape: nextShape };
}

function ensureNotSpinOverHeap(acc,next){
	if(!acc.previous){
		return {previous:next,current:next}
	}
	const {position,type,heap,shape}=acc.previous;
	if(shape===next.shape){
		return {previous:acc.current,current:next}
	}
	const nextPixs=TETRIS_TYPE[next.type][next.shape].map(i=>i+next.position);
	return checkCanSpin(next.heap,nextPixs)?{previous:acc.current,current:next}:acc
}

function checkCanSpin(heap:number[],current:number[]){
	// console.log(heap,current)
	return !current.some(item=>heap.includes(item))
}
