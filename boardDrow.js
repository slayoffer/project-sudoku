const cfonts = require('cfonts');

function createString(arr, forma) {
  const el = arr;
  const b = forma.border;
  const v = forma.vertical;
  const s = forma.space;
  const line = `${b}${s}${el[0]}${s}${v}${s}${el[1]}${s}${v}${s}${el[2]}${s}${b}${s}${el[3]}${s}${v}${s}${el[4]}${s}${v}${s}${el[5]}${s}${b}${s}${el[6]}${s}${v}${s}${el[7]}${s}${v}${s}${el[8]}${s}${b}`;
  return line;
}
function stringSolid(forma) {
  const lineLength = forma.lineLength();
  let line = '';
  line = line.padStart(lineLength, forma.border);
  return line;
}

function stringLayer(forma) {
  const b = forma.border;
  let block = '';
  block = block.padStart((forma.space.length * 6 + 5), ' ');
  const line = `${b}${block}${b}${block}${b}${block}${b}`;
  return line;
}

function generateColor() {
  const gen = "#" + Math.floor(Math.random() * 16777215).toString(16);
  if (gen.length === 7) {
    return gen;
  }
  if (gen.length === 6) {
    return gen + "0";
  } else {
    return gen + "00";
  }
}
const color1 = generateColor();
const color2 = generateColor();

const fontSetting = {
  space: false,
  font: 'console',
  gradient: `${color1},${color2}`
};

function boardDrawCfonts(array, formaC) {
  const m = formaC.margin;
  cfonts.say(m + stringSolid(formaC), fontSetting);
  cfonts.say(m + stringLayer(formaC), fontSetting);
  array.forEach((el, ind) => {
    if (ind === 3 || ind === 6) {
      cfonts.say(m + stringSolid(formaC), fontSetting);
      cfonts.say(m + stringLayer(formaC), fontSetting);
    }
    cfonts.say(m + createString(el, formaC), fontSetting);
    cfonts.say(m + stringLayer(formaC), fontSetting);
  });
  cfonts.say(m + stringSolid(formaC), fontSetting);
}

module.exports = boardDrawCfonts;
