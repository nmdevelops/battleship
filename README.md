# _{Application Name}_

#### _{Brief description of application}, {Date of current version}_

#### By _**Michael Brooks, Faunie Szeloczei, Nathan Mayer, Karla Buckner**_

## Description

_This is an online version of the classic Battleship game.  It is a 2 player dependent game.  Two can battle it out guessing via a coordinate system and seeing results of hit or miss on the grid. Once one player has sunk all of their opponent's ships the game is won!_
## Specifications

| Rank | Behavior | Input | Output |
|---|---|---|---|
<!-- | 01 | Display title and rules | NONE | NONE | -->
<!-- | 02 | Display "Game Setup" button (click handler) | NONE | NONE | -->
<!-- | 03 | Display P1 setup inputs | Grid Coord | NONE | -->
<!-- | 04 | Collect P1 setup inputs |  A1, A2, A3    |  log(destroyer location)   | -->
| 06 | Instantiate Player Ships | | |
| 07 | Put ship objects into fleet | | |
| 05 | Display 10 x 10 grid playing board | NONE | NONE |
| 06 | Display P1 ship locations on playing board | Grid Coord | span id=P1-Occupado |
| 07 | Display "P1 Board Confirm" button (click handler) | NONE | NONE |
| 08 | Hide P1 setup inputs | CLICK | Do the damn things |
| 09 | Hide P1 ship locations on playing board | NONE | NONE |
| 10 | Show P2 setup inputs | CLICK | Do the damn things |
| 11 | Collect P2 Ship inputs
| 12 | Display P2 ship locations on playing board | Grid Coord | span id=P2-Occupado |
| 13 | "Start Game" button (submit) | NONE | NONE |
| 14 | Show P1 playing board display | NONE | NONE |
| 15 | Display P1 coordinate blank input | Coordinate from board | log |
| 16 | Collect P1 firing coordinates | | |
| 17 | Check input from 14 for hit or miss | NONE | True/False |
| 18 | When isHit = true display "Hit!" | True | "Hit!" |
| 19 | When isHit = false display "Miss!" | False | "Miss!" |
| 20 | When isHit = true run isSunk | True | log(isSunk) |
| 21 | isSunk = True | True | "Sunk!" |
| 22 | isSunk = True run isShipType | True | log(isShipType) |
| 23 | Display type of ship sunk | True | You sunk my fuckin carrier! |
| 24 | Add 1 to isGameOver | Sunk | isGameover +=1 |
| 25 | If isGameOver = 5 | 5 | log("You Won!") |
| 26 | Display "You Won"  & Game Over| 5 | "You Won! & "Game Over! |
| 27 | Display Winners Board Layout |  |  |
| 28 | When isHit = false advance player turn | false | turnAdvance +=1 |
| 29 | isWhoseTurn () {turnadvance % 2 === 0} | true | P2 Turn |
| 30 | isWhoseTurn () {turnadvance % 2 === 0} | false | P1 Turn |

<!-- | 15 | If all return false loop back to 12 | | |

| 2FC | Game Setup : Computer opponent simple (click event) | NONE | randomize() assign playboard to p2(computer) | -->

## Setup/Installation Requirements

* _Open in browser with link below_
* _https://nmdevelops.github.io/battleship/_

## Known Bugs

_There are no known bugs at this time but do not hesitate to contact us if you find something of interest._

## Support and contact details

_Contact at MikeAlphaBravo1982@gmail.com_

## Technologies Used

_HTML / CSS / JavaScript / JQuery / Bootstrap_

### License

_This software is licensed under the MIT license._

Copyright (c) 2017 _**Michael Allen Brooks, Nathan Mayer, Karla Buckner, Faunie Szeloczei**_
