import { nextHeap$ } from "./collision$";
import "rxjs/add/operator/map";
import "rxjs/add/operator/scan";

export const score$ = nextHeap$
	.map(i => i.score)
	.scan((acc, next) => acc + next, 0)
	.share()
	.startWith(0)
