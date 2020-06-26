const Discord = require('discord.js') // grabs library
const client = new Discord.Client() // connects to discord itself

// Variables for program

// reset Variable
var Reset

// RPS
var PlyrChoice = 0 // 1 = rock, 2 = paper, 3 = scissors
var BotChoice = 0 // 1 = rock, 2 = paper, 3 = scissors

// Tic Tac Toe
var Spt1 = 0 // 1 = O, 2 = X
var Spt2 = 0 // 1 = O, 2 = X
var Spt3 = 0 // 1 = O, 2 = X
var Spt4 = 0 // 1 = O, 2 = X
var Spt5 = 0 // 1 = O, 2 = X
var Spt6 = 0 // 1 = O, 2 = X
var Spt7 = 0 // 1 = O, 2 = X
var Spt8 = 0 // 1 = O, 2 = X
var Spt9 = 0 // 1 = O, 2 = X
var Space1 = '-'
var Space2 = '-'
var Space3 = '-'
var Space4 = '-'
var Space5 = '-'
var Space6 = '-'
var Space7 = '-'
var Space8 = '-'
var Space9 = '-'

var ActPlayer
var TTTon = 0


/*
LF RT CTR BTTM TOP MID  
the grid will look like this

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

*/

// Guess the number
var GuessOn = 0 // 0 = off, 1 = on
var FirstNmbr = 0
var LastNmbr = 0
var BotNmbr
var GuessedNmbr
var NumOfTries = 0
var topRange = 0
var btmRange = 0






client.on('ready', () => {
    // sets current activity of the bot
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("Games, type +help to join!", {type: "PLAYING"})
    


    // makes sure that bot has contact with server channels
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})



client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    // checks to see if the right command prompt was used
    if (receivedMessage.content.startsWith('+')) {
        readComd(receivedMessage)
        // receivedMessage.channel.send(receivedMessage.author.toString() + " Hello there! Try +help to learn more.") // (debug line)
    }
    
    // acts as a debug to prevent any odd-ball messages
    else {
        return 
    }

    
})



/////////////////////////////////////////Functions//////////////////////////////////////////////////////////
function readComd(receivedMessage){ // takes the command given and analyzes it to check which command it actually was
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading Plus Sign
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the Plus Sign is the command

    console.log(primaryCommand)

    if (primaryCommand == 'RPS'){ // RPS command
        RPScomd(receivedMessage, fullCommand, splitCommand[1])
        // receivedMessage.channel.send(receivedMessage.author.toString() + " Command Received") (debug line)
    } 
    if (primaryCommand == 'TTT'){ // Tic Tac Toe Command
        TTTcomd(receivedMessage, fullCommand, splitCommand[1], splitCommand[2])
        // receivedMessage.channel.send(receivedMessage.author.toString() + " 1")
    } 
    if (primaryCommand == 'GuessBgn'){ // Guessing Game Command
        GUESSBGNcomd(receivedMessage, fullCommand, splitCommand[1], splitCommand[2], splitCommand[3])
        // receivedMessage.channel.send(receivedMessage.author.toString() + " 1")
    } 
    if (primaryCommand == 'Guess'){ // Guessing Game Command
        GUESScomd(receivedMessage, fullCommand, splitCommand[1])
        // receivedMessage.channel.send(receivedMessage.author.toString() + " 1")
    } 
    if (primaryCommand == 'help'){ // Help Command
        
        receivedMessage.channel.send(receivedMessage.author.toString() + " type +RPS to learn more about Rock Paper Scissors. Type +TTT and +TTT Rules to learn more about Tic Tac Toe. Type +GuessBgn and +Guess to learn more about Guess the Number.")
    }
    //if (primaryCommand == 'Bet'){ // Help Command
        //receivedMessage.channel.send("*BET*")
    //}


}

function RPScomd(receivedMessage, fullCommand, action){

    // receivedMessage.channel.send(receivedMessage.author.toString() + " In RPScomd") (debug line)
    if(fullCommand == 'RPS'){  // instructions
        receivedMessage.channel.send(receivedMessage.author.toString() + " if you want to play Rock, Paper, Scissors with me, just type +RPS [put in your action here, don't worry I won't cheat]")
    } else if (action == 'rock' || action == 'Rock' || action == 'paper' || action == 'Paper' || action == 'scissors' || action == 'Scissors' ){
        if (action == 'rock' || action == 'Rock'){
            PlyrChoice = 1
            BotChoice = Math.floor(Math.random() * 3 + 1)
            CheckRPSWin(receivedMessage, PlyrChoice, BotChoice)
            // receivedMessage.channel.send(receivedMessage.author.toString() + " u chose rock??")
        } else if (action == 'paper' || action == 'Paper'){
            PlyrChoice = 2
            BotChoice = Math.floor(Math.random() * 3 + 1)
            CheckRPSWin(receivedMessage, PlyrChoice, BotChoice)
        } else if (action == 'scissors' || action == 'Scissors'){
            PlyrChoice = 3
            BotChoice = Math.floor(Math.random() * 3 + 1)
            CheckRPSWin(receivedMessage, PlyrChoice, BotChoice)
            // receivedMessage.channel.send(receivedMessage.author.toString() + " You chose Scissors") // (debug line)
        } else{
            receivedMessage.channel.send(receivedMessage.author.toString() + " Make sure you are spelling rock, paper, or scissors exactly the way you see it here")

        }
    }

}

function CheckRPSWin(receivedMessage, Player, Bot){
    // this gives a more unique win response to the player
    var WRN = Math.floor(Math.random() * 4 + 1)
    var WinResponse = 'Brownie Points?'

    if (WRN == 1){
        WinResponse = 'Nothing actually.'
    }
    if (WRN == 2){
        WinResponse = 'why do you need something after winning a game of RPS??'        
    }
    if (WRN == 3){
        WinResponse = 'a pat on the back?'        
    }



    // this compares what the player and the bot picked, determines the winner and responds
    if(Player == 1 && Bot == 1){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Rock... I also chose Rock, so I guess its a tie")
    } else if(Player == 1 && Bot == 2){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Rock... Well, I chose Paper! I Win!")
    } else if(Player == 1 && Bot == 3){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Rock... Well, I chose Scissors... You Win!")
        receivedMessage.channel.send(receivedMessage.author.toString() + " What do you win you ask? um... " + WinResponse)
    } else if(Player == 2 && Bot == 1){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Paper... Well, I chose Rock... You Win!")
        receivedMessage.channel.send(receivedMessage.author.toString() + " What do you win you ask? um... " + WinResponse)
    } else if(Player == 2 && Bot == 2){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Paper... I also chose Paper, so I guess its a tie")
    } else if(Player == 2 && Bot == 3){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Paper... Well, I chose Scissors! I Win!")
    } else if(Player == 3 && Bot == 1){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Scissors... Well, I chose Rock! I Win!")
    } else if(Player == 3 && Bot == 2){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Paper... Well, I chose Rock... You Win!")
        receivedMessage.channel.send(receivedMessage.author.toString() + " What do you win you ask? um... " + WinResponse)
    } else if(Player == 3 && Bot == 3){
        receivedMessage.channel.send(receivedMessage.author.toString() + " I see you chose Scissors... I also chose Scissors, so I guess its a tie")
    } 

}

function TTTcomd(receivedMessage, fullCommand, action, SpotNumber){
    var CurrentPlayer = receivedMessage.author
    if (fullCommand == 'TTT'){

        if (TTTon == 0){ // reply depends on wether a game is occuring or not
            receivedMessage.channel.send(receivedMessage.author.toString() + " to use this command, there has to be an active guessing game already running. To do this type +TTT Start to start the Game! You can also use +TTT rules to see how this Tic Tac Toe works.")
        } else {
            receivedMessage.channel.send(receivedMessage.author.toString() + " there is a game already in play")
        }

    }
    else{
        if(action == 'rules' || action == 'Rules'){
            receivedMessage.channel.send(receivedMessage.author.toString() + " This basic Tic Tac Toe, get three in a row to win")
            receivedMessage.channel.send("\/ This is what the game board will look like \/")
            receivedMessage.channel.send("1   |   2   |   3")
            receivedMessage.channel.send("--------------")
            receivedMessage.channel.send("4   |   5   |   6")
            receivedMessage.channel.send("--------------")
            receivedMessage.channel.send("7   |   8   |   9")
            receivedMessage.channel.send("These numbers that you see are the positions where each X and O can go. You will always be an X and start first.")
            receivedMessage.channel.send("The way to place an X is by typing the command: +TTT Spot [Spot #]. ie: +TTT Spot 1")
            receivedMessage.channel.send("I will also try my best to win so don't you worry about it :).")
        } 
        else if ((action == 'Start' && TTTon == 0) || (action == 'start' && TTTon == 0)) {
            receivedMessage.channel.send(receivedMessage.author.toString() + " a private game of Tic Tac Toe has started for you")
            ActPlayer = CurrentPlayer
            TTTon = 1
            console.log(TTTon)
        }
        else if ((action == 'Spot' && ActPlayer == CurrentPlayer) || (action == 'spot' && ActPlayer == CurrentPlayer)) {
            var SPOT = parseInt(SpotNumber, 10)

            // turns the player's spot pick into an integer for the board
            
            if (SPOT == 1 && Spt1 == 0){
                Spt1 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else if (SPOT == 2 && Spt2 == 0){
                Spt2 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else if (SPOT == 3 && Spt3 == 0){
                Spt3 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else if (SPOT == 4 && Spt4 == 0){
                Spt4 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else if (SPOT == 5 && Spt5 == 0){
                Spt5 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else if (SPOT == 6  && Spt6 == 0){
                Spt6 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else if (SPOT == 7 && Spt7 == 0){
                Spt7 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else if (SPOT == 8 && Spt8 == 0){
                Spt8 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else if (SPOT == 9 && Spt9 == 0){
                Spt9 = 2
                receivedMessage.channel.send(receivedMessage.author.toString()+ " I am doing a lot of calculations right now, give me a second.")
                TTTWinCheck(receivedMessage)
                if(TTTon == 1){
                    PlayTTT()
                    createTTTsquare(receivedMessage)
                    TTTWinCheck(receivedMessage)
                }
            } else {
                receivedMessage.channel.send(receivedMessage.author.toString()+ " sorry, you chose an invalid spot.")  
            }

        }
        else if ((action == 'Reset' && ActPlayer == receivedMessage.author) || (action == 'reset' && ActPlayer == receivedMessage.author)){
            TTTon = 0
            Spt1 = 0 // 1 = O, 2 = X
            Spt2 = 0 // 1 = O, 2 = X
            Spt3 = 0 // 1 = O, 2 = X
            Spt4 = 0 // 1 = O, 2 = X
            Spt5 = 0 // 1 = O, 2 = X
            Spt6 = 0 // 1 = O, 2 = X
            Spt7 = 0 // 1 = O, 2 = X
            Spt8 = 0 // 1 = O, 2 = X
            Spt9 = 0 // 1 = O, 2 = X
            Space1 = '-'
            Space2 = '-'
            Space3 = '-'
            Space4 = '-'
            Space5 = '-'
            Space6 = '-'
            Space7 = '-'
            Space8 = '-'
            Space9 = '-'
            receivedMessage.channel.send(receivedMessage.author.toString() + " you have ended your game, a new game can be started by anyone who's willing")
        }
    }
    console.log(TTTon)
}

function PlayTTT(){

    // check to make sure their aren't and places where the player could win next turn
    if(Spt1 == 2 && Spt2 == 2 && Spt3 == 0){
        Spt3 = 1
    } else if(Spt1 == 2 && Spt2 == 0 && Spt3 == 2){
        Spt2 = 1
    } else if(Spt1 == 0 && Spt2 == 2 && Spt3 == 2){
        Spt1 = 1
    } 
    else if(Spt4 == 2 && Spt5 == 0 && Spt6 == 2){
        Spt5 = 1
    } else if(Spt4 == 2 && Spt5 == 2 && Spt6 == 0){
        Spt6 = 1
    } else if(Spt4 == 0 && Spt5 == 2 && Spt6 == 2){
        Spt4 = 1
    } 
    else if(Spt7 == 0 && Spt8 == 2 && Spt9 == 2){
        Spt7 = 1
    } else if(Spt7 == 2 && Spt8 == 0 && Spt9 == 2){
        Spt8 = 1
    } else if(Spt7 == 2 && Spt8 == 2 && Spt9 == 0){
        Spt9 = 1
    } 
    else if(Spt1 == 0 && Spt4 == 2 && Spt7 == 2){
        Spt1 = 1
    } else if(Spt1 == 2 && Spt4 == 0 && Spt7 == 2){
        Spt4 = 1
    } else if(Spt1 == 2 && Spt4 == 2 && Spt7 == 0){
        Spt7 = 1
    } 
    else if(Spt2 == 0 && Spt5 == 2 && Spt8 == 2){
        Spt2 = 1
    } else if(Spt2 == 2 && Spt5 == 0 && Spt8 == 2){
        Spt5 = 1
    } else if(Spt2 == 2 && Spt5 == 2 && Spt8 == 0){
        Spt8 = 1
    } 
    else if(Spt3 == 0 && Spt6 == 2 && Spt9 == 2){
        Spt3 = 1
    } else if(Spt3 == 2 && Spt6 == 0 && Spt9 == 2){
        Spt6 = 1
    } else if(Spt3 == 2 && Spt6 == 2 && Spt9 == 0){
        Spt9 = 1
    } 
    else if(Spt3 == 0 && Spt5 == 2 && Spt7 == 2){
        Spt3 = 1
    } else if(Spt3 == 2 && Spt5 == 0 && Spt7 == 2){
        Spt5 = 1
    } else if(Spt3 == 2 && Spt5 == 2 && Spt7 == 0){
        Spt7 = 1
    } 
    else if(Spt1 == 0 && Spt5 == 2 && Spt9 == 2){
        Spt1 = 1
    } else if(Spt1 == 2 && Spt5 == 0 && Spt9 == 2){
        Spt5 = 1
    } else if(Spt1 == 2 && Spt5 == 2 && Spt9 == 0){
        Spt9 = 1
    }
    else if(Spt1 == 1 && Spt2 == 1 && Spt3 == 0){ // checks to see if it can win next turn
        Spt3 = 1
    } else if(Spt1 == 1 && Spt2 == 0 && Spt3 == 1){
        Spt2 = 1
    } else if(Spt1 == 0 && Spt2 == 1 && Spt3 == 1){
        Spt1 = 1
    } 
    else if(Spt4 == 1 && Spt5 == 0 && Spt6 == 1){
        Spt5 = 1
    } else if(Spt4 == 1 && Spt5 == 1 && Spt6 == 0){
        Spt6 = 1
    } else if(Spt4 == 0 && Spt5 == 1 && Spt6 == 1){
        Spt4 = 1
    } 
    else if(Spt7 == 0 && Spt8 == 1 && Spt9 == 1){
        Spt7 = 1
    } else if(Spt7 == 1 && Spt8 == 0 && Spt9 == 1){
        Spt8 = 1
    } else if(Spt7 == 1 && Spt8 == 1 && Spt9 == 0){
        Spt9 = 1
    } 
    else if(Spt1 == 0 && Spt4 == 1 && Spt7 == 1){
        Spt1 = 1
    } else if(Spt1 == 1 && Spt4 == 0 && Spt7 == 1){
        Spt4 = 1
    } else if(Spt1 == 1 && Spt4 == 1 && Spt7 == 0){
        Spt7 = 1
    } 
    else if(Spt2 == 0 && Spt5 == 1 && Spt8 == 1){
        Spt2 = 1
    } else if(Spt2 == 1 && Spt5 == 0 && Spt8 == 1){
        Spt5 = 1
    } else if(Spt2 == 1 && Spt5 == 1 && Spt8 == 0){
        Spt8 = 1
    } 
    else if(Spt3 == 0 && Spt6 == 1 && Spt9 == 1){
        Spt3 = 1
    } else if(Spt3 == 1 && Spt6 == 0 && Spt9 == 1){
        Spt6 = 1
    } else if(Spt3 == 1 && Spt6 == 1 && Spt9 == 0){
        Spt9 = 1
    } 
    else if(Spt3 == 0 && Spt5 == 1 && Spt7 == 1){
        Spt3 = 1
    } else if(Spt3 == 1 && Spt5 == 0 && Spt7 == 1){
        Spt5 = 1
    } else if(Spt3 == 1 && Spt5 == 1 && Spt7 == 0){
        Spt7 = 1
    } 
    else if(Spt1 == 0 && Spt5 == 1 && Spt9 == 1){
        Spt1 = 1
    } else if(Spt1 == 1 && Spt5 == 0 && Spt9 == 1){
        Spt5 = 1
    } else if(Spt1 == 1 && Spt5 == 1 && Spt9 == 0){
        Spt9 = 1
    } else {
        // this will pick a spot at random if there are no scary spots atm
        var BotSpot = Math.floor(Math.random()* 9 + 1)
        if (BotSpot == 1){
            if (Spt1 == 0){
                Spt1 = 1
            } else {
                PlayTTT()
            }
            
        } else if (BotSpot == 2){
            if (Spt2 == 0){
                Spt2 = 1
            } else {
                PlayTTT()
            }
            
        } else if (BotSpot == 3){
            if (Spt3 == 0){
                Spt3 = 1
            } else {
                PlayTTT()
            }
            
        } else if (BotSpot == 4){
            if (Spt4 == 0){
                Spt4 = 1
            } else {
                PlayTTT()
            }
            
        } else if (BotSpot == 5){
            if (Spt5 == 0){
                Spt5 = 1
            } else {
                PlayTTT()
            }
            
        } else if (BotSpot == 6){
            if (Spt6 == 0){
                Spt6 = 1
            } else {
                PlayTTT()
            }
            
        } else if (BotSpot == 7){
            if (Spt7 == 0){
                Spt7 = 1
            } else {
                PlayTTT()
            }
            
        } else if (BotSpot == 8){
            if (Spt8 == 0){
                Spt8 = 1
            } else {
                PlayTTT()
            }
            
        } else if (BotSpot == 9){
            if (Spt9 == 0){
                Spt9 = 1
            } else {
                PlayTTT()
            }
            
        } 
    } 
}

function createTTTsquare(receivedMessage){
    if (Spt1 == 2){
        Space1 = 'X'
    } else if (Spt1 == 1){
        Space1 = 'O'
    } else {
        Space1 = '-'
    }

    if (Spt2 == 2){
        Space2 = 'X'
    } else if (Spt2 == 1){
        Space2 = 'O'
    } else {
        Space2 = '-'
    }

    if (Spt3 == 2){
        Space3 = 'X'
    } else if (Spt3 == 1){
        Space3 = 'O'
    } else {
        Space3 = '-'
    }

    if (Spt4 == 2){
        Space4 = 'X'
    } else if (Spt4 == 1){
        Space4 = 'O'
    } else {
        Space4 = '-'
    }

    if (Spt4 == 2){
        Space4 = 'X'
    } else if (Spt4 == 1){
        Space4 = 'O'
    } else {
        Space4 = '-'
    }

    if (Spt5 == 2){
        Space5 = 'X'
    } else if (Spt5 == 1){
        Space5 = 'O'
    } else {
        Space5 = '-'
    }

    if (Spt6 == 2){
        Space6 = 'X'
    } else if (Spt6 == 1){
        Space6 = 'O'
    } else {
        Space6 = '-'
    }

    if (Spt7 == 2){
        Space7 = 'X'
    } else if (Spt7 == 1){
        Space7 = 'O'
    } else {
        Space7 = '-'
    }

    if (Spt8 == 2){
        Space8 = 'X'
    } else if (Spt8 == 1){
        Space8 = 'O'
    } else {
        Space8 = '-'
    }

    if (Spt9 == 2){
        Space9 = 'X'
    } else if (Spt9 == 1){
        Space9 = 'O'
    } else {
        Space9 = '-'
    }

    // actually builds the Tic Tac Toe
    receivedMessage.channel.send("`" + Space1 + "   |   "+ Space2 +"   |   " + Space3 + "`")
    receivedMessage.channel.send("`-----------------`")
    receivedMessage.channel.send("`" + Space4 + "   |   "+ Space5 +"   |   " + Space6 + "`")
    receivedMessage.channel.send("`-----------------`")
    receivedMessage.channel.send("`" + Space7 + "   |   "+ Space8 +"   |   " + Space9 + "`")

}

function TTTWinCheck(receivedMessage){
    // checks to see if the player won
    
    if(Spt1 == 2 && Spt2 == 2 && Spt3 == 2){
        TTTreset(1, receivedMessage)
    } 
    else if(Spt4 == 2 && Spt5 == 2 && Spt6 == 2){
        TTTreset(1, receivedMessage)
    }
    else if(Spt7 == 2 && Spt8 == 2 && Spt9 == 2){
        TTTreset(1, receivedMessage)
    } 
    else if(Spt1 == 2 && Spt4 == 2 && Spt7 == 2){
        TTTreset(1, receivedMessage)
    }
    else if(Spt2 == 2 && Spt5 == 2 && Spt8 == 2){
        TTTreset(1, receivedMessage)
    } 
    else if(Spt3 == 2 && Spt6 == 2 && Spt9 == 2){
        TTTreset(1, receivedMessage)
    } 
    else if(Spt3 == 2 && Spt5 == 2 && Spt7 == 2){
        TTTreset(1, receivedMessage)
    } 
    else if(Spt1 == 2 && Spt5 == 2 && Spt9 == 2){
        TTTreset(1, receivedMessage)
    }

    // checks to see if the bot won
    if(Spt1 == 1 && Spt2 == 1 && Spt3 == 1){
        TTTreset(2,receivedMessage)
        console.log("Bot won")
    } 
    else if(Spt4 == 1 && Spt5 == 1 && Spt6 == 1){
        TTTreset(2,receivedMessage)
        console.log("Bot won")
    } 
    else if(Spt7 == 1 && Spt8 == 1 && Spt9 == 1){
        TTTreset(2,receivedMessage)
        console.log("Bot won")
    } 
    else if(Spt1 == 1 && Spt4 == 1 && Spt7 == 1){
        TTTreset(2,receivedMessage)
        console.log("Bot won")
    }
    else if(Spt2 == 1 && Spt5 == 1 && Spt8 == 1){
        TTTreset(2,receivedMessage)
        console.log("Bot won")
    }
    else if(Spt3 == 1 && Spt6 == 1 && Spt9 == 1){
        TTTreset(2,receivedMessage)
        console.log("Bot won")
    }
    else if(Spt3 == 1 && Spt5 == 1 && Spt7 == 1){
        TTTreset(2,receivedMessage)
        console.log("Bot won")
    } 
    else if(Spt1 == 1 && Spt5 == 1 && Spt9 == 1){
        TTTreset(2,receivedMessage)
        console.log("Bot won")
    }

    if(Spt1 != 0 && Spt2 != 0 && Spt3 != 0 && Spt4 != 0 && Spt5 != 0 && Spt6 != 0 && Spt7 != 0 && Spt8 != 0 && Spt9 != 0 && TTTon == 1){
        receivedMessage.channel.send(receivedMessage.author.toString() + " well, this was kinda expected. We tied. A new game can now be started.")
        createTTTsquare(receivedMessage)
        TTTon = 0
        Spt1 = 0 // 1 = O, 2 = X
        Spt2 = 0 // 1 = O, 2 = X
        Spt3 = 0 // 1 = O, 2 = X
        Spt4 = 0 // 1 = O, 2 = X
        Spt5 = 0 // 1 = O, 2 = X
        Spt6 = 0 // 1 = O, 2 = X
        Spt7 = 0 // 1 = O, 2 = X
        Spt8 = 0 // 1 = O, 2 = X
        Spt9 = 0 // 1 = O, 2 = X
        Space1 = '-'
        Space2 = '-'
        Space3 = '-'
        Space4 = '-'
        Space5 = '-'
        Space6 = '-'
        Space7 = '-'
        Space8 = '-'
        Space9 = '-'
    }
}

function TTTreset(type, receivedMessage){
    if (type == 1){
        receivedMessage.channel.send(receivedMessage.author.toString() + " you won! Congratulations! A new game can now be started.")
        createTTTsquare(receivedMessage)
        TTTon = 0
        Spt1 = 0 // 1 = O, 2 = X
        Spt2 = 0 // 1 = O, 2 = X
        Spt3 = 0 // 1 = O, 2 = X
        Spt4 = 0 // 1 = O, 2 = X
        Spt5 = 0 // 1 = O, 2 = X
        Spt6 = 0 // 1 = O, 2 = X
        Spt7 = 0 // 1 = O, 2 = X
        Spt8 = 0 // 1 = O, 2 = X
        Spt9 = 0 // 1 = O, 2 = X
        Space1 = '-'
        Space2 = '-'
        Space3 = '-'
        Space4 = '-'
        Space5 = '-'
        Space6 = '-'
        Space7 = '-'
        Space8 = '-'
        Space9 = '-'
    }
    if (type == 2){
        receivedMessage.channel.send("Hey... I won! Congratulations to me! A new game can now be started.")
        createTTTsquare(receivedMessage)
        TTTon = 0
        Spt1 = 0 // 1 = O, 2 = X
        Spt2 = 0 // 1 = O, 2 = X
        Spt3 = 0 // 1 = O, 2 = X
        Spt4 = 0 // 1 = O, 2 = X
        Spt5 = 0 // 1 = O, 2 = X
        Spt6 = 0 // 1 = O, 2 = X
        Spt7 = 0 // 1 = O, 2 = X
        Spt8 = 0 // 1 = O, 2 = X
        Spt9 = 0 // 1 = O, 2 = X
        Space1 = '-'
        Space2 = '-'
        Space3 = '-'
        Space4 = '-'
        Space5 = '-'
        Space6 = '-'
        Space7 = '-'
        Space8 = '-'
        Space9 = '-'
    }
}

function GUESSBGNcomd(receivedMessage, fullCommand, FirstNumber, LastNumber, debug){
    debug = parseInt(debug, 30)
    // this whole things sets up the guessing game
    if(fullCommand == 'GuessBgn'){// intructions
        receivedMessage.channel.send(receivedMessage.author.toString() + " In order to use this command, type +GuessBgn [Starting Number] [Ending Number] to start the guessing! (ie: +GuessBgn 1 10)")
    } else if (GuessOn == 0){// checks to see if their is an on going game
        FirstNmbr = parseInt(FirstNumber, 10)
        LastNmbr = parseInt(LastNumber, 10)
        
        console.log(FirstNmbr)
        console.log(LastNmbr)

        if (FirstNmbr > LastNmbr){// checks to see if the numbers entered are correctly ordered
            receivedMessage.channel.send(receivedMessage.author.toString() + " Oops! It seems your starting number is greater than you final number. make sure you put your numbers in the right order") 
        } else{// starts game
            BotNmbr = Math.floor(Math.random() * (LastNmbr - FirstNmbr)) + FirstNmbr
            console.log(BotNmbr)
            GuessOn = 1
            receivedMessage.channel.send("```A Number has been chosen between and including " + FirstNmbr + " and " + LastNmbr + "```")
        }
        
    } else if (FirstNumber == 'Reset' || FirstNumber == 'reset'){
        GuessOn = 0 
        receivedMessage.channel.send(receivedMessage.author.toString() + " The game has been reset, do +GuessBgn to start again")
    }else {
       receivedMessage.channel.send(receivedMessage.author.toString() + " Oops, something went wrong in your command. You might want to check for extra spaces") 
    }
    
   
}

function GUESScomd(receivedMessage, fullCommand, guess){
    GuessedNmbr = parseInt(guess, 10)
    console.log(GuessedNmbr)
    
    if (fullCommand == 'Guess'){ // instructions
        
        if (GuessOn == 0){ // reply depends on wether a game is occuring or not
            receivedMessage.channel.send(receivedMessage.author.toString() + " to use this command, there has to be an active guessing game already running. To do this type +GuessBgn [Starting Number] [Ending Number] to start the guessing! (ie: +GuessBgn 1 10)")
        } else {
            receivedMessage.channel.send(receivedMessage.author.toString() + " Lucky for you there is a game already in play! It is between and including the numbers ```" + FirstNmbr + " and " + LastNmbr + "```. Type +Guess [put your number here] to guess what the number is. I'll even give hints after a little while")
        }
    } 
    else if (GuessedNmbr <= LastNmbr && GuessedNmbr >= FirstNmbr){// makes sure your number is valid
        topRange = LastNmbr - GuessedNmbr
        btmRange = GuessedNmbr - FirstNmbr
        

        // this checks to see if you guessed the number
        if (GuessedNmbr == BotNmbr) {
            receivedMessage.channel.send("Yay! " + receivedMessage.author.toString() + " guessed the number!")
            receivedMessage.channel.send("A new Guessing Game can be started")
            // resets for another round
            GuessOn = 0 
            FirstNmbr = Reset
            LastNmbr = Reset
            BotNmbr = Reset
            GuessedNmbr = Reset
            NumOfTries = 0
            topRange = Reset
            btmRange = Reset 
        }
        else if (GuessedNmbr <= (BotNmbr + 5) && GuessedNmbr >= (BotNmbr - 5)){
            receivedMessage.channel.send(receivedMessage.author.toString() + " you were really close to guessing the number, but you didn't quite guess it, try again.")
            NumOfTries = NumOfTries + 1
        }
        else {
            receivedMessage.channel.send(receivedMessage.author.toString() + " sorry, that isn't the number im thinking of. Try again.")
            NumOfTries = NumOfTries + 1
        }
        
        // this is the hint system
        if (NumOfTries == 5){
            var up = Math.floor(topRange/5)  //((Math.random()*3 + 1) + 1) + 1)
            var down = Math.floor(btmRange/5)   //((Math.random()*3 + 1) + 1) + 1)
            receivedMessage.channel.send(receivedMessage.author.toString() + " here's a hint, the number is between and including ```" + (up + BotNmbr) + " and " + (BotNmbr - down) + "```")

        }
        else if (NumOfTries == 10){
            var smallup = Math.floor(topRange/10)  //((Math.random()*6 + 1) + 3) + 1)
            var smalldown = Math.floor(btmRange/10)  //((Math.random()*6 + 1) + 3) + 1)
            receivedMessage.channel.send(receivedMessage.author.toString() + " here's a hint, the number is between and including ```" + (smallup + BotNmbr) + " and " + (BotNmbr - smalldown) + "```")

        }
        else if (NumOfTries == 15){
            var Vsmallup = Math.floor(topRange/20000)  //((Math.random()*20 + 1) + 10))
            var Vsmalldown = Math.floor(btmRange/20000)  //((Math.random()*20 + 1) + 10))
            receivedMessage.channel.send(receivedMessage.author.toString() + " here's a hint, the number is between and in cluding ```" + (Vsmallup + BotNmbr) + " and " + (BotNmbr - Vsmalldown) + "```")

        }
        
    } 
    else {
        receivedMessage.channel.send(receivedMessage.author.toString() + " Oops, something went wrong in your command")  
    }
    
}



/////////////////////////////////////////Functions//////////////////////////////////////////////////////////

bot_secret_token = "NzI1MjAzOTQ3NTMwMjIzNjI3.XvUeiA.VumlpcWW4a0oyErvfuGgZijtk54"

client.login(bot_secret_token)