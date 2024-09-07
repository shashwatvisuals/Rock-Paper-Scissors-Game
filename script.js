const addBoxButton = document.getElementById('togglerulebook');
const hiddenBox = document.querySelector('.rulebook.hidden');
const crossbtn = document.getElementById('cross');

const addBoxButton1 = document.getElementById('addBox');
const hiddenBox1 = document.querySelector('.sub-box.hidden');

const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll('.number');
const result = document.getElementById('yourchoice');
const mainElement = document.querySelector(".main");
const hiddenRule = document.getElementById('rulesAndNext')

///score changer
let savedCompsScore = sessionStorage.getItem('compsScore');
let savedUsersScore = sessionStorage.getItem('usersScore');

let comps = document.getElementById('scorecomp');
let users = document.getElementById('scoreuser');

// Set initial scores from localStorage or default to 0
comps.textContent = savedCompsScore !== null ? savedCompsScore : 0;
users.textContent = savedUsersScore !== null ? savedUsersScore : 0;

//toggle hiding of mother and resgen circles
const hidemother = document.querySelector('.mother');
const hideaddbox = document.querySelector('.addBox');
const statusbar = document.getElementById('status');
const hidemainresbox = document.querySelector('.mainresbox')
//
addBoxButton.onclick = function() {
hiddenBox.style.display = "block";
}
crossbtn.onclick = function() {
  hiddenBox.style.display = "none";
}

//result generator
buttons.forEach(button => {
    button.addEventListener('click', playGame); //Invoke this event
    button.addEventListener('click', function () {
        const backgroundValue = getComputedStyle(button).getPropertyValue("background-image");
        const borderColor = getComputedStyle(button).getPropertyValue("border-color");
        
        mainElement.style.backgroundImage = backgroundValue;
        mainElement.style.borderColor = borderColor;
        hidemother.style.display = 'none'; //hide the mother block on choosing an options
        hideaddbox.style.display = 'flex'; //hide the addbox button block on choosing an options
        hidemainresbox.style.display = 'block';

    });
});



function playGame(event) {
    const playerChoice = event.target.id;
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const winner = getWinner(playerChoice, computerChoice);
    const secondPulse = document.querySelector(".twopulse");//animations toggle 2nd one
    const firstPulse = document.querySelector(".onepulse");//animations toggle 1nd one

        statusbar.textContent = `${winner} `;

    const mainTwoElement = document.querySelector('.main.two');
      
        switch (computerChoice) {
            case 'rock':
                mainTwoElement.style.backgroundImage = 'var(--rock)'; // Change to desired color
                mainTwoElement.style.borderColor = 'var(--bx1)'; // Change to desired color
                break;
            case 'paper':
                mainTwoElement.style.backgroundImage = 'var(--paper)'; // Change to desired color
                mainTwoElement.style.borderColor = 'var(--bx3)'; // Change to desired color
                break;
            case 'scissors':
                mainTwoElement.style.backgroundImage = 'var(--scissors)'; // Change to desired color
                mainTwoElement.style.borderColor = 'var(--bx2)'; // Change to desired color
                break;
            default:
                break;
        }
//toggle button hide
addBoxButton1.addEventListener('click',() =>{
    hiddenRule.setAttribute("style", "bottom: -100px;");
        toggleAnimation();
        function toggleAnimation() {
            console.log("toggled");
             firstPulse.classList.remove("animate");
             secondPulse.classList.remove("animate");
         }
        hidemother.style.display = 'block';
        hidemainresbox.style.display = 'none';
        if (parseInt(users.textContent) === 5 || parseInt(comps.textContent) === 5) {
            hiddenBox1.classList.remove('hidden'); // Unhide hiddenBox1 when users' value becomes 2
            users.textContent = 0;
            comps.textContent = 0;
            hiddenBox1.classList.add('hidden'); // Unhide hiddenBox1 when users' value becomes 2

        }
    
});

    // Update the scoreboard
    if (winner === "YOU WIN") {
        hiddenRule.setAttribute("style", "bottom: -200px;");
        hiddenBox1.classList.remove('hidden'); // Unhide hiddenBox1 when users' value becomes 2
        users.textContent = parseInt(users.textContent) + 1;
    // Store the updated users' score in localStorage
    sessionStorage.setItem('usersScore', users.textContent);
        console.log(`${parseInt(users.textContent)}`)
        toggleAnimation();
        function toggleAnimation() {
            console.log("toggled");
             firstPulse.classList.toggle("animate");
         }
    } else if (winner === "YOU LOST") {
        hiddenRule.setAttribute("style", "bottom: -200px;");
        comps.textContent = parseInt(comps.textContent) + 1;
    // Store the updated comps' score in sessionStorage
    sessionStorage.setItem('compsScore', comps.textContent);
        toggleAnimation();
        function toggleAnimation() {
            console.log("toggled");
             secondPulse.classList.toggle("animate");
         }
    }
    else{
        firstPulse.classList.toggle("animate");
        secondPulse.classList.toggle("animate");
     }
}


function getWinner(player, computer) {
    if (player === computer) {
        hiddenRule.setAttribute("style", "bottom: -200px;");
        return "TIE UP";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "YOU WIN";
    } else {
        return "YOU LOST";
    }
}
