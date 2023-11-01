# STACK INVADERS

This games is inspired by the classic game "Space invaders" and and also takes some inspiration from "Space race" another classic game. It is a browser game and it has some additional gameplay mechanics that the original doesn't have, for example you can move up and down. The ability to move up and down allows you to move to the top of screen behind enemies allowing also to shoot them from above. The movement of your ship try to simulate the movement in space where if you move one way you continue drafting until you change direction. In the game you can also encounter debris from space that you have to avoid, the aliens are immune to the debris making the game more challenging. The difficulty increase every time you kill all the enemies and another batch of enemies will appear becoming faster and faster in their movements each iteration. The enemies don't only move from side to side like in the classic they move also up and down. The player has 3 lives you can lose your lives by getting shot by an enemy, colliding with debris and also by colliding with an enemy, if you run out of lives the game is over. The main idea of the games is to kill as many enemies as you can to earn points while avoiding any damage. If you achive enoughs points you can earn nfts.

## How the game works

P5 js is use to build the game. The game structure is as follow.

- sketch.js

Here we define the canvas and setup the game. We instance the main elements of the game like Player, Debris and Enemies. We also display information for guiding the player for example what the player should do to start the game or when the game is over or even if is waiting for user authentication response. There is also some functionality use for resizing the canvas when the window resize.

- Player.js

Here we define the player dimensions, images and movement. We also create functionalities for shooting bullets, displaying score and lives of the player. There also the logic for showing the nft if the score is gets to 500 points.

- Invaders.js

Here we define all the logic related to enemies how the are created and how they move and their attacks. The enemies are aliens that move in formation from left to right and then going down if they get to the bottom they return up this process continues until all the aliens are dead. the bottoms alien shoot bullets if a bullets hits a player the player loses a live. 

- Alien.js

Here we define the alien dimensions, position and appearance by drawing the alien image. We also have the functionality for detecting if an alien hits a player

- Bullet.js

Here we define the main bullet object. It’s just a white rectangle.

- AllienBullet.js

We use inheritance to get everything that the Bullet has and add  functionality for detecting if the player is hit and also how the bullet moves.

- PlayerBullet.js

We do the same thing for the players bullet. We implemented functionality for the movement this has the particularity that it depends if the player is above the enemies it shoots down if under shoots up.

- Debris

Here we define all the logic and appearance related to the debris. The debris are simply circles of different sizes that randomly appear from each side of the screen. It also has functionality for determining if a player is hit.


## Inmutable Passport integration

Passport integration is used to authenticate the user and obtain information like the user email. Allowing us to link the score in the game with the user. It also allows use to access the nft when you get to a score of 500.

Authentication

## Controls

In the game you move with the arrows left, right, up, down and you shoot with the (space key).

## Features

- The game has passport authentication for identifying the user.
- You can earn nfts by getting to a high score. You have to score more than 500 points!!

## Tecnologies

- html
- Javascript
- Css
- P5js
- Bootstrap
- Immutable zkEVM

## Improvements to make

The are some ideas to improve the game but the time constrains didn't allowed to be implemented.

### Some of the ideas

- Obtaning powerups ntfs that makes your shots more potent, increase your speed or grants you a shield
- Creating more enemies that become more powerfull as the difficulty increases.
- Create a ranking of tops score. Given the 1,2,3 place unique ntfs.
- Adding sound to the game.
- Adding explotion effects
- Making the game playable on movile

## Social Media

- Discord: Qende
- X: @OOcobacho



