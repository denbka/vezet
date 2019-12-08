export default interface ILevel {
    moveBackground(stage, layer, park, park2, block, dog): void
    drawBackground(): void
    drawPipes(stage, layer): void
    loadAsset(imageSrc, x, y, width, height, nameModel): void
    drawLives(): void
    drawCounterText(): void
    movePipes(block): void
    generateX(): void
    drawGifts(): void
    moveGifts(block): void
}