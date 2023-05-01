const boardNormal = [
    'a-1', 'a-2', 'a-3', 'a-4', 'a-5', 'a-6', 'a-store',
    'b-1', 'b-2', 'b-3', 'b-4', 'b-5', 'b-6', 'b-store',
]

const boardReverse = [
    'b-1', 'b-2', 'b-3', 'b-4', 'b-5', 'b-6', 'b-store',
    'a-1', 'a-2', 'a-3', 'a-4', 'a-5', 'a-6', 'a-store',
]

let available = true
let computer = false



const pockets = [document.querySelectorAll('#root > div > div.pockets > div.pocket-area > div.pocket')]
pockets[0].forEach(pocket => {
    pocket.addEventListener('click', (e) => {
        if (!(computer && e.target.parentElement.id.startsWith('b'))) {
            if (available)
                move(e.target.parentElement.id)
        }
    })
})

for (let index = 1; index < 7; index++) {
    document.querySelector(`#b-${index} > img`).style.rotate = '180deg'
}

let players = ['Player 1', 'Player 2']

function check(turn) {
    let total = 0;
    for (let index = 1; index < 7; index++) {
        const c1 = document.querySelector(`#${turn}-${index} > img`)
        const t1 = Number(c1.src.split('Rocks/rock-')[1].split('.')[0])
        total += t1
    }
    return total
}

function start() {
    const p1 = document.querySelector("#p-1").value.trim()
    const p2 = document.querySelector("#p-2").value.trim()
    if (p1 && p2)
        players = [p1, p2]
    document.querySelector("#modal-start").style.display = "none"
    if (p2 === 'Bilgisayar') {
        computer = true
    }
}

function computer1() {
    const mv = () => `b-${Math.floor(Math.random() * 6) + 1}`
    function dd() {
        if (move(mv()) === false) dd()
        if (!check(turn)) {
            const st = document.querySelector(`#${turn}-store > span`)
            let total = 0
            for (let index = 1; index < 7; index++) {
                const c1 = document.querySelector(`#${a[turn]}-${index} > img`)
                const t1 = Number(c1.src.split('Rocks/rock-')[1].split('.')[0])
                c1.src = 'Rocks/rock-0.png'
                total += t1
            }
            st.innerText = Number(st.innerText) + total
            result()
        }
    }
    setTimeout(() => {
        dd()
    }, (Math.random() * 500 + 500));
}


