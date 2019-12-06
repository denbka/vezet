export default interface ILevel {
    readonly speed: Number
    readonly location: String
    speed(): void
    location(): void
    run(bg, park): void
    moveBackground(stage, layer, park, park2, block, dog): void
    loadBackground(): void
    drawPipes(stage, layer): void
    loadAsset(imageSrc, x, y, width, height, nameModel): void
}