var exports = {};

let total = 0
let turns = 3
let scoresArray = []

const scoreFunc = (event) => {
    if (turns>0) {
        const points = Math.floor(Math.random() * 1000) 
        total = total+points
        document.getElementById('score').innerHTML = points
        scoresArray.push(points)
        turns -=1
    } else {
        //gameOver()
        window.location.replace('game_over')
    }
    document.getElementById('turn').innerHTML = turns
    localStorage.setItem('score',total)
    localStorage.setItem('turn1',scoresArray[0])
    localStorage.setItem('turn2',scoresArray[1])
    localStorage.setItem('turn3',scoresArray[2])
    
}



exports.scoreFunc = scoreFunc
//exports.total = total






const finalScore = localStorage.getItem('score')
document.getElementById('final-score').innerHTML = finalScore

const turn1Score = localStorage.getItem('turn1')
document.getElementById('turn1').innerHTML = turn1Score

const turn2Score = localStorage.getItem('turn2')
document.getElementById('turn2').innerHTML = turn2Score

const turn3Score = localStorage.getItem('turn3')
document.getElementById('turn3').innerHTML = turn3Score


function getJSON() {
    const obj = new Object();
    obj.finalScore = finalScore;
    obj.turns = new Object()
    obj.turns.turn1Score = turn1Score
    obj.turns.turn2Score = localStorage.getItem('turn2')
    obj.turns.turn3Score = localStorage.getItem('turn3')
    
    const jsonString = JSON.stringify(obj);
    //jsonObj.push(jsonString)
    console.log(JSON.parse(jsonString))
    return JSON.parse(jsonString)
}
exports.getJSON = getJSON


function saveGame() {
    const saveButton = document.getElementById('save-btn')

    saveButton.addEventListener('click', async (event) => {

        /*
        const obj = new Object();
        obj.finalScore = finalScore;
        obj.turns = new Object()
        obj.turns.turn1Score = '15'//turn1Score
        obj.turns.turn2Score = '25'//localStorage.getItem('turn2')
        obj.turns.turn3Score = '35'//localStorage.getItem('turn3')
        */
        
        //const turn1Score = localStorage.getItem('turn1')
        //const turn2Score = localStorage.getItem('turn2')
        //const turn3Score = localStorage.getItem('turn3')

        //const data = {finalScore, turn1Score, turn1Score, turn1Score}
        const data = getJSON();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        
        const response = await fetch("/api/games", options);
        const json = await response.json()
        console.log(json)
    })
}

exports.saveGame = saveGame

/*
$("#create_account").submit(function (event) {
    alert("Data Inserted Successfully");
});
*/
 


function submitForm () {
    document.getElementById("create_account").submit();

}
exports.submitForm = submitForm

function auth () {
    document.getElementById("login").submit()
}

// TO GET THE GAME MODE INTO LOCAL STORAGE
function gameModeFunc () {
    console.log('hello')
    window.onclick = e => {
        const gameMode = (e.target.innerHTML)
        localStorage.setItem('gameMode', gameMode)
    }
}

exports.gameModeFunc = gameModeFunc


// CLEAR LOCAL STORAGE ON LOGOUT
document.getElementById('logout').addEventListener('click', () => {
    localStorage.clear()
})