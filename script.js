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

const quantity = 5;
const myTickets = Array.from({length:quantity},()=> generateRandomNumbers(6)); //로또 5장 뽑음
const ranks = myTickets.map(ticket => ranking(winNumbers,ticket)); // 각 장의 등수

// 등수별 당첨 수
const rankCount = {
    1: ranks.filter(rank => rank === 1).length,
    2: ranks.filter(rank => rank === 2).length,
    3: ranks.filter(rank => rank === 3).length,
    4: ranks.filter(rank => rank === 4).length,
    5: ranks.filter(rank => rank === 5).length,
}

// 총 당첨금 계산

const totalPrize = Object.entries(rankCount).reduce((sum,[rank,count])=>sum+prizeMoney(Number(rank)) * count,0);

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
    newNumbers.forEach((num,index)=>{
        if(index<6){
            mainNum.childNodes[index*2+1].textContent= num;

        }
        else{
           bounsNum.textContent = num;
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






