import {Observable} from 'rxjs/Observable'
declare const wx:any

export type Touch={
    screenX:number,
    screenY:number,
    clientX:number,
    clientY:number
}

export type TouchEvent={
    touches:Touch[],
    changedTouches:Touch[],
    timeStamp:number
}

export const touch$=Observable.create(observer=>{
    wx.onTouchStart((res:TouchEvent)=>{
        observer.next(res)
    })
})