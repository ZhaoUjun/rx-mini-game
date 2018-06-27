import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {nextTetris$} from './nextTetris$'

export type HeapState=number[];

export  const heap$=new BehaviorSubject<HeapState>([]);

