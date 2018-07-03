import { scene$ } from "./scene$";
import { render$ } from "../common/render$";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/withLatestFrom";

export const game$ = render$.withLatestFrom(scene$, (_, scene) => scene).takeWhile(scene => {
	if (scene.isOver) {
		console.log(scene);
	}
	return !scene.isOver;
});
