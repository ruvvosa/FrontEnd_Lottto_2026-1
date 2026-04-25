// 1. 로또 가격 계산 JS 함수 구현

function priceCalculate(price, quantity) {
    return price * quantity;
}

//2. 당첨 번호 생성, 자동 번호 선택 JS 함수 구현
//흠 함수 중복이 있는 것 같은데 어케 해결하지

function generateWinNumbers() {
    //흠..중복이 없어야 하니까 set 저장할까
    const winNum = new Set();
    while(winNum.size <7){
        const randomNum =Math.floor(Math.random() * 45) + 1; //1~45까지의 랜덤 숫자 생성
        winNum.add(randomNum);
    }
    return [...winNum];
}

const randomSelectNum = generateWinNumbers();
console.log(randomSelectNum);



