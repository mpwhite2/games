basic.showString ("PRESS A FOR ASTEROIDS   PRESS B FOR SPACE BATTLE",70)
input.onButtonPressed(Button.A, function() {
asteroids ()   
})
input.onButtonPressed(Button.B, function() {
ties ()   
})





function ties () {
let random = 0
let Y_Acceleration = 0
let X_Acceleration = 0
let laser = null
let tie = game.createSprite(0, 0)
game.startCountdown(60000)
basic.forever(function () {
    X_Acceleration = input.acceleration(Dimension.X)
    Y_Acceleration = input.acceleration(Dimension.Y)
    game.createSprite(1, 3)
    game.createSprite(3, 3)
    game.createSprite(3, 1)
    input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
        laser = game.createSprite(2, 2)
        basic.pause(300)
        if (laser.isTouching(tie)) {
            tie.delete()
            game.addScore(10)
            tie = game.createSprite(0, 0)
        }
        laser.delete()
    })
    // move tie
    random = randint(0, 3)
    if (random == 0) {
        tie.change(LedSpriteProperty.Y, 1)
        basic.pause(300)
    }
    if (random == 1) {
        tie.change(LedSpriteProperty.Y, -1)
        basic.pause(300)
    }
    if (random == 2) {
        tie.change(LedSpriteProperty.X, 1)
        basic.pause(300)
    }
    if (random == 3) {
        tie.change(LedSpriteProperty.X, -1)
        basic.pause(300)
    }
    if (X_Acceleration > 120) {
        tie.change(LedSpriteProperty.X, 1)
    } else if (X_Acceleration < 120) {
        tie.change(LedSpriteProperty.X, -1)
    }
    if (Y_Acceleration > 120) {
        tie.change(LedSpriteProperty.Y, 1)
    } else if (Y_Acceleration < 120) {
        tie.change(LedSpriteProperty.Y, -1)
    }
    if (game.isGameOver() && input.buttonIsPressed(Button.A)) {
        control.reset()
    }
    game.createSprite(1, 1)
})}
function asteroids (){
    // player controlls
    let player : game.LedSprite = null
    input.onButtonPressed(Button.A, function () {
        player.change(LedSpriteProperty.X, -1)
    })
    input.onButtonPressed(Button.B, function () {
        player.change(LedSpriteProperty.X, 1)
    })
    let station: game.LedSprite = null
    let airlock: game.LedSprite = null
    let asteroid: game.LedSprite = null
    let AliveOrnot = 1
    // variables
    player = game.createSprite(2, 4)
    let delay = 350
    // asteroid movment
    basic.forever(function () {
        while (AliveOrnot) {
            asteroid = game.createSprite(Math.randomRange(4, 0), -1)
            // move asteroid
            while (asteroid.get(LedSpriteProperty.Y) < 4) {
                asteroid.change(LedSpriteProperty.Y, 1)
                basic.pause(delay)
            }
            asteroid.delete()
            game.addScore(1)
            // speed up asteroids
            delay = delay - delay / 70
            // check for player collisions
            if (player.get(LedSpriteProperty.Y) == asteroid.get(LedSpriteProperty.Y) && player.get(LedSpriteProperty.X) == asteroid.get(LedSpriteProperty.X)) {
                AliveOrnot = 0
                game.gameOver()
                break;
            }
            // station
            if (game.score() % 40 == 0) {
                airlock = game.createSprite(2, 0)
                station = game.createSprite(3, 0)
                while (airlock.get(LedSpriteProperty.Y) < 4) {
                    airlock.change(LedSpriteProperty.Y, 1)
                    station.change(LedSpriteProperty.Y, 1)
                    basic.pause(delay)
                }
                // check for succsessful docking
                if (player.get(LedSpriteProperty.Y) == airlock.get(LedSpriteProperty.Y) && player.get(LedSpriteProperty.X) == airlock.get(LedSpriteProperty.X)) {
                    basic.showString("+100 POINTS")
                    game.addScore(100)
                }
                // delete station
                if (airlock.isTouchingEdge()) {
                    airlock.delete()
                    station.delete()
                }
            }
        }
    })

}
