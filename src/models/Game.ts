import IGame from '../interfaces/IGame'

export class Game implements IGame {
    
    public dog
    public level
    public person

    constructor (stage, dog, level, person) {
        this.dog = dog
        this.level = level
        this.person = person

        this.startGame()

    }

    public startGame() {
        // this.level.run()
        // this.dog.run()
    }

    public stopGame() {

    }

    public clash() {

    }
    
}











 