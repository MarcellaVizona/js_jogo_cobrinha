let pontos = 0;

// criar elemento que irá rodar o jogo

let canvas = document.getElementById("gamesnake");
let context = canvas.getContext("2d");
let box = 32;

// criar cobrinha como vetor, ja que ela vai ser uma série de coodenadas, que quando pintadas, criam quadradinhos

let snake = [];

// Inicio da cobrinha

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// direção

let direction = "right"

// comida

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// função para criar o backgraud

function criarBG() {
    context.fillStyle = "white";
    // desenha o retangulo usando x e y e a largura e altura setadas 
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// função para criar a cobrinaha

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "pink";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}


// criar comida

function drawFood() {
    context.fillStyle = "purple"
    context.fillRect(food.x, food.y, box, box)
}


//  quando um evento acontece, detecta e chama a função 
document.addEventListener('keydown', updade);

function updade(event) {
    console.log(event.keyCode);
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

//   função principal


function iniciarJogo() {
    if (snake[0].x > 15 * box && direction == "right") {
        clearInterval(jogo);
        alert('Game Over :(');
    }
    if (snake[0].x < 0 && direction == "left") {
        clearInterval(jogo);
        alert('Game Over :(');
    }
    if (snake[0].y > 15 * box && direction == "down") {
        clearInterval(jogo);
        alert('Game Over :(');
    }
    if (snake[0].y < 0 && direction == "up") {
        clearInterval(jogo);
        alert('Game Over :(');
    }

    for (i = 1; i < snake.length; i++) {
        document.getElementById('pontos').innerText = pontos;
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(')
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); /*pop tira o último elemento da lista*/
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        pontos++
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    /* metodo unshift adiciona como primeiro quadradinho da cobrinha*/

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 200)


   