// =================================
// ||                             ||
// ||      Business Logic         ||
// ||                             ||
// =================================
var p1Fleet = [];
// var p2Fleet = [];

var Strengths = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
}

function Ship(type, strength, location, hits) {
  this.type = type;
  this.strength = strength;
  this.location = [];
  this.hits = 0;
}

// var newShip = new Ship ($("input#carrier-grid[name=carrier]").val(), )

var gameSetup = (function() {
  console.log("Is that it...?");
  $(".P1-inputs input").each(function() {
    inputtedType = $(this).attr("name");
    console.log(inputtedType);
  })

});

var grabGrids = (function() {
  var testShip = $("input#carrier-grid").val();
  var shipLocation = testShip.split();
  console.log(testShip);
  console.log(shipLocation);

})








// =================================
// ||                             ||
// ||    User Interface Logic     ||
// ||                             ||
// =================================
$(document).ready(function() {
  $("button#P1-input-test").click(function() {
    grabGrids();
    gameSetup();
  })
  $("form#gameSetup").submit(function(event) {
    prevent.eventDefault();

  })
})
