import { nextHeap$ } from "./collision$";
import { speed$ } from "./speed$";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";

const socreConfig={
	0:0,
	1:10,
	2:20,
	3:40,
	4:80
}

export const score$ = nextHeap$
	.map(i => i.score)
	.withLatestFrom(speed$,calcSocre)
	.scan((acc, next) => acc + next, 0)
	.share()
	.startWith(0)

function calcSocre(score:number,speed:number){
	return socreConfig[score]/speed
}