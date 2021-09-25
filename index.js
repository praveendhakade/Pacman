const gridEl = document.querySelector('.grid')
const scoreEl = document.getElementById('score')
let squares = []
const width = 28
let score = 0

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

function createGrid(){
    for (let i = 0; i < layout.length; i++) {

        const square = document.createElement('div')

        gridEl.appendChild(square)
        
        squares.push(square)

        if (layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1){
            squares[i].classList.add('wall')
        } else if (layout[i] === 2){
            squares[i].classList.add('ghost-lair')
        } else if (layout[i] === 3){
            squares[i].classList.add('power-pellet')
        }
    }   
}

createGrid()

// Display Pacman
let currentPacmanIndex = 490
squares[currentPacmanIndex].classList.add('pacman')

// Pacman controls

function control(e){
    squares[currentPacmanIndex].classList.remove('pacman')
    switch(e.keyCode){
        case 40:
        if (
            !squares[currentPacmanIndex + width].classList.contains('wall') &&
            !squares[currentPacmanIndex + width].classList.contains('ghost-lair') &&
            currentPacmanIndex + width < width*width
        )
        currentPacmanIndex += width
        break
        case 39:
        if (
            !squares[currentPacmanIndex + 1].classList.contains('wall') &&
            !squares[currentPacmanIndex + 1].classList.contains('ghost-lair') &&
            currentPacmanIndex % width < width-1
        )
        currentPacmanIndex += 1
        if (currentPacmanIndex === 391){
            currentPacmanIndex = 364
        }
        break
        case 38:
        if (
            !squares[currentPacmanIndex - width].classList.contains('wall') &&
            !squares[currentPacmanIndex - width].classList.contains('ghost-lair') &&
            currentPacmanIndex - width >=0
        )
        currentPacmanIndex -= width
        break
        case 37:
        if (
            !squares[currentPacmanIndex - 1].classList.contains('wall') &&
            !squares[currentPacmanIndex - 1].classList.contains('ghost-lair') &&
            currentPacmanIndex % width !== 0
        )
        currentPacmanIndex -= 1
        if (currentPacmanIndex === 364){
            currentPacmanIndex = 391
        }
        break
    }
    squares[currentPacmanIndex].classList.add('pacman')
    eatingPacdots()
    eatingPowerPellet()
    defeat()
    win()
}
document.addEventListener('keyup', control)

// Eating pacdots

function eatingPacdots(){
    if ( squares[currentPacmanIndex].classList.contains('pac-dot')){
        squares[currentPacmanIndex].classList.remove('pac-dot')
        score++
        scoreEl.innerHTML = score
    }
}



// Adding Ghosts

let Ghost = class {
    constructor(className, startIndex, speed){
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('red', 348, 250),
    new Ghost('violet', 376, 400),
    new Ghost('sapphire', 351, 300),
    new Ghost('lily', 379, 500)
]
ghosts.forEach(ghost => squares[ghost.currentIndex].classList.add(ghost.className))
ghosts.forEach(ghost => squares[ghost.currentIndex].classList.add("ghost"))

// Eating power pellet

function eatingPowerPellet(){
    if ( squares[currentPacmanIndex].classList.contains('power-pellet')){
        squares[currentPacmanIndex].classList.remove('power-pellet')
        score+=15
        scoreEl.innerHTML = score
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
    }
}
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}


// Moving ghosts randomly

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
    const directions = [ -1,+1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    

    ghost.timerId = setInterval(function(){

        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost','scared-ghost')
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random()* directions.length)]

         // scared ghost
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        
        //eating scared ghosts
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score +=100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
    
        defeat()
    }, ghost.speed)
}

// check for defeat
function defeat(){
    if (  squares[currentPacmanIndex].classList.contains('ghost') && 
        !squares[currentPacmanIndex].classList.contains('scared-ghost'))
        {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreEl.innerHTML = `Defeat`
    }
}
//check for win

function win(){
    if (score === 275){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreEl.innerHTML = `Victory`
    }
}