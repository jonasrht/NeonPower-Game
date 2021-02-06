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
const tryAgain = document.getElementById('tryAgain');
const lauter = document.getElementById('Lauter');
const leiser = document.getElementById('Leiser');
const txtName = document.getElementById('txtName');
const repairSound = document.getElementById('repairSound');
const gameDiv = document.getElementById('gameDiv');
const policeSound = document.getElementById('policeSound');
const speedUpSound = document.getElementById('speedUp');
const crashSound = document.getElementById('crashSound');
const blockCrashSound = document.getElementById('blockCrashSound');
const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
const volUpBtn = document.getElementById('volUp');
const volDownBtn = document.getElementById('volDown');
const buttonSound = document.getElementById('buttonSound');

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
var ga = 0.0;
let powerUpNum = getRandomIntInclusive(0, 2);;
let masterVolume = 0.1;
let hitted = false;

buttonSound.volume = masterVolume;

// Werte reset nach gameover
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
    ga = 0.0;
    speedBar.frameX = 0;
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
    ctx.drawImage(flower, 950, BG.y1 + 490);

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
    powerup.update();
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

const spaceImg = new Image();
spaceImg.src = 'assets/img/space.png'

function drawTutorial() {

    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('Press', 525, 80);

    // "W A S D" Bild
    ctx.drawImage(wasd, 450, 100, 440, 288);

    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('To move', 460, 500);

    // Spacebar Bild
    ctx.drawImage(spaceImg, 400, 515, 220, 144)

    ctx.fillStyle = 'white';
    ctx.font = '30px pressStart2P';
    ctx.fillText('To pause', 650, 605);
}

const gameoverImg = new Image();
gameoverImg.src = 'assets/img/gameover.png'

function fade() {
    ctx.save();
    ctx.shadowColor = 'red';
    ctx.shadowBlur = 15;
    // Deckkraft = ga 
    ctx.globalAlpha = ga;
    // Gameover background image
    ctx.drawImage(gameoverImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '60px pressStart2P';
    ctx.fillText('Your score is:' + score, 120, 660);
    // Deckkraft erhöhen
    ga += 0.01;
    if (ga >= 1.0) setTimeout(function () { console.log("done"); }, 8000);
    else requestAnimationFrame(fade);
    ctx.restore();
}

const speedBarImg = new Image();
speedBarImg.src = 'assets/img/speedBar.png'

const speedBar = {
    y: 650,
    x: 1148,
    frameX: 0,
    frameY: 0,
    width: 203,
    height: 972
}

// Bild und Schrift der Speedbar anzeige unten links
function handleSpeedBar() {
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.shadowColor = 'rgb(255,105,180)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'white';
    ctx.font = '30px pressStart2P';
    ctx.fillText('Speed', 1100, 1000);
    ctx.drawImage(speedBarImg, speedBar.frameX * speedBar.width, speedBar.frameY * speedBar.height, speedBar.width, speedBar.height, speedBar.x, speedBar.y, speedBar.width / 3, speedBar.height / 3);
    ctx.restore();
}

// function sendData() {
//     // const data = new FormData();

//     // data.append("name", 55);

//     // xhr.send(data);
//     const toSend = {
//         name: "test",
//         score: 500
//     };

//     const jsonString = JSON.stringify(toSend);
//     console.log(jsonString);

//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "receive.php", true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(jsonString);
// }


// const scoreboardBody = document.getElementById("rows");

// function addData() {
//     const request = new XMLHttpRequest();

//     request.open("get", "data/scoreboard.json");
//     request.onload = () => {
//         try {
//             const json = JSON.parse(request.responseText);
//             popScore(json);
//         } catch (e) {
//             console.warn("Konnte keinen score laden :(");
//         }

//     };
//     request.send();
// }

// document.addEventListener("DOMContentLoaded", () => { sendData(); });

// function popScore(json) {
//     //console.log(json);

//     // Bestehende Daten aus der Tabelle löschen
//     while (scoreboardBody.firstChild) {
//         scoreboardBody.removeChild(scoreboardBody.firstChild);
//     }

//     json.forEach((row) => {
//         const tr = document.createElement("tr");
//         row.forEach((cell) => {
//             const td = document.createElement("td");
//             td.textContent = cell;
//             tr.appendChild(td);
//         });

//         scoreboardBody.appendChild(tr);
//     });
// }

// document.addEventListener("DOMContentLoaded", () => { addData(); });



// Game Over Funktion
function handleGameOver() {
    // Police sound
    policeSound.play();
    policeSound.volume = masterVolume;
    // Grauer Hintergrund
    fade();
    //ctx.globalAlpha = 0.1;
    // ctx.drawImage(gameoverImg, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    canvas.appendChild(input);
    tryAgain.style.display = 'flex';
    tryAgain.style.marginTop = '150px';
    mainMenu.style.display = 'none';
    mainDiv.style.marginTop = '80px';
    startGameBtn.style.marginTop = '250px';
    mainDiv.style.marginTop = '50px';
    startGameBtn.style.width = '204px';
    startGameBtn.style.height = '74px';
    startGameBtn.style.marginTop = '50px';
    startGameBtn.style.marginLeft = '50px';
    // backBtn.style.display = 'flex'

    // Highscore save
    txtName.style.display = 'flex';
    var logStream = fs.createWriteStream('/highscore.txt', { 'flags': 'w' });
    logStream.write(this.score);

    console.log('f1')
    bgAudio.pause();
    console.log(ga);
    gameOver = true;
}



// Score anzeige
function drawScore() {
    ctx.save();
    ctx.shadowColor = 'rgb(255,105,180)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'white';
    ctx.font = '30px pressStart2P';
    ctx.fillText('Score: ' + score, 45, 50);
    ctx.restore();
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
    ctx.save();
    ctx.shadowColor = 'rgb(255,105,180)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'white';
    ctx.font = '30px pressStart2P';
    ctx.fillText('Lives: ' + live, 45, 100);
    ctx.restore();
}

const addLive = {
    x: 300,
    y: 150,
    width: canvas.width,
    height: canvas.height
}

const pauseImg = new Image();
pauseImg.src = 'assets/img/pauseImg.png';

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
    // Volume
    ctx.font = '13px pressStart2P';
    ctx.fillText('VOL:' + masterVolume, 820, 430);
    pauseBtn.style.display = 'flex';
    document.getElementById("pause").onclick = function () {
        pauseBtn.style.display = 'none';
        pause = false;
        bgAudio.play();
        leiser.style.display = 'none';
        lauter.style.display = 'none';
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
                enemy1.x = 500;
                enemy1.y = -1000;
                enemy2.x = 700;
                enemy2.y = -1000;
            } else {
                handleEnemies();
            }
            drawScore();
            drawLives();
            handleSpeedBar();
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
                    bgAudio.playbackRate = 1.0;
                    starMode = false;
                }
                starModeCount++;
            }

            if (hitted) {
                if (starModeCount == 200) {
                    starModeCount = 0;
                    hitted = false;
                }
                starModeCount++;
            }
        }
        // Wenn Gameover, dann unterbreche den Animation loop
        if (frame > 10000) {
            frame = 501;
            roadblock.x = 390;
            roadblock.y = 0;
            roadblock1.x = 750
            roadblock1.y = -400;
        } else {
            frame++;
        }
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
    startEngine.volume = masterVolume;
    bgAudio.play();
    bgAudio.volume = masterVolume;
    bgAudio.currentTime = 0;
    mainDiv.style.display = 'none';
    canvas.style.backgroundImage = 'none';
})

// Controlscreen hinzufügen
const controlScreen = new Image();
controlScreen.src = 'assets/img/Controls_screen.png';

// Controls Button
controlsBtn.addEventListener('click', () => {
    buttonSound.play();
    mainDiv.style.display = 'none';
    mainMenu.style.display = 'none';
    backBtn.style.display = 'flex';
    console.log("Controllllas");
    ctx.drawImage(controlScreen, 0, 0, canvas.width, canvas.height);
})

// Credits Bild hinzufügen
const creditsImg = new Image();
creditsImg.src = 'assets/img/logo_stamm_neon_glow2.png';

// Credits Button
creditsBtn.addEventListener('click', () => {
    buttonSound.play();
    mainDiv.style.display = 'none';
    mainMenu.style.display = 'none';
    backBtn.style.display = 'flex';
    console.log("Credits <3");
    ctx.fillStyle = 'rgba(84, 14, 93, 0.61)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(creditsImg, 0, 0, canvas.width, canvas.height);
})

// Back Button
backBtn.addEventListener('click', () => {
    buttonSound.play();
    mainDiv.style.display = '';
    mainMenu.style.display = '';
    backBtn.style.display = 'none';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

lauter.addEventListener('click', () => {
    buttonSound.play();
    masterVolume += 0.1;
    console.log(masterVolume);
})
leiser.addEventListener('click', () => {
    buttonSound.play();
    masterVolume -= 0.1;
    console.log(masterVolume);
})

//TryAgain Button
tryAgain.addEventListener('click', () => {
    init();
    animate();
    startEngine.play();
    startEngine.volume = masterVolume;
    bgAudio.play();
    bgAudio.currentTime = 0;
    tryAgain.style.display = 'none';
    canvas.style.backgroundImage = 'none';
    txtName.style.display = 'none';
})

// Mute Button
muteBtn.addEventListener('click', () => {
    buttonSound.play();
    if (bgAudio.paused) {
        console.log("play");
        bgAudio.play();
    } else {
        console.log("pause");
        bgAudio.pause();
    }
})

volUpBtn.addEventListener('click', () => {
    buttonSound.play();
    masterVolume += 0.1;
    console.log(masterVolume);
})

volDownBtn.addEventListener('click', () => {
    buttonSound.play();
    masterVolume -= 0.1;
    console.log(masterVolume);
})

// Vollbild Button
fullscreenBtn.addEventListener('click', () => {
    buttonSound.play();
    fullscreenBtn.style.display = 'none';
    exitFullscreenBtn.style.display = 'block';
    enterFullscreen(gameDiv);
})

// exitFullscreen
exitFullscreenBtn.addEventListener('click', () => {
    buttonSound.play();
    fullscreenBtn.style.display = 'block';
    exitFullscreenBtn.style.display = 'none';
    exitFullscreen(gameDiv);
})

//// AUDIO

window.onload = function () {
    bgAudio.play();
    bgAudio.volume = masterVolume;
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
        if (pauseCounter % 2 && live > 0) {
            if (frame > 500) {
                pause = true;
                handlePause();
                bgAudio.pause();
                leiser.style.display = 'flex';
                lauter.style.display = 'flex';
            }
        } else {
            pause = false;
            pauseBtn.style.display = 'none';
            leiser.style.display = 'none';
            lauter.style.display = 'none';
            //resumeGameBtn.style.display = 'none';
            bgAudio.play();
        }
    }
})





