import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export function getRandomType():number{
    return ~~(Math.random()*100)%7+1
}

export const nextTetris$=new BehaviorSubject<number>(getRandomType());

