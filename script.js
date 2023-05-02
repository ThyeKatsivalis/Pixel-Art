// variaveis e constantes

const btnColor = document.getElementById('button-random-color');
const palhetaCores = document.getElementById('color-palette').children;
const gradeDePixel = document.getElementsByClassName('pixel');
const selected = document.getElementsByClassName('selected');
const botaoLimpar = document.getElementById('clear-board');

// Cor inicial

palhetaCores[0].classList.add('selected');
palhetaCores[0].style.backgroundColor = 'black';
palhetaCores[1].style.backgroundColor = 'red';
palhetaCores[2].style.backgroundColor = 'green';
palhetaCores[3].style.backgroundColor = 'blue';

let selectedColor = selected[0].style.backgroundColor;

// inicial 2

function geradorDeCores() {
  const chars = '0123456789ABCDEF';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return color;
}

document.getElementById('button-random-color').addEventListener('click', () => {
  const salvaCor = [];
  for (let index = 1; index < palhetaCores.length - 1; index += 1) {
    let color = geradorDeCores();
    let divColor = document.getElementById(`color-${index + 1}`);
    divColor.style.backgroundColor = color;
    let txtColor = document.getElementById(`txt-color-${index + 1}`);
    txtColor.textContent = `${color}`;
    salvaCor.push(color);
  }
  localStorage.setItem('colorPalette', JSON.stringify(salvaCor));
});

function loadStorage() {
  let getLocalStorage = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 1; index < 4; index += 1) {
    let divColor = document.getElementById(`color-${index + 1}`);
    divColor.style.backgroundColor = getLocalStorage[index - 1];
  }
}

function storageInBoard() {
  const gradeDePixel = document.getElementsByClassName('pixel');
  const boardArray = [];
  for (let i = 0; i < gradeDePixel.length; i += 1) {
    boardArray.push(gradeDePixel[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(boardArray));
}

function storageOutBoard() {
  if (localStorage.pixelBoard) {
    const boardReturn = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let i = 0; i < boardReturn.length; i += 1) {
      gradeDePixel[i].style.backgroundColor = boardReturn[i];
    }
  }
}

function checkoutLocalStorage() {
  if (localStorage.getItem('colorPalette') !== null) {
    loadStorage();
  }
}

checkoutLocalStorage();
storageOutBoard();

//seletor de cores

function colorSelect(event) {
  for (let i = 0; i < selected.length; i += 1) {
    selected[i].classList.remove('selected');
  }
  const clickedColor = event.target;
  clickedColor.classList.add('selected');
  selectedColor = clickedColor.style.backgroundColor;
}
function colorDrop(event) {
  const clickedPixel = event.target;
  clickedPixel.style.backgroundColor = selectedColor;
  storageInBoard();
}

for (let i = 0; i < palhetaCores.length - 1; i += 1) {
  palhetaCores[i].addEventListener('click', colorSelect);
}

for (let i = 0; i < gradeDePixel.length; i += 1) {
  gradeDePixel[i].addEventListener('click', colorDrop);
}

function pixelClear() {
  for (let i = 0; i < gradeDePixel.length; i += 1) {
    gradeDePixel[i].style.backgroundColor = 'white';
  }
}

window.addEventListener('load', checkoutLocalStorage);

btnColor.addEventListener('click', geradorDeCores);

botaoLimpar.addEventListener('click', pixelClear);

for (let i = 0; i < palhetaCores.length - 1; i += 1) {
  palhetaCores[i].addEventListener('click', colorSelect);
}

// função salva cores da grade

/** 1 - preciso salvar as cores:
- preciso pegar os elementos que estao no html e trazer para serem salvos:
pegar as cores que estao no html por class, id ou tag
usar o comando que pega os elementos por class, id ou tag

- preciso pegar varios elementos de uma vez que são as cores
para pegar varios elementos podemos usar um array, ou utilizar a classe que indica as cores no
caso a class color.
- preciso verificar se foram salvos mesmo
*/
/**
2- preciso carregar as cores salvas quando a pagina atualizar novamente:

*/
// console.log(divColor.style.backgroundColor)
