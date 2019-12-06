import ILevel from '../interfaces/ILevel'
import Konva from 'konva'
import { Animate } from './Animate'
const fs = require('fs');

const clashes = [
    { src: fs.readFileSync(__dirname + '/../assets/clash1.png'), type: 'image' },
    { src: fs.readFileSync(__dirname + '/../assets/clash2.png'), type: 'image' },
    { name: 'headlights', src: fs.readFileSync(__dirname + '/../assets/sprites/фары.png'), type: 'sprites' },
    { name: 'hatch', src: fs.readFileSync(__dirname + '/../assets/sprites/люк.png'), type: 'sprites' },
    { name: 'car', src: fs.readFileSync(__dirname + '/../assets/sprites/машина.png'), type: 'sprites' },
    { name: 'box_mini', src: fs.readFileSync(__dirname + '/../assets/sprites/box_mini.png'), type: 'sprites' },
    { name: 'box_regular', src: fs.readFileSync(__dirname + '/../assets/sprites/box_regular.png'), type: 'sprites' },
    { name: 'icicle', src: fs.readFileSync(__dirname + '/../assets/sprites/icicle.png'), type: 'sprites' },
]

const gifts = [
    { points: `20`, name: 'gift', src: fs.readFileSync(__dirname + '/../assets/sprites/gift.png') },
    { points: `10`, name: 'snow_gold', src: fs.readFileSync(__dirname + '/../assets/sprites/snow_gold.png') },
    { points: `1`, name: 'snow_silver', src: fs.readFileSync(__dirname + '/../assets/sprites/snow_silver.png') },
]

const heart = fs.readFileSync(__dirname + '/../assets/heart.png')
const break_heart = fs.readFileSync(__dirname + '/../assets/break_heart.png')

const road = fs.readFileSync(__dirname + '/../assets/Дорога.jpg')

type TModelsObject = {
    [key: string]: any
}

export class Level implements ILevel {

    private speed: number = 500
    private _location: string
    public pipes: any = []
    public roadLines: number[]
    public assets: TModelsObject = {}
    public lives: any[] = []
    layer: any
    stage: any
    currentBackgroundIndex: number = 0
    dog: any
    anim: any
    animate: any
    drawPipesInterval
    pipesFunctions: any[] = []
    giftsFunctions: any[] = []
    isMobile
    points: number = 0
    complexText
    heart
    break_heart

    constructor(stage, layer, dog, roadLines, isMobile) {
        this.isMobile = isMobile
        this.animate = new Animate()
        this.roadLines = roadLines
        this.dog = dog
        this.layer = layer
        this.stage = stage


        this.loadBackground()
    }

    public moveBackground() {
        const anim = new Konva.Animation((frame) => {
            const left = -this.speed * (frame.timeDiff / 1000)
            if (-this.assets.park.attrs.x >= this.assets.park.width() + this.stage.width()) {
                this.assets.park.move({x: this.assets.park.width(), y: 0})
                this.assets.park2.move({x: this.assets.park.width(), y: 0})
                    this.drawPipes()
                    this.drawGifts()
                    this.speed += 100
            } else {

                this.assets.park.move({x: left, y: 0})
                this.assets.park2.move({x: left, y: 0})

            }
        }, this.layer)
        this.anim = anim
        anim.start()
    }

    public movePipes(block) {
        const anim = new Konva.Animation((frame) => {
            //TODO: СДЕЛАТЬ ЛОГИКУ СТОЛКНОВЕНИЯ
            const dogX = this.dog.dogModelImage.attrs.x
            const dogY = this.dog.dogModelImage.attrs.y
            const dogWidth = (this.isMobile) ? 0 : 240
            if ( block.parent
            && block.attrs.name == 'block'
            && Math.round(dogX + dogWidth) >= Math.round(block.attrs.x)
            && Math.round(dogX + dogWidth) <= Math.round(block.attrs.x + this.stage.width() / 7)
            && Math.round(dogY + dogWidth / 2) >= Math.round(block.attrs.y)
            && Math.round(dogY + dogWidth / 2) <= Math.round(block.attrs.y + this.stage.height() / 7)) {
                this.pipesFunctions.map(pipe => {
                    pipe.stop()
                })
                this.giftsFunctions.map(pipe => {
                    pipe.stop()
                })
                this.anim.stop()
                anim.stop()
                this.dog.clash()
                const time = setTimeout(() => { 
                    clearTimeout(time)
                    // block.destroy()
                    this.pipesFunctions.map(pipe => {
                        pipe.block.destroy()
                    })
                    this.giftsFunctions.map(pipe => {
                        pipe.block.destroy()
                    })
                    this.drawPipes()
                    this.drawGifts()
                    this.anim.start()
                    anim.start()
                    const live = this.lives.pop()
                    live.destroy()
                    console.log(this.lives);
                    if (this.lives.length == 0) location.reload()
                    this.layer.batchDraw()
                }, 320)
                
            }
            const left = -this.speed * (frame.timeDiff / 1000)
            block.move({x: left, y: 0})
        }, this.layer)

        function stop() {
            anim.stop()
            // clearInterval(timeId)
        }
        function start() {
            anim.start()
        }
        return {
            stop,
            start,
            block
        }
    }

    drawPipes() {
        const animations = {
            hatch: [],
            box_mini: [],
            box_regular: [],
            icicle: [],
            car: [],
            headlights: [],
        }
        //мапинг спрайтов
        for (let i = 0; i < 32; i++) {
            animations.hatch.push(320 * i, 0, 310, 310)
        }
        for (let i = 0; i < 55; i++) {
            animations.box_mini.push(170 * i, 0, 160, 160)
        }
        for (let i = 0; i < 55; i++) {
            animations.box_regular.push(320 * i, 0, 310, 310)
        }
        for (let i = 0; i < 71; i++) {
            animations.icicle.push(320 * i, 0, 310, 310)
        }
        for (let i = 0; i < 56; i++) {
            animations.car.push(320 * i, 0, 310, 310)
        }
        for (let i = 0; i < 34; i++) {
            animations.headlights.push(320 * i, 0, 310, 310)
        }

        for (let i = 0; i < 100; i++) {
            let model
            const clash = clashes[Math.round(Math.random() * 7)]
            if (clash.type == 'sprites') {
                const block = new Image()
                block.src = `data:image/png;base64,${clash.src.toString('base64')}`
                model = new Konva.Sprite({
                    x: this.generateX(),
                    y: this.roadLines[Math.round(Math.random() * 2)],
                    image: block,
                    animation: clash.name,
                    animations: animations,
                    frameRate: 45,
                    frameIndex: 0,
                    name: 'block'
                })
                this.layer.add(model)
                model.start()
            } else {
                model = this.loadAsset(
                    clash.src, 
                    this.generateX(),
                    this.roadLines[Math.round(Math.random() * 2)],
                    this.stage.width() / 8,
                    this.stage.width() / 8,
                    'block',
                )
            }
            const move = this.movePipes(model)
            this.pipesFunctions.push(move)
            move.start()
        }
    }

    generateX() {
        const random = Math.round(Math.random() * (Math.round(this.assets.park.width()) - Math.round(this.stage.width() * 2)) + Math.round(this.stage.width() * 2))
        for (let i = 0; i <= this.pipesFunctions.length - 1; i++) {
            const modelWidth = 310
            const minWidth = this.pipesFunctions[i].block.attrs.x - 300
            const maxWidth = this.pipesFunctions[i].block.attrs.x + modelWidth + 300
                if (random > minWidth && random < maxWidth) {
                    this.pipesFunctions[i].block.destroy()
                }
        }
        return random
    }


    drawGifts() {

        const animations = {
            gift: [],
            snow_silver: [],
            snow_gold: [],
        }
        //мапинг спрайтов
        for (let i = 0; i < 55; i++) {
            animations.gift.push(170 * i, 0, 160, 160)
        }
        for (let i = 0; i < 51; i++) {
            animations.snow_silver.push(170 * i, 0, 160, 160)
        }
        for (let i = 0; i < 51; i++) {
            animations.snow_gold.push(170 * i, 0, 160, 160)
        }
        for (let i = 0; i < 30; i++) {
            let model
            const clash = gifts[Math.round(Math.random() * 2)]
            const block = new Image()
            block.src = `data:image/png;base64,${clash.src.toString('base64')}`
            model = new Konva.Sprite({
                x: this.generateX(),
                y: this.roadLines[Math.round(Math.random() * 2)] + 50,
                image: block,
                animation: clash.name,
                animations: animations,
                frameRate: 30,
                frameIndex: 0,
                name: 'gift',
                id: clash.points
            })
            this.layer.add(model)
            model.start()
            const move = this.moveGifts(model)
            this.pipesFunctions.push(move)
            move.start()
        }
    }

    public moveGifts(block) {
        const anim = new Konva.Animation((frame) => {
            //TODO: СДЕЛАТЬ ЛОГИКУ получения очко
            const dogX = this.dog.dogModelImage.attrs.x
            const dogY = this.dog.dogModelImage.attrs.y
            const dogWidth = (this.isMobile) ? 0 : 240
            if (block.parent
            && Math.round(dogX + dogWidth) >= Math.round(block.attrs.x)
            && Math.round(dogX + dogWidth) <= Math.round(block.attrs.x + this.stage.width() / 7)
            && Math.round(dogY + dogWidth / 2) >= Math.round(block.attrs.y)
            && Math.round(dogY + dogWidth / 2) <= Math.round(block.attrs.y + this.stage.height() / 7)) {
                this.points += Number(block.id())
                this.complexText.text(String(this.points))
                this.layer.draw()
                block.destroy()
            }
            const left = -this.speed * (frame.timeDiff / 1000)
            block.move({x: left, y: 0})
        }, this.layer)

        function stop() {
            anim.stop()
        }
        function start() {
            anim.start()
        }
        return {
            stop,
            start,
            block
        }
    }

    loadAsset(imageSrc, x, y, width, height, nameModel) {
        const image = new Image()
        image.src = `data:image/png;base64,${imageSrc.toString('base64')}`
        const imageModel = new Konva.Image({ x, y, image, width, height, name: nameModel })
        this.assets[nameModel] = imageModel
        this.layer.add(imageModel)
        return imageModel
    }

    loadBackground() {
        //TODO::разбить на методы и раскинуть по классам(скорее всего), чтобы сначала была синхронная загрузка файлов, а потом уже раскидка по слоям
        const image = new Image()
        image.src = `data:image/png;base64,${road.toString('base64')}`
        image.onload = () => {
        const scale = Math.max(this.stage.width() / image.width, this.stage.height() / image.height)
        const y = (this.stage.height() / 2) - (image.height / 2) * scale
        const width = image.width * scale
        const height = image.height * scale
        const imageModel = new Konva.Image({ x: 0, y, image, width, height })
        const imageModel2 = new Konva.Image({ x: width + 0, y, image, width, height })
        this.assets['park'] = imageModel
        this.assets['park2'] = imageModel2
        this.layer.add(imageModel)
        this.layer.add(imageModel2)
        this.drawPipes()
        this.drawGifts()
        this.moveBackground()
        this.dog.loadingModel()
        this.dog.dogModelImage.setZIndex(5)
        this.complexText = new Konva.Text({
            x: this.stage.width() - 200,
            y: 10,
            text: '0',
            fontSize: 48,
            fontFamily: 'Arial',
            fill: '#fff',
            width: 300,
            padding: 20,
            align: 'center'
          })
          this.drawLives()
          this.layer.add(this.complexText)
            this.layer.batchDraw()
        }
        
    }

    drawLives() {
        this.lives.push(this.loadAsset(heart, 20, 30, 48, 48, 'heart'))
        this.lives.push(this.loadAsset(heart, 90, 30, 48, 48, 'heart'))
        this.lives.push(this.loadAsset(heart, 160, 30, 48, 48, 'heart'))
    }
}