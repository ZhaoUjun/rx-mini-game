import { keyB$ } from "../common/functionalKeys$";
import { score$ } from "./score$";
import { heightScore$ } from "./heightScore$";
import { speed$ } from "./speed$";
import { createPositions } from "./utils";
import { getRandomTetris } from "./tetris$";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/take";
import "rxjs/add/operator/takeUntil";

const CTYCLE = [
	81,
	82,
	83,
	84,
	85,
	86,
	87,
	91,
	101,
	111,
	121,
	131,
	97,
	107,
	117,
	127,
	137,
	141,
	142,
	143,
	144,
	145,
	146,
	147
];

export const startPage$ = Observable.interval(1000)
    .map(() => ({ ...getRandomTetris(), position: 103 }))
	.map(createPositions)
    .withLatestFrom(Observable.of(CTYCLE), merge)
	.withLatestFrom(score$.take(1), heightScore$.take(1), speed$, (heap, score, heightScore, speed) => ({
		heightScore,
		heap,
		score,
		speed
    }))
    .takeUntil(keyB$)
    

function merge(postions: number[], pixs: number[]) {
	return Array.from(new Set([...pixs, ...postions]));
}
