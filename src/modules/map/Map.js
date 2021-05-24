const DIMEN = {
    x: 7,
    y: 7
}

const DIRECTION = {
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
}
const SIZE_OF_CELL = {
    width: cc.director.getVisibleSize().width / 2,
    height: cc.director.getVisibleSize().height / 2
}
var Board = cc.Class.extend({
    ctor: function () {
        this.width = DIMEN.x
        this.height = DIMEN.y
        this.array = []
        this.initBoard()
        this.initBoard.bind(this)
        this.randomBarrierPosition.bind(this)
        this.genBoard.bind(this)
    }
    ,
    initBoard: function () {
        for (let i = 0; i < this.width; i++) {
            let b = []
            for (let j = 0; j < this.height; j++) {
                b[j] = 0
            }
            this.array.push(b)
        }
    }
    ,
    randomBarrierPosition: function (numberOfBarrier) {
        var forbiddenZone = [[this.width - 1, this.height - 1], [0, 0]]
        var safeZone = []
        this.array.map((ele, index) => {
                ele.map((ele2, index2) => {
                    safeZone.push([index, index2])
                })
            }
        )
        safeZone = safeZone.filter((ele) => {
            return !this.checkArrayContainElement(ele, forbiddenZone)
        })

        var barrierPosition = []
        while (barrierPosition.length < numberOfBarrier) {
            if (safeZone.length == 0) return barrierPosition
            var pos = this.randomIndex(0, safeZone.length - 1)
            barrierPosition.push(safeZone[pos])
            forbiddenZone.push(safeZone[pos])
            var neighbors = this.getNeighborPosition(safeZone[pos], this.array)
            neighbors.map((ele) => {
                if (!this.checkArrayContainElement(ele, forbiddenZone)) {
                    forbiddenZone.push(ele)
                }
            })
            safeZone = safeZone.filter((ele) => {
                return !this.checkArrayContainElement(ele, forbiddenZone)
            })


        }
        return barrierPosition
    }
    ,
    checkArrayContainElement: function (ele, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (ele[0] == arr[i][0] && ele[1] == arr[i][1]) {
                return true
            }
        }
        return false
    }
    ,

    randomIndex: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    ,
    getNeighborPosition: function (position, arr) {
        var n = [[position[0] - 1, position[1] - 1],
            [position[0] - 1, position[1]],
            [position[0] - 1, position[1] + 1],
            [position[0], position[1] - 1],
            [position[0], position[1] + 1],
            [position[0] + 1, position[1] - 1],
            [position[0] + 1, position[1]],
            [position[0] + 1, position[1] + 1]]
        return n.filter((e) => this.isValidPosition(e, arr))
    }
    ,
    isValidPosition: function (pos, arr) {
        if ((pos[0] >= 0 && pos[0] < arr.length) && (pos[1] >= 0 && pos[1] < arr[0].length)) {
            return true
        }
        return false
    }
    ,
    genBoard: function () {
        var barrier = this.randomBarrierPosition(7)
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array[0].length; j++) {
                if (this.checkArrayContainElement([i, j], barrier)) {
                    this.array[i][j] = 1
                }
            }
        }
        return this.array
    }
})


var MapLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.director.getWinSize()

        this.array = new Board().genBoard()
        cc.log(this.array)
        this.array.map((row, row_index) => {
            row.map((ele, index) => {
                var cell = new Cell(ele == 1 ? false : true, index, row_index)
                this.addChild(cell.node)
            })
        })
        var begin = {
            x: 0, y: 0, g: 0, h: 0, path: []
        }
        var end = {
            x: 6, y: 6, g: 0, h: 0, path: []
        }
        var path = findPath(begin, end,
            this.array
        )
        var monster = new Monster([0, 0], [DIMEN.x, DIMEN.y], path.path.concat([[path.x, path.y]]),1)
        this.addChild(monster.sprite)

        setInterval(()=>{
            var monster = new Monster([0, 0], [DIMEN.x, DIMEN.y], path.path.concat([[path.x, path.y]]),Math.ceil(Math.random()*3))
            this.addChild(monster.sprite)
        },5000)
    }
})
