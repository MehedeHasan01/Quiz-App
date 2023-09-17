// conect with dom and html

const bgcolorChange = document.getElementById('bgcolorChange');
const AutoChangeColorBtn = document.getElementById('AutochangeColorBtn');
const StopAutochangeColorBtn = document.getElementById('StopAutochangeColorBtn');
const rootElement = document.getElementById('root');
const StartBtn = document.querySelector('.start-btn');
const ExitBtn = document.querySelector('.exitBtn');
const ContinueBtn = document.querySelector('.ContinueBtn');
const NextBtn = document.querySelector('.textBtn');
const QuitBtn = document.querySelector('.quitBtn')
const QuizApp = document.querySelector('.quiz-App');
const QuizRules = document.querySelector('.quiz-Rules');
const Questions = document.querySelector('.Questions');
const option_list = document.querySelector('.MyOptions');
const QuizResult = document.querySelector('.Quiz-Result');
const TimeOff = document.querySelector('.leftTime')
const timeCounte = document.querySelector('.seconds')
const time_lines = document.querySelector('.timeBar');

// global ver

let question_count = 0;
let userScore  = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let ClearColor;

// Function to change the background color to a random RGB color
function changeBackgroundColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    rootElement.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

// Add an event listener to the "Start" button to start the interval
bgcolorChange.addEventListener('click', () => {
    clearInterval(ClearColor);
    changeBackgroundColor();
    AutoChangeColorBtn.style.display = 'block';
    StopAutochangeColorBtn.style.display = 'none'

});


AutoChangeColorBtn.addEventListener('click', () => {
    ClearColor = setInterval(changeBackgroundColor, 1000);
    StopAutochangeColorBtn.style.display = 'block'
    AutoChangeColorBtn.style.display = 'none'
});
StopAutochangeColorBtn.addEventListener('click', () => {
    clearInterval(ClearColor);
    AutoChangeColorBtn.style.display = 'block';
    StopAutochangeColorBtn.style.display = 'none'

});




// Quiz start click Event
StartBtn.addEventListener('click', ()=>{
    QuizApp.classList.add('quiz-App-Close')
    QuizRules.classList.add('activeInfo')
});

ExitBtn.addEventListener('click', ()=>{
    QuizRules.classList.remove('activeInfo')
    QuizApp.classList.remove('quiz-App-Close')
})

ContinueBtn.addEventListener('click', ()=>{
    QuizRules.classList.remove('activeInfo')
    Questions.classList.add('QuestionsActive')
    showsQustions(0);
    StartTimer(15);
    StartTimeLine(0)

})

NextBtn.addEventListener('click', ()=>{

    if(question_count < questions.length -1){
        question_count ++;
        showsQustions(question_count);
        clearInterval(counter);
        StartTimer(timeValue);

        clearInterval(counterLine);
        StartTimeLine(widthValue);
        NextBtn.style.display = 'none';
        TimeOff.textContent = 'Time Left'

    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("You Have Completd Your Task 🥰");
        showResult()
    }

});

QuitBtn.addEventListener('click', ()=>{
    window.location.reload()
})



// DOM function create


function showsQustions(index){

    const question_tag = document.querySelector('.title');
    const question_text = '<span>'+ questions[index].number+'.'+ questions[index].question +'</span>';
    question_tag.innerHTML = question_text;


    const option_tag = '<div class="Options">'+ questions[index].options[0] +'</div>'
                       + '<div class="Options">'+ questions[index].options[1] +'</div>'
                       + '<div class="Options">'+ questions[index].options[2] +'</div>'
                       + '<div class="Options">'+ questions[index].options[3] +'</div>';

     option_list.innerHTML = option_tag;
    const Total_questions_tag = document.querySelector('.Total-questions');
    const Total_questions_text = '<span>'+ questions[index].number  +' of '+ questions.length+   ' Questions'+'</span>';
    Total_questions_tag.innerHTML = Total_questions_text;



    const option = option_list.querySelectorAll('.Options');
    for(let i=0; i<option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }


}



// Time Counte function

function StartTimer(time){
    counter = setInterval(timer, 1000);

    function timer(){
        timeCounte.textContent = time;
        time--
        if(time < 9){
            timeCounte.textContent = 0 + timeCounte.textContent;
        }
        if (time < 0){
            clearInterval(counter)
            timeCounte.textContent = '00'
            TimeOff.textContent = 'Time Off'

            let correctAns = questions[question_count].answer;
            let allOptions = option_list.children.length;
            for (let i=0; i<allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute('class', 'Options correct');
                    option_list.children[i].insertAdjacentHTML('beforeend', tickIcon)
                }
            }

            for(let i=0; i<allOptions; i++){
                option_list.children[i].classList.add('disabled')
            }
            NextBtn.style.display = 'block'
        }
    }
}

// Time line bar function create

function StartTimeLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time += 1;
        time_lines.style.width = time + 'px'
        if(time > 319){
            clearInterval(counterLine)
        }
    }
}

// Option Selected function

let tickIcon = `<div ><i class="fas fa-check"></i></div>`;
let crossIcon = `<div ><i class="fas fa-times"></i></div>`;


function optionSelected(answer){
    let UserAns = answer.textContent;
    let CorrectAns = questions[question_count].answer;
    let AllOptions = option_list.children.length;
    if(UserAns == CorrectAns){
        userScore += 1;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', tickIcon)
        console.log('Answer Is Correct');
    }else{
        answer.classList.add('InCorrect')
        console.log('Answer Is Wrong');
        answer.insertAdjacentHTML('beforeend', crossIcon);

        for(let i=0; i < AllOptions; i++){
            if(option_list.children[i].textContent == CorrectAns){
                option_list.children[i].setAttribute('class', 'Options correct');
                option_list.children[i].insertAdjacentHTML('beforeend', tickIcon)
            }
        }
    }



    for (let i=0; i < AllOptions; i++){
        option_list.children[i].classList.add('disabled');
    }
    clearInterval(counter);
    clearInterval(counterLine);
    NextBtn.style.display = 'block'


}

//show Result function
function showResult(){
    QuizApp.style.display = 'none'
    QuizRules.classList.remove('activeInfo')
    Questions.classList.remove('QuestionsActive')
    QuizResult.classList.add('Quiz-Result-Active');

    const scoreText = document.querySelector('.score_text');

    if(userScore > 7 ){
        let scoreTag = '<span>Congratulations 🥰 You Got <p>'+ userScore+ '</p>Out Of <p>'+questions.length+ '</p></span>';
        scoreText.innerHTML = scoreTag;
    }else if(userScore > 4){
        let scoreTag = '<span>Carry On 👌 You Got <p>'+ userScore+ '</p>Out Of <p>'+questions.length+ '</p></span>';
        scoreText.innerHTML = scoreTag;

    }else if(userScore > 1){
        let scoreTag = '<span>So Sad 😔 You Got <p>'+ userScore+ '</p>Out Of <p>'+questions.length+ '</p></span>';
        scoreText.innerHTML = scoreTag;

    }
    else{
        let scoreTag = '<span>I Am  Sorry 😓 You Got <p>'+ userScore+ '</p>Out Of <p>'+questions.length+ '</p></span>';
        scoreText.innerHTML = scoreTag;
    }

}
