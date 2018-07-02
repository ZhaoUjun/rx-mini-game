declare const wx:any;
import {startTeris} from './tetris'
// GameGlobal.global=GameGlobal;
export function initGame() {
	const canvas = wx.createCanvas();
	const context=canvas.getContext('2d')
	startTeris(context);
	
}



