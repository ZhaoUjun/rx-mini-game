export interface TetrisLike{
    type:number,
    position:number,
    shape:number,
    key?:number
    render?(context:CanvasRenderingContext2D):void
}