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

export function hasSameVal(a: number[], b: number[]) {
	return a.some(item => b.includes(item));
}
