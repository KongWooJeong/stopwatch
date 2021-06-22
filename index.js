const startBtn = document.querySelector('.startBtn'), // 시작 버튼 태그
    watch = document.querySelector('.watch'), // 스톱워치 시간 표시 하는 div 태그
    stopBtn = document.querySelector('.stopBtn'), // 중지 버튼 태그
    labBtn = document.querySelector('.labBtn'), // 기록 버튼 태그
    listBox = document.querySelector('ol'); // 기록 시간 표시하는 ol 태그

let mSec = 0, // 0.01 초 
    sec = 0, // 1초
    min = 0; // 1분
    
let intervalWatch; // setInterval() 메서드를 할당 하는 변수 (나중에 clearInterval() 사용하기 위해)

/* 해당 스톱워시간에 필요한 값을 할당하고 해당 값을 화면 출력 */
function startWatch() {

    /* 조건이 98인 이유는 해당 mSec++ 가 나중에 실행되기때문에 99까지만 표시하기 위해 */
    if(mSec > 98) {
        mSec = 0;
        sec++; // mSec 가 99가 넘으면 sec에 1를 더한다.

        /* 조건이 59인 이유는 해당 sec++를 먼저 실행되기때문에 59까지만 표시하기 위해 */
        if(sec > 59) {
            sec = 0;
            min++; // sec가 59가 넘으면 min에 1를 추가한다.
        }
    } else {
        mSec++; // mSec가 98를 초과하지 않으면 mSec에 1를 추가한다.
    }

    /* 해당 시간을 화면에 출력 */
    watch.innerText = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}:${mSec < 10 ? `0${mSec}` : mSec}`;
}

/* 시작 버튼 클릭시 이벤트 함수 */
function handleClickStartBtn(event) {
    event.target.classList.add('display'); // 시작 버튼 숨기기
    stopBtn.classList.remove('display'); // 중지 버튼 표시
    labBtn.classList.remove('display'); // 기록 버튼 표시
    handleSetInterval(); // setInterval를 실행 함수 호출
}

/* 화면에 표시되는 시간을 출력하기위한 값을 할당하는 setInerval() 함수 실행 */
/* 해당 setInterval() 메서드를 별도로 뺀 이유는 나중에 clearSetInterval()를 실행하기 위해 */
function handleSetInterval() {
    intervalWatch = setInterval(startWatch, 10); // 0.01초마다 startWatch 함수 실행
}

/* 중지 및 계속 버튼 클릭시 이벤트 함수 */
function handleClickStopBtn(event) {

    if(event.target.innerText === '중지') {
        // 클릭한 버튼 텍스트가 '중지' 일때 실행

        clearInterval(intervalWatch); // setInterval() 메서드 중지
        event.target.innerText = '계속'; // 중지 버튼을 '계속' 버튼으로 변환
        labBtn.innerText = '초기화' // 기록 버튼을 '초기화' 버튼으로 변환
    } else if(event.target.innerText === '계속') {
        // 클릭한 버튼 텍스트가 '계속' 일때 실핻

        handleSetInterval(); // setInterval() 메서드 시작
        event.target.innerText = '중지'; // 계속 버튼을 '중지' 버튼으로 변환
        labBtn.innerText = '기록'; // 기록 버튼을 '초기화' 버튼으로 변환
    }
}

/* 기록 및 초기화 버튼 클릭시 이벤트 함수 */
function handleClickLabBtn(event) {
    if(event.target.innerText === '기록') {
        // 클릭한 버튼 텍스트가 '기록' 일때 실행

        let labText = watch.innerText; // 화면에 표시된 시간으로 변수에 할당
        let li = document.createElement('li'); // li 태그 생성후 변수에 할당
        li.innerText = labText; // 생성한 li태그의 화면에 표시된 시간 값을 할당
        listBox.appendChild(li); // ol태그 자식요소로 생성한 li 태그 할당
    } else if(event.target.innerText === '초기화') {
        // 클릭한 번튼 텍스트가 '초기화' 일때 실행

        /* 시간 값 초기화 */
        mSec = 0;
        sec = 0;
        min = 0;

        /* 화면에 표시되는 시간 및 버튼 텍스트 초기화 */
        watch.innerText = '00:00:00';
        stopBtn.innerText = '중지'
        event.target.innerText = '기록';
        
        /* 시작버튼 표시, 중지 버튼 숨기기, 기록 버튼 숨기기 */
        startBtn.classList.remove('display');
        stopBtn.classList.add('display');
        event.target.classList.add('display');

        /* 기록으로 표시된 li태그들을 모두 삭제  */
        while(listBox.hasChildNodes()) {
            listBox.removeChild(listBox.firstChild);
        }
    }
    
}

function init() {
    startBtn.addEventListener('click', handleClickStartBtn); // 시작 버튼 클릭
    stopBtn.addEventListener('click', handleClickStopBtn); // 중지 버튼 클릭
    labBtn.addEventListener('click', handleClickLabBtn); // 기록 버튼 클릭
}

init();