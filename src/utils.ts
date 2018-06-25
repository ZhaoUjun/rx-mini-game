export function ensureInt(num:number){
    return ~~num
}

export function always(input:any){
    return ()=>input
}