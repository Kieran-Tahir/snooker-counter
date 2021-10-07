document.addEventListener('DOMContentLoaded', start)

function start () {
  bindEventListeners(document.getElementsByClassName('balls'))
  bindButtons(document.getElementById('button'))
  bindFouls(document.getElementsByClassName('fouls'))
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

const ballArr = ['red','yellow','green','brown','blue', 'pink','black']
const fouls = ['7','6','5','4']
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
    '7':0,
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
        } else if (fouls1 !== stats[0]['fouls']) {
            stats[0]['fouls'] = fouls1
        }
    } else if (playernum === 2) {
        if (fouls2 === stats[1]['fouls']) {
            return
        } else if (fouls2 !== stats[1]['fouls']) {
            stats[1]['fouls'] = fouls2
            console.log (stats)
        }
    } 
}

//updateStats function is called when the corresponding coloured ball is clicked, increments the ball count in player stat array and
//calls the countScore function to update the totalscore being displayed

function updateStats (evt) {
    console.log('updateStats is working!')
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

   if (number === 1) {
       otherPlayer[1] = '2'
       otherArrayNum = 1
   } else if (number === 2) {
        otherPlayer[1] = '1'
        otherArrayNum = 0
   } 

   otherPlayer = otherPlayer.join('')
   otherPlayer = otherPlayer.toLowerCase()
   foulUpdate(number)
   countScore(ballArr, stats, number)
   document.getElementById(lowerPlayer + 'Score').innerHTML = stats[arrayNum]['totalScore']
   document.getElementById(otherPlayer + 'Score').innerHTML = stats[otherArrayNum]['totalScore']
   console.log('player1 stats: ', stats[0])
   console.log('player2 stats: ', stats[1])
}


function addFoul(evt) {
    console.log('this is the event target id: ', evt.target.id)
    if (document.getElementById('currentPlayer').innerHTML === 'Player 1') {
        for (var i =0; i < fouls.length; i++) {
            if (evt.target.id === fouls[i]) {
                fouls1[fouls[i]]++
            } 
         }
    } else {
        for (var i =0; i < fouls.length; i++) {
            if (evt.target.id === fouls[i]) {
                fouls2[fouls[i]]++
            } 
        }  
    }
    updateStats(evt)
}

//function that passes the ballArr array as an argument and returns the corresponding values for each ball
function ballValue(colour) {
    for (var i = 0; i < ballArr.length; i++) {
        if (colour === ballArr[i]) {
            return i + 1
        }
    }
}

//total score from balls, adds the total fouls and assigns it to player(1 or 2)score to be displayed 

function countScore(ballArr, stat, num) {

    function otherPlayer () {
        if (num === 1) {
            return 1
        } else if (num === 2) {
            return 0
        }
    }

    var playerScore = 0
    var otherPlayerScore = stats[otherPlayer(num)]['totalScore']

    for (var i = 0; i < ballArr.length; i++) {
        if (num === 1) {
            playerScore += ballValue(ballArr[i]) * stat[0][ballArr[i]];
        } else if (num === 2) {
            playerScore += ballValue(ballArr[i]) * stat[1][ballArr[i]];
        } 
    }

    if (num === 1) {
        otherPlayerScore += 7*(fouls1['7'] - stats[0]['fouls']['7']) + 6*(fouls1['6'] - stats[0]['fouls']['6']) 
                            + 5*(fouls1['5'] - stats[0]['fouls']['5']) + 4*(fouls1['4'] - stats[0]['fouls']['4'])
        stats[otherPlayer(num)]['totalScore'] = otherPlayerScore
    }

    if (num === 1) {
        stat[0]['totalScore'] = playerScore
    } else if (num === 2) {
        stat[1]['totalScore'] = playerScore
    }
}