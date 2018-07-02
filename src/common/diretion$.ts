import {touch$,TouchEvent} from './touch$';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import {CANVAS_HEIGHT,CANVAS_WIDTH} from '../constant'

export const buttonSize=30

export const diretionRange=60

export const playgroundWidth=CANVAS_HEIGHT/2;

export const directionPositionX=(CANVAS_WIDTH-playgroundWidth)/4;

export const directionPositionY=CANVAS_HEIGHT/2;

export const diretionPosition={
    up:[directionPositionX,directionPositionY-diretionRange],
    right:[directionPositionX+diretionRange,directionPositionY],
    down:[directionPositionX,directionPositionY+diretionRange],
    left:[directionPositionX-diretionRange,directionPositionY]
}

export function calculateLength(x1:number,y1:number,x2:number,y2:number):number{
    return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2))
}

function filterDiretion(diretion:string){
    return ev => {
        const {clientX,clientY}=ev.touches[0];
        return calculateLength(clientX,clientY,diretionPosition[diretion][0],diretionPosition[diretion][1])<buttonSize
    }
}

export const direction$=new Subject<TouchEvent>();
export const left$=direction$.filter(filterDiretion('left'))
export const right$=direction$.filter(filterDiretion('right'))
export const top$=direction$.filter(filterDiretion('up'))
export const down$=direction$.filter(filterDiretion('down'))


touch$.subscribe(direction$)

