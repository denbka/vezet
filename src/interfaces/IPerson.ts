export default interface IPerson {
    readonly points: Number
    readonly lives: Number
    points(): void
    lives(): void
}