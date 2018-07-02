import { INIT_POSITION,TETRIS_TYPE } from "../constant";
import { TetrisLike } from "./type";
import { always, hasSameVal, ensureInt } from "../utils";


const isSpin = i => i === 0;
const isNext = i => i.position;
const isOverBorder = (previous:TetrisLike, next: TetrisLike) => {
	const res = [...getRows(previous), ...getRows(next)].reduce(
		(acc, pos) => (pos === 0 || pos === 9 ? acc.add(pos) : acc),
		new Set([])
	);
	return [...res].length > 1;
};
const isOverHeap=(tetris:TetrisLike,heap:number[])=>{
	return hasSameVal(heap,createPositions(tetris))
}

const shapesLength = type => TETRIS_TYPE[type].length;

export function ensureIsValidAction(acc:TetrisLike, next) {
	const action=next.action;
	const heap=next.heap;
	if (isNext(action)) {
		return { ...action, position: INIT_POSITION};
	} else if (isSpin(action)) {
		const nextTetris = { ...acc, shape: (acc.shape + 1) % shapesLength(acc.type) };
		return isOverBorder(acc, nextTetris)||isOverHeap(nextTetris,heap) ? acc : nextTetris;
	} else {
		const nextTetris = { ...acc, position: acc.position + action };
		return isOverBorder(acc, nextTetris)||isOverHeap(nextTetris,heap) ? acc : nextTetris;
	}
}

export function getRows(tetris: TetrisLike) {
	return createPositions(tetris).map(i=>i%10);
}

export function createPositions(tetris:TetrisLike):number[]{
	const { position, type, shape }=tetris;
	return TETRIS_TYPE[type][shape].map(i => i + position).filter(i=>i>=0)
}

export function createNextTetrisPositions(tetris:TetrisLike):number[]{
    return createPositions(tetris).map(i=>(ensureInt(i/10)*4+i%10))
}
