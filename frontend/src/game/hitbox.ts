const isIn = (v, a, b) => v >= a && v <= b;

const minOrMaxIn = (a: Hitbox, b: Hitbox, xORy: string) =>
    isIn(a[xORy].min, b[xORy].min, b[xORy].max) ||
    isIn(a[xORy].max, b[xORy].min, b[xORy].max);

export class Hitbox {
    readonly x = Object.seal({
        min: 0,
        max: 0
    })

    readonly y = Object.seal({
        min: 0,
        max: 0
    })

    constructor(xA: number, xB: number, yA: number, yB: number) {
        this.x.min = xA < xB ? xA : xB;
        this.x.max = xA < xB ? xA : xB;

        this.y.min = yA < yB ? yA : yB;
        this.y.max = yA < yB ? yA : yB;
    }

    intersects(o: Hitbox) {
        const a = this;
        const b = o;

        if (minOrMaxIn(a, b, 'x'))
            return true;

        if (minOrMaxIn(a, b, 'y'))
            return true;

        if (minOrMaxIn(b, a, 'x'))
            return true;

        if (minOrMaxIn(b, a, 'y'))
            return true;
    }
}