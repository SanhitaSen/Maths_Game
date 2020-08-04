let play = false;
let attempts=5;
let score;
let counter; 
let action;
let corrAns;
let scoreData=[];
document.getElementById('submit').onclick= function()
{
    if (play == true) // if we are playing
    {
         //location.reload(); // reloads the page.
         document.getElementById('submit').innerHTML = "Start Game";
         stopCounter();
         hide('score');
         hide('counter');
         hide('attm');
         document.getElementById('problem').innerHTML = "";
         for (let i =1;i<=4;i++)
         {
            document.getElementById('box' + i).innerHTML = "";
         }
         play = false;
       
    }
    else{ // if we aren't playing
        play=true; //on clicking button, game starts, hence play = true.
        score = 0;
        counter=60;
        attempts=5;
        //if not playing, initially set the value of inner Html score to 0 everytime.
        document.getElementById('plusScore').innerHTML = score;
        //Then, set timeRem as counter. 
        document.getElementById('timeRem').innerHTML = counter;
        document.getElementById('remA').innerHTML = attempts;

        show("counter");
        hide('over');
        show('attm');
        show('score');
        //Do "Reset Game" by updating button inerHtml code
        document.getElementById('submit').innerHTML = "Reset Game";
        startCountdown();
        //Now we have to generate new questions and give multiple options as answers.
        generateQA();
        
        }
};
for (let k = 1;k<=4;k++)
{
document.getElementById("box" + k).onclick = function()
        {
            if (play==true)
            {
                if (this.innerHTML == corrAns)
                {
                    score++;
                    document.getElementById("plusScore").innerHTML = score;
                    hide("wrong");
                    show("right");
                    setTimeout(function()
                    {
                        hide("right")
                    },1000);
                    generateQA();
                }
                else
                {
                    attempts--;
                    document.getElementById('remA').innerHTML = attempts;
                    console.log(attempts);
                    hide("right");
                    show("wrong");
                    setTimeout(function()
                    {
                        hide("wrong");
                    },1000)
                    generateQA();
                    if (attempts==0)
                    {
                        showOver();
                    }
                }
            }
        }
}
//FUNCTIONS!
//Countdowns timer from 60 to 0.
function showOver() 
{
        stopCounter();
        show("over");
        document.getElementById('plusScore').innerHTML = score;
        scoreData.push(score);
        console.log(scoreData);

        hide("counter");
        hide("right");
        hide("wrong");
        hide("score");
        play = false;
        document.getElementById('submit').innerHTML = "Start Again!";
        if (score>40)
        {
            document.getElementById('over').innerHTML = "<p>Game over!</p>Your score is: " + document.getElementById('plusScore').innerHTML + ". </br>You genius piece of shit!";
        }
        else if (score>30)
        {
            document.getElementById('over').innerHTML = "<p>Game over!</p>Your score is: " + document.getElementById('plusScore').innerHTML + ". </br>You are quite good at this!";
        }
        else if (score>20)
        {
            document.getElementById('over').innerHTML = "<p>Game over!</p>Your score is: " + document.getElementById('plusScore').innerHTML + ". </br>You should try harder!";
        }
        else if (score>10)
        {
            document.getElementById('over').innerHTML = "<p>Game over!</p>Your score is: " + document.getElementById('plusScore').innerHTML + ". </br>You suck at this!";
        }
        else
        {
            document.getElementById('over').innerHTML = "<p>Game over!</p>Your score is: " + document.getElementById('plusScore').innerHTML + ". </br>Seriously? You need to learn basic Maths!";
        }
        let max = scoreData[0];
        for(let i=0;i<scoreData.length;i++)
        {
            if (scoreData[i]>max)
                max = scoreData[i];
        }
        document.getElementById('over').innerHTML+= "</br> All your scores are: "+scoreData +".";
        document.getElementById('over').innerHTML+= "</br> Maximum score is: "+max +".";
}
function startCountdown()
{
    action = setInterval(function()
    {
        counter -=1;
        document.getElementById('timeRem').innerHTML = counter;
        if (counter==0) // game over should be shown
        {
         showOver();
        }
    },1000)
    //scoreData.push(recSCore);
}
function stopCounter()
{
    clearInterval(action);
}
function hide(id)
{
    document.getElementById(id).style.display = "none";
}
function show(id)
{
    document.getElementById(id).style.display = "block";

}
function generateQA()
{
    let a =1+ Math.round(Math.random() *9);
    let b = 1+ Math.round(Math.random() *9);
    let operator= ["X","+","-","/","%"];
    let i = Math.round(Math.random() * 4);
    if (operator[i]=="X")
    {
    document.getElementById('problem').innerHTML = a +"X" + b;
    corrAns = a*b;
    }
    else if (operator[i]=="+")
    {
        document.getElementById('problem').innerHTML = a + " " +"+" + " "+ b;
        corrAns = a+b;
    }
    else if (operator[i]=="-")
    {
        document.getElementById('problem').innerHTML = a + " " +"-" + " "+ b;
        corrAns = a-b;
    }
    else if (operator[i]=="/")
    {
        document.getElementById('problem').innerHTML = a + " " +"/" + " "+ b;
        corrAns = Math.floor(a/b);
    }
    else if (operator[i]=="%")
    {
        document.getElementById('problem').innerHTML = a + " " +"%" + " "+ b;
        corrAns = a%b;
    }
    let pos = 1+ Math.round(Math.random()*3);
    document.getElementById("box"+ pos).innerHTML = corrAns;
    let answers = [corrAns];
    //Now fill the other boxes with random wrong answers.
    for (let j=1;j<=4;j++)
    {
        if (j!==pos)
        {
            let wrongA; 
            do
            {
                wrongA = Math.round(Math.random()*50);
            }while(answers.indexOf(wrongA)>-1)
            document.getElementById("box"+ j).innerHTML = wrongA; 
            answers.push(wrongA);
        }
    }

}