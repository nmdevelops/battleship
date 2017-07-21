// =================================
// ||                             ||
// ||      Business Logic         ||
// ||                             ||
// =================================
var p1Fleet = [];
var p2Fleet = [];
var whoseTurn = 1;


function Ship (commander, type, strength, grids, hits) {
  this.commander = commander;
  this.type = type;
  this.strength = strength;
  this.grids = grids;
  this.hits = 0;
}

var gameSetup = (function() {
  // var shipCommander;
  // var shipType;
  // var shipStrength;
  // var shipGrids;
  // var shipHits;

    $(".inputs input").each(function() {

      var commanderTypeStrengthString = $(this).attr("name");
      var stringSplit = commanderTypeStrengthString.split(",");
      var shipCommander = stringSplit [0];
      var shipType = stringSplit [1];
      var shipStrength = stringSplit [2];
      var gridString = $(this).val();
      var shipGrids = gridString.split(", ");
      var shipHits = 0;

      var newShip = new Ship (shipCommander, shipType, shipStrength, shipGrids, shipHits)
      console.log(shipCommander);
      console.log(shipType);
      console.log(shipStrength);
      console.log(shipGrids);
      console.log(shipHits);
        if (newShip.commander === "P1") {
          p1Fleet.push(newShip);
        } else {
          p2Fleet.push(newShip);
        }
    })
// P1 Display Fleet
    for (var i = 0; i < p1Fleet.length; i++) {
      var displayType = p1Fleet [i].type;
      var displayGrids = p1Fleet [i].grids.toString();

      $(".P1-shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
    }
// P2 Display Fleet
    for (var n = 0; n < p2Fleet.length; n++) {
      var displayType = p2Fleet [n].type;
      var displayGrids = p2Fleet [n].grids.toString();

      $(".P2-shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
    }

});

var p1Confirm = (function() {
  $(".P1-inputs").hide();
  $(".P2-inputs").show();

})

var isHit = (function() {
  var firingGrid = $("input#p1-firing-grid").val();
  console.log(firingGrid);

  if (whoseTurn % 2 != 0) {
    for (var h = 0; h < p1Fleet.length; h++) {

      var fuck = p1Fleet[h].grids.indexOf(firingGrid);

      if (fuck < 0) {
        console.log("Miss at firing grid for " + "Fleet Vessel " + h);
      } else {
        console.log("HIT! at firing grid for " + "Fleet Vessel " + h);
        p1Fleet[h].hits += 1;
      }


    }
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
    gameSetup();
  })
  $("button#fireTorpedos").click(function() {
    console.log("Fire le missiles!");
    isHit();

  })


  $("form#gameSetup").submit(function(event) {
    prevent.eventDefault();

  })



})
