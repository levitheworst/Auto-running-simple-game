const gameDisplay = document.getElementById('display');
const ctx = gameDisplay.getContext('2d');

gameDisplay.width = 1366
gameDisplay.height = 555

const defaultGravity = 0.6
 
let gameTimer = 0

setInterval(function(){if(gameLost == false){gameTimer++, document.getElementById('timer').innerHTML = gameTimer}},1000)

let gameLost = false

class Background
{
    constructor({part1, part2, velocity, size, gravity})
    {
        this.part1 = part1
        this.part2 = part2
        this.velocity = velocity
        this.size = size
        this.gravity = gravity

        this.part1.img = new Image()
        this.part1.img.src = this.part1.imgsrc
        this.part2.img = new Image()
        this.part2.img.src = this.part2.imgsrc
    }
    draw()
    {
        ctx.drawImage(this.part1.img, 0, 0, this.part1.imgsizing.width, this.part1.imgsizing.height, this.part1.position.x, this.part1.position.y, this.size.x, this.size.y)
        ctx.drawImage(this.part2.img, 0, 0, this.part2.imgsizing.width, this.part2.imgsizing.height, this.part2.position.x, this.part2.position.y, this.size.x, this.size.y)
    }
    update()
    {
        this.draw()

        this.part1.position.x += this.velocity.x
        this.part2.position.x += this.velocity.x

        if(this.part1.position.x + this.size.x <= gameDisplay.width)
        {
            this.part2.position.x = this.part1.position.x + this.size.x
        }
        if(this.part2.position.x + this.size.x <= gameDisplay.width)
        {
            this.part1.position.x = this.part2.position.x + this.size.x
        }
    }
}

class Player
{
    constructor({position, velocity, size, gravity, imgsrc, imgframe, imgsizing})
    {
        this.position = position
        this.velocity = velocity
        this.size = size
        this.gravity = gravity

        this.sprite = new Image()
        this.sprite.src = imgsrc
        this.spritesizing = imgsizing
        this.spriteframe = imgframe
    }
    draw()
    {
        ctx.drawImage(this.sprite, 0, 0, this.spritesizing.width, this.spritesizing.height, this.position.x, this.position.y ,this.size.x, this.size.y)
    }
    update()
    {

        this.draw();

            this.velocity.y += this.gravity
            this.position.y += this.velocity.y
            this.position.x += this.velocity.x

            //limites de cenário (topo e chão)
            if(this.velocity.y + this.gravity + this.position.y > gameDisplay.height-this.size.y)
            {
                this.velocity.y = 0
                this.position.y = gameDisplay.height-this.size.y
            }
            else if(this.velocity.y + this.gravity + this.position.y < 0)
            {
                this.position.y = 0
            }

            //limites de cenário (lados)
            if(this.position.x + this.velocity.x > gameDisplay.width-this.size.x)
            {
                this.position.x = gameDisplay.width-this.size.x
            }
            else if(this.position.x + this.velocity.x < 0)
            {
                this.position.x = 0
            }

            //função final de controles
                //esquerda
            if(keyState.left.isPressed)
            {
                this.velocity.x = -10
            }
                //direita
            else if(keyState.right.isPressed)
            {
                this.velocity.x = 15
            }
            else
                //(direção nula)
            {
                this.velocity.x = 0
            }
                //cima (salto)
            if(this.position.y == gameDisplay.height-this.size.y && keyState.up.isPressed)
            {
                this.velocity.y += -15
            }

        
    }
}

class WaterDrop
{
    constructor({position, velocity, gravity,})
    {
        this.position = position
        this.velocity = velocity
        this.gravity = gravity

        this.sprite = new Image()
        this.sprite.src = 'sprites/drip.png'
    }
    draw()
    {
        ctx.drawImage(this.sprite, 0, 0, 40, 40, this.position.x, this.position.y, 40, 40)
    }
    update()
    {
        this.draw()
        if(this.velocity.y < 24){
        this.velocity.y += this.gravity/70
        }

        this.position.y += this.velocity.y

        if(this.position.y > gameDisplay.height+40)
        {
            this.position.x = Math.floor(Math.random()*(gameDisplay.width-40))
            this.position.y = -40
        }

        if(this.position.x + 40 >= player.position.x &&
            this.position.x <= player.position.x + player.size.x &&
            this.position.y + 40 >= player.position.y &&
            this.position.y <= player.position.y + player.size.y)
        {
            gameLost = true
        }
    }
}

