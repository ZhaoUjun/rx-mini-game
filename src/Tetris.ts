import {ensureInt} from './utils';
import {
	CANVAS_HEIGHT,
    CANVAS_WIDTH,
    PIX_WIDTH,
} from "./canstant";
import {renderSinglePix} from './render'

export interface TETRISLIKE{
    type:number,
    position:number,
    shape:number,
    render(context:CanvasRenderingContext2D):void
}

export const TETRIS_TYPE=[
    /**
     * like example 1
     */
    [[0,1,10,20],[0,1,2,12],[1,11,20,21],[0,10,11,12]],
    /**
     * like example 2
     */
    [[0,1,11,21],[2,10,11,12],[0,10,20,21],[0,1,2,10]],
    /**
     * like example 3
     */
    [[1,10,11,20],[0,1,11,12]],
    /**
     * like example 4
     */
    [[0,10,11,21],[1,2,10,11]],
    /**
     * like example 5
     */
    [[0,1,10,11]],
    /**
     * like example 6
     */
    [[1,10,11,12],[1,11,12,21],[10,11,12,21],[1,10,11,21]],
    /**
     * like example 7
     */
    [[0,1,2,3],[1,11,21,31]]
]

export class Tetris implements TETRISLIKE{
    public type:number
    public position:number
    public shape:number=0

    constructor(type:number,position:number,shape:number){
        this.type=type;
        this.position=position;
        this.shape=shape
    }

    public render(context){
        const type=TETRIS_TYPE[this.type];
        const shape=this.shape%type.length;
        type[shape]
        .map(item=>item+this.position)
        .forEach(pos=>{
            const iniPositionX=(CANVAS_WIDTH-CANVAS_HEIGHT/2)/2;
            const x=ensureInt(iniPositionX+(pos%10)*PIX_WIDTH);
            const y=ensureInt(pos/10)*PIX_WIDTH;
            renderSinglePix(context,true,x,y)
        })
    }
}