const ballArr = ['red','yellow','green','brown','blue', 'pink','black','free']
const fouls = ['4','5','6','7']
var minusLastBall = 0
var updatedBreak = 0
var remainingReds = 15
var remainingPoints = 147
var colourPoints = 27

document.addEventListener('DOMContentLoaded', start)

function start () {
    bindEventListeners(document.getElementsByClassName('balls'))
    bindButtons(document.getElementById('button'))
    bindFouls(document.getElementsByClassName('fouls'))
    document.getElementById('remainingPoints').innerHTML = remainingPoints
    document.getElementById('red').innerHTML = remainingReds
    assignFouls(fouls)
}

function bindEventListeners (balls) {
    for(var i= 0; i < balls.length; i++) {
       balls[i].addEventListener('click', updateStats)
    }
}

function bindButtons (button) {
       button.addEventListener('click', changePlayer)
} 

function bindFouls (foulButtons) {
    for(var i= 0; i < foulButtons.length; i++) {
        foulButtons[i].addEventListener('click', addFoul)
    }
}

function assignFouls (array) {
    console.log ('assignFouls is being called')
    for (i= 0; i < array.length; i++) {
        console.log('these are the foul buttons: ', document.getElementById(fouls[i]).innerHTML)
        document.getElementById(fouls[i]).innerHTML = fouls[i]
    }
}

// const ballArr = ['red','yellow','green','brown','blue', 'pink','black','free']
// const fouls = ['4','5','6','7']
// var minusLastBall = 0
// var updatedBreak = 0
// var remainingReds = 15
// var remainingPoints = 147
// var colourPoints = 27
// player 1 stats are stats[0], player 2 stats are stats[1]

var stats =[]
stats = [
    {
        red: 0,
        yellow: 0,
        green: 0,
        brown: 0,
        blue: 0,
        pink: 0,
        black: 0,
        maxBreak: 0,
        fouls: {
            '4':0,
            '5':0,
            '6':0,
            '7':0
        },
        totalScore: 0,
    }, 
    {   
        red: 0,
        yellow: 0,
        green: 0,
        brown: 0,
        blue: 0,
        pink: 0,
        black: 0,
        maxBreak: 0,
        fouls: {
            '4':0,
            '5':0,
            '6':0,
            '7':0
        },
        totalScore: 0,
    }
]

function changePlayer () {
    if (document.getElementById('currentPlayer').innerHTML === 'Player 1') {
        document.getElementById('currentPlayer').innerHTML = 'Player 2'
    } else {
        document.getElementById('currentPlayer').innerHTML = 'Player 1'
    }
    updatedBreak = 0
    minusLastBall = 0
}

function foulMultiplier (colour) {
    for (var i = 0; i < fouls.length; i++) {
        if (colour === fouls[i]) {
           return i + 4 
        }
    }
}

function addFoul(evt) {
    var minusLastFoul = {
        '4':0,
        '5':0,
        '6':0,
        '7':0
    }
    var updatedFoul= {
        '4':0,
        '5':0,
        '6':0,
        '7':0
    }    
    var foulDiff = {
        '4':0,
        '5':0,
        '6':0,
        '7':0,
    }

    for (var i =0; i < fouls.length; i++) {
        if (evt.target.id === fouls[i]) {
            updatedFoul[fouls[i]]++
            foulDiff[fouls[i]] = updatedFoul[fouls[i]] - minusLastFoul[fouls[i]]  
        }
        if (document.getElementById('currentPlayer').innerHTML === 'Player 1') {
            stats[1]['totalScore'] += foulMultiplier(fouls[i]) * foulDiff[fouls[i]] 
            stats[0]['fouls'][fouls[i]] += foulDiff[fouls[i]]
            document.getElementById('player2Score').innerHTML = stats[1]['totalScore'] 
        } else {
            stats[0]['totalScore'] += foulMultiplier(fouls[i]) * foulDiff[fouls[i]] 
            stats[1]['fouls'][fouls[i]] += foulDiff[fouls[i]] 
            document.getElementById('player1Score').innerHTML = stats[0]['totalScore']       
        }
    }
}

//function that passes the ballArr array as an argument and returns the corresponding values for each ball

function ballValue(colour) {
    for (var i = 0; i < 7; i++) {
        if (colour === ballArr[i]) {
            return i + 1
        } 
    }
    if (colour === 'free') {
        return 1
    }
}

//updateStats function is called when the corresponding coloured ball is clicked, increments the ball count in player stat array and
//calls the countScore function to update the totalscore being displayed

function updateStats (evt) {
    // foulUpdate(number)
    var player = document.getElementById('currentPlayer').innerHTML

// increment the count of the respective players ball count(in the stats array) if the target id that was clicked matches that colour
    minusLastBall = updatedBreak
    updatedBreak += ballValue(evt.target.id)
    // Everything above this line is CHILL

    if (player === 'Player 1') {
        for (var i =0; i < ballArr.length; i++) {
            if (evt.target.id === ballArr[i]) {
                stats[0][ballArr[i]]++
            }
        }
        stats[0]['totalScore'] += updatedBreak - minusLastBall
        document.getElementById('player1Score').innerHTML = stats[0]['totalScore']
        document.getElementById('currentBreak1').innerHTML = updatedBreak
        if(stats[0]['maxBreak'] < updatedBreak) {
            stats[0]['maxBreak'] = updatedBreak
        }
    } else if (player === 'Player 2') {
        for (var i =0; i < ballArr.length; i++) {
            if (evt.target.id === ballArr[i]) {
                stats[1][ballArr[i]]++
            }
        }
        stats[1]['totalScore'] += updatedBreak - minusLastBall
        document.getElementById('player2Score').innerHTML = stats[1]['totalScore']
        document.getElementById('currentBreak2').innerHTML = updatedBreak
        if(stats[1]['maxBreak'] < updatedBreak) {
            stats[1]['maxBreak'] = updatedBreak
        }
    }
    if (evt.target.id === 'red') {
        remainingReds--
    }

    remainingPoints = 8*remainingReds + 27
    document.getElementById('remainingPoints').innerHTML = remainingPoints
    document.getElementById('red').innerHTML = remainingReds

    // points on the table once reds are gone:
    if (remainingReds > 0) {
        remainingPoints = 8*remainingReds + 27
    document.getElementById('remainingPoints').innerHTML = remainingPoints
    document.getElementById('red').innerHTML = remainingReds
    } else if (remainingReds <= 0){
        if (evt.target.id === 'yellow') {
            colourPoints -= 2
            remainingPoints = colourPoints
        } else if (evt.target.id === 'green') {
            colourPoints -= 3 
            remainingPoints = colourPoints
        } else if (evt.target.id === 'brown') {
            colourPoints -= 4 
            remainingPoints = colourPoints
        } else if (evt.target.id === 'blue') {
            colourPoints -= 5
            remainingPoints = colourPoints
        } else if (evt.target.id === 'pink') {
            colourPoints -= 6
            remainingPoints = colourPoints
        } else if (evt.target.id === 'black') {
            colourPoints -= 7 
            remainingPoints = colourPoints
        }

    document.getElementById('remainingPoints').innerHTML = remainingPoints
    console.log(colourPoints)
    }

    console.log('Player 1 stats: ', stats[0])
    console.log('Player 2 stats: ', stats[1])
    
    // function viewStats ()
}