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

// global object variable for each player that is updated with each click to capture the foul count at that time 
// function with if statement in updateCounts that if the global object variable is different from player's currentfouls, 
//then update other players score by the 
// difference of each foul count. otherwise do nothing.

var fouls1 = {
    '7':1,
    '6':0,
    '5':0,
    '4':0,
}
var fouls2 ={
    '7':0,
    '6':0,
    '5':0,
    '4':0,
}

function foulUpdate (playernum) {
    var foulNum = 'fouls' + playernum
    if (playernum === 1) {
        if (fouls1 === stats[0]['fouls']) {
            return
        } else if (fouls1 != stats[0]['fouls']) {
            stats[0]['fouls'] = fouls1
            stats[1]['totalScore'] += 7*(fouls1['7'] - stats[0]['fouls']['7']) + 6*(fouls1['6'] - stats[0]['fouls']['6']) 
            + 5*(fouls1['5'] - stats[0]['fouls']['5']) + 4*(fouls1['4'] - stats[0]['fouls']['4'])
            console.log(stats)
        }
    } else if (playernum === 2) {
        if (fouls2 === stats[1]['fouls']) {
            return
        } else if (fouls2 != stats[1]['fouls']) {
            stats[1]['fouls'] = fouls2
            stats[0]['totalScore'] += 7*(fouls2['7'] - stats[1]['fouls']['7']) + 6*(fouls2['6'] - stats[1]['fouls']['6']) 
            + 5*(fouls2['5'] - stats[1]['fouls']['5']) + 4*(fouls2['4'] - stats[1]['fouls']['4'])
            console.log (stats)
        }
    } 
}

//updateStats function is called when the corresponding coloured ball is clicked, increments the ball count in player stat array and
//calls the countScore function to update the totalscore being displayed

function updateStats (evt) {
    var player = document.getElementById('currentPlayer').innerHTML

   if (player === 'Player 1') {
       for (var i =0; i < ballArr.length; i++) {
           if (evt.target.id === ballArr[i]) {
                stats[0][ballArr[i]]++
            }
        }
    } else if (player === 'Player 2') {
        for (var i =0; i < ballArr.length; i++) {
            if (evt.target.id === ballArr[i]) {
                 stats[1][ballArr[i]]++
             }
         }
    }

   var lowerPlayer = player.toLowerCase()
   lowerPlayer = lowerPlayer.replace(/\s+/g, '')
   var playerNumber = player.split(" ").pop()
   var number = parseInt(playerNumber)
   var arrayNum = number - 1
   var otherPlayer = player.split(' ')
   var otherArrayNum = 0

   if (otherPlayer[1] === '1') {
       otherPlayer[1] = '2'
       otherArrayNum = 1
   } else if (otherPlayer[1] === '2') {
        otherPlayer[1] = '1'
        otherArrayNum = 0
   } 

   console.log('other player is: ', otherPlayer)
   otherPlayer = otherPlayer.join('')
   otherPlayer = otherPlayer.toLowerCase()
   countScore(ballArr, stats, number)
   document.getElementById(lowerPlayer + 'Score').innerHTML = stats[arrayNum]['totalScore']
//    document.getElementById(otherPlayer + 'Score').innerHTML = stats[otherArrayNum]['totalScore']
   console.log (stats[0])
   console.log (stats[1])
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
        stat[0]['totalScore'] = playerScore
    } else if (num === 2) {
        stat[1]['totalScore'] = playerScore
    }
}