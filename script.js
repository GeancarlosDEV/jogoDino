const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const inicioJogo = document.querySelector('#inicioJogo');
const fimJogo = document.querySelector('#fimJogo');

let isJumping = false;
let isGameOver = false;
let start = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  if (!start) {
    start = true;
	inicioJogo.style.display = 'none';
  }
  isJumping = true;
  if (!isGameOver) {
	  let upInterval = setInterval(() => {
		if (position >= 150) {
		  // Descendo
		  clearInterval(upInterval);

		  let downInterval = setInterval(() => {
		    if (position <= 0) {
		      clearInterval(downInterval);
		      isJumping = false;
		    } else {
		      position -= 20;
		      dino.style.bottom = position + 'px';
		    }
		  }, 20);
		} else {
		  // Subindo
		  position += 20;
		  dino.style.bottom = position + 'px';
		}
	  }, 20);
	}
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
	if (start) {
		if (isGameOver) {
          clearInterval(leftTimer);
		  fimJogo.style.display = 'block';
		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
		  // Game over
		  clearInterval(leftTimer);
		  isGameOver = true;
		} else if (cactusPosition < -60) {
		  // Saiu da tela
		  clearInterval(leftTimer);
		  background.removeChild(cactus);
		} else {
		  cactusPosition -= 10;
		  cactus.style.left = cactusPosition + 'px';
		}
	}
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
