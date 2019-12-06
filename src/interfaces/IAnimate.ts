export default interface IAnimate {
    moveUp(dog, y, duration): void
    moveDown(dog, y, duration): void
    pickUp(dog, person): void
    clash(dog, duration): void
    run(dogModel, layer): void
}