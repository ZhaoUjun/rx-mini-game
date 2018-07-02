import { touch$, TouchEvent } from "./touch$";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/filter";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constant";
import { calculateLength, buttonSize } from "./diretion$";

const keyAPosition = [CANVAS_WIDTH * 0.75, CANVAS_HEIGHT * 0.65];
const keyBPosition = [CANVAS_WIDTH * 0.85, CANVAS_HEIGHT * 0.35];

export const functionKeysPosition = {
	a: keyAPosition,
	b: keyBPosition
};

function filterKey(key: string) {
	return ev => {
		const { clientX, clientY } = ev.touches[0];
		return (
			calculateLength(
				clientX,
				clientY,
				functionKeysPosition[key][0],
				functionKeysPosition[key][1]
			) < buttonSize
		);
	};
}

export const functionKeys$=new Subject<TouchEvent>();
export const keyA$ = functionKeys$.filter(filterKey("a"));
export const keyB$ = functionKeys$.filter(filterKey("b"));

touch$.subscribe(functionKeys$);