let turn = 'a'
function move(pocket) {
    available = false
    const board = pocket.startsWith('a') ? boardNormal : boardReverse
    if (!pocket.startsWith(turn)) return
    let lastStone = pocket
    const img = document.querySelector(`#${pocket} > img`)
    const count = Number(img.src.split('Rocks/rock-')[1].split('.')[0])
    if (count === 0) return false
    console.log(count);
    if (count > 1) {
        img.src = 'Rocks/rock-1.png'
        const audio = new Audio('stone.mp3')
        audio.play()
    } else {
        img.src = 'Rocks/rock-0.png'
    }
    const a = { a: 'b', b: 'a' }
    let index = 1
    let bilmemNe = 0
    const intv = setInterval(() => {
        if (board[(board.indexOf(pocket) + index) % board.length] === `${a[turn]}-store`) bilmemNe = 1
        const x = board[(board.indexOf(pocket) + index + bilmemNe) % board.length]
        lastStone = x
        console.log(lastStone);
        if (x === (turn + '-store')) {
            const span = document.querySelector(`#${x} > span`)
            span.innerText = Number(span.innerText.trim()) + 1
            const audio = new Audio('stone.mp3')
            audio.play()
        } else if (x === (a[turn] + '-store')) {

        } else {
            const img2 = document.querySelector(`#${x} > img`)
            const count2 = Number(img2.src.split('Rocks/rock-')[1].split('.')[0])
            img2.src = `Rocks/rock-${count2 + 1}.png`
            const audio = new Audio('stone.mp3')
            audio.play()
        }
        index++
        if (index >= count) {
            next()
            function next() {
                const a = { a: 'b', b: 'a' }
                if (!lastStone.includes('store')) {
                    const im = document.querySelector(`#${lastStone} > img`)
                    const ct = Number(im.src.split('Rocks/rock-')[1].split('.')[0])
                    const c2 = document.querySelector(`#${a[turn]}-${7 - Number(lastStone.split('-')[1])} > img`)
                    const t2 = Number(c2.src.split('Rocks/rock-')[1].split('.')[0])
                    if (ct === 1 && (lastStone.startsWith(turn) && !lastStone.includes('store')) && t2 !== 0) {
                        const c1 = document.querySelector(`#${lastStone} > img`)
                        const c2 = document.querySelector(`#${a[turn]}-${7 - Number(lastStone.split('-')[1])} > img`)
                        const t1 = Number(c1.src.split('Rocks/rock-')[1].split('.')[0])
                        const t2 = Number(c2.src.split('Rocks/rock-')[1].split('.')[0])
                        const st = document.querySelector(`#${turn}-store > span`)
                        st.innerText = Number(st.innerText) + t1 + t2
                        c1.src = 'Rocks/rock-0.png'
                        c2.src = 'Rocks/rock-0.png'
                    }
                    if ((lastStone.startsWith(a[turn]) && !lastStone.includes('store'))) {
                        const c1 = document.querySelector(`#${lastStone} > img`)
                        const t1 = Number(c1.src.split('Rocks/rock-')[1].split('.')[0])
                        const st = document.querySelector(`#${turn}-store > span`)
                        if (t1 % 2 === 0) {
                            setTimeout(() => {
                                c1.src = 'Rocks/rock-0.png'
                                st.innerText = Number(st.innerText) + t1
                            }, 50)
                        }
                    }
                }
                if (!check(turn)) {
                    const st = document.querySelector(`#${turn}-store > span`)
                    let total = 0
                    for (let index = 1; index < 7; index++) {
                        const c1 = document.querySelector(`#${a[turn]}-${index} > img`)
                        const t1 = Number(c1.src.split('Rocks/rock-')[1].split('.')[0])
                        c1.src = 'Rocks/rock-0.png'
                        total += t1
                    }
                    st.innerText = Number(st.innerText) + total
                    result()
                }
                if (lastStone !== (`${turn}-store`)) {
                    turn = a[turn]
                    const board = document.querySelector("#root > div.mancala-board")
                    let deg = Number(board.style.rotate.replace('deg', ''))
                    setTimeout(() => {
                        board.style.rotate = `${deg + 1}deg`
                        deg = Number(board.style.rotate.replace('deg', ''))
                        const i = setInterval(() => {
                            board.style.rotate = `${deg + 1}deg`
                            deg = Number(board.style.rotate.replace('deg', ''))
                            if (deg % 180 === 0) {
                                if (computer && turn === 'b') computer1()
                                clearInterval(i)
                            }
                        }, 3);
                    }, 300);

                } else {
                    if (computer && turn === 'b') computer1()
                }
            }
            function qw() {
                available = true
                clearInterval(intv)
            }
            qw()
        }
    }, 300)
}

function result() {
    available = false
    const st1 = Number(document.querySelector(`#a-store > span`).innerText.trim())
    const st2 = Number(document.querySelector(`#b-store > span`).innerText.trim())
    const d = [st1, st2]
    const winner = players[d.indexOf(Math.max(...d))]
    if (st1 == st2) {
        document.querySelector("#modal-end").style.display = "flex"
        document.querySelector("#modal-end > lottie-player").baseURI = "https://assets1.lottiefiles.com/packages/lf20_adhqfbqy.json"
        document.querySelector("#modal-end > lottie-player").play()
        document.querySelector("#modal-end > span").innerText = 'Eşitlik'
    } else {
        document.querySelector("#modal-end").style.display = "flex"
        document.querySelector("#modal-end > span").innerText = `${winner} Kazandı`
        document.querySelector("#modal-end > lottie-player").play()
    }
}