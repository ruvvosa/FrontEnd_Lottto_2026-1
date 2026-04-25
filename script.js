// 1. 로또 가격 계산 JS 함수 구현
const TicketPrice = 1000;
function priceCalculate(TicketPrice, quantity) {
    return TicketPrice * quantity;
}

//2. 당첨 번호 생성, 자동 번호 선택 JS 함수 구현
//흠 함수 중복이 있는 것 같은데 어케 해결하지

function generateRandomNumbers(count = 6) {
    //흠..중복이 없어야 하니까 set 저장할까
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

