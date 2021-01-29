const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

//Import stuff aus index.html
const startGameBtn = document.querySelector('#startGameBtn');
const resumeGameBtn = document.querySelector('#resumeGameBtn');
const mainDiv = document.querySelector('#mainDiv');

// Breite und Höhe des Spiels
canvas.width = 1278;
canvas.height = 1024;

// Globale Variablen
let midX = canvas.width;
let midY = canvas.height;
let aPressed = false;
let dPressed = false;
let wPressed = false;
let sPressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let live = 3;
let gameSpeed = 2;
let gameOver = false;
let drawPlusLive = false;
let starMode = false;
let starModeCount = 0;
let tutorialWatched = false;
let pause = false;
let pauseCounter = 0;

function init() {
    midX = canvas.width;
    midY = canvas.height;
    aPressed = false;
    dPressed = false;
    wPressed = false;
    sPressed = false;
    kPressed = false;
    angle = 0;
    hue = 0;
    frame = 0;
    score = 0;
    live = 3;
    gameSpeed = 2;
    gameOver = false;
    drawPlusLive = false;
    starMode = false;
    starModeCount = 0;

    // Car reset
    car.x = 530;
    car.y = 825;
    car.speed = 5;

    // Policecar reset
    enemy1.x = 500;
    enemy1.y = -40;
    enemy2.x = 700;
    enemy2.y = -40;
}

// Font importieren
var pressStart2P = new FontFace('pressStart2P', 'url(./font/press-start-2p-v9-latin-regular.woff2)', {
    style: 'normal',
    weight: '400'
});
pressStart2P.load();
document.fonts.add(pressStart2P);

// Hintergrundbild zuweisen
const backgroundPic = new Image();
backgroundPic.src = 'assets/img/street.png';

// Bilder für Gebäude
const building1 = new Image();
building1.src = 'assets/img/building_1.png'

const building2 = new Image();
building2.src = 'assets/img/building4.png'

const building3 = new Image();
building3.src = 'assets/img/building_tankstelle.png'

const building4 = new Image();
building4.src = 'assets/img/building_hotel.png'

// Blume Bild
const flower = new Image();
flower.src = 'assets/img/flowers-big.png'

const BG = {
    y1: 0,
    y2: -canvas.height,
    x: 0,
    width: canvas.width,
    height: canvas.height
}

// Funktion, um den Hintergrund im loop zu wiederholen
function background1() {

    // Loop
    BG.y1 += gameSpeed;
    if (BG.y1 >= BG.height - gameSpeed) {
        BG.y1 = -1 * (BG.height - gameSpeed);
    }
    BG.y2 += gameSpeed;

    if (BG.y2 >= BG.height - gameSpeed) {
        BG.y2 = -1 * (BG.height - gameSpeed);
    }
    //// Bilder
    // Straße
    ctx.drawImage(backgroundPic, BG.x, BG.y1, BG.width, BG.height);
    ctx.drawImage(backgroundPic, BG.x, BG.y2, BG.width, BG.height);

    // Gebäude
    ctx.drawImage(building1, -80, BG.y1);
    ctx.drawImage(building2, 890, BG.y1);
    ctx.drawImage(building3, 890, BG.y2);
    ctx.drawImage(building4, 3, BG.y2 + 100);

    // Blumen
    ctx.drawImage(flower, 950, BG.y2 - 81);
    ctx.drawImage(flower, 950, BG.y2 - 229);
    ctx.drawImage(flower, 950, BG.y2 - 377);
    ctx.drawImage(flower, 950, BG.y2 - 525);

}

// Zufallszahl erzeugen
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Erstellen der Gegner Objekte.
const enemy1 = new Enemies();
const enemy2 = new Enemies();

function removeEnemies() {
    if (enemy1.x == enemy2.x) {
        enemy2.x += 100;
    }
}

function handleEnemies() {
    enemy1.draw();
    enemy2.draw();
    enemy1.update();
    enemy2.update();
    removeEnemies();
}
// Erstellen der Powerup Objekte.
const powerup = new Powerups();

