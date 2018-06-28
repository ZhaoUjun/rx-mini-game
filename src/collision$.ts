import { tick$ } from "./tick$";
import { heap$ } from "./heap$";
import { fallingTetris$ } from "./fallingTetris$";
import { hasSameVal } from "./utils";
import "rxjs/add/operator/share";
interface PlayGround {
	fallingTetris: number[];
	heap: number[];
}

export const collision$ = tick$
	.combineLatest(fallingTetris$, heap$, (_, fallingTetris, heap) => ({ fallingTetris, heap }))
	.filter(checkCollision)
	.share();

export const nextHeap$ = collision$.map(reduceTetris).do(data=>heap$.next(data.nextHeap));

function checkCollision(playGround: PlayGround): boolean {
	const { fallingTetris, heap } = playGround;
	const nextTetris = fallingTetris.map(i => i + 10);
	return hasSameVal(nextTetris, heap) || nextTetris.some(item => item > 200);
}

function genrateNextHeap(playGround: PlayGround) {
	return Array.from(new Set([...playGround.fallingTetris, ...playGround.heap]));
}

function reduceTetris(playGround: PlayGround) {
	const rows = playGround.fallingTetris.reduce((acc, next) => acc.add(~~(next / 10)), new Set([]));
	const nextHeap = [...playGround.fallingTetris, ...playGround.heap];
	const data = Array(200).fill(0);
	nextHeap.forEach(item => {
		data[item] = 1;
	});
	const reduceRows = Array.from(rows).filter(item => canReduce(item * 10, data));
	const score = reduceRows.length;
	return score === 0
		? { nextHeap, score }
		: {
				score,
				nextHeap: nextHeap.filter(item => !reduceRows.includes(~~(item / 10)))
		  };
}

function canReduce(start = 0, range = []) {
	let i = 0;
	let res = true;
	while (i < 10 && res) {
		res = range[start + i] === 1;
		i++;
	}
	return res;
}
