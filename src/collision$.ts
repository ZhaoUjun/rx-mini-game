import { tick$ } from "./tick$";
import { heap$ } from "./heap$";
import { fallingTetris$ } from "./fallingTetris$";
import { hasSameVal } from "./utils";

interface PlayGround {
    fallingTetris: number[];
    heap:number []
}

export const collision$ = tick$
	.combineLatest(fallingTetris$, heap$, (_, fallingTetris, heap) => ({ fallingTetris, heap }))
    .filter(checkCollision)
    .map(genrateNextHeap)
;

function checkCollision(playGround:PlayGround): boolean {
    const {fallingTetris, heap}=playGround;
    const nextTetris=fallingTetris.map(i=>i+10);
	return hasSameVal(nextTetris,heap)||nextTetris.some(item=>item>200)
}

function genrateNextHeap(playGround:PlayGround){
    return [...playGround.fallingTetris,...playGround.heap]
}