setInterval(function () {
    switch(player.spriteframe)
    {
        case 1:
            player.sprite.src = 'sprites/jobman3.png'
            player.spriteframe = 3
        break;
        case 3:
            if(player.velocity.y == 0){
            player.sprite.src = 'sprites/jobman1.png'
            player.spriteframe = 1
            }
        break;
    }
}, 150)

//entrada de controles
    //tecla pressionada
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            keyState.up.isPressed = true
            break;
        case 'a':
        case 'ArrowLeft':
            keyState.left.isPressed = true
            break;
        case 's':
        case 'ArrowDown':
            keyState.down.isPressed = true
            break;
        case 'd':
        case 'ArrowRight':
            keyState.right.isPressed = true
            break;
        
    }
})
    //tecla solta
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
        case 'ArrowUp':
            keyState.up.isPressed = false
            break;
        case 'a':
        case 'ArrowLeft':
            keyState.left.isPressed = false
            break;
        case 's':
        case 'ArrowDown':
            keyState.down.isPressed = false
            break;
        case 'd':
        case 'ArrowRight':
            keyState.right.isPressed = false
            break;
        
    }
})

//estado das teclas
const keyState = {
    up: {isPressed: false},
    left: {isPressed: false},
    down: {isPressed: false},
    right: {isPressed: false}
}

const sky = new Background({
    part1: {position: {x:0, y:0}, imgsrc: "sprites/sky.png", imgsizing: {width:1366,height:555}},
    part2: {position: {x:gameDisplay.width, y:0}, imgsrc: "sprites/sky.png", imgsizing: {width:1366,height:555}},
    velocity: {x: -2, y: 0},
    size: {x:gameDisplay.width, y:gameDisplay.height},
    gravity: defaultGravity,

})

const buildingsbehind = new Background({
    part1: {position: {x:0, y:0}, imgsrc: "sprites/buildings_behind.png", imgsizing: {width:1366,height:555}},
    part2: {position: {x:gameDisplay.width, y:0}, imgsrc: "sprites/buildings_behind.png", imgsizing: {width:1366,height:555}},
    velocity: {x: -3, y: 0},
    size: {x:gameDisplay.width, y:gameDisplay.height},
    gravity: defaultGravity,

})

const buildingsfront = new Background({
    part1: {position: {x:0, y:0}, imgsrc: "sprites/buildings_front.png", imgsizing: {width:1366,height:555}},
    part2: {position: {x:gameDisplay.width, y:0}, imgsrc: "sprites/buildings_front.png", imgsizing: {width:1366,height:555}},
    velocity: {x: -5, y: 0},
    size: {x:gameDisplay.width, y:gameDisplay.height},
    gravity: defaultGravity,

})

const player = new Player({
    position:{x:(gameDisplay.width/2)-50, y: (gameDisplay.height-50)},
    velocity:{x:0, y:0},
    size: {x:96, y:144},
    gravity: defaultGravity,
    imgsrc: "sprites/jobman1.png",
    imgsizing: {x: 0, y: 0, width: 90, height: 144},
    imgframe: 1
})

var drip1 = new WaterDrop({
    position: {x: Math.floor(Math.random()*(gameDisplay.width-40)), y: -40},
    velocity:{x:0, y:0},
    gravity: Math.random()
})
var drip2 = new WaterDrop({
    position: {x: Math.floor(Math.random()*(gameDisplay.width-40)), y: -40},
    velocity:{x:0, y:0},
    gravity: Math.random()
})
var drip3 = new WaterDrop({
    position: {x: Math.floor(Math.random()*(gameDisplay.width-40)), y: -40},
    velocity:{x:0, y:0},
    gravity: Math.random()
})
var drip4 = new WaterDrop({
    position: {x: Math.floor(Math.random()*(gameDisplay.width-40)), y: -40},
    velocity:{x:0, y:0},
    gravity: Math.random()
})
var drip5 = new WaterDrop({
    position: {x: Math.floor(Math.random()*(gameDisplay.width-40)), y: -40},
    velocity:{x:0, y:0},
    gravity: Math.random()
})

function anim()
{
    window.requestAnimationFrame(anim)
    ctx.clearRect(0, 0, gameDisplay.width, gameDisplay.height)
    if(gameLost){
        player.sprite.src = 'sprites/jobman9.png'
        player.update()
        player.velocity = {x: 0}
        keyState.up.isPressed = false
    }
    else if(gameLost == false)
    {
        sky.update()
        buildingsbehind.update()
        buildingsfront.update()
        player.update()
        drip1.update()
        drip2.update()
        drip3.update()
        drip4.update()
        drip5.update()
    }
}

anim()
