# Home
Created at [DemonHacks 2020](https://demonhacks.com/)
## Description

Sketch is a discord bot that hosts a collaborative canvas unique to each discord that was inspired by Reddit's [r/place](https://www.reddit.com/r/place/). The bot aims to cover various artistic aspects that are convenient for people to have fun with over discord. To read more about this, please check our devpost.

## Technology Stack
- Javascript
- Firebase
- [Node.js](http://nodejs.org/)
- [Discord.js](https://discord.js.org/#/)
- [jimp](https://www.npmjs.com/package/jimp)

## Usage Guidelines

| Commands and Parameters | Examples of usage | Description |
| :--- | :--- | --- |
| **create** | !sketch create | Creates a new sketch for a discord server |
| **Sketch** | !sketch | Shows the current canvas of the discord server. |
| **Sketch \[row, column\]** | !sketch F23 {color} | Sets a given cell in the canvas to a color/hex value you provide. |
| **Sketch \[row, column\]** | !sketch A15 random | Sets a given cell in the canvas to a color/hex value you provide. |
| **image [url]** | !sketch {url} | Resizes a given image via URL to the canvas size and shifts each canvas cell to "the most applicable color". |
| **image [upload]** | !sketch {image file upload} | Resizes a given image via discord upload to the canvas size and shifts each canvas cell to "the most applicable color". |
| **fill \[color]** | !sketch fill {color} or !sketch fill random | Fills each cell of the canvas with color, hex color, or random hex color. |
| **clear \[ ]** | !sketch clear | Clears the canvas in the current discord server. |
| **help \[ ]** | !sketch help | Pulls up an embed with some help and examples for using the bot. |
| **legend \[ ]** | !sketch legend | Provides a fun fact about the developers of the bot! |


## Team members

- [Alex R](https://github.com/arod0719)
- [Tom Z](https://github.com/Tommot4747)
- [Alex M](https://github.com/alextkd99)
