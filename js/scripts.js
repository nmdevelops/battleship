// =================================
// ||                             ||
// ||      Business Logic         ||
// ||                             ||
// =================================
var p1Fleet = [];
// var p2Fleet = [];

function Ship (type, strength, grids, hits) {
  this.type = type;
  this.strength = strength;
  this.grids = grids;
  this.hits = 0;
}

var gameSetup = (function() {
  var shipType;
  var shipStrength;
  var shipGrids;
  var shipHits;

    $(".P1-inputs input").each(function() {
      typeStrengthString = $(this).attr("name");
      stringSplit = typeStrengthString.split(",");
      shipType = stringSplit [0];
      shipStrength = stringSplit [1];
      gridString = $(this).val();
      shipGrids = gridString.split(", ");
      shipHits = 0;

      var newShip = new Ship (shipType, shipStrength, shipGrids, shipHits)
      console.log(shipType);
      console.log(shipStrength);
      console.log(shipGrids);
      console.log(shipHits);

      p1Fleet.push(newShip);



    })
    for (var i = 0; i < p1Fleet.length; i++) {
      var displayType = p1Fleet [i].type;
      var displayGrids = p1Fleet [i].grids.toString();

      $(".shipShow ul").append("<li>" + displayType + displayGrids + "</li>")
    }

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
