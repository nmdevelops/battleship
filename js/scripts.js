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
  // format board for hits
  $(".playingBoard div").css({"background-color": 'blue'});

  players[currentPlayer].hits.forEach(function(hit) {
    // $('[data-cell=' + hit + ']').removeAttr( 'style' );
    $('[data-cell=' + hit + ']').css({
      "background-color": 'red'
    });
  })
  // format board for misses
  players[currentPlayer].misses.forEach(function(miss) {
    // $('[data-cell=' + miss + ']').removeAttr( 'style' );
    $('[data-cell=' + miss + ']').css({
      "background-color": 'teal'
    });
  })
})

// Need a timeout to get this to work nicely
//   $("#activeMessage").empty();
var updateGameSpace = (function() {
  $("#activePlayer").text(players[currentPlayer].commander);
  retrieveBoardState(currentPlayer);
})

var gameSetup = (function() {

  players[0] = new Player("P1", [], 0, [], []);
  players[1] = new Player("P2", [], 0, [], []);
  $(".P2-inputs").hide();
  $(".p1-gamePlay").show();


  //create ships and assign to fleets in players array
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
      players[0].fleet.push(newShip);
    } else {
      players[1].fleet.push(newShip);
    }
  })
  // P1 Display Fleet
  for (var i = 0; i < players[0].fleet.length; i++) {
    var displayType = players[0].fleet[i].type;
    var displayGrids = players[0].fleet[i].grids.toString();

    $(".P1-shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
  }
  // P2 Display Fleet
  for (var n = 0; n < players[1].fleet.length; n++) {
    var displayType = players[1].fleet[n].type;
    var displayGrids = players[1].fleet[n].grids.toString();

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
  // $("#activePlayer").text(players[currentPlayer].commander);
})

var isHit = (function() {
  // var firingGrid = $("input#p1-firing-grid").val();
  // console.log(firingGrid);
  var firingGridIsHit = 0;
  var shipTypeHit;


  for (var h = 0; h < players[currentPlayer].fleet.length; h++) {
    var fuck = players[currentPlayer].fleet[h].grids.indexOf(firingGrid);
    if (fuck < 0) {
      console.log("no fucks given");
    } else {
      firingGridIsHit += 1;
      players[currentPlayer].fleet[h].hits += 1;
      vesselHit = h;
      console.log(vesselHit);
      shipTypeHit = players[currentPlayer].fleet[h].type;
    } //This is the else end
  } //end for loop









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

    // Determine if ship is Sunk
    if (players[currentPlayer].fleet[vesselHit].hits === players[currentPlayer].fleet[vesselHit].strength) {
      $("#sunkMessage").text("Ya'll are gonna fuckin drown on that " + players[currentPlayer].fleet[vesselHit].type);
      players[0].shipsSunk += 1;
    }
    // Determine if game is over
    if (players[0].shipsSunk === 5) {
      console.log("You sunk their Fleet!");
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
    updateGameSpace();

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
    updateGameSpace();
    event.preventDefault();
  });
})
