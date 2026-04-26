// 1. 로또 가격 계산 JS 함수 구현

const TicketPrice = 1000;
function priceCalculate(TicketPrice, quanity) {
    return TicketPrice * quanity;
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

const quanity = 5;
const myTickets = Array.from({length:quanity},()=> generateRandomNumbers(6)); //로또 5장 뽑음
const ranks = myTickets.map(ticket => ranking(winNumbers,ticket)); // 각 장의 등수
const totalPrize = ranks.reduce((sum,rank)=> sum + prizeMoney(rank),0); //아 육회 먹고싶다

console.log(`당첨 번호: ${winNumbers.slice(0,6)} 당첨 번호 ${winNumbers[6]}`);
console.log(`구매 금액 ${priceCalculate(TicketPrice, quanity)}원`);
console.log(`당첨 등수 ${ranks}`);
console.log(`총 당첨금 ${totalPrize}원`);




