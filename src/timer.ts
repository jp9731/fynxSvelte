// 백엔드에서 실행되는 코드

let count = 0;
let timer: NodeJS.Timeout;

function startTimer() {
	timer = setInterval(() => {
		count += 1;
		console.log(`Count: ${count}`);
	}, 1000);
}

function stopTimer(): void {
	clearInterval(timer);
}

startTimer();
