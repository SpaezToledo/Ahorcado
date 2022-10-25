
const wordContainer = document.getElementById('wordContainer'); // contenedor de la palabra
const startButton = document.getElementById('startButton'); // boton de start
const usedLettersElements = document.getElementById('usedLetters'); // donde van las palabras usadas

let canvas = document.getElementById("canvas"); 
let ctx = canvas.getContext("2d"); // llamar canvas con metodo getContext, lo usamos con 2 dimensiones
ctx.canvas.width = 0 ; 
ctx.canvas.height = 0 ;

const bodyParts = [   // valores para ir dibujando las partes del ahorcado a medida que se convierten errores
    [4,2,1,1],  // cabeza 
    [4,3,1,2],  // torso
    [3,5,1,1],  
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];



let selectedWord;   // palabra que se debe adivinar
let usedLetters;    //letras que ya se utilizaron
let mistakes;   //errores
let hits;   // aciertos


const addLetter = letter => {
    const letterElement = document.createElement('span'); // creamos este elemento
    letterElement.innerHTML = letter.toUpperCase();  
    usedLettersElement.appendChild(letterElement);   // al elemento donde guardamos todas las letras le agregamos este nuevo elemento
}




const addBodyPart = bodyPart => {
    ctx.fillStyle = '#000000';  // hombrecito se dibuje color negro
    ctx.fillRect(...bodyPart);   // descontruccion: pasarle la parte del cuerpo que debe ir
};



// letra incorrecta
const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);  //agregando persona, el momento en el que estemos segun los errores que se cometio
    mistakes++;  // sumar error al poner parte del cuerpo
    if(mistakes === bodyParts.length) endGame();   // los errores son iguales a la cant de parte del cuerpo volvemos a llamar endGame
}



const endGame = () => {
    document.removeEventListener('keydown', letterEvent); // sacamos el eventListener que tienen las teclas para que el usuario no pueda seguir ingresando letras
    startButton.style.display = 'block';   // vuelve el boton de start para que el usuario pueda iniciar otra partida
}


// letra correcta
const correctLetter = letter => {    
    const { children } =  wordContainer;    // contenedor de la palabra y obtenemos todas las letras de la misma
    for(let i = 0; i < children.length; i++) {    // iterar hasta que i sea menor que el largo del array, todas las letras
        if(children[i].innerHTML === letter) {   // si el span es igual a la letra que selecciono el usuario...
            children[i].classList.toggle('hidden');  // sacar clase hidden para que el usuario vea la palabra
            hits++;    // guardamos el acierto, que esta en 0
        }
    }
    if(hits === selectedWord.length) endGame();   // si la cantidad de aciertos es igual al largo de la palabra ya finalizo la partida.  
}



// usuario ingresa letra
const letterInput = letter => {
    if(selectedWord.includes(letter)) {   // si la palabra tiene esa letra
        correctLetter(letter);       
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);  // a letras usadas le agregamos la letra que acabamos de usar
}; 


const   letterEvent = event => {
    let newLetter = event.key.toUpperCase(); 
    if(newLetter.match(/^[a-zñ]$/i)+[0-9]&& !usedLetters.includes(newLetter)) {  // El usuario toco una letra darle como correcto, ademas de si se uso la letra
        letterInput(newLetter);  
    };
};



// iterar cada letra de la palabra seleccionada
const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();  // la letra 1x1 en mayus
        letterElement.classList.add('letter');  
        letterElement.classList.add('hidden');   
        wordContainer.appendChild(letterElement);
    });
};



//seleccion de una palabra del array words de palabras
const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase(); // conseguimos valor aleatorio
    selectedWord = word.split('');  // split para que la palabra quede separada en caracteres
};


// dibujamos el hombrecito
const drawHangMan = () => {
    ctx.canvas.width  = 140;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#5BF000';
    ctx.fillRect(0, 7, 4, 1); // fillRect para rellenar los pixeles, pintamos 0X, 7Y, 4X, 1Y(1 pixel)
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

// Comiendo del juego, limpiamos sus variables
const startGame = () => {
    usedLetters = [];    // letras que utilizamos
    mistakes = 0;   // 0 errores
    hits = 0;    // 0 aciertos
    wordContainer.innerHTML = '';  // contenedor de la palabra vacia
    usedLetters.innerHTML = '';    // letra usada vacia
    startButton.style.display = 'none';   // comineza el juego y el start desaparece
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent); // cuando toques una tecla se ejecute la funcion letterEvent
};

startButton.addEventListener('click', startGame);


const yo = () => {
    usedLetters = [];    // letras que utilizamos
    mistakes = 0;   // 0 errores
    hits = 0;    // 0 aciertos
    wordContainer.innerHTML = '';  // contenedor de la palabra vacia
    usedLetters.innerHTML = '';    // letra usada vacia
    yo.style.display = 'none';   // comineza el juego y el start desaparece
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
}

yo.addEventListener("click", yo)




