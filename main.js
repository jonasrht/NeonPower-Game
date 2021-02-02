const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

//Import stuff aus index.html
const startGameBtn = document.querySelector('#startGameBtn');
const resumeGameBtn = document.querySelector('#resumeGameBtn');
const mainDiv = document.querySelector('#mainDiv');
const pauseBtn = document.querySelector('#pause');
const mainMenu = document.querySelector('#mainMenu');
const controlsBtn = document.querySelector('#controls');
const creditsBtn = document.querySelector('#credits');
const backBtn = document.querySelector('#back');
const bgAudio = document.getElementById('bgAudio');
const muteBtn = document.getElementById('muteBtn');
const startEngine = document.getElementById('startEngine');
const fullscreenBtn = document.getElementById('fullscreenBtn');

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

    // Roadblock reset
    roadblock.x = 390;
    roadblock.y = 0;
    roadblock1.x = 750
    roadblock1.y = -400;
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

const roadblock = new Roadblock(390, 0);
const roadblock1 = new Roadblock(750, -400);

function handleRoadblock() {
    roadblock.draw();
    roadblock1.draw();
    roadblock.update();
    roadblock1.update();
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

const gameoverImg = new Image();
gameoverImg.src = 'assets/img/gameover.png'

// Game Over Funktion
function handleGameOver() {
    // Grauer Hintergrund
    ctx.drawImage(gameoverImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('Your score is:' + score, 120, 660);
    mainDiv.style.display = 'flex';
    mainMenu.style.display = 'none';
    mainDiv.style.marginTop = '80px';
    startGameBtn.style.marginTop = '250px';
    bgAudio.pause();
    gameOver = true;
}

// Score anzeige
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '30px pressStart2P';
    ctx.fillText('Score: ' + score, 45, 50);
}

// Vollbildmodus starten
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

// Vollbildmodus verlassen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// Vollbildmodus verlassen
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

const pauseImg = new Image();
pauseImg.src = 'assets/img/pauseImg.png'

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Pause Funktion
function handlePause() {
    // Grauer Hintergrund
    ctx.fillStyle = ('rgba(34,34,34,0.6)');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Pause Bild (altes Radio)
    ctx.drawImage(pauseImg, 325, 200, 630, 512);
    // Score anzeigen
    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('Your score is:' + score, 150, 600);
    //resumeGameBtn.style.display = 'flex';
    // var myButton = document.createElement("button");
    // myButton.id = 'startGameBtn';
    // myButton.innerHTML = 'Resume'
    //document.body.appendChild(myButton);
    // document.getElementById("pause").appendChild(myButton);
    pauseBtn.style.display = 'flex';
    document.getElementById("pause").onclick = function () {
        pauseBtn.style.display = 'none';
        pause = false;
    }

}


//-----------------------------------------------------
// ANIMATION LOOP
//-----------------------------------------------------
function animate() {
    if (!pause) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background Methode aufrufen
        background1();

        //Erstellen der Spielfigur
        car.update();
        car.draw();
        if (frame < 500 && tutorialWatched == false && pause == false) {
            drawTutorial();
        } else {
            handlePowerup();
            //Erstellen der Gegner
            if (frame > 5000 && frame < 6000) {
                handleRoadblock();
            } else {
                handleEnemies();
            }
            drawScore();
            drawLives();
            score++;

            // Leben +1 Schriftzug, bei powerup. Wird in powerups.js auf true gesetzt.
            if (drawPlusLive) {
                ctx.fillStyle = 'rgb(57,255,20)';
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

//// Menu

// Play Button
startGameBtn.addEventListener('click', () => {
    init();
    animate();
    startEngine.play();
    bgAudio.play();
    bgAudio.currentTime = 0;
    mainDiv.style.display = 'none';
    canvas.style.backgroundImage = 'none';
})

// Controls Button
controlsBtn.addEventListener('click', () => {
    mainDiv.style.display = 'none';
    mainMenu.style.display = 'none';
    backBtn.style.display = 'flex';
    console.log("Controllllas");
})

// Credits Button
creditsBtn.addEventListener('click', () => {
    mainDiv.style.display = 'none';
    mainMenu.style.display = 'none';
    backBtn.style.display = 'flex';
    console.log("Credits <3");
})

// Back Button
backBtn.addEventListener('click', () => {
    mainDiv.style.display = 'flex';
    mainMenu.style.display = 'flex';
    backBtn.style.display = 'none';
    console.log("back in bus");
})

// Mute Button
muteBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
        console.log("play");
        bgAudio.play();
    } else {
        console.log("pause");
        bgAudio.pause();
    }
})

// Vollbild Button
fullscreenBtn.addEventListener('click', () => {
    enterFullscreen(canvas);
})


//// AUDIO

window.onload = function () {
    bgAudio.play();
}


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
        if (pauseCounter % 2 && !gameOver) {
            pause = true;
            handlePause();
            bgAudio.pause();
        } else {
            pause = false;
            pauseBtn.style.display = 'none';
            //resumeGameBtn.style.display = 'none';
            bgAudio.play();
        }
    }
})





