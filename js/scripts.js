// =================================
// ||                             ||
// ||      Business Logic         ||
// ||                             ||
// =================================
var p1Fleet = [];
var p2Fleet = [];

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
    for (var i = 0; i < p2Fleet.length; i++) {
      var displayType = p2Fleet [i].type;
      var displayGrids = p2Fleet [i].grids.toString();

      $(".P2-shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
    }

});

var p1Confirm = (function() {
  $(".P1-inputs").hide();
  $(".P2-inputs").show();

})






// TEST INPUTS
// A1, A2, A3, A4, A5

// =================================
// ||                             ||
// ||    User Interface Logic     ||
// ||                             ||
// =================================
$(document).ready(function() {
  $("button#button-game-setup").click(function() {
    $(".P1-inputs").show();
    $(".splah").hide();

  })
  $("button#p1-shipShow-confirm").click(function() {
    p1Confirm();
  })
  $("button#p2-shipShow-confirm").click(function() {
    gameSetup();
  })
    $("form#gameSetup").submit(function(event) {
    prevent.eventDefault();

  })
})
