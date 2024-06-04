const studylen = document.getElementById('studylen')
const studylendec = document.getElementById('studylendec')
const studyleninc = document.getElementById('studyleninc')

studylendec.onclick = () => {
    if (parseInt(studylen.value) >= 10) studylen.value -= 5;
    else studylen.value = 5;
}
studyleninc.onclick = () => {
    if (parseInt(studylen.value) <= 55) studylen.value = parseInt(studylen.value) + 5;
    else studylen.value = 60;
}

const breaklen = document.getElementById('breaklen')
const breaklendec = document.getElementById('breaklendec')
const breakleninc = document.getElementById('breakleninc')

breaklendec.onclick = () => {
    if (parseInt(breaklen.value) >= 10) breaklen.value -= 5;
    else breaklen.value = 5;
}
breakleninc.onclick = () => {
    if (parseInt(breaklen.value) <= 55) breaklen.value = parseInt(breaklen.value) + 5;
    else breaklen.value = 60;
}

const sessionamt = document.getElementById('sessionamt')
const sessionamtdec = document.getElementById('sessionamtdec')
const sessionamtinc = document.getElementById('sessionamtinc')

sessionamtdec.onclick = () => {
    sessionamt.value -= 1;
}
sessionamtinc.onclick = () => {
    sessionamt.value = parseInt(sessionamt.value) + 1;
}


let studyl;
let breakl;
let sessions;
const start = document.getElementById('start')
const time = document.getElementById('time')
const remaining = document.getElementById('remaining')
const worklabel = document.getElementById('worklabel')
const breaklabel = document.getElementById('breaklabel')
let seconds = 0
let interval = null

let iswork = true
let isbreak = false

const padStart = (val) => {
    return String(val).padStart(2, "0")
}

const changeTime = () => {
    let secs = padStart(seconds % 60)
    let mins = padStart(Math.floor(seconds / 60))
    time.innerText = `${mins}:${secs}`
}


const ding = new Audio('ding.mp3')

const startTimer = () => {
    clearInterval(interval)
    const started = new Date()
    if (iswork) {
        if (!paused) seconds = studyl
        worklabel.style.border = "4px solid white"
        breaklabel.style.border = "none"
        interval = setInterval(() => {
            seconds = studyl - Math.round(Math.abs(new Date() - started) / 1000);
            changeTime()

            if (seconds <= 0) {
                ding.play()
                clearInterval(interval)

                iswork = false
                isbreak = true

                seconds = breakl
                sessions--
                remaining.innerText = "Sessions Remaining: " + sessions
                if (sessions === 0) {
                    return
                }
                startTimer()
            }
        }, 1000)
    } else if (isbreak) {
        worklabel.style.border = "none"
        breaklabel.style.border = "4px solid white"
        interval = setInterval(() => {
            seconds = breakl - Math.round(Math.abs(new Date() - started) / 1000);
            changeTime()

            if (seconds <= 0) {
                ding.play()
                clearInterval(interval)

                isbreak = false
                iswork = true

                seconds = studyl
                startTimer()
            }
        }, 1000);
    }
}

const form = document.getElementById('form')
const timer = document.getElementById('timer')
const exit = document.getElementById('exit')

start.onclick = () => {
    form.style.display = 'none'
    timer.style.display = 'initial'
    studyl = parseInt(studylen.value) * 60
    breakl = parseInt(breaklen.value) * 60
    sessions = parseInt(sessionamt.value)

    remaining.innerText = "Sessions remaining: " + sessions
    time.innerText = studyl/60 + ":00"
    
    startTimer()
}

exit.onclick = () => {
    form.style.display = 'initial'
    timer.style.display = 'none'
    clearInterval(interval)
}

const pausestart = document.getElementById('pausestart')
let paused = false

pausestart.onclick = () => {
    if (!paused) {
        clearInterval(interval)
        pausestart.innerText = "Start"
        paused = true
    } else {
        startTimer()
        pausestart.innerText = "Pause"
        paused = false
    }
}

