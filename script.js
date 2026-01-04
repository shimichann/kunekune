document.addEventListener("DOMContentLoaded", () =>{ 
    let inputindex = 0;
document.getElementById("addbutton").addEventListener("click",() =>{
    inputindex++;
    const inputcontent = document.createElement("input");//inputを生成
    const inputstart = document.createElement("input");
    const inputend = document.createElement("input");
    const box = document.createElement("div");
    inputcontent.classList.add("form-control");
    inputstart.classList.add("form-control");
    inputend.classList.add("form-control");
    inputstart.id = `startTime${inputindex}`;
    inputend.id = `endTime${inputindex}`;
    inputcontent.placeholder = "内容"+inputindex;
    inputstart.type = "time";
    inputend.type = "time";
    box.append(inputcontent,inputstart,inputend);//divという要素を用意し.inputを三つ追加
    document.getElementById("container").append(box);//箱(div)をcontainerに追加
})

document.getElementById("calc").addEventListener("click",()=>{
let i = 0;
let times = 0;
let timeList = [];
 while(i <= inputindex){
const startTimeValue = document.getElementById(`startTime${i}`);
const endTimeValue = document.getElementById(`endTime${i}`);
if (startTimeValue && endTimeValue && startTimeValue.value !== "" && endTimeValue.value !== ""){
const [startHour,startMinute] = startTimeValue.value.split(":").map(Number);
const [endHour,endMinute] = endTimeValue.value.split(":").map(Number);
const time = (endHour*60 + endMinute) - (startHour*60+startMinute);
if (time<0){
    const result = document.getElementById("result");
    result.textContent = "終了時刻が開始時刻より前です";
    timeList.push(0);
    break;
}
timeList.push(time);
times = times+ time;
}else{
    timeList.push(0);
}
i++;
 };
const now = new Date();
const nowHour =now.getHours();
const nowMinute =now.getMinutes();
const nowTimes = nowHour*60 + nowMinute;
const result = document.getElementById("result");
result.textContent = "一日のうち"+(nowTimes-times)/nowTimes*100 + "%くねくねしてしまいました";
// const progressbar = new progressbar
// progressbar.max = 100;
// progressbar.value = (nowTimes-times)/nowTimes*100;
// document.getElementById("bar").append(progressbar);
const bar = document.getElementById("bar");
bar.innerHTML = "";
let n = 0;
const colors = ["#ff6b6b", "#feca57", "#48dbfb"]
while(n <= inputindex){
    const div = document.createElement("div");
    div.style.width = (timeList[n]/nowTimes*100) + "%";

    div.style.backgroundColor = colors[n % colors.length];
    bar.appendChild(div);
    n++;
}
    const barBlue = document.createElement("div");
    barBlue.style.width = ((nowTimes-times)/nowTimes*100) + "%";
    barBlue.style.backgroundColor = "#5f27cd";
    bar.appendChild(barBlue);
});
});
