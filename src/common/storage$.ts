import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
declare const wx:any

interface Storage {
	heightScore?: number;
}

const initStorage = wx.getStorageSync('game')||{}
export function updateStorage(data: Storage, key = "game") {
	wx.setStorage({
        key,
        data,
		success: res => {
			sub$.next(data);
		},
		fail: res => {
			console.log(res);
		}
	});
}

function createStorage<T>(key: string): Observable<T> {
	return Observable.create(observer => {
		wx.getStorage({
			key,
			success: res => {
				observer.next(res.data||{});
			},
			fail: res => {
				observer.next({});
			}
		});
	});
}

const initStorage$ = createStorage < Storage > ("game");

const sub$ = new Subject<Storage>();

export const storage$ = sub$
	.startWith(initStorage)    
	.scan(reduce)
    // .share()
    

function reduce(acc: Storage, next: Storage): Storage {
	return { ...acc, ...next };
}
