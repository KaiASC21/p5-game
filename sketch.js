let charmanderXPos = 100;
let charmanderYPos = 100;
let mewtwoXPos = 300;
let mewtwoYPos = 300;
 
let charmanderLeft, charmanderRight, charmanderTop, charmanderBottom;
let mewtwoLeft, mewtwoRight, mewtwoTop, mewtwoBottom;

let r = 0;
let g = 0;
let b = 255;

let score = 0;

let mewtwoxpixel = 50;
let mewtwoypixel = 50;
let test;

let charmanderImage;
let rareCandyImage;
let mewtwoImage;

let rareCandyArray = [];

let xSpeed;
let ySpeed;
let xDirection = 1;
let yDirection = 1;



function preload(){
    charmanderImage = loadImage("images/charmander.png");
    mewtwoImage = loadImage("images/mewtwo.png")
    rareCandyImage = loadImage("images/rareCandy.png");
}

function setup() {
    createCanvas(500, 500);
    noStroke();
    
    xSpeed = random(-4,4);
    ySpeed = random(-4,4);

    imageMode(CENTER);

    for (let i = 0; i < 10; i ++) {
        let temp = new rareCandy(rareCandyImage, random(25,475), random(25,475), random(25,50), random (2,5), random (2,5));
        rareCandyArray.push(temp);
    }
}

class rareCandy {
    constructor(image,x,y,radius, xspeed, yspeed) {
        this.picture = image;
        this.rareCandyXPos = x;
        this.rareCandyYPos = y;
        this.xylocation = radius;
        this.speedx = xspeed;
        this.speedy = yspeed;
    }
}
 function draw() {
    background(0);

    for (let w = 0; w<rareCandyArray.length; w++) {
        image(rareCandyArray[w].picture, rareCandyArray[w].rareCandyXPos, rareCandyArray[w].rareCandyYPos, rareCandyArray[w].xylocation, rareCandyArray[w].xylocation);

        rareCandyArray[w].rareCandyXPos += rareCandyArray[w].speedx;
        rareCandyArray[w].rareCandyYPos += rareCandyArray[w].speedy;
        if (rareCandyArray[w].rareCandyXPos > 525) {
            rareCandyArray[w].rareCandyXPos = -25;
        }
        if (rareCandyArray[w].rareCandyYPos > 525) {
            rareCandyArray[w].rareCandyYPos = -25;
        }
    }

    image(mewtwoImage,mewtwoXPos, mewtwoYPos, mewtwoxpixel, mewtwoypixel);

    mewtwoXPos = mewtwoXPos+(xSpeed*xDirection);
    mewtwoYPos = mewtwoYPos+(ySpeed*yDirection);
    if (mewtwoXPos < 25 || mewtwoXPos > 475) {
        xDirection = xDirection*-1;
    }
    if (mewtwoYPos < 25 || mewtwoYPos > 475) {
        yDirection = yDirection*-1;
    }
    image(charmanderImage,charmanderXPos, charmanderYPos, 50, 50);
  
    if (keyIsDown(LEFT_ARROW)) {
        charmanderXPos -= 3;
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
        charmanderXPos += 3;
    }
  
    if (keyIsDown(UP_ARROW)) {
        charmanderYPos -= 3;
    }
  
    if (keyIsDown(DOWN_ARROW)) {
        charmanderYPos += 3;
    }

    charmanderLeft = charmanderXPos - 25;
    charmanderRight = charmanderXPos + 25;
    charmanderTop = charmanderYPos - 25;
    charmanderBottom = charmanderYPos + 25;
  
    mewtwoLeft = mewtwoXPos - 10;
    mewtwoRight = mewtwoXPos + 10;
    mewtwoTop = mewtwoYPos - 10;
    mewtwoBottom = mewtwoYPos + 10;
 
    if (charmanderXPos>475) {
        charmanderXPos = 475;
    }
    if (charmanderXPos<25) {
        charmanderXPos = 25;
    }
    if (charmanderYPos>475) {
        charmanderYPos = 475;
    }
    if (charmanderYPos<25) {
        charmanderYPos = 25;
    }

    if (charmanderLeft > mewtwoRight || charmanderRight < mewtwoLeft || charmanderTop > mewtwoBottom || charmanderBottom < mewtwoTop) {
        for (let x = 0; x<rareCandyArray.length; x++) {
            if ((abs(dist(rareCandyArray[x].rareCandyXPos, rareCandyArray[x].rareCandyYPos, charmanderXPos, charmanderYPos))) < (rareCandyArray[x].xylocation)) {
                rareCandyArray.splice(x,1);
                score = score+1;
            }
        }
        if (score == 10) {
            background(0,0);
            fill(255);
            textSize(10);
            textAlign(BASELINE);
            text ("You win!!! The End Reload the page and play again!", 15, 60);
            exit();
        }
    }
  
    else {
        background(0,0);
        fill(255);
        textSize(10);
        textAlign(BASELINE);
        text ("The End Reload the page and play again!", 15, 60);
        exit();
    }

    fill(255);
    textSize(40);
    text('Score:' + score, 15, 60);
}