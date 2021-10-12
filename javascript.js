const ballArr = ['red','yellow','green','brown','blue', 'pink','black','free']
const fouls = ['4','5','6','7']
var minusLastBall = 0
var updatedBreak = 0
var remainingReds = 15
var remainingPoints = 147
var colourPoints = 27
var clickTracker = [{
    player: 1,
    action: '',
    key: '',
    pointsAwarded: 0,
    currentBreak: 0,
    totalScore: 0
}]

document.addEventListener('DOMContentLoaded', start)

function start () {
    bindEventListeners(document.getElementsByClassName('balls'))
    document.getElementById('button').addEventListener('click', changePlayer)
    bindFouls(document.getElementsByClassName('fouls'))
    document.getElementById('remainingPoints').innerHTML = remainingPoints
    document.getElementById('red').innerHTML = remainingReds
    assignFouls(fouls)
    document.getElementById('undo').innerHTML = 'undo'
    document.getElementById('undo').addEventListener('click', undoLast)


}

function bindEventListeners (balls) {
    for(var i= 0; i < balls.length; i++) {
       balls[i].addEventListener('click', updateStats)
    }
}

function bindFouls (foulButtons) {
    for(var i= 0; i < foulButtons.length; i++) {
        foulButtons[i].addEventListener('click', addFoul)
    }
}

// assignFouls assigns the number to each foul button at the start
function assignFouls (array) {
    for (i= 0; i < array.length; i++) {
        document.getElementById(fouls[i]).innerHTML = fouls[i]
    }
}

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

// function that is called when foul buttons are clicked, adds the
function addFoul(evt) {
    var updatedFoul= {
        '4':0,
        '5':0,
        '6':0,
        '7':0
    }
    for (var i =0; i < fouls.length; i++) {
        var newFoul = 0

        if (evt.target.id === fouls[i]) {
            updatedFoul[fouls[i]]++
        }
        if (document.getElementById('currentPlayer').innerHTML === 'Player 1') {
            if (foulMultiplier(fouls[i]) * updatedFoul[fouls[i]] > 0) {
                newFoul = foulMultiplier(fouls[i]) * updatedFoul[fouls[i]]
                stats[1]['totalScore'] += newFoul
                stats[0]['fouls'][fouls[i]] ++
                document.getElementById('player2Score').innerHTML = stats[1]['totalScore']
                clickTracker.push ({
                    player: 1,
                    action: 'foul',
                    key: evt.target.id,
                    pointsAwarded: newFoul,
                    currentBreak: updatedBreak,
                    totalScore: stats[0]['totalScore']
                })
            }
        } else {
            if (foulMultiplier(fouls[i]) * updatedFoul[fouls[i]] > 0) {
                newFoul = foulMultiplier(fouls[i]) * updatedFoul[fouls[i]]
                stats[0]['totalScore'] += newFoul
                stats[1]['fouls'][fouls[i]] += 1
                document.getElementById('player1Score').innerHTML = stats[0]['totalScore']
                clickTracker.push ({
                    player: 2,
                    action: 'foul',
                    key: evt.target.id,
                    pointsAwarded: newFoul,
                    currentBreak: document.getElementById('currentBreak2').innerHTML,
                    totalScore: stats[0]['totalScore']
                })
            }
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

function remainingPoints() {

}
//updateStats function is called when the corresponding coloured ball is clicked, increments the ball count
// and adds the current break (updatedBreak) to the totalscore value in the player stat array. Updates the
// visible player score by assigning the new totalScore value to the element.

function updateStats (evt) {
    var player = document.getElementById('currentPlayer').innerHTML
    minusLastBall = updatedBreak
    updatedBreak += ballValue(evt.target.id)
    for (var i =0; i < ballArr.length; i++) {
        if (player === 'Player 1') {
            if (evt.target.id === ballArr[i]) {
                stats[0][ballArr[i]]++
            }
            if (updatedBreak > stats[0]['totalScore']){
                stats[0]['totalScore'] += updatedBreak - minusLastBall
            }
            document.getElementById('player1Score').innerHTML = stats[0]['totalScore']
            document.getElementById('currentBreak1').innerHTML = updatedBreak
            if(stats[0]['maxBreak'] < updatedBreak) {
                stats[0]['maxBreak'] = updatedBreak
            }
        } else if (player === 'Player 2') {
            if (evt.target.id === ballArr[i]) {
                stats[1][ballArr[i]]++
            }
            if (updatedBreak > stats[1]['totalScore']){
                stats[1]['totalScore'] += updatedBreak - minusLastBall
            }
            document.getElementById('player2Score').innerHTML = stats[1]['totalScore']
            document.getElementById('currentBreak2').innerHTML = updatedBreak
            if(stats[1]['maxBreak'] < updatedBreak) {
                stats[1]['maxBreak'] = updatedBreak
            }
        }
    }
    if (player === 'Player 1') {
        clickTracker.push({
            player: 1,
            action: 'ball',
            key: evt.target.id,
            pointsAwarded: ballValue(evt.target.id),
            currentBreak: parseInt(document.getElementById('currentBreak1').innerHTML),
            totalScore: stats[0]['totalScore']
        })
    } else {
        clickTracker.push({
            player: 2,
            action: 'ball',
            key: evt.target.id,
            pointsAwarded: ballValue(evt.target.id),
            currentBreak: parseInt(document.getElementById('currentBreak2').innerHTML),
            totalScore: stats[1]['totalScore']
        })
    }
    if (evt.target.id === 'red') {
        remainingReds--
    }
    document.getElementById('remainingPoints').innerHTML = remainingPoints
    document.getElementById('red').innerHTML = remainingReds

    // points on the table once reds are gone:

    if (remainingReds > 0) {
        remainingPoints = 8*remainingReds + 27
    document.getElementById('remainingPoints').innerHTML = remainingPoints
    document.getElementById('red').innerHTML = remainingReds
    } else if (remainingReds <= 0){
        for( var i= 1; i < ballArr.length; i++ ) {
            if (evt.target.id === ballArr[i]) {
                colourPoints -= ballValue(ballArr[i])
                remainingPoints = colourPoints
            }
        }
    document.getElementById('remainingPoints').innerHTML = remainingPoints
    }
    console.log('Player 1 stats: ', stats[0])
    console.log('Player 2 stats: ', stats[1])
}

function undoLast () {
    updatedBreak = 0
    var lastClick = clickTracker.pop()
    console.log('this is lastClick: ', lastClick)
    previousTurn = clickTracker[clickTracker.length -1]
    updatedBreak = previousTurn['currentBreak']

//this reverses the information that was added into the stats array
    if (lastClick['player'] == 1) {
        if (lastClick['action'] === 'ball') {
            stats[0][lastClick['key']]--
            stats[0]['totalScore'] -= lastClick['pointsAwarded']
        } else if (lastClick['action'] === 'foul') {
            stats[0]['fouls'][lastClick['key']]--
            stats[1]['totalScore'] -= lastClick['pointsAwarded']
        }
    } else if (lastClick['player'] == 2) {
        if (lastClick['action'] === 'ball') {
            stats[1][lastClick['key']]--
            stats[1]['totalScore'] -= lastClick['pointsAwarded']
        } else if (lastClick['action'] === 'foul') {
            stats[1]['fouls'][lastClick['key']]--
            stats[0]['totalScore'] -= lastClick['pointsAwarded']
        }
    }
    updatedBreak = previousTurn['currentBreak']
// this updates the visual player information
    document.getElementById('player1Score').innerHTML = stats[0]['totalScore']
    document.getElementById('player2Score').innerHTML = stats[1]['totalScore']

    if (previousTurn['player'] == 1) {
        document.getElementById('currentPlayer').innerHTML = 'Player 1'
        document.getElementById('currentBreak1').innerHTML = previousTurn['currentBreak']
        document.getElementById('currentBreak2').innerHTML = 0

    }else if (previousTurn['player'] == 2){
        document.getElementById('currentPlayer').innerHTML = 'Player 2'
        document.getElementById('currentBreak2').innerHTML = previousTurn['currentBreak']
        document.getElementById('currentBreak1').innerHTML = 0
    }
    if (lastClick['key'] === 'red') {
        remainingReds++
        remainingPoints = 8*remainingReds + 27
        document.getElementById('remainingPoints').innerHTML = remainingPoints
        document.getElementById('red').innerHTML = remainingReds
    }
    console.log('Player 1 stats: ', stats[0])
    console.log('Player 2 stats: ', stats[1])
}
