import {Quiz} from "./quiz.js"

var categoryElemnt = document.getElementById("category");
var amountElemnt = document.getElementById("Number");
var difficultyElemnt = Array.from(document.getElementsByName("difficulty"))
var startBtnElemnt = document.getElementById("startBtn");

//console.log(difficultyElemnt)

export class Setting
{
    constructor()
    {
       this.category = categoryElemnt;
       this.amount = amountElemnt;
       this.difficulty = difficultyElemnt;
       this.startBtn = startBtnElemnt;
       this.startBtn.addEventListener("click",()=>{this.sartQuiz()})
    }

    async sartQuiz()
    {
       let category = this.category.value;
       let amount = this.amount.value;
       let difficulty = this.difficulty.filter((e)=>{return e.checked})
       //console.log(difficulty[0].value)
       let result = await this.fetchUrl(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`)
       console.log(result)
       if(result.length > 0)
       {
           $("#setting").fadeOut(500,()=>{
               $("#quiz").fadeIn(500)
               new Quiz(result,amount)
           })
       }
    }

    async fetchUrl(api)
    {
        let url = await fetch(api)
        let res = await url.json()
        return res.results;
    }


}


