// 1. 로또 가격 계산 JS 함수 구현

function priceCalculate(price, quantity) {
    return price * quantity;
}

//2. 당첨 번호 생성, 자동 번호 선택 JS 함수 구현

function generateWinNumbers() {
    //흠..중복이 없어야 하니까 set 저장할까
    const winNum = new Set();
    while(winNum.size <6){
        const randomNum =Math.floor(Math.random() * 45) + 1; //1~45까지의 랜덤 숫자 생성
        winNum.add(randomNum);
    }
    return winNum;
}

// console.log(generateWinNumbers());

function randomSelectNum(){
    const selectNum = new Set();
    while(selectNum.size<6){
        const randomNum = Math.floor(Math.random()*45)+1;
        selectNum.add(randomNum);
    }

    return selectNum;
}

console.log(randomSelectNum())