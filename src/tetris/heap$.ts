import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do'
export type HeapState=number[];


export  const heap$=new BehaviorSubject<HeapState>([]);

