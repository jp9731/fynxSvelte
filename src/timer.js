"use strict";
// 백엔드에서 실행되는 코드
let count = 0;
let timer;
function startTimer() {
    timer = setInterval(() => {
        count += 1;
        console.log(`Count: ${count}`);
    }, 1000);
}
function stopTimer() {
    clearInterval(timer);
}
startTimer();
//# sourceMappingURL=timer.js.map