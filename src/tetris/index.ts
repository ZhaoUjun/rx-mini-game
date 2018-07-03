import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { game$ } from "./game$";
import { renderScene } from "../render";
import { gameOver$ } from "./gameOver$";
import { startPage$ } from "./startPage$";
import { heap$ } from "./heap$";

export function startTeris(context: CanvasRenderingContext2D) {
	renderHomePage(context);
}

export function startGame(context: CanvasRenderingContext2D) {
	game$.subscribe({
		next: scene => {
			renderScene(context, scene.scene);
		},
		complete: () => {
			renderGameOver(context);
		}
	});
}

function renderGameOver(context: CanvasRenderingContext2D) {
	gameOver$.subscribe({
		next: scene => {
			renderScene(context, scene);
		},
		complete: () => {
			heap$.next([]);
			renderHomePage(context);
		}
	});
}

function renderHomePage(context: CanvasRenderingContext2D) {
	startPage$.subscribe({
		next: scene => {
			renderScene(context, scene);
		},
		complete: () => {
			startGame(context);
		}
	});
}
