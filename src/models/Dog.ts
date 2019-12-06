import Konva from "konva"
import { Animate } from './Animate'
const fs = require('fs')

let sprites
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        sprites = fs.readFileSync(__dirname + '/../assets/sprites/mobile/all_sprites_mob.png')
    } else {
        sprites = fs.readFileSync(__dirname + '/../assets/sprites/all_sprites.png')
  }

import IDog from '../interfaces/IDog'

type TAnimations = {
    [key: string]: number[]
}


export class Dog implements IDog {
    
    roadLines: number[]
    currentLine: number = 0
    public duration = 0.4
    public animate
    public dog
    public dogPosition
    public dogState
    public image: HTMLImageElement
    public image1: HTMLImageElement
    dogModelImage: any 
    animations: TAnimations
    isMobile
    layer
    stage
    listener

    constructor(roadLines, layer, stage, isMobile) {
        this.isMobile = isMobile
        this.layer = layer
        this.stage = stage
        this.roadLines = roadLines
        this.animate = new Animate()
        const that = this
        this.listener = function (e) {
            console.log(e);
            switch (e.keyCode) {
                case 87: that.down(); break;
                case 83: that.up(); break;
                case 38: that.down(); break;
                case 40: that.up(); break;
            }
        }
        document.addEventListener('keydown', this.listener)
    }

    up() {
        if (this.currentLine != 2) {
            this.currentLine++
            document.removeEventListener('keydown', this.listener)
            this.animate.moveDown(this.dog, this.roadLines[this.currentLine], this.duration)
            this.dog.animation('down')
            const time = setTimeout(() => {
                this.dog.animation('run1')
                this.layer.batchDraw()
                clearTimeout(time)
                document.addEventListener('keydown', this.listener)
            }, this.duration * 1000)
            this.layer.batchDraw()
        }
    }

    down() {
        if (this.currentLine != 0) {
            this.currentLine--
            document.removeEventListener('keydown', this.listener)
            this.animate.moveDown(this.dog, this.roadLines[this.currentLine], this.duration)
            this.dog.animation('up')
            const time = setTimeout(() => {
                this.dog.animation('run1')
                this.layer.batchDraw()
                clearTimeout(time)
                document.addEventListener('keydown', this.listener)
            }, this.duration * 1000)
            this.layer.batchDraw()
        }
    }

    clash() {
        document.removeEventListener('keydown', this.listener)
        this.animate.clash(this.dog)
        this.dog.animation('clash')
        const time = setTimeout(() => {
            this.dog.animation('run1')
            this.layer.batchDraw()
            clearTimeout(time)
            document.addEventListener('keydown', this.listener)
        }, 400)
        this.layer.batchDraw()
    }
    
    run() {
        // animate.run(this.dogModelImage, this.layer)
    }

    private loadingModel() {

        const animations = {
            clash: [],
            up: [],
            down: [],
            run1: [],
        }

        if (this.isMobile) {
            //мапинг спрайтов для мобильных устройств
            for (let i = 0; i <= 14; i++) {
                animations.clash.push(110 * i, 0, 110, 110)
            }
            for (let i = 0; i <= 19; i++) {
                animations.down.push(110 * i, 110, 110, 110)
            }
            for (let i = 0; i <= 19; i++) {
                animations.up.push(110 * i, 110*2, 110, 110)
            }
            for (let i = 0; i <= 120; i++) {
                animations.run1.push(110 * i, 110*3, 110, 110)
            }
            } else {
            //мапинг спрайтов для обычных устройств
            for (let i = 0; i <= 14; i++) {
                animations.clash.push(270 * i, 0, 260, 260)
            }
            for (let i = 0; i <= 19; i++) {
                animations.down.push(270 * i, 270, 260, 260)
            }
            for (let i = 0; i <= 19; i++) {
                animations.up.push(270 * i, 270*2, 260, 260)
            }
            for (let i = 0; i <= 120; i++) {
                animations.run1.push(270 * i, 270*3, 260, 260)
            }
        }

        
        // for (let i = 0; i <= 180; i++) {
        //     animations.run2.push(270 * i, 280*4, 260, 260)
        // }
        this.image = new Image()
        this.image.src = `data:image/png;base64,${sprites.toString('base64')}`
        this.dog = new Konva.Sprite({
            x: 30,
            y: this.roadLines[this.currentLine],
            image: this.image,
            animation: 'run1',
            animations: animations,
            frameRate: 45,
            frameIndex: 0
        })
        this.stage.on('touchend', (event) => {
            let touchPos = this.stage.getPointerPosition()
            if (touchPos.y > this.dog.attrs.y) {
                this.up()
            } else this.down()
        })
        this.dogModelImage = this.dog
        this.layer.add(this.dog)
        // dog.setZIndex(100)
        this.dog.start()

        // dog.animation('clash')
        // this.layer.draw()
    }

}