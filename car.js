// Default Auto
const carModel = new Image();
carModel.src = 'assets/img/car.png';

const carModelLeft = new Image();
carModelLeft.src = 'assets/img/car-left.png';

const carModelRight = new Image();
carModelRight.src = 'assets/img/car-right.png';

// Crashed Auto 
const carCrackRight1 = new Image();
carCrackRight1.src = 'assets/img/crack_1-right.png';

const carCrackRight2 = new Image();
carCrackRight2.src = 'assets/img/crack_2-right.png';

const carCrackLeft1 = new Image();
carCrackLeft1.src = 'assets/img/crack_1-left.png';

const carCrackLeft2 = new Image();
carCrackLeft2.src = 'assets/img/crack_2-left.png';

const carCrashModel = new Image();
carCrashModel.src = 'assets/img/crack_1.png';

const carCrashModel2 = new Image();
carCrashModel2.src = 'assets/img/crack2.png';

const carCrashModel3 = new Image();
carCrashModel3.src = 'assets/img/carCrash3.png';

// Star Auto
const carStar = new Image();
carStar.src = 'assets/img/carStarSprite.png';


const carSound = document.getElementById('carSound');
const carStarRight = new Image();
carStarRight.src = 'assets/img/car-star-right.png';

const carStarLeft = new Image();
carStarLeft.src = 'assets/img/carStarSpriteLeft.png';

const hittedImg = new Image();
hittedImg.src = 'assets/img/hittedImg.png';

class Car {

    // Konstruktor für das Auto Objekt
    constructor() {
        this.x = 530;
        this.y = 825;
        this.frameX = 0;
        this.frameY = 0;
        this.carFrame = 0;
        this.vy = 0;
        this.speed = 5;
        this.width = 87;
        this.height = 178;
    }

    // Methode um speed und postion zu kalkulieren
    update() {
        this.speed = 3;

        // Animation
        if (starMode) {
            if (frame % 10 == 0) {
                this.carFrame++;
                if (this.carFrame >= 6) {
                    this.carFrame = 0;
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
            }
        }

        if (hitted) {
            if (frame % 10 == 0) {
                this.carFrame++;
                if (this.carFrame >= 3) {
                    this.carFrame = 0;
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
            }
        }


        // Grenzen

        if (this.y > canvas.height - this.height) {
            this.y -= this.speed;
        }

        if (this.y < 0) {
            this.y += this.speed;
        }

        if (this.x > canvas.width - this.width) {
            this.x -= this.speed;
        }

        // x-Achsen grenze für die bewegung des Autos
        if (this.x > 790) {
            this.x -= this.speed;
        }

        if (this.x < 400) {
            this.x += this.speed;
        }


        if (wPressed) {
            //console.log("y: " + this.y)
            //carSound.play()
            this.y -= this.speed;
        }
        if (sPressed) {
            //console.log("y: " + this.y);
            this.y += this.speed;
        }
        if (aPressed) {
            //console.log("x: " + this.x);
            this.x -= this.speed;
        }
        if (dPressed) {
            //console.log("x: " + this.x)
            this.x += this.speed;
        }

    }

    draw() {
        if (starMode == true) {
            ctx.drawImage(carStar, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        } else if (hitted) {
            ctx.drawImage(hittedImg, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        } else {
            switch (live) {
                // Bild bei null Leben
                case 0:
                    ctx.drawImage(carCrashModel3, this.x, this.y, this.width, this.height);
                    break;
                // Bild bei einem Leben
                case 1:
                    if (aPressed) {
                        ctx.drawImage(carCrackLeft2, this.x, this.y, 108, 178);
                    } else if (dPressed) {
                        ctx.drawImage(carCrackRight2, this.x, this.y, 108, 178);
                    } else {
                        ctx.drawImage(carCrashModel2, this.x, this.y, this.width, this.height);
                    }
                    break;
                // Bild bei zwei Leben
                case 2:
                    if (aPressed) {
                        ctx.drawImage(carCrackLeft1, this.x, this.y, 108, 178);
                    } else if (dPressed) {
                        ctx.drawImage(carCrackRight1, this.x, this.y, 108, 178);
                    } else {
                        ctx.drawImage(carCrashModel, this.x, this.y, this.width, this.height);
                    }
                    break;
                // Bild bei mehr als zwei Leben
                default:
                    if (aPressed) {
                        ctx.drawImage(carModelLeft, this.x, this.y, 108, 178);
                    } else if (dPressed) {
                        ctx.drawImage(carModelRight, this.x, this.y, 108, 178);
                    } else {
                        //// Um Hitbox zu verbesserb, Zeile 147 und 148 benutzen
                        //ctx.fillStyle = 'red';
                        ctx.drawImage(carModel, this.x, this.y, this.width, this.height);

                    }
                    break;
            }

        }

    }
}

// Erstellen des Auto Objekts
const car = new Car();