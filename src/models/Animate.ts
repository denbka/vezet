import IAnimate from '../interfaces/IAnimate'
import Konva from 'konva'

export class Animate implements IAnimate {


    /**
     * Вызов анимации перехода вверх
     */
    public moveUp(dog, y, duration) {
        const tween = new Konva.Tween({
            node: dog,
            y: y,
            easing: Konva.Easings.StrongEaseInOut,
            duration: duration
          })

          tween.play()
    }


    /**
     * Вызов анимации перехода вниз
     */
    public moveDown(dog, y, duration) {
        const tween = new Konva.Tween({
            node: dog,
            y: y,
            easing: Konva.Easings.StrongEaseInOut,
            duration: duration
          })

          tween.play()
    }


    /**
     * Вызов анимации подбора предмета
     */
    public pickUp(dog, person) {

    }

    /**
     * Вызов анимации столкновения
     */
    public clash(dog) {
        const tween = new Konva.Tween({
            node: dog,
            easing: Konva.Easings.StrongEaseInOut,
            duration: 0.250
          })

          tween.play()
    }

    /**
     * Вызов анимации бега
     */
    public run(dogModel, layer) {
        const anim = new Konva.Animation(function(frame) {
            const right = 500 * (frame.timeDiff / 1000)
            dogModel.move({x: right, y: 0})
        }, layer)
    
        anim.start()
    }

}
