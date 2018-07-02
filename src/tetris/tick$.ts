import {speed$} from './speed$'
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/share";


export const tick$ = speed$.mergeMap(speed=>Observable.interval(speed*1000)).share();
