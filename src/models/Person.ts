export class Person {

    private _points
    private _lives: number = 3

    constructor() {

    }

    set points(points: Number) {
        this._points = points
    }

    get points() {
        return this._points
    }

    set lives(lives: Number) {
        this._lives = lives
    }

    get lives() {
        return this._lives
    }
}