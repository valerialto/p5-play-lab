var leftWall
var rightWall
var topWall
var bottomWall
var obstacle1
var obstacle2
var obstacle3
var obstacles
var walls
var player
var prize
var won = false

function setup(){
    createCanvas(800, 500)
    //leftWall = createSprite(x,y,width,height)
    leftWall = createSprite(0, 250, 20, 500)
    rightWall = createSprite(800, 250, 20, 500)
    topWall = createSprite(400, 0, 800, 20)
    bottomWall = createSprite(400, 500, 800, 20)
    
    // to make sure that the walls do not move we use imovable
    leftWall.immovable = true
    rightWall.immovable = true
    topWall.immovable = true
    bottomWall.immovable = true
    
    
    obstacle1=createSprite(500, 220, 30, 30)
    obstacle2=createSprite(200, 300, 30, 30)
    obstacle3=createSprite(100, 100, 30, 30)
    
    //obstacle1.setVelocity(x velocity, y velocity)
    obstacle1.setVelocity(8, 7)
    obstacle2.setVelocity(8, 7)
    obstacle3.setVelocity(8, 7)
    
    //sprite.bounce(otherSprite, explosion)
    //we group sprites together when we want them to behave in the same way
    walls = new Group()
    walls.add(leftWall)
    walls.add(rightWall)
    walls.add(topWall)
    walls.add(bottomWall)
    
    obstacles = new Group()
    obstacles.add(obstacle1)
    obstacles.add(obstacle2)
    obstacles.add(obstacle3)
    
    player = createSprite(30, 250, 20, 20)
    player.draw = function(){
        fill(300,5,3)
        ellipse(0,0, 20, 20)
    }
    
    //the first thing we need to do is to load in the image
    var image = loadImage("myPrize.jpg")
    prize = createSprite(700,250,100,100)
    //add image to sprite
    prize.addImage(image)
    prize.immovable = true
    
}

function draw(){
    background(155)
    obstacles.bounce(walls)
    
    if(keyDown(LEFT_ARROW)){
        player.setVelocity(-5,0)
    }
    else if(keyDown(RIGHT_ARROW)){
        player.setVelocity(5,0)
    }
    else if(keyDown(UP_ARROW)){
        player.setVelocity(0,-5)
    }
    else if(keyDown(DOWN_ARROW)){
        player.setVelocity(0,5)
    }
    else{
        player.setVelocity(0,0)
    }
    player.collide(walls)
    //the second way that we can use collide is to call a function that we call when our sprites collide
    
    player.collide(obstacles,loose)
    prize.bounce(obstacles)
    player.collide(prize, win)
    
    if(won){
        textSize(32)
        text("YOU WON!! CONGRATS!!", 200, 250)
    }
    
    drawSprites()
    
}

function loose(){
    player.position.x = 30
    player.position.y = 250
}

function win(){
    won = true
}