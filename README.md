# v-progressbars

Easily progress bars for GTAC/MafiaC! 
Create as many as you want, set percentages manually or automatically based on time span. Works in any resource, both clientside and serverside, and with any of GTAC's scripting languages!

## Download
https://github.com/VortrexFTW/v-progressbars

## Syntax
*Use in any resource with [resource exports](https://wiki.gtaconnected.com/resource.exports).* 
```
create(Client client, String name, Integer duration, Vec2 position, Vec2 size, Integer colour, Integer background);

percent(String name, Integer percent);

destroy(String name);
```

  
## Args
* Name: Anything you want, can be used as a reference to set percentage and destroy existing progress bars
* Duration: Time in milliseconds to show the progress bar from start to finish (i.e. 5000 will scroll the progress bar from 0 to 100 in 5 seconds). Set to 0 to manually set percentages.
* Position: Percentage of screen size width/height. Example: [50,80] will show a progress bar centered horizontally (50 percent of the width) and 80 percent down the screen.
* Size: Same as position, but the size of the progress bar. Still uses screen size percentage. [50, 1] will show a thin progress bar that takes up half the width of the screen
* Colour: The main colour [toColour](https://wiki.gtaconnected.com/toColour) or one of the built-in consts, i.e. COLOUR_RED
* Background: The background colour, usually black but any [toColour](https://wiki.gtaconnected.com/toColour) will work, same as Colour arg

## Example (JavaScript)
```js
addCommandHandler("progressbar", function(command, params, client) {
    findResourceByName("v-progressbars").exports.create(client, "test1", 3000, new Vec2(50, 80), new Vec2(30, 1), COLOUR_GREEN, COLOUR_BLACK);
});
```

## Example (Lua)
```lua
addCommandHandler("progressbar", function(command, params, client)
    findResourceByName("v-progressbars").exports.create(client, "test1", 3000, Vec2(50, 80), Vec2(30, 1), COLOUR_GREEN, COLOUR_BLACK)
end)
```

## Example (Squirrel)
```squirrel
addCommandHandler("progressbar", function(command, params, client) {
    findResourceByName("v-progressbars").exports.create(client, "test1", 3000, Vec2(50, 80), Vec2(30, 1), COLOUR_GREEN, COLOUR_BLACK);
});
```
