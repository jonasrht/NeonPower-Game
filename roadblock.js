const roadblockImg = new Image();
roadblockImg.src = 'assets/img/roadblock.png';

class Roadblock {
    constructor(x, y) {
        this.x = x;
        this.y = y
        this.speed = 2;
        this.spriteWidth = getRandomInt(120, 381); // max. 381
        this.spriteHeight = 64;
    }

    draw() {
        console.log(this.spriteWidth);
        ctx.drawImage(roadblockImg, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }

    update() {
        this.y += this.speed;

        if (this.y > canvas.height) {
            this.y = 0 - this.spriteHeight;
            this.spriteWidth = getRandomInt(120, 381)
        }

        if (car.y < this.y + this.spriteHeight && car.x < this.x + this.spriteWidth && car.y + car.height > this.y && car.x + car.width > this.x) {
            // Wenn man das Stern Powerup eingesammelt hat, dann werden bei einer Kollision keine Leben abgezogen
            if (starMode) {

            } else {
                live--;
            }

            // Wenn die Anzahl der Leben = 0 ist, führe die Funktion handleGameOver() aus
            if (live <= 0) {
                tutorialWatched = true;
                handleGameOver();
            }
        }
    }
}
