In this file, I will expalin some of the key bits of code so that you may understand why some things are set up the way they are.

![Code1](https://user-images.githubusercontent.com/43252460/117877736-e866d000-b272-11eb-82dd-c9976a62fa8c.PNG)

These are the initial variables that the code heavily relies upon. This includes variables such as timer/timer2/timer3 that track the timing between sounds as well as displays, as well as others like blinking that track whether the new sequence is being displayed currently, curscore which tracks the current score, and correct which tracks whether the correct colors are being clicked at any given point of the sequence.

![Code2](https://user-images.githubusercontent.com/43252460/117878266-92465c80-b273-11eb-88ed-b7cceb297b52.PNG)
![Code3](https://user-images.githubusercontent.com/43252460/117878269-93778980-b273-11eb-9512-298750b64557.PNG)

This set of code is the setup for the program. the first 2/3 of the setup is dedicated to creating, sizing, coloring, and positioning all of the buttons that are displayed within the program. As the buttons are more closely related to the html side of p5js, all of these variables have to be taken care of using css style codes and commmands.

The last 1/3 of the code is for creating and settinh up the oscillators that generate the sounds that can be heard when pressing buttons and losing the game. As one may notice, there are two sets of oscillators, one for when the sequence is being displayed, and one for when th user clicks on a color button. There needs to be two sets of sound variables so as to not create conflict over which sound needs to play when and for how long.

![Code4](https://user-images.githubusercontent.com/43252460/117879032-7099a500-b274-11eb-86e7-f4a706072fed.PNG)

This is the draw section of the code, which you may notice is fairly short and does not have much content. This is because most of the program's actual code is written within seperate functions that are triggered by button presses. The draw section is mostly used for detecting whether a player has lost, and keeping the timing between sounds in order.

![Code5](https://user-images.githubusercontent.com/43252460/117879322-d423d280-b274-11eb-99bf-94c68ebbd44c.PNG)

This is a short snippet of code that represents the press of the red button. All of the color buttons are programmed the same way, with the only difference being what sound is played and which are stopped.

![Code6](https://user-images.githubusercontent.com/43252460/117879526-177e4100-b275-11eb-8300-06c42c8adbdf.PNG)

This is the restart function which is triggered upon the restart of the game(duh). It will reset all of the necessary variables in order to start the game again as if it had never been started in the first place.

![Code7](https://user-images.githubusercontent.com/43252460/117879783-59a78280-b275-11eb-9af8-d03773d5be66.PNG)

the blink function is used to play the sound of the current sequence color, as well as triggering the sound to play. This was one of the more difficult sections of code to get working, as orignally each color button wouldn't change back to it's orignal color at the right time, so all the buttons would end up white or the wrong color.

![Code8](https://user-images.githubusercontent.com/43252460/117880113-bacf5600-b275-11eb-84b2-8a7912f89d91.PNG)

Lastly we have the windowResized function which changes all of the sizing and placement variables for all of the buttons should the size of the window change. These variables took some playing around with to get right, especially the font size variables, as it must be a ratio between screen size in both the x and y to the font size. If the ratio is too low, the text is too large, if the ratio is to high, the text is too small.