function handlePowerup() {
    powerup.draw();
}

const wasd = new Image();
wasd.src = 'assets/img/wasd.png'

function drawTutorial() {

    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('Press', 525, 80);

    // "W A S D" Bild
    ctx.drawImage(wasd, 420, 100);

    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('To move', 460, 500);
}



// Game Over Funktion
function handleGameOver() {
    ctx.fillStyle = 'red';
    ctx.font = '60px pressStart2P';
    ctx.fillText('GAME OVER', 420, 420);
    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('Your score is:' + score, 120, 520);
    mainDiv.style.display = 'flex';
    gameOver = true;
}

// Score anzeige
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '30px pressStart2P';
    ctx.fillText('Score: ' + score, 45, 50);
}

// Lebens Anzeige
function drawLives() {
    ctx.fillStyle = 'white';
    ctx.font = '30px pressStart2P';
    ctx.fillText('Lives: ' + live, 45, 100);
}

const addLive = {
    x: 300,
    y: 150,
    width: canvas.width,
    height: canvas.height
}

// Pause Funktion
function handlePause() {
    ctx.fillStyle = 'red';
    ctx.font = '60px pressStart2P';
    ctx.fillText('PAUSE', 480, 400);
    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('Your score is:' + score, 120, 500);
    resumeGameBtn.style.display = 'flex';
}


//-----------------------------------------------------
// ANIMATION LOOP
//-----------------------------------------------------
function animate() {
    if (!pause) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background Methode aufrufen
        background1();

        //Erstellen der Powerups
        //if (frame < 1000 || frame > 4000) {
        handlePowerup();
        //}


        //Erstellen der Spielfigur
        car.update();
        car.draw();
        if (frame < 500 && tutorialWatched == false) {
            drawTutorial();
        } else {
            //Erstellen der Gegner
            handleEnemies();
            drawScore();
            drawLives();
            score++;

            // Leben +1 Schriftzug, bei powerup. Wird in powerups.js auf true gesetzt.
            if (drawPlusLive) {
                ctx.fillStyle = 'green';
                ctx.font = '30px pressStart2P';
                ctx.fillText('+1', addLive.x, addLive.y);
                if (addLive.y > 100) {
                    addLive.y--;
                } else {
                    addLive.y = 150;
                    drawPlusLive = false;
                }
            }

            // Starmode
            if (starMode) {
                if (starModeCount == 500) {
                    starModeCount = 0;
                    starMode = false;
                }
                starModeCount++;
            }
        }
        // Wenn Gameover, dann unterbreche den Animation loop
        frame++;
    }
    if (!gameOver) {
        requestAnimationFrame(animate);
    }
}


startGameBtn.addEventListener('click', () => {
    init();
    animate();
    mainDiv.style.display = 'none';
})





// Tasten drücken abfragen
window.addEventListener('keydown', function (e) {

    // Wenn die Leertaste gedrückt wird, setze die spacePressed Variable auf true.
    if (e.code == 'KeyA') {
        aPressed = true;
    }
    if (e.code == 'KeyD') {
        dPressed = true;
    }
    if (e.code == 'KeyW') {
        wPressed = true;
    }
    if (e.code == 'KeyS') {
        sPressed = true;
    }
})

// Tasten loslassen abfragen
window.addEventListener('keyup', function (e) {

    // Wenn die Leertaste gedrückt wird, setze die spacePressed Variable auf true.
    if (e.code == 'KeyA') {
        aPressed = false;
    }
    if (e.code == 'KeyD') {
        dPressed = false;
    }
    if (e.code == 'KeyW') {
        wPressed = false;
    }
    if (e.code == 'KeyS') {
        sPressed = false;
    }
})

// Tasten drücken abfragen
window.addEventListener('keypress', function (e) {

    // Wenn die Leertaste gedrückt wird, setze die spacePressed Variable auf true.
    if (e.code === 'Space') {
        pauseCounter++;
        if (pauseCounter % 2) {
            pause = true;
            handlePause();
        } else {
            pause = false;
            resumeGameBtn.style.display = 'none';
        }
    }
})





