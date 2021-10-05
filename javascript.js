document.addEventListener('DOMContentLoaded', start)

function start () {
  bindEventListeners(document.getElementsByClassName('balls'))
}

function bindEventListeners (balls) {
    for(var i= 0; i < balls.length; i++) {
       balls[i].addEventListener('click', countScore())
    }
}
console.log(document.getElementsByClassName('balls').length)

var ballArr = []
ballArr = ['red','yellow','green','brown','blue', 'pink','black']

// player 1 stats are stats[0], player 2 stats are stats[1]

var stats =[]
stats = [
    {
        red: 12,
        yellow: 0,
        green: 0,
        brown: 0,
        blue: 0,
        pink: 3,
        black: 0,
        maxBreak: 0,
        fouls: {
            '7':1,
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


//total score from balls, deducts the total fouls and assigns it to player(1 or 2)score to be displayed
//still needs to have the value of the corresponding balls * the value and fouls * value, atm is just the counts
function countScore(arr, stat, num) {
    var playerScore = 0
    for (var i = 0; i < arr.length; i++) {
        if (num === 1) {
            playerScore += stat[0][arr[i]];
        } else if (num === 2) {
            playerScore += stat[1][arr[i]];
        } 
    }
    if (num === 1) {
        playerScore -= stat[0]['fouls']['7'] + stat[0]['fouls']['6'] + stat[0]['fouls']['5'] + stat[0]['fouls']['4']
        stat[0]['totalScore'] = playerScore
    } else if (num === 2) {
        playerScore -= stat[1]['fouls']['7'] + stat[1]['fouls']['6'] + stat[1]['fouls']['5'] + stat[1]['fouls']['4']
        stat[1]['totalScore'] = playerScore
    }
  console.log(playerScore)
}


countScore(ballArr,stats,1)
countScore(ballArr,stats,2)

console.log(stats[0])
console.log(stats[1])
console.log(typeof(ballArr))