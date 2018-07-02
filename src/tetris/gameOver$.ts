import { heap$ } from "./heap$";
import { score$ } from "./score$";
import { nextTetris$ } from "./tetris$";
import {Observable} from 'rxjs/Observable'
import "rxjs/add/operator/scan";
import "rxjs/add/operator/mapTo";


export const gameOver$ = Observable.interval(100)
    .scan(calcLength, 0)
    .startWith(1)
    .takeWhile(i=>i<21)
    .map(genaratePixs)
    .withLatestFrom(heap$, merge)
    .withLatestFrom(score$,nextTetris$,(heap,score,nextTetris)=>({heap,score,nextTetris}))

function calcLength(acc: number): number {
	return acc + 1;
}

function genaratePixs(length: number): number[] {
	return Array(length*10).fill('').map((_, index) => index);
}

function merge(pixs: number[], heap: number[]) {
	return Array.from(new Set([...pixs, ...heap]));
}
