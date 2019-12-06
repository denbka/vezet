export default interface IDog {
    dogPosition: Number
    dogState: String[]
    image: HTMLImageElement
    up(): void
    down(): void
    run(dogModel, layer): void
}