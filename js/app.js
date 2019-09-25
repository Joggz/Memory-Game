let counter = document.querySelector('.moves span');
let resetBtn = document.querySelector('.reset');
let move_s = document.querySelector('.moves span');
let minute = document.querySelector('.min span');
let sec = document.querySelector('.sec span');
let stars = document.querySelectorAll('.stars');
let modal = document.getElementById("popup1")
let starsList = document.querySelectorAll(".stars li");
let closeicon = document.querySelector(".close");


var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];

var memory_values = [];

var memory_card_ids = [];

var cards_flipped = 0;


let move = 0;
let seconds = 0;
let minutes = 0;


Array.prototype.memory_title_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0) {
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}


const newBoard = () => {
    cards_flipped = 0;
    let output = '';
    memory_array.memory_title_shuffle();
    memory_array.forEach( (card, index) => {
        output +=  '<div id="card_'+index+'" onclick="memoryFlipTile(this,\''+card+'\')"></div>';
    })

    stars.forEach((star) => {
        star.style.color = 'black';
      })
    clearInterval(start);

    move = 0;
    move_s.textContent = move;
    seconds = 0;
    minutes = 0;
    sec.textContent = '00';
    minute.textContent = '00';

    document.getElementById('memory_board').innerHTML = output;
}

resetBtn.addEventListener('click', newBoard);


const moveCounter = () => {
  move
   move++;
   console.log(move)
   counter.textContent = move;

   if(move === 1){
     time();
   }

 starRating();
}

const starRating = () => {
  stars.forEach((star, i) => {
    if(move > 0 && move < 7){
        star.style.color = 'red'
    }
    else if (move > 7 && move <= 10 ){
        star.style.color = 'yellow';
      
    } else {
      star.style.color = 'green'
    }
 })  

}

const memoryFlipTile = (card, val) => {
 
    if(card.innerHTML == "" && memory_values.length < 2){
      card.style.background = 'rgba(255,255,255, 0.6)';
      card.innerHTML = val;
      if(memory_values.length == 0){
        memory_values.push(val);
        memory_card_ids.push(card.id);
      } else if (memory_values.length == 1){
        memory_values.push(val);
        memory_card_ids.push(card.id);
        


        if(memory_values.length == 2){
          moveCounter();
      }

          
        if(memory_values[0] == memory_values[1]){
          cards_flipped += 2;
          // write counter function
          // moveCounter();
          memory_values = [];
          memory_card_ids = [];

          if( memory_values[0] != memory_values[1]){
            moveCounter();
            memory_values = [];
            memory_card_ids = [];
          }
          
          if(cards_flipped == memory_array.length){
            // call modal function and setTimeout
            //  modal();
            congratulations();
             alert('Boared cleared....');
             newBoard();
          }
       
      }
        else {
                const flipBack = () => {
                    let tile_1 = document.getElementById(memory_card_ids[0]);
                    let tile_2 = document.getElementById(memory_card_ids[1]);
                    tile_1.style.background = "url('https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80') no-repeat";
                    tile_1.innerHTML = "";

                    tile_2.style.background = "url('https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80') no-repeat";
                    tile_2.innerHTML = "";

                    memory_card_ids = [];
                  memory_values = []; 
                }
                setTimeout(flipBack, 700);
            }
        }
    }
}


let start;
const time = () => {
  start = setInterval(() => {
    seconds++;
    
    if(seconds == 60){
      minutes++;
     
      seconds = 0;
    }
    
    sec.textContent = format_time(seconds);
    minute.textContent = format_time(minutes);
    
  }, 1000);
}

const format_time = (num) => {

  if(num < 10) {
      return "0" + num;
  }
  return num;

}


const congratulations = () => {
  
  console.log('working');
    if (cards_flipped == memory_array.length){
      finalTime = minute.textContent +":"+ sec.textContent;
      modal.classList.add("show");
      var starRating = document.querySelector(".stars").innerHTML;
    
      document.getElementById("finalMove").textContent = move;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;
      
    
    closeModal();
    };
}

function closeModal(){
  closeicon.addEventListener("click", function(e){
    modal.classList.remove("show");
    newBoard();
  });
}

function playAgain(){
  modal.classList.remove("show");
  newBoard();
}
