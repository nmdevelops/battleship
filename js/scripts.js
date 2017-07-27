// =================================
// ||                             ||
// ||      Business Logic         ||
// ||                             ||
// =================================
var whoseTurn = 1;
var players = [];
var firingGrid;
var vesselHit;
var currentPlayer;
var currentOpponent;
var gameState;
var shipGrids = []; //remove if graphic input not used for setup...
var shipGrid; //remove if graphic input not used for setup...

function Player(commander, fleet, shipsSunk, hits, misses) {
  this.commander = commander;
  this.fleet = [];
  this.shipsSunk = shipsSunk;
  this.hits = [];
  this.misses = [];
}

function Ship(commander, type, strength, grids, hits) {
  this.commander = commander;
  this.type = type;
  this.strength = strength;
  this.grids = grids;
  this.hits = 0;
}

var retrieveBoardState = (function() {
// set board to empty state -- change to transparent with final update
  $(".playingBoard div").css({"background-color": 'transparent'});
// format board for hits
  players[currentPlayer].hits.forEach(function(hit) {
    $('[data-cell=' + hit + ']').css({"background-color": 'red'});
  })
// format board for misses
  players[currentPlayer].misses.forEach(function(miss) {
    $('[data-cell=' + miss + ']').css({"background-color": 'white'});
  })
})

// Display active Player in gamespace and clear status messages after player updateGameSpace
// Reformat gameboard to all blue, then update formatting to reflect the current players gameboard
var updateGameSpace = (function() {
  $("#activePlayer").text(players[currentPlayer].commander);
  $("#activeMessage").empty();
  $("#activeMessage").text("Click on a grid square to fire at your enemy!");
  $("#sunkMessage").empty();
  retrieveBoardState(currentPlayer);
})

var resetGameboardFormat = (function() {
  // Turns Cell transparent to reset visual
  $(".playingBoard div").css({"background-color": 'transparent'});
})

//Function to replace game setup to facilitate graphical input of ships placement
var shipSetup = (function() {
  //Instantiate new player objects

  players[0] = new Player("P1", [], 0, [], []);
  players[1] = new Player("P2", [], 0, [], []);
  //Collect input values for ship placement

})

var setupFormat = (function() {
  // Turns Cell Gray to indicate placement
    $('[data-cell=' + shipGrid + ']').css({"background-color": 'gray'});
})

var instantiateShip = (function() {
  var shipHits = 0;
  //Instantiate ship objects
      var newShip = new Ship(shipCommander, shipType, shipStrength, shipGrids, shipHits)
  // and push to correct fleets
      if (shipCommander === "P1") {
        players[0].fleet.push(newShip);
      } else {
        players[1].fleet.push(newShip);
      }
    })


//Instantiate new player objects
var gameSetup = (function() {
  players[0] = new Player("P1", [], 0, [], []);
  players[1] = new Player("P2", [], 0, [], []);
  $(".P2-inputs").hide();
  $(".gamePlay").show();
//Collect input values for ship placement
  $(".inputs input").each(function() {
    var commanderTypeStrengthString = $(this).attr("name");
    var stringSplit = commanderTypeStrengthString.split(",");
    var shipCommander = stringSplit[0];
    var shipType = stringSplit[1];
    var shipStrength = parseInt(stringSplit[2]);
    var gridString = $(this).val();
    var shipGrids = gridString.split(", ");
    var shipHits = 0;

//Test inputs for demonstration

//Instantiate ship objects
    var newShip = new Ship(shipCommander, shipType, shipStrength, shipGrids, shipHits)
// and push to correct fleets
    if (newShip.commander === "P1") {
      players[0].fleet.push(newShip);
    } else {
      players[1].fleet.push(newShip);
    }
  })

  //Fleet setup display not currently implemented
  // P1 Display Fleet
  // for (var i = 0; i < players[0].fleet.length; i++) {
  //   var displayType = players[0].fleet[i].type;
  //   var displayGrids = players[0].fleet[i].grids.toString();
  //
  //   $(".P1-shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
  // }
  // P2 Display Fleet
  // for (var n = 0; n < players[1].fleet.length; n++) {
  //   var displayType = players[1].fleet[n].type;
  //   var displayGrids = players[1].fleet[n].grids.toString();
  //
  //   $(".P2-shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
  // }
});  //End gamesetup function

//To be run after inputting ship placement for P1, cycles to P2 inputs
var p1Confirm = (function() {
  $(".P1-inputs").hide();
  $(".P2-inputs").show();
})

//Returns an index to be called into other functions that are player specific
var isWhoseTurn = (function() {
  if (whoseTurn % 2 != 0) {
    currentPlayer = 0;
    currentOpponent = 1;
  } else {
    currentPlayer = 1;
    currentOpponent = 0;
  }
})

//Main Game Logic
var isHit = (function() {
  var firingGridIsHit = 0;
  var shipTypeHit;
//Determines if a hit exists
  for (var h = 0; h < players[currentOpponent].fleet.length; h++) {
    var torpedosAway = players[currentOpponent].fleet[h].grids.indexOf(firingGrid);
    if (torpedosAway >= 0) {
      firingGridIsHit += 1;
      players[currentOpponent].fleet[h].hits += 1;
      vesselHit = h;
      shipTypeHit = players[currentOpponent].fleet[h].type;
    } //This is the if end
  } //end for loop

// These actions take place if a hit exists
  if (firingGridIsHit > 0) {
    if (currentPlayer === 0) {
      players[1].hits.push(firingGrid);
    } else {
      players[0].hits.push(firingGrid);
    }

  $("#activeMessage").text("HIT!");
// Turns Cell RED to indicate Hit
  $('[data-cell=' + firingGrid + ']').css({"background-color": 'red'});

// Determine if ship is Sunk
    if (players[currentOpponent].fleet[vesselHit].hits === players[currentOpponent].fleet[vesselHit].strength) {
      $("#sunkMessage").text("Enemy" + players[currentOpponent].fleet[vesselHit].type + "sunk!");
      players[currentOpponent].shipsSunk += 1;
    }
// Determine if game is over
    if (players[currentOpponent].shipsSunk === 5) {
      $("#gameWon").text("You sunk their Fleet!  GAME OVER!");
      // $("gamePlay").hide();
    }
//Advance player Turn
    whoseTurn += 1;
    isWhoseTurn();
  } else {
// These actions take place if there is a miss
    if (currentPlayer === 0) {
      players[0].misses.push(firingGrid);
    } else {
      players[1].misses.push(firingGrid);
    }
    $("#activeMessage").text("You missed!");
// Turns Cell WHITE to indicate MISS
    $('[data-cell=' + firingGrid + ']').css({"background-color": 'white'});
//advance player turn
    whoseTurn += 1;
    isWhoseTurn();
  }
})


// TEST INPUTS
// A1, A2, A3, A4, A5
// B1, B2, B3, B4, B5
// =================================
// ||                             ||
// ||    User Interface Logic     ||
// ||                             ||
// =================================
$(document).ready(function() {
// Proceed from splash page
  $("button#button-game-setup").click(function() {
    $(".P1-inputs").show();
    $(".splash").hide();
    $(".playingBoard").show();
    gameState = "p1Setup";
    shipCommander = "P1"

  })
// Ship deploy
$("button#deploy").click(function() {


})
// Proceed from P1 setup to P2 setup
  $("button#p1-shipShow-confirm").click(function() {
    p1Confirm();
    resetGameboardFormat();

    gameState = "p2Setup";
    shipCommander = "P2";
  })
// Proceed from P2 setup to Gamespace
  $("button#p2-shipShow-confirm").click(function() {
    isWhoseTurn();
    gameSetup();
    updateGameSpace();
    gameState = "gamePlay";
  })

  var clickDisabled = false;
  $("a").click(function(event) {
    event.preventDefault();
    if (clickDisabled === false) {
      if (gameState === "p1Setup") {
        shipGrids.push(this.children[0].dataset.cell);
        shipGrid = this.children[0].dataset.cell
        console.log(shipGrids);
        setupFormat();

        //shipStrength = this.children[0].dataset.strength;

      } else if (gameState === "p2Setup") {

      } else if (gameState === "gamePlay") {
        firingGrid = this.children[0].dataset.cell;
        isWhoseTurn();
        isHit();
        clickDisabled = true;
        setTimeout(function() {updateGameSpace(); clickDisabled = false;}, 3000);
      }

    }
  });
})
