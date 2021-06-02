var Rock = cc.Class.extend({
    ctor: function () {
        var size = cc.director.getWinSize()
        this.sprite = new cc.Sprite(res.rock)
    }
})

var Tree = cc.Class.extend({
    ctor: function () {
        var size = cc.director.getWinSize()
        this.sprite = new cc.Sprite(res.tree)
        this.sprite.setAnchorPoint(0.5, 0.3)
    }
})

var BeginGate = cc.Class.extend({
    ctor: function () {
        var size = cc.director.getWinSize()
        this.sprite = new cc.Sprite(res.begin_gate)
        this.sprite.setAnchorPoint(0.5, 0.3)
    }
})

var EndGate = cc.Class.extend({
    ctor: function () {
        var size = cc.director.getWinSize()
        this.sprite = new cc.Sprite(res.end_gate)
        this.sprite.setAnchorPoint(0.5, 0.3)
    }
})

var Cell = cc.Class.extend({
    ctor: function (possible = true, x, y) {
        var size = cc.director.getWinSize()
        this.node = new cc.Node()
        this.cellBg = new cc.Sprite(res.cell)
        this.cellBg.setScaleX((size.width / DIMEN.x) / this.cellBg.getBoundingBox().width)
        this.node.addChild(this.cellBg)
        this.node.setPosition(x * (size.width / DIMEN.x) - size.width / 2 + size.width / (DIMEN.x * 2)
            , (DIMEN.y - 1 - y) * (size.height / DIMEN.y) - size.height / 2 + size.height / (DIMEN.y * 2))
        if (!possible) {
            var barrier = this.getBarrier().sprite
            this.node.addChild(barrier)
        }
        if (x == 0 && y == 0) {
            var begin_gate = new BeginGate()
            begin_gate.sprite.setScaleX((size.width / DIMEN.x) / begin_gate.sprite.getBoundingBox().width)
            begin_gate.sprite.setScaleY((size.height / DIMEN.y) / begin_gate.sprite.getBoundingBox().height)
            begin_gate.sprite.flippedX = true
            this.node.addChild(begin_gate.sprite)
        }
        if (x == DIMEN.x - 1 && y == DIMEN.y - 1) {
            var end_gate = new EndGate()
            this.node.addChild(end_gate.sprite)
        }
    }
    ,
    getBarrier: function () {
        var random = Math.random()
        if (random > 0.5) {
            return new Rock()
        } else {
            return new Tree()
        }

    }
})