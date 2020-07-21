let matrixFont
let symbolSize = 40
let end = false
let framelimit = Infinity
let streams = []

function preload() {
    matrixFont = loadFont("./matrix.ttf")
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    background(0)
    textSize(symbolSize)
    let x = 0
    for (var i = 0; i <= width / symbolSize; i++) {
        let stream = new Stream()
        stream.initialize(x, random(-1000, 0));
        streams.push(stream)
        x += width / symbolSize

    }

}

let alpha = 0

function draw() {
    background(0, random(50, 100))
    if (frameCount >= framelimit)
        end = true
    if (frameCount <= framelimit + 400)
        streams.forEach(stream => stream.render())
    else {
        textSize(1.5 * symbolSize)
        fill(10, 143, 30, alpha)
        textFont(matrixFont)
        text("K A V I I  S U R I", width / 2 - 180, height / 2)
        alpha += 0.5
    }



}

class Symbols {
    constructor(x, y, speed, first) {
        this.x = x
        this.y = y
        this.speed = speed
        this.value
        this.switchInterval = round(random(2, 20))
        this.first = first
    }

    setToRandomSymbol() {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            )
        }
    }



    render() {
        if (this.first && random(0, 1) < 0.35) {
            fill(180, 200, 180)
        } else {
            fill(0, 143, 17)
        }
        text(this.value, this.x, this.y)
        this.rain()
        this.setToRandomSymbol()
    }

    rain() {
        if (!end && this.y >= height)
            this.y = 0;
        else this.y += this.speed
    }
}

class Stream {
    constructor() {
        this.symbols = []
        this.totalSymbols = round(random(3, 30));
        this.speed = random(3, 25)
    }
    initialize(x, y) {

        let first = true
        for (let i = 0; i <= this.totalSymbols; i++) {
            let symbol = new Symbols(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol)
            y -= symbolSize
            first = false
        }
    }
    render() {
        this.symbols.forEach(symbol => {
            symbol.render()
        })
    }
}