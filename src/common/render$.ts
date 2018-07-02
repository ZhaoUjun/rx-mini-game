import { Observable } from "rxjs/Observable";
import { animationFrame } from "rxjs/scheduler/animationFrame";
import "rxjs/add/operator/share";
const FPS = 60;

export const render$ = Observable.interval(1000 / FPS, animationFrame).share();
