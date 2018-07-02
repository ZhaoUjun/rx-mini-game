import {ensureInt} from './utils'
declare const wx:any

export const WINDOW_WIDTH=wx.getSystemInfoSync().windowWidth // 屏幕宽度

export const WINDOW_HEIGHT=wx.getSystemInfoSync().windowHeight // 屏幕高度

export const CANVAS_WIDTH :number=WINDOW_WIDTH;// 画布宽度

export const CANVAS_HEIGHT :number=WINDOW_HEIGHT// 画布高度

export const CANVAS_BG_COLOR='#67776a'// 画布背景

export const PIX_COLOR_INACTIVE='#5b6b5e'

export const PIX_COLOR_ACTIVE='#040b03'

export const PIX_WIDTH=ensureInt(CANVAS_HEIGHT / 20)

export const SPEED=100;

export const FONT_COLOR='white'

export const INIT_POSITION=-16

export const TETRIS_TYPE=[
    /**
     * like example 1
     */
    [[0,1,10,20],[0,1,2,12],[1,11,20,21],[0,10,11,12]],
    /**
     * like example 2
     */
    [[0,1,11,21],[2,10,11,12],[0,10,20,21],[0,1,2,10]],
    /**
     * like example 3
     */
    [[1,10,11,20],[0,1,11,12]],
    /**
     * like example 4
     */
    [[0,10,11,21],[1,2,10,11]],
    /**
     * like example 5
     */
    [[0,1,10,11],[0,1,10,11]],
    /**
     * like example 6
     */
    [[1,10,11,12],[1,11,12,21],[10,11,12,21],[1,10,11,21]],
    /**
     * like example 7
     */
    [[0,1,2,3],[1,11,21,31]]
]