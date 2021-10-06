document.addEventListener('DOMContentLoaded', start)

function start () {
  bindEventListeners(document.getElementsByClassName('balls'))
  bindButtons(document.getElementById('button'))
}

function bindEventListeners (balls) {
    for(var i= 0; i < balls.length; i++) {
       balls[i].addEventListener('click', updateStats)
    }
}

function bindButtons (button) {
       button.addEventListener('click', changePlayer)
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
    }
]

function changePlayer () {
    if (document.getElementById('currentPlayer').innerHTML === 'Player 1') {
        document.getElementById('currentPlayer').innerHTML = 'Player 2'
    } else {
        document.getElementById('currentPlayer').innerHTML = 'Player 1'
    }
}

//updateStats function is called when the corresponding coloured ball is clicked, increments the ball count in player stat array and
//calls the countScore function to update the totalscore being displayed

function updateStats (evt) {
    var player = document.getElementById('currentPlayer').innerHTML

   if (player === 'Player 1') {
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
    } else if (player === 'Player 2') {
        if (evt.target.id === 'red') {
            stats[1]['red']++
        } else if (evt.target.id === 'yellow') {
            stats[1]['yellow']++
        } else if (evt.target.id === 'green') {
            stats[1]['green']++
        } else if (evt.target.id === 'brown') {
            stats[1]['brown']++
        } else if (evt.target.id === 'blue') {
            stats[1]['blue']++
        } else if (evt.target.id === 'pink') {
            stats[1]['pink']++
        } else if (evt.target.id === 'black') {
            stats[1]['black']++
        }
    }

   var lowerPlayer = player.toLowerCase()
   lowerPlayer = lowerPlayer.replace(/\s+/g, '')
   var playerNumber = player.split(" ").pop()
   var number = parseInt(playerNumber)
   var arrayNum = number - 1
   countScore(ballArr, stats, number)
   document.getElementById(lowerPlayer + 'Score').innerHTML = stats[arrayNum]['totalScore']
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
}
