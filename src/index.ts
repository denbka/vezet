import Konva from 'konva'
import './assets/index.scss'
import { Game, Dog, Animate, Level, Person } from './models'




(() => {

  let mobile = true
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('isMobile');
    } else {
      mobile = false
  }

    const width = window.innerWidth
    const height = window.innerHeight

    const stage = new Konva.Stage({
        container: 'game',
        width,
        height,
      })

    const roadLines = [
      stage.height() / 3,
      stage.height() / 2,
      stage.height() / 1.4,
    ]

    const layer = new Konva.Layer()
    
    stage.add(layer)
    
    const dog = new Dog(roadLines, layer, stage, mobile)
    const level = new Level(stage, layer, dog, roadLines, mobile)
    const animate = new Animate()
    const person = new Person()

    const game = new Game(
      stage,
      dog,
      level,
      person
    )
})()
  
  