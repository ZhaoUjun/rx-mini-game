declare const wx:any

export const WINDOW_WIDTH=wx.getSystemInfoSync().windowWidth // 屏幕宽度

export const WINDOW_HEIGHT=wx.getSystemInfoSync().windowHeight // 屏幕高度

export const CANVAS_WIDTH :number=WINDOW_WIDTH;// 画布宽度

export const CANVAS_HEIGHT :number=WINDOW_HEIGHT// 画布高度

export const CANVAS_BG_COLOR='#67776a'// 画布背景

export const PIX_COLOR_INACTIVE='#5b6b5e'

export const PIX_COLOR_ACTIVE='#040b03'
