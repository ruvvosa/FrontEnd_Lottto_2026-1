// 1. 로또 가격 계산 JS 함수 구현

const TICKET_PRICE = 1000;

function priceCalculate(quantity) {
    return TICKET_PRICE * quantity;
}

//2. 당첨 번호 생성, 자동 번호 선택 JS 함수 구현

function generateRandomNumbers(count = 6) {
    const winNum = new Set();
    while(winNum.size <count){
        const randomNum =Math.floor(Math.random() * 45) + 1; //1~45까지의 랜덤 숫자 생성
        winNum.add(randomNum);
    }
    return [...winNum];
}

const winNumbers = generateRandomNumbers(7);
const myNumbers = generateRandomNumbers(6);



//3. 당첨 순위 판정(내 번호 vs 당첨 번호)

function ranking(winNumbers, myNumbers) {
    const bonusNum = winNumbers[6]; //보너스 번호
    const mainWinNumbers = winNumbers.slice(0,6);   
    const matchCount = myNumbers.filter(num => mainWinNumbers.includes(num)).length; //일치하는 숫자 개수 계산
    const isBonusMatch = myNumbers.includes(bonusNum); //보너스 번호 일치 여부 확인

    if(matchCount === 6) return 1;
    if(matchCount === 5 && isBonusMatch) return 2;
    if(matchCount === 5) return 3;
    if(matchCount === 4) return 4;
    if(matchCount === 3) return 5;
    return 0; //당첨되지 않은 경우

}

//4. 당첨 금액 계산 함수 구현

// 당첨 금액 계산
function prizeMoney(rank) {
    switch(rank) {
        case 1: return 2000000000; 
        case 2: return 500000000; 
        case 3: return 10000000; 
        case 4: return 500000; 
        case 5: return 5000;
        default: return 0;
    }
}

//실행

// const quantity = 5;
// const myTickets = Array.from({length:quantity},()=> generateRandomNumbers(6)); //로또 5장 뽑음
// const ranks = myTickets.map(ticket => ranking(winNumbers,ticket)); // 각 장의 등수

// 총 당첨금 계산

// const totalPrize = Object.entries(rankCount).reduce((sum,[rank,count])=>sum+prizeMoney(Number(rank)) * count,0);

// console.log(`당첨 번호: ${winNumbers.slice(0,6)} 보너스 ${winNumbers[6]}`);
// console.log(`구매 금액 ${priceCalculate(TICKET_PRICE, quantity)}원`);
// console.log(`당첨 등수 ${ranks}`);
// console.log(`등수별 당첨 수 1등: ${rankCount[1]}장 2등: ${rankCount[2]}장 3등: ${rankCount[3]}장 4등: ${rankCount[4]}장 5등: ${rankCount[5]}장`);
// console.log(`총 당첨금 ${totalPrize}원`);



const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const amount = document.querySelector("#amount");
const purchaseBtn = document.querySelector(".purchase-btn");




// 구매 수량 조절 및 구매 버튼 텍스트 업데이트
function setAmount(isPlus){
    if(isPlus){
        amount.value++;
        
    }
    else if(amount.value > 1){
        amount.value--;
        
    }
    purchaseBtn.textContent = `로또 ${amount.value}개 구매 - ${formatCurrency(priceCalculate(amount.value))}`
}

plusBtn.addEventListener("click",()=> {
    setAmount(true);
});

minusBtn.addEventListener("click", ()=>setAmount());


function formatCurrency(value){
    return `₩${value.toLocaleString("ko-KR")}`;
}
purchaseBtn.textContent = `로또 ${amount.value}개 구매 - ${formatCurrency(priceCalculate(amount.value))}`

const addBtn = document.querySelector(".add-num");
const mainNum = document.querySelector(".main-numbers");
const bounsNum = document.querySelector("#bonus-number");


// 당첨 번호 생성 및 화면에 표시
function randomNum (){
    const newNumbers = generateRandomNumbers(7);
    const spans = mainNum.children;
    newNumbers.forEach((num,index)=>{
        if(index<6){
            mainNum.childNodes[index*2+1].textContent= num;
            spans[index].style.backgroundColor = "#FFFFFF";
            spans[index].style.border = "none";
            spans[index].style.color = "#00327D";
            spans[index].style.opacity = "100%";
        }
        else{
           bounsNum.textContent = num;
           bounsNum.style.backgroundColor = "#FCD400";
           bounsNum.style.border = "none";
           bounsNum.style.color = "#6E5C00";
           bounsNum.style.opacity = "100%";
        }
        
    })
}
addBtn.addEventListener("click", randomNum);


// 자동 생성 버튼 클릭 시 6개의 버튼 활성화
const addNumBtn = document.querySelector(".add-button");
const numBtn = document.querySelectorAll(".number-btn");

addNumBtn.addEventListener("click",()=>{
    numBtn.forEach(btn=>btn.classList.remove("selected"));
    const selected = generateRandomNumbers(6);
    numBtn.forEach(num =>{
        if(selected.includes(Number(num.textContent)))
            num.classList.add("selected");
    })
})

//로또 구매 버튼 클릭 시 우측 내 로또에 로또 카드 생성
const lotto = document.querySelector(".display-lotto");
const lottoElement = document.querySelector(".init-element");
let countDisplay = document.querySelector(".circle");
const checkResultBtn = document.querySelector(".check-result");
let ticketCount = 0;    
const myTickets =[];

purchaseBtn.addEventListener("click",()=>{
    const count = Number(amount.value);
        lottoElement.style.display="none"
        lotto.style.border="none";
        checkResultBtn.classList.add("check");

    for(let i = 0; i< count;i++){
        ticketCount++;
        const numbers = generateRandomNumbers(6);
            myTickets.push(numbers);
        const numStr = numbers.join("•");
        
        const ticketCard = document.createElement("div");
        ticketCard.className = "my-lotto-list";
        ticketCard.innerHTML = `
        <div>
        <p>로또 #${ticketCount}</p>
        <p>${numStr}</p>
        </div>
        <span><img src="./img/Icon.svg"></span>
        
        `;
        countDisplay.textContent = `${ticketCount}개`;
        lotto.append(ticketCard);
    }
})

//당첨 결과 확인
const modal = document.querySelector(".modal");
const resultBtn = document.querySelector(".check-result");
const closeBtn = document.querySelector(".close-btn");


resultBtn.addEventListener("click",()=>{
    if(ticketCount >0){
        
        const ranks =myTickets.map(ticket => ranking(winNumbers,ticket));
        const rankCount = {
        1: ranks.filter(rank => rank === 1).length,
        2: ranks.filter(rank => rank === 2).length,
        3: ranks.filter(rank => rank === 3).length,
        4: ranks.filter(rank => rank === 4).length,
        5: ranks.filter(rank => rank === 5).length,
        }   

        const tbodyData = [
            { rank: 1, match: "숫자 6개" },
            { rank: 2, match: "숫자 5개 + 보너스" },
            { rank: 3, match: "숫자 5개" },
            { rank: 4, match: "숫자 4개" },
            { rank: 5, match: "숫자 3개" },
        ];

        
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; //기존 내용 초기화
        tbodyData.forEach(element =>{
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td class ="rank">${element.rank}등</td>
            <td class="match">${element.match}</td>
            <td class="count">${rankCount[element.rank]}</td>
            <td class="prize">${formatCurrency(prizeMoney(element.rank) * rankCount[element.rank])}</td>
            `;
            tbody.append(tr);
        })
        const totalPrize = Object.entries(rankCount).reduce((sum,[rank,count])=>sum+prizeMoney(Number(rank)) * count,0);
        document.querySelector(".total-win-summary p:last-child").textContent = formatCurrency(totalPrize);


        modal.style.display = "flex";

    }
})

closeBtn.addEventListener("click",()=>modal.style.display="none")






