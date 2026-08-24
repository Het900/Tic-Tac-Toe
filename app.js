let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newbtn=document.querySelector("#new-gamebtn");
let msgcont=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let defaultmsg=msg.innerText;
let turn=true;
let cnt=0;

const winPat=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],
    [2,5,8],[0,4,8],[2,4,6]
];
const resetgame=()=>{
    turn=true;
    cnt=0;
    enableBoxes();
    msgcont.classList.add("hide");
};
const newgame=()=>{
    resetgame();
    msg.innerText=defaultmsg;
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box clicked");
        if(turn)
            box.innerText="O";
        else
            box.innerText="X";

        turn=!turn;
        box.disabled=true;
        cnt++;

        let winnerexist=checkwin();
        if(cnt===9 && !winnerexist)
            gameDraw();
    });
});
const gameDraw=()=>{
    msg.innerText="Game was Draw";
    msgcont.classList.remove("hide");
    setTimeout(() => {
        alert(`Game was Draw`);
        resetgame();
    }, 100);
};
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};
const showwinner=(winner)=>{
    msg.innerText=`Congrstulations,Winner is ${winner}`;
    msgcont.classList.remove("hide");
    setTimeout(() => {
        alert(`Congrstulations,Winner is ${winner}`);
        resetgame();
    }, 100);
    
};

const checkwin=()=>{
    for (pat of winPat){
        let pos1=boxes[pat[0]].innerText;
        let pos2=boxes[pat[1]].innerText;
        let pos3=boxes[pat[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!="")
        {
            if(pos1===pos2 && pos3===pos2 && pos1===pos3)
            {
                showwinner(pos1);
                return true;
            }
        }
    }
};
newbtn.addEventListener("click",newgame);
resetbtn.addEventListener("click",resetgame);
