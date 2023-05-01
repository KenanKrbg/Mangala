const board = [
    {
        type: 'pocket',
        owner: true,
        count: 0
    },
    {
        type: 'pocket',
        owner: true,
        count: 0
    },
    {
        type: 'pocket',
        owner: true,
        count: 0
    },
    {
        type: 'pocket',
        owner: true,
        count: 0
    },
    {
        type: 'pocket',
        owner: true,
        count: 0
    },
    {
        type: 'pocket',
        owner: true,
        count: 1
    },
    {
        type: 'store',
        owner: true,
        count: 0
    },
    {
        type: 'pocket',
        owner: false,
        count: 4
    },
    {
        type: 'pocket',
        owner: false,
        count: 4
    },
    {
        type: 'pocket',
        owner: false,
        count: 4
    },
    {
        type: 'pocket',
        owner: false,
        count: 4
    },
    {
        type: 'pocket',
        owner: false,
        count: 4
    },
    {
        type: 'pocket',
        owner: false,
        count: 4
    },
    {
        type: 'store',
        owner: false,
        count: 0
    },
]

const check = (board, store) => {
    const w = {
        6: [0, 1, 2, 3, 4, 5],
        13: [7, 8, 9, 10, 11, 12]
    }
    let total = board.reduce((a, c, i) => {
        return a + (w[store].includes(i) ? c.count : 0)
    }, 0)
    if (!total) {
        board[store].count = board[store].count + board.reduce((a, c, i) => {
            return a + (w[19 - store].includes(i) ? c.count : 0)
        }, 0)
        board.forEach((element, i) => {
            if (!(i in w)) element.count = 0
        });
    }
}

let turn = true

const move = (x) => {
    let isOwnStore = x < 7 ? true : false
    if (turn !== isOwnStore) return
    let stones = board[x].count
    if (!stones) return
    if (stones === 1) {
        board[x].count = 0
        board[x + 1].count = board[x + 1].count + 1
        if (board[x + 1].count === 1 && board[x + 1].type === 'pocket') {
            board[isOwnStore ? 6 : 13].count = board[isOwnStore ? 6 : 13].count + board[11 - x].count + 1
            board[11 - x].count = 0
            board[x + 1].count = 0
        }
        check(board, isOwnStore ? 6 : 13)
        turn = board[x + 1].type === 'store' ? turn : !turn
    } else {
        board[x].count = 0
        let i = x
        while (stones) {
            if (!(!board[i % 14].owner === isOwnStore && board[i % 14].type === 'store')) {
                board[i % 14].count = board[i % 14].count + 1
                stones--
            }
            i++
        }
        if (board[i - 1 % 14].count === 1 && board[i - 1 % 14].type === 'pocket' && board[i - 1 % 14].owner === isOwnStore) {
            board[isOwnStore ? 6 : 13].count = board[isOwnStore ? 6 : 13].count + board[12 - (i - 1 % 14)].count + 1
            board[12 - (i - 1 % 14)].count = 0
            board[i - 1 % 14].count = 0
        }
        if (board[i - 1 % 14].count % 2 === 0 && board[i - 1 % 14].type === 'pocket' && board[i - 1 % 14].owner !== isOwnStore) {
            board[isOwnStore ? 6 : 13].count = board[isOwnStore ? 6 : 13].count + board[i - 1 % 14].count
            board[i - 1 % 14].count = 0
        }
        turn = board[i - 1 % 14].type === 'store' ? turn : !turn
    }
}