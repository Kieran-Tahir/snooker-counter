document.addEventListener('DOMContentLoaded', start)

function start () {
  bindEventListeners(document.getElementsByClassName('balls'))
}

function bindEventListeners (balls) {
    for(var i= 0; i < balls.length; i++) {
       balls[i].addEventListener('click', updateStats)
    }
}

const ballArr = ['red','yellow','green','brown','blue', 'pink','black']
 

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
            '7':0,
            '6':0,
            '5':0,
            '4':0,
        },
        totalScore: 0,
    }, 
    {   
        red: 0,
        yellow: 3,
        green: 0,
        brown: 0,
        blue: 5,
        pink: 0,
        black: 0,
        maxBreak: 0,
        fouls: {
            '7':0,
            '6':0,
            '5':0,
            '4':3,
        },
        totalScore: 0,
    }
]

//need an updateStats function that is called when the corresponding coloured ball is clicked 
function updateStats (evt) {
   if (evt.target.id === 'red') {
       stats[0]['red']++
    } else if (evt.target.id === 'yellow') {
        stats[0]['yellow']++
    } else if (evt.target.id === 'green') {
        stats[0]['green']++
    } else if (evt.target.id === 'brown') {
        stats[0]['brown']++
    } else if (evt.target.id === 'blue') {
        stats[0]['blue']++
    } else if (evt.target.id === 'pink') {
        stats[0]['pink']++
    } else if (evt.target.id === 'black') {
        stats[0]['black']++
    }

   countScore(ballArr, stats, 1)
   document.getElementById('player1Score').innerHTML = stats[0]['totalScore']
}
//function that passes the ballArr array as an argument and returns the corresponding values for each ball
function ballValue(colour) {
    if (colour === 'red') {
        return 1
    } else if (colour === 'yellow') {
        return 2 
    } else if (colour === 'green') {
        return 3
    } else if (colour === 'brown') {
        return 4
    } else if (colour === 'blue') {
        return 5
    } else if (colour === 'pink') {
        return 6
    } else if (colour === 'black') {
        return 7
    }
}

//total score from balls, deducts the total fouls and assigns it to player(1 or 2)score to be displayed
//still needs to have the value of the corresponding balls * the value and fouls * value, atm is just the counts
function countScore(arr, stat, num) {
    var playerScore = 0
 
    for (var i = 0; i < arr.length; i++) {
        if (num === 1) {
            playerScore += ballValue(arr[i]) * stat[0][arr[i]];
        } else if (num === 2) {
            playerScore += ballValue(arr[i]) * stat[1][arr[i]];
        } 
    }
    if (num === 1) {
        playerScore -= 7*stat[0]['fouls']['7'] + 6*stat[0]['fouls']['6'] + 5*stat[0]['fouls']['5'] + 4*stat[0]['fouls']['4']
        stat[0]['totalScore'] = playerScore
    } else if (num === 2) {
        playerScore -= 7*stat[1]['fouls']['7'] + 6*stat[1]['fouls']['6'] + 5*stat[1]['fouls']['5'] + 4*stat[1]['fouls']['4']
        stat[1]['totalScore'] = playerScore
    }
  console.log(playerScore)
}

document.getElementById('player1Score').innerHTML = stats[0]['totalScore']
document.getElementById('player2Score').innerHTML = stats[1]['totalScore']

countScore(ballArr,stats,1)
countScore(ballArr,stats,2)
// console.log ('ballValue test: ', ballValue('black'))
// console.log(stats[0])
// console.log(stats[1])
// console.log('ballArr.length in javascript.js: ', ballArr.length)