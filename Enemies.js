const policeCarImg = new Image();
policeCarImg.src = 'assets/img/police.png';

const policeCarSpriteImg = new Image();
policeCarSpriteImg.src = 'assets/img/policeSprite.png';

class Enemies {
    constructor() {
        this.x = 500;
        this.y = -40;
        this.speed = Math.random() * 2 + 5;
        this.frame = 0;
        this.eneFrame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 76;
        this.spriteHeight = 193;
    }

    draw() {
        //ctx.drawImage(policeCarImg, this.x, this.y, this.spriteWidth, this.spriteHeight)
        ctx.drawImage(policeCarSpriteImg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight)
    }

    update() {
        frame++;
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0 - this.spriteHeight;
            this.x = getRandomInt(400, 790);
            this.speed = Math.random() * 2 + 5;
        }

        // Animation
        if (frame % 50 == 0) {
            this.eneFrame++;
            if (this.eneFrame >= 3) {
                this.eneFrame = 0;
                this.frameX = 0;
            } else {
                this.frameX++;
            }
        }

        //Kollision
        const dx = car.x - this.x;
        const dy = car.y - this.y;
        if ((car.y) < this.y + this.spriteHeight && car.x < this.x + this.spriteWidth && (car.y) + car.height > this.y && car.x + car.width > this.x) {
            // Wenn man das Stern Powerup eingesammelt hat, dann werden bei einer Kollision keine Leben abgezogen
            if (starMode) {

            } else if (hitted) {

            } else {
                live--;
                hitted = true;
            }

            // Enemies verschwinden nach einer Kollision
            this.x = getRandomInt(400, 790);
            this.y = 0 - this.spriteHeight;
            // Wenn die Anzahl der Leben = 0 ist, führe die Funktion handleGameOver() aus
            if (live <= 0) {
                tutorialWatched = true;
                handleGameOver();
            }
        }
    }
}