// Bild für das Powerup einlesen
const powerupImg = new Image();
powerupImg.src = 'assets/img/power_up.png';

const speedAnimation = new Image();
speedAnimation.src = 'assets/img/speedanimation.png';

const oneUpImg = new Image();
oneUpImg.src = 'assets/img/oneupicontest.png';

const powerupSound = document.getElementById('powerupSound');

// Power-ups Klasse
class Powerups {

    constructor() {
        this.x = getRandomInt(400, 790);
        this.y = -1000;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.speed = 2;
        this.powerUpNum = getRandomIntInclusive(1, 1);
        this.animationFrame = 0;
    }

    draw() {
        console.log("Number: " + powerUpNum);
        switch (powerUpNum) {
            case 0:
                // Powerup Bild zeichnen
                ctx.save();
                ctx.shadowColor = 'rgb(255,105,180)';
                ctx.shadowBlur = 15;
                ctx.drawImage(oneUpImg, this.x, this.y, 64, 64);
                ctx.restore();
                break;
            case 1:
                //ctx.drawImage(speedAnimation, this.x, this.y, 61, 59);
                ctx.drawImage(speedAnimation, this.frameX * 61, this.frameY * 59, 61, 59, this.x, this.y, 61, 59);
                break;
            case 2:
                ctx.save();
                ctx.shadowColor = 'rgb(255,105,180)';
                ctx.shadowBlur = 15;
                ctx.drawImage(powerupImg, this.x, this.y, this.spriteWidth, this.spriteHeight);
                ctx.restore();
                break;

            default:
                break;
        }


        if (this.y > canvas.height) {
            this.y = -1000 - this.spriteHeight;
            this.x = getRandomInt(400, 790);
        }

        const dx = car.x - this.x;
        const dy = car.y - this.y;
        if (car.y < this.y + this.spriteHeight && car.x < this.x + this.spriteWidth && car.y + car.height > this.y && car.x + car.width > this.x) {
            powerupSound.volume = '0.1';
            //Switch case
            switch (powerUpNum) {
                case 0:
                    live++;
                    repairSound.play();
                    repairSound.currentTime = '0.1';
                    drawPlusLive = true;
                    break;
                case 1:
                    speedUpSound.play();
                    speedUpSound.volume = masterVolume;
                    car.speed++;
                    break;
                case 2:
                    powerupSound.play();
                    bgAudio.playbackRate = 1.5;
                    starMode = true;
                default:
                    break;
            }

            this.x = 9000;
            this.y = 9000;
            this.x = getRandomInt(400, 790);
            powerUpNum = getRandomIntInclusive(0, 2);
            //this.y = getRandomInt(0, 790);
            //this.draw();
        }
    }

    update() {
        this.y += this.speed;
        if (frame % 10 == 0) {
            this.animationFrame++;
            //console.log(animationFrame);
            if (this.animationFrame >= 3) {
                this.animationFrame = 0;
                this.frameX = 0;
            } else {
                this.frameX++;
            }
        }

    }
}


function drawText() {
    ctx.fillStyle = 'green';
    ctx.font = '30px pressStart2P';
    ctx.fillText('+1 live', 90, 150);
}