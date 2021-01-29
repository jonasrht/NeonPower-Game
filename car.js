const carModel = new Image();
carModel.src = 'assets/img/car.png';

const carModelLeft = new Image();
carModelLeft.src = 'assets/img/car-left.png';

const carModelRight = new Image();
carModelRight.src = 'assets/img/car-right.png';

const carCrashModel = new Image();
carCrashModel.src = 'assets/img/carCrash.png';

const carCrashModel2 = new Image();
carCrashModel2.src = 'assets/img/carCrash2.png';

const carCrashModel3 = new Image();
carCrashModel3.src = 'assets/img/carCrash3.png';

const carStar = new Image();
carStar.src = 'assets/img/car-star.png';

class Car {

    // Konstruktor für das Auto Objekt
    constructor() {
        this.x = 530;
        this.y = 825;
        this.vy = 0;
        this.speed = 5;
        this.width = 87;
        this.height = 178;
    }

    // Methode um speed und postion zu kalkulieren
    update() {

        // Grenten
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
            ctx.drawImage(carStar, this.x, this.y, this.width, this.height);
            //ctx.drawImage(carModel, this.x, this.y, this.width, this.height);
        } else {
            switch (live) {
                // Bild bei null Leben
                case 0:
                    ctx.drawImage(carCrashModel3, this.x, this.y, this.width, this.height);
                    break;
                // Bild bei einem Leben
                case 1:
                    ctx.drawImage(carCrashModel2, this.x, this.y, this.width, this.height);
                    break;
                // Bild bei zwei Leben
                case 2:
                    ctx.drawImage(carCrashModel, this.x, this.y, this.width, this.height);
                    break;
                // Bild bei mehr als zwei Leben
                default:
                    if (aPressed) {
                        ctx.drawImage(carModelLeft, this.x, this.y, 108, 178);
                    } else if (dPressed) {
                        ctx.drawImage(carModelRight, this.x, this.y, 108, 178);
                    } else {
                        ctx.drawImage(carModel, this.x, this.y, this.width, this.height);
                    }

                    break;
            }
        }

    }
}

// Erstellen des Auto Objekts
const car = new Car();