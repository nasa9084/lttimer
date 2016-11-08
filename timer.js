/* Lightning Talk Timer
 * code by @nasa9084 */

// 画面描画終了時処理
window.onload = function() {
    basebody = document.getElementById("basebody");
    confScr = document.getElementById("config");
    timer = document.getElementById("time");
    startBtn = document.getElementById("start");
    stopBtn = document.getElementById("stop");
    pbar = document.getElementById("progress");
    startBtn.disabled = false;
    stopBtn.disabled = true;
    timerInterval = undefined;
    blinker = undefined;
    reset();
    timer.innerHTML = timeToStr(minutes, seconds);
}

function timeToStr(minutes, seconds) {
    var minstr = String(minutes);
    if (seconds < 10) {
        var secstr = '0' + String(seconds);
    } else {
        var secstr = String(seconds);
    }
    return minstr + ':' + secstr;
}

// タイマーを開始する
function start() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerInterval = setInterval(function() {
        fiveminColor = document.getElementById('fivemin').value;
        cautionColor = document.getElementById('onemin').value;
        endColor = document.getElementById('thirtysec').value;
        // 終了処理
        if (minutes == 0 && seconds == 0) {
            console.log('TIMEOOUT');
            clearInterval(timerInterval);
            basebody.classList.add("blink");
            startBtn.disabled = false;
            stopBtn.disabled = false;
        }
        // 背景色変更処理
        if (max > 300 && minutes * 60 + seconds <= 300) {
            basebody.style.background = fiveminColor;
        }
        if (max > 60 && minutes * 60 + seconds <= 61) {
            basebody.style.background = cautionColor;
        }
        if (minutes * 60 + seconds <= 31) {
            basebody.style.background = endColor;
        }
        if (minutes == 0 && seconds == 0) {
            basebody.style.backgroundColor = endColor;
            blinkflg = true;
            blinker = setInterval(function() {
                blinkflg = !blinkflg;
                basebody.style.backgroundColor = blinkflg ? endColor : "#ffffff";
            }, 100);
        }
        // タイマー減算処理
        if (seconds == 0) {
            minutes -= 1;
            seconds = 59;
        } else {
            seconds -= 1;
        }
        // タイマー描画処理
        if (0 <= minutes && 0 <= seconds) {
            timer.innerHTML = timeToStr(minutes, seconds);
            pbar.value = (max-(minutes*60+seconds))/max*100;
        }
    }, 1000);
}

// タイマーを止める
function stop() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerInterval);
    clearInterval(blinker);
}

function reset() {
    // 停止処理
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    if (blinker) {
        clearInterval(blinker);
    }
    // 初期化処理
    for (i=0; i<document.getElementsByName("timeradio").length; i++) {
        var radio = document.getElementsByName("timeradio")[i];
        if (radio.checked) {
            max = radio.value * 60;
            minutes = radio.value;
        }
    }
    seconds = 0;
    timer.innerHTML = timeToStr(minutes, seconds);
    basebody.style.background = "#ffffff";
    basebody.classList.remove("blink");
    pbar.value = 0;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// 設定画面を開く
function opConf() {
    confScr.classList.remove("hidden");
}

// 設定画面を閉じる
function clsConf() {
    confScr.classList.add("hidden");
}
