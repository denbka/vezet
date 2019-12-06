export default interface IGame {
    startGame(dogObj, layer, bg, stage): void
    stopGame(): void
    clash(): void
}