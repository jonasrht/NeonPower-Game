function setup() {
    let cnv = createCanvas(100, 100, WEBGL);
    cnv.parent('canvas1');
}
function draw() {
    console.log("Halu");
    background(220);
    ellipse(50, 50, 80, 80);
}