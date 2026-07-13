const correctSound = new Audio(
"https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
);

const wrongSound = new Audio(
"https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"
);

const clickSound = new Audio(
"https://actions.google.com/sounds/v1/buttons/button_click.ogg"
);
const backgroundMusic = new Audio(
"https://actions.google.com/sounds/v1/ambiences/arcade_room.ogg"
);

backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;
