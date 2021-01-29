// Bild für das Powerup einlesen
const powerupImg = new Image();
powerupImg.src = 'assets/img/power_up.png';

// Power-ups Klasse
class Powerups {
    constructor(){
        this.x = 500;
        this.y = 100;
        this.spriteWidth = 32;
        this.spriteHeight = 32; 
    }

    draw(){
        // Powerup Bild zeichnen
        ctx.drawImage(powerupImg, this.x, this.y, this.spriteWidth, this.spriteHeight)

        const dx = car.x - this.x;
        const dy = car.y - this.y;
        if (car.y < this.y + this.spriteHeight && car.x < this.x + this.spriteWidth && car.y + car.height > this.y && car.x + car.width > this.x) {
            
            //Switch case
            switch (getRandomIntInclusive(0, 2)) {
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
            this.y = getRandomInt(0, 790);
            //this.draw();
        }
    }
    }

    
  function drawText() {
        ctx.fillStyle = 'green';
        ctx.font = '30px pressStart2P';
        ctx.fillText('+1 live', 90, 150);
    }