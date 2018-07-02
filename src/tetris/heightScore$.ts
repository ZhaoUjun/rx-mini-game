import { storage$, updateStorage } from "../common/storage$";
import { score$ } from "./score$";
import "rxjs/add/operator/combineLatest";

export const heightScore$ = score$
	.withLatestFrom(storage$.map(i => i.heightScore), (next, storage) => {
		if (storage >= next) {
			return storage;
		} else {
			return next;
		}
	})
	.distinctUntilChanged()
	.do(updateHeightScore);

export function updateHeightScore(heightScore: number) {
	updateStorage({ heightScore });
}
