export function ensureInt(num:number){
    return ~~num
}

export function always(input:any){
    return ()=>input
}

export function log(data){
    console.log(data);
    return data
}