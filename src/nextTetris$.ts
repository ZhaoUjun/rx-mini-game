import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TETRIS_TYPE,TETRISLIKE} from './Tetris';

export function getRandomType():number{
    return ~~(Math.random()*100)%6+1
}

export function getRandomInt(max:number){
    return ~~(Math.random()*100)%max+1
}

export function getRandomTetris(){
    const type=getRandomInt(6);
    const shapes=TETRIS_TYPE[type];
    const shape=getRandomInt(shapes.length);
    return {type,shape,position:4}
}

export const nextTetris$=new BehaviorSubject<TETRISLIKE>(getRandomTetris());

