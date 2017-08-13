# Regalia - Enhanced RAGS 2.x player for the browser

## Background

### What is RAGS?

RAGS, the '**R**apid **a**dventure **g**ame **s**ystem', is a set of tools to develop simple point and click games with text and images. There is a 'Rags Designer' used to create the games, and a 'Rags Player' to play them. Typically available only on Windows.

### What is Regalia?

Rags 2.x has a 'Save To Web Format(BETA)' option available in the designer that produces a HTML/CSS/JavaScript version of the game for usage in your web browser. Unfortunately, since that option is 'BETA', it will only work for the simplest of games, and the design is not so great.

This project is an attempt to fix that runner code, or at least fix it for games that anyone cares about.

### Limitations

Rags 3.x games are not supported. Exporting a game in the Rags 3.x designer creates a Silverlight thing instead of a plain JavaScript app. Not sure if the exported thing works in Silverlight or not, or how easy it is to install Silverlight these days, but I'm not touching it.

Just like the desktop Rags player, **saves from one version of a game will not work on other versions**. This is because Rags saves are just a copy of the entire game state, so if you load an old Rags save you're basically loading the old version of the game.

## Features

### Save/Load

* Saves use localStorage instead of deprecated browser storage APIs
* Saves are stored as deltas against the original game state, rather than full copies of the game state. So in some cases, the saves are ~100k instead of ~20mb.
* Saves can be exported to files, for backup or portability between browser sessions

### Cheating

* Game variables can be inspected, changed, and frozen

### Interface

* Navigation compass has much larger clickable regions
* Objects and Characters that are in the room with you but don't have any actions available are shown as grayed-out.

### Fixes

* Many, many bugs in the original 'Save To Web Format(BETA)' code that would stop progress in games have been fixed. (Partially/incorrectly implemented commands, race conditions, memory leaks, etc...)

## Installing Regalia

To play a Rags game in Regalia, first you need to export the game with the Rags designer, using the 'Save To Web Format(BETA)' option. Before exporting, you will probably need to use the custom patched RagsLib.dll included on the Releases page for this project.

If you can't open the game you want to convert in the Rags designer because it's password-protected, note that you can find versions of the Rags Designer on the internet with this password protection removed.

Next, you need to run the Regalia install script on your game:

* Ensure you have some version of Ruby installed
* Ensure you have some version of NodeJS/NPM installed
* In the Regalia source directory, `npm install`
* In the Regalia source directory, `./bin/install /path/to/exported/game/dir`

This will create a "(your game name) - regalia.html" file in that directory, as well as a "regalia" subdirectory with all the associated JavaScript and CSS.

To run the game, just open the "(your game name) - regalia.html" file in any browser. Tested mostly only in Chrome, your mileage may vary.

### Why is there a patched RagsLib.dll?

The export code in the original 'Save To Web Format(BETA)' feature does an okay job of exporting out all the game data to a JavaScript file, but doesn't correctly escape quotes in all fields. So if your game has double-quotes in certain places, it won't load. The patched RagsLib.dll fixes this in some places (but not all):

* Custom Choice Titles
* Timer Names

## Problems

I don't know, file an issue, I guess. I don't have a lot of time to work on this project anymore, but maybe we can figure something out.

## For Developers

### Running Tests

On windows:
`cmd /C "set GAMES_DIR=C:\a-directory-with-games-in-it && rspec spec`

Elsewhere:
`GAMES_DIR=/a/directory/with/games/in/it rspec spec`
