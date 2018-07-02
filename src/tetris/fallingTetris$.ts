import { Observable } from "rxjs/Observable";
import * as diretion from "../common/diretion$";
import { keyA$ } from "../common/functionalKeys$";
import { tick$ } from "./tick$";
import { always } from "../utils";
import { ensureIsValidAction, createPositions } from "./utils";
import { heap$ } from "./heap$";
import { currentTetris$ } from "./tetris$";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
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

export const fallingTetris$ = Observable.merge(position$, currentTetris$, shape$)
	.withLatestFrom(heap$, (action, heap) => ({ action, heap }))
	.scan(ensureIsValidAction, { position: 0 })
	.map(createPositions)
	.filter(next => !next.some(i => i > 199))
	.distinctUntilChanged()
	.share();
