// Bild für das Powerup einlesen
const powerupImg = new Image();
powerupImg.src = 'assets/img/power_up.png';

const powerupSound = document.getElementById('powerupSound');

// Power-ups Klasse
class Powerups {
    constructor() {
        this.x = getRandomInt(400, 790);
        this.y = -1000;
        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.speed = 2;
    }

    draw() {
        // Powerup Bild zeichnen
        ctx.save();
        ctx.shadowColor = 'rgb(255,105,180)';
        ctx.shadowBlur = 15;
        ctx.drawImage(powerupImg, this.x, this.y, this.spriteWidth, this.spriteHeight);
        this.y += this.speed;
        ctx.restore();

        if (this.y > canvas.height) {
            this.y = -1000 - this.spriteHeight;
            this.x = getRandomInt(400, 790);
        }

        const dx = car.x - this.x;
        const dy = car.y - this.y;
        if (car.y < this.y + this.spriteHeight && car.x < this.x + this.spriteWidth && car.y + car.height > this.y && car.x + car.width > this.x) {
            powerupSound.play();
            powerupSound.volume = '0.1';
            //Switch case
            switch (getRandomIntInclusive(2, 2)) {
                case 0:
                    console.log("0");
                    live++;
                    drawPlusLive = true;
                    break;
                case 1:
                    console.log("1");
                    car.speed++;
                    break;
                case 2:
                    console.log("2");
                    starMode = true;
                default:
                    break;
            }

            this.x = 9000;
            this.y = 9000;
            this.x = getRandomInt(400, 790);
            //this.y = getRandomInt(0, 790);
            //this.draw();
        }
    }

    update() {
        this.y += this.speed;


    }
}


function drawText() {
    ctx.fillStyle = 'green';
    ctx.font = '30px pressStart2P';
    ctx.fillText('+1 live', 90, 150);
}