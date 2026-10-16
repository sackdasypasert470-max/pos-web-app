This folder is reserved for the Phetsarath OT font files.

To use Phetsarath OT in the app menu (bold, size 18), upload your font files here:
- public/fonts/PhetsarathOT-Regular.ttf
- public/fonts/PhetsarathOT-Bold.ttf

Then import via CSS @font-face in styles/globals.css. Example:

@font-face {
  font-family: 'Phetsarath OT';
  src: url('/fonts/PhetsarathOT-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}
