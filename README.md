# Axure Font Face

Finally, use FontAwesome and Redacted in your Axure prototypes.

I put this together because I was tired of converting everything to an image to get it working.

At this point the library is VERY alpha and needs end user documentation for getting setup.

## Getting Setup

1. Install Node.js
2. Copy this to your computer.
3. Update `package.json` with the location of your Axure prototype.
4. Update `css/fonts.css` to contain your @font-face rules.
5. Place your webfonts in `fonts`
6. From this folder run `npm install`
7. Run `grunt` each time you generate your prototype.

## TODO

1. It would be nice if the location of the Axure prototype could be supplied via the command line.
2. Is it possible to support multiple prototypes?
3. Can this be turned into a proper grunt-plugin?
