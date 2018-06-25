import { Observable } from "rxjs/Observable";
import { nextTetris$, getRandomType } from "./nextTetris$";
import * as diretion from "./diretion$";
import { keyA$ } from "./functionalKeys$";
import { tick$ } from "./tick$";

import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";

const INITIAL_POSITION = 3;

const INITIAL_SHPAE=0

const left$=diretion.left$.map(_ => -1).startWith(0);
const right$=diretion.right$.map(_ => 1).startWith(0);

const position$ = tick$
    .map(_ => 10)
    .startWith(0)
	.merge(left$,right$)
	.scan((acc, one) => acc + one,INITIAL_POSITION)


const shape$ = keyA$.scan((acc, _) => acc + 1,0).startWith(INITIAL_SHPAE);

const type$ = nextTetris$
    .scan((acc, next) => ({ current: acc.next, next }), { next: getRandomType(), current: 0 })
	.map(type => type.current);

export const fallingTetris$ = Observable.combineLatest(
	type$,
	position$,
	shape$,
	(type, position, shape) => ({ type, position, shape })
);
