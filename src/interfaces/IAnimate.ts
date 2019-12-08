export default interface IAnimate {
    move(dog, y, duration): void
    pickUp(dog, person): void
    clash(dog, duration): void
    run(dogModel, layer): void
}