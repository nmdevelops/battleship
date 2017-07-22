// =================================
// ||                             ||
// ||      Business Logic         ||
// ||                             ||
// =================================
var p1Fleet = [];
var p2Fleet = [];
var whoseTurn = 1;
var players = [];
var firingGrid;
var vesselHit;
var currentPlayer;
// var Game = {
//
// }

function Player(commander, shipsSunk, guesses, hits, misses) {
  this.commander = commander;
  this.shipsSunk = shipsSunk;
  this.guesses = [];
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


var gameSetup = (function() {

  players[0] = new Player("P1", 0);
  players[1] = new Player("P2", 0);
  $(".P2-inputs").hide();
  $(".p1-gamePlay").show();



  $(".inputs input").each(function() {

    var commanderTypeStrengthString = $(this).attr("name");
    var stringSplit = commanderTypeStrengthString.split(",");
    var shipCommander = stringSplit[0];
    var shipType = stringSplit[1];
    var shipStrength = parseInt(stringSplit[2]);
    var gridString = $(this).val();
    var shipGrids = gridString.split(", ");
    var shipHits = 0;

    var newShip = new Ship(shipCommander, shipType, shipStrength, shipGrids, shipHits)

    if (newShip.commander === "P1") {
      p1Fleet.push(newShip);
    } else {
      p2Fleet.push(newShip);
    }
  })
  // P1 Display Fleet
  for (var i = 0; i < p1Fleet.length; i++) {
    var displayType = p1Fleet[i].type;
    var displayGrids = p1Fleet[i].grids.toString();

    $(".P1-shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
  }
  // P2 Display Fleet
  for (var n = 0; n < p2Fleet.length; n++) {
    var displayType = p2Fleet[n].type;
    var displayGrids = p2Fleet[n].grids.toString();

    $(".P2-shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
  }

});


var p1Confirm = (function() {
  $(".P1-inputs").hide();
  $(".P2-inputs").show();

})

//returns an index to be called into other functions that are player specific
var isWhoseTurn = (function() {

  if (whoseTurn % 2 != 0) {
    currentPlayer = 0
  } else {
    currentPlayer = 1
  }
  $("#activePlayer").text(players[currentPlayer].commander);
})

var isHit = (function() {
  // var firingGrid = $("input#p1-firing-grid").val();
  // console.log(firingGrid);
  var firingGridIsHit = 0;
  var shipTypeHit;

  if (whoseTurn % 2 != 0) {
    for (var h = 0; h < p1Fleet.length; h++) {
      var fuck = p1Fleet[h].grids.indexOf(firingGrid);
      if (fuck < 0) {
        console.log("no fucks given");
      } else {
        firingGridIsHit += 1;
        p1Fleet[h].hits += 1;
        vesselHit = h;
        console.log(vesselHit);
        shipTypeHit = p1Fleet[h].type;
      } //This is the else end
    } //this ends the for loop



    // Determine if ship is Sunk
    if (p1Fleet[vesselHit].hits === p1Fleet[vesselHit].strength) {
      $("#sunkMessage").text("Ya'll are gonna fuckin drown on that " + p1Fleet[vesselHit].type);
      players[0].shipsSunk += 1;
    }
    // Determine if game is over
    if (players[0].shipsSunk === 5) {
      console.log("You sunk their Fleet!");
    }




  } //player 1 conditional close

  // These actions take place if a hit occured
  if (firingGridIsHit > 0) {
    if (currentPlayer === "Player 1") {
      players[0].hits.push(firingGrid);
    } else {
      players[1].hits.push(firingGrid);
    }
    $("#activeMessage").text("HIT! at firing grid for " + "Fleet Vessel " + vesselHit);
    // Turns Cell RED to indicate Hit
    $('[data-cell=' + firingGrid + ']').css({
      "background-color": 'red'
    });
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
    $("#activeMessage").text("Miss at firing grid");
    // Turns Cell TEAL to indicate MISS
    //advance player turn
    whoseTurn += 1;
    isWhoseTurn();

    $('[data-cell=' + firingGrid + ']').css({
      "background-color": 'teal'
    });

  }




})

var retrieveBoardState = (function(currentPlayer) {
  // format board for hits
  players[currentPlayer].hits.forEach(function(hit) {
    $('[data-cell=' + hit + ']').css({
      "background-color": 'red'})
  })
  // format board for misses
  players[currentPlayer].misses.forEach(function(miss) {
    $('[data-cell=' + miss + ']').css({
      "background-color": 'teal'})
  })



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
  $("button#button-game-setup").click(function() {
    $(".P1-inputs").show();
    $(".splash").hide();
    $(".playingBoard").show();

  })

  $("button#p1-shipShow-confirm").click(function() {
    p1Confirm();
  })

  $("button#p2-shipShow-confirm").click(function() {
    isWhoseTurn();
    gameSetup();
  })

  // Testing input replaced by graphic interaction
  //   $("button#fireTorpedos").click(function() {
  //     console.log("Fire le missiles!");
  //     isHit();
  //
  //   })




  $("form#gameSetup").submit(function(event) {
    event.preventDefault();
  })



  $("a").click(function(event) {
    // alert(this.children[0].dataset.cell);
    firingGrid = this.children[0].dataset.cell;
    isWhoseTurn();
    isHit();
    event.preventDefault();
  });
})
