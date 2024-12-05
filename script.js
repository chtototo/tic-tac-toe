let queue = 'cross'
function changeQueue() {
    queue = queue === 'cross' ? 'nought' : 'cross';
}

function getQueue() {
    return queue === 'cross' ? 'x' : 'o';
}

let steps = [
    {
        1: NaN,
        2: NaN,
        3: NaN,
    },
    {
        4: NaN,
        5: NaN,
        6: NaN,
    },
    {
        7: NaN,
        8: NaN,
        9: NaN,
    }
]

const cells = document.querySelectorAll('.cell')
for (i = 0; i < cells.length; i++) {
    let cell = cells[i]
    cell.addEventListener('click', () => {
        document.getElementById('result').innerHTML=''
        if (cell.innerHTML === '') {
            cell.innerHTML = `<div class='${queue}'>${getQueue()}</div>`
            let id = cell.id[cell.id.length - 1]
            steps[(id / 7) >= 1 ? 2 : Math.round(id / 7)][id] = getQueue()
            win()
            changeQueue()
        }
    })
}

Object.prototype.values = function() {
    return Object.values(this)
}

function win() {
    if (horizontally() | vertically() | diagonally()) {
        document.getElementById('result').innerHTML=`WINNER: ${getQueue()}`
        clearBoard()
    }
}

function horizontally() {
    for (row of steps) {
        row = row.values()
        if (row.every(e => e === row[0])) {
            return true
        }
    }
}

function vertically() {
    for (i = 0; i < 3; i++) {
        if ((steps[0].values()[i] === steps[1].values()[i]) & (steps[1].values()[i] === steps[2].values()[i])) {
            return true
        }
    }
}

function diagonally() {
    if (((steps[0].values()[0] === steps[1].values()[1]) & (steps[1].values()[1] === steps[2].values()[2])) | ((steps[0].values()[2] === steps[1].values()[1]) & (steps[1].values()[1] === steps[2].values()[0]))) {
        return true
    }
}

function clearBoard() {
    for (cell of cells) {
        cell.innerHTML=''
    }
    queue = 'cross'
}