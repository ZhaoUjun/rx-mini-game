import { Observable } from "rxjs/Observable";
import { nextTetris$, getRandomType } from "./nextTetris$";
import { left$, right$ } from "./diretion$";
import { keyA$ } from "./functionalKeys$";
import { tick$ } from "./tick$";

import "rxjs/add/operator/scan";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";

const INITIAL_POSITION = 5;

const diretion$ = tick$.map(_ => 10).merge(left$.map(_ => -1), right$.map(_ => 1));

export const fallingTetris$ = nextTetris$
    .scan((acc, value) => acc, getRandomType())
	.map(type => ({ type, position: INITIAL_POSITION, current: 0 }))
    .combineLatest(keyA$, (init, keyA) => ({...init,current:init.current+1}))
    .combineLatest(diretion$,(tetris,direction)=>({...tetris,position:tetris.position+direction}))
