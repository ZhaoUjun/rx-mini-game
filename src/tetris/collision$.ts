import { tick$ } from "../common/tick$";
import { heap$ } from "./heap$";
import { fallingTetris$ } from "./fallingTetris$";
import { hasSameVal } from "../utils";
import "rxjs/add/operator/share";
import "rxjs/add/operator/withLatestFrom";

interface PlayGround {
	fallingTetris: number[];
	heap: number[];
}

export const collision$ = tick$
	.withLatestFrom(fallingTetris$, heap$, (_, fallingTetris, heap) => ({ fallingTetris, heap }))
	.filter(checkCollision)
	.share();

export const nextHeap$ = collision$.map(reduceTetris).do(data => heap$.next(data.nextHeap));

function checkCollision(playGround: PlayGround): boolean {
	const { fallingTetris, heap } = playGround;
	const nextTetris = fallingTetris.map(i => i + 10);
	return hasSameVal(nextTetris, heap) || nextTetris.some(item => item > 199);
}

function reduceTetris(playGround: PlayGround) {
	const nextHeap = [...playGround.fallingTetris, ...playGround.heap];
	const data = Array(200).fill(0);
	nextHeap.forEach(item => {
		data[item] = 1;
	});
	return generateNextHeap(data.join(""));
}

function generateNextHeap(str: string) {
	const win = "1111111111";
	const paddingUnit = "0000000000";
	const nextHeap = [];
	let res = "";
	let i = 0;
	let temp = "";
	let padding = "";
	let score = 0;
	while (i < 20) {
		temp = str.slice(i * 10, (i + 1) * 10);
		if (temp !== win) {
			res += temp;
		} else {
			padding += paddingUnit;
			score++;
		}
		i++;
	}
	i = 0;
	const arr = (padding + res).split("");
	while (i < arr.length) {
		if (arr[i] === "1") {
			nextHeap.push(i);
		}
		i++;
	}
	return { nextHeap, score };
}
