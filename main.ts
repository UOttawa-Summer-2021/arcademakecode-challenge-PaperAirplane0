namespace SpriteKind {
    export const Button = SpriteKind.create()
}
function pressButton (button: string, num: number) {
    if (allowInput && userTurn) {
        if (lights[currentGuess] == num) {
            currentGuess += 1
            if (button == "red") {
                redPress()
            } else if (button == "blue") {
                bluePress()
            } else if (button == "green") {
                greenPress()
            } else if (button == "yellow") {
                yellowPress()
            }
        } else {
            wrongGuess()
        }
        if (currentGuess == lights.length) {
            pause(500)
            music.playTone(523, music.beat(BeatFraction.Quarter))
            music.playTone(622, music.beat(BeatFraction.Quarter))
            music.playTone(784, music.beat(BeatFraction.Quarter))
            music.playTone(932, music.beat(BeatFraction.Half))
            music.playTone(784, music.beat(BeatFraction.Quarter))
            music.playTone(932, music.beat(BeatFraction.Half))
            pause(500)
            score += 1
            currentGuess = 0
            userTurn = false
            addLight()
            lightUp()
        }
    }
}
function redPress () {
    allowInput = false
    red.setImage(assets.image`redButtonPush`)
    red.startEffect(effects.fountain, 500)
    music.playTone(262, music.beat(BeatFraction.Quarter))
    music.playTone(311, music.beat(BeatFraction.Quarter))
    music.playTone(392, music.beat(BeatFraction.Quarter))
    music.playTone(466, music.beat(BeatFraction.Quarter))
    pause(500)
    red.setImage(assets.image`redButton`)
    pause(500)
    allowInput = true
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    pressButton("red", 0)
})
function bluePress () {
    allowInput = false
    blue.setImage(assets.image`blueButtonPush`)
    blue.startEffect(effects.fountain, 500)
    music.playTone(349, music.beat(BeatFraction.Quarter))
    music.playTone(415, music.beat(BeatFraction.Quarter))
    music.playTone(523, music.beat(BeatFraction.Quarter))
    music.playTone(622, music.beat(BeatFraction.Quarter))
    pause(500)
    blue.setImage(assets.image`blueButton`)
    pause(500)
    allowInput = true
}
function setButton () {
    red = sprites.create(assets.image`redButton`, SpriteKind.Player)
    red.setPosition(80, 40)
    green = sprites.create(assets.image`greenButton`, SpriteKind.Player)
    green.setPosition(80, 80)
    blue = sprites.create(assets.image`blueButton`, SpriteKind.Player)
    blue.setPosition(60, 60)
    yellow = sprites.create(assets.image`yellowButton`, SpriteKind.Player)
    yellow.setPosition(100, 60)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    pressButton("blue", 1)
})
function lightUp () {
    for (let value of lights) {
        if (value == 0) {
            redPress()
        } else if (value == 1) {
            bluePress()
        } else if (value == 2) {
            greenPress()
        } else {
            yellowPress()
        }
    }
    userTurn = true
    currentGuess = 0
}
function yellowPress () {
    allowInput = false
    yellow.setImage(assets.image`yellowButtonPush`)
    yellow.startEffect(effects.fountain, 500)
    music.playTone(311, music.beat(BeatFraction.Quarter))
    music.playTone(392, music.beat(BeatFraction.Quarter))
    music.playTone(466, music.beat(BeatFraction.Quarter))
    music.playTone(587, music.beat(BeatFraction.Quarter))
    pause(500)
    yellow.setImage(assets.image`yellowButton`)
    pause(500)
    allowInput = true
}
function addLight () {
    randLight = randint(0, 3)
    lights.push(randLight)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    pressButton("yellow", 3)
})
function wrongGuess () {
    game.over(false, effects.melt)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    pressButton("green", 2)
})
function greenPress () {
    allowInput = false
    green.setImage(assets.image`greenButtonPush`)
    green.startEffect(effects.fountain, 500)
    music.playTone(208, music.beat(BeatFraction.Quarter))
    music.playTone(262, music.beat(BeatFraction.Quarter))
    music.playTone(311, music.beat(BeatFraction.Quarter))
    music.playTone(392, music.beat(BeatFraction.Quarter))
    pause(500)
    green.setImage(assets.image`greenButton`)
    pause(500)
    allowInput = true
}
let randLight = 0
let yellow: Sprite = null
let green: Sprite = null
let blue: Sprite = null
let red: Sprite = null
let userTurn = false
let lights: number[] = []
let allowInput = false
let currentGuess = 0
scene.setBackgroundColor(1)
setButton()
let scoreDisplay = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let score = 0
currentGuess = 0
allowInput = false
lights = []
userTurn = false
addLight()
lightUp()
forever(function () {
    pause(100)
    scoreDisplay.say(score)
})
