import { BehaviorSubject } from "rxjs/BehaviorSubject";
declare const wx:any

interface Storage {
	heightScore?: number;
}

const initStorage = wx.getStorageSync('game')||{}

export function updateStorage(data: Storage, key = "game") {
	sub$.next(data)
}


const sub$ = new BehaviorSubject<Storage>(initStorage);

export const storage$ = sub$
	.scan(reduce)
	.do(data=>{
		wx.setStorage({
			key:'game',
			data,
		});
	})

function reduce(acc: Storage, next: Storage): Storage {
	return { ...acc, ...next };
}
