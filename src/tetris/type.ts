export interface TetrisLike{
    type:number,
    position:number,
    shape:number,
    key?:number
    render?(context:CanvasRenderingContext2D):void
}

export interface Scene {
	tetris?: number[];
	nextTetris?: TetrisLike;
	heap: number[];
    score: number;
    heightScore:number;
    speed:number
}

export interface PlayGround {
	fallingTetris: number[];
	heap: number[];
}

export interface PlayGroundReducer{
	nextHeap:number[]
	score :number
}