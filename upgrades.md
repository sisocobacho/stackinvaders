# Upgrades

## Player hit effect

We created a hit effect for every time the player loses a live. The effect consits on flashing the screen red. 
For that we created a function called drawHitEffect on Player.js this function will create the effect by drawing a red rectangle using alpha and blending mode. 
The alpha variable will be reduce overtime when it becomes less or equal to cero the effect will be remove.
We also modify the respawn by not repositioning the player we just do effect now. This also fixes the problem when responing and colliding with drebris right away. 

## Rearranging assets
we create a folder for assets in order to be more organized, all images used will be in this folder.

## Alien animation and graphics
In order to created the alien animation we created two images that represent two position of the alien movement. 
We need to pass this two images to the Invaders object and the Alien object. 
Then this images will be schown depending on the current rate. 
If the result is more than half the rate an images will be shown else the other image. This functionality is in implemented on Alien.js the draw function. 

## Alien explotion
For creating the effect of the alien exploding we are going to use a new class Particles on Particles.js that we pass a color, in this case green because the aliens are green.
So when an alien is shot we create around 10 Particles that move in different random directions eventualy disappearing. 
We have a function in Player.js "explodeAlien" and another in sketch.js "drawParticles" that handle the creation and destruction of particles.

## Debris rotation and graphics
 We are going to assing a new image to the debris and we are going to rotate the debris while its moving.
 On Debris.js we now pass a new image and on sketch.js we load the new image. We also create a new variable for the angle and the rotation rate.
 The angle is going to be incremented by the randomly generated rotation rate. Then on the display function we rotate the image base on the angle.

## Upgradeship base on points not pause
Now we are going to upgrade the ship base on points. For that we create twoo variables on Player.js "firstNftScore" and "secondNftScore". 
When reach the scores represented on those varibales. A specific logic will be trigger in order to display nft or upgrade the ship.We also changed the player graphics for the upgraded ship now is going to be a red ship.

## Change player nft logic
We going to use the api to request the nft instead of using static array of the links. For that we change the getData function on login.js.
We are going to request the nft passing the contract address and the nft id using "getNFT" from the api this will give us all the information about the nft including name, description and img url.

## Show nfts acquire by player
We are going to show the nfts that the players has on the top middle of the screen. 
For that we have created a function on login.js called "getUserNfts", the result of this function is assign to the window object attribute nfts. 
For obtaining this information we use "listNFTsByAccountAddress" from the api, we just need to pass the contract address and account address that we need to show nfts from.
Then on the Player.js we are going to loop through window.nfts to show the nfts picture on the screen, this code is implemented in the "drawNfts" function.
The nfts user informaction function "getUserNfts" is called when we are getting user information or when a nft is claimed, this will update the array window.nfts and the nfts will be shown.

