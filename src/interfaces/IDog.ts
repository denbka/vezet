export default interface IDog {
    dogPosition: Number
    dogState: String[]
    image: HTMLImageElement
    up(): void
    down(): void
    clash(): void
    setAnimate(animationName): void
    loadingModel(): void
}