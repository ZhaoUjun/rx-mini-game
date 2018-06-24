import {SPEED} from './canstant';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

export const tick$=Observable.interval(SPEED)
