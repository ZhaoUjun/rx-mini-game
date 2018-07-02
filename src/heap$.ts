import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export type HeapState=number[];


export  const heap$=new BehaviorSubject<HeapState>([]);

