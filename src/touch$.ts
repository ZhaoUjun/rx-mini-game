import {Observable} from 'rxjs/Observable'

declare const wx:any

export type Touch={
    screenX:number,
    screenY:number,
    clientX:number,
    clientY:number
}

export type TouchEvent={
    touches:Array<Touch>,
    changedTouches:Array<Touch>,
    timeStamp:number
}

export const touch$=Observable.create(observer=>{
    wx.onTouchStart((res:TouchEvent)=>{
        console.log(res)
        observer.next(res)
    })
})