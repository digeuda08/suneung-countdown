// =============================
// 수능 카운트다운 V5
// =============================

// 진행률 시작(2026학년도 수능)
const START_DATE = new Date("2025-11-13T08:10:00");

// 목표(2027학년도 수능 입실 마감)
const TARGET_DATE = new Date("2026-11-19T08:10:00");

const dday = document.getElementById("dday");
const days = document.getElementById("days");
const time = document.getElementById("time");

const progressFill = document.getElementById("progressFill");
const progressThumb = document.getElementById("progressThumb");
const progressPercent = document.getElementById("progressPercent");

function pad(number){
    return String(number).padStart(2,"0");
}

function updateCountdown(){

    const now = new Date();

    const remain = TARGET_DATE - now;

    if(remain <= 0){

        dday.textContent = "D-DAY";
        days.textContent = "0일";
        time.textContent = "수능이 시작되었습니다.";

        progressFill.style.width = "100%";
        progressThumb.style.left = "100%";
        progressPercent.textContent = "100%";

        return;
    }

    // -------------------
    // D-Day
    // -------------------

    const ddayValue = Math.ceil(remain / 86400000);

    // 실제 남은 날짜

    const remainDays = Math.floor(remain / 86400000);

    let temp = remain % 86400000;

    const hour = Math.floor(temp / 3600000);

    temp %= 3600000;

    const minute = Math.floor(temp / 60000);

    temp %= 60000;

    const second = Math.floor(temp / 1000);

    dday.textContent = `D-${ddayValue}`;

    days.textContent = `${remainDays}일`;

    time.textContent =
    `${pad(hour)}시간 ${pad(minute)}분 ${pad(second)}초 남았습니다`;

    // -------------------
    // 진행률
    // -------------------

    const total = TARGET_DATE - START_DATE;

    const passed = now - START_DATE;

    let percent = (passed / total) * 100;

    percent = Math.max(0, Math.min(100, percent));

    progressFill.style.width = percent + "%";

    progressThumb.style.left = percent + "%";

    progressPercent.textContent =
        percent.toFixed(1) + "% 완료";

}

updateCountdown();

setInterval(updateCountdown,1000);

// =============================
// Service Worker 등록(PWA)
// =============================

if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        navigator.serviceWorker.register("./service-worker.js");

    });

}
