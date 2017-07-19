// =================================
// ||                             ||
// ||      Business Logic         ||
// ||                             ||
// =================================
var p1Fleet = [];
// var p2Fleet = [];

function Ship(type, strength, location, hits) {
  this.type = type;
  this.strength = strength;
  this.location = [];
  this.hits = 0;
}

// var newShip = new Ship ($("input#carrier-grid[name=carrier]").val(), )

var gameSetup = (function() {
  $(".P1-inputs input").each(function() {
    var typeStrengthString = $(this).attr("name");
    var stringSplit = typeStrengthString.split(",");
    var shipType = stringSplit [0];
    var shipStrength = stringSplit [1];
    var gridString = $(this).val();
    var shipLocation = gridString.split(", ");
    var hits = 0;
    console.log(shipType);
    console.log(shipStrength);
    console.log(shipLocation);
    console.log(hits);
  })

});







// TEST INPUTS
// A1, A2, A3, A4, A5

// =================================
// ||                             ||
// ||    User Interface Logic     ||
// ||                             ||
// =================================
$(document).ready(function() {
  $("button#P1-input-test").click(function() {
    gameSetup();
  })
  $("form#gameSetup").submit(function(event) {
    prevent.eventDefault();

  })
})
