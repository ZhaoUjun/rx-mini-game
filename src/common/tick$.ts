import { SPEED } from "../constant";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/share";

export const tick$ = Observable.interval(SPEED).share();
