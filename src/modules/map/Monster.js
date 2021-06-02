const NUM_OF_FRAME_PER_ANIMATION = 20
const NUM_OF_GOLEM_FRAME_PER_ANIMATION = 20
const NUM_OF_NINJA_FRAME_PER_ANIMATION = 9

var Golem = cc.Class.extend({
    ctor: function () {
        this.speed = 2
        cc.spriteFrameCache.addSpriteFrames(res.golem_right_plist, res.golem_right_png)
        this.sprite = new cc.Sprite('#monster_golem_run_0040.png')
    },
    getActionByDirection: function (type = DIRECTION.DOWN) {
        switch (type) {
            case DIRECTION.DOWN:
                cc.spriteFrameCache.addSpriteFrames(res.golem_down_plist, res.golem_down_png)
                var animation = new cc.Animation()
                for (let i = 1; i < 20; i++) {
                    var str = "monster_golem_run_00" + (i < 10 ? "0" + i : i) + ".png"
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame(str))
                }
                animation.setDelayPerUnit(this.speed / NUM_OF_GOLEM_FRAME_PER_ANIMATION)
                animation.setRestoreOriginalFrame(false);
                animation.setLoops(1)
                return cc.animate(animation)
            case DIRECTION.UP:
                cc.spriteFrameCache.addSpriteFrames(res.golem_up_plist, res.golem_up_png)
                var animation = new cc.Animation()
                for (let i = 80; i < 100; i++) {
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("monster_golem_run_00" + i + ".png"))
                }
                animation.setDelayPerUnit(this.speed / NUM_OF_FRAME_PER_ANIMATION)
                animation.setRestoreOriginalFrame(false);
                animation.setLoops(-1)
                return cc.animate(animation)
            case DIRECTION.LEFT:
                cc.spriteFrameCache.addSpriteFrames(res.golem_left_plist, res.golem_left_png)
                var animation = new cc.Animation()
                for (let i = 40; i < 59; i++) {
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("monster_golem_run_000" + i + ".png"))
                }
                animation.setDelayPerUnit(this.speed / NUM_OF_FRAME_PER_ANIMATION)
                animation.setRestoreOriginalFrame(false);
                animation.setLoops(1)
                return cc.animate(animation)
            case DIRECTION.RIGHT:
                cc.spriteFrameCache.addSpriteFrames(res.golem_right_plist, res.golem_right_png)
                var animation = new cc.Animation()
                for (let i = 40; i < 59; i++) {
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("monster_golem_run_00" + i + ".png"))
                }
                animation.setDelayPerUnit(this.speed / NUM_OF_GOLEM_FRAME_PER_ANIMATION)
                animation.setRestoreOriginalFrame(false);
                animation.setLoops(1)
                var animate = cc.animate(animation)
                return animate
            default:
                throw new Error()
        }
    }
})

var Ninja = cc.Class.extend({
    ctor: function () {
        this.speed = 1
        cc.spriteFrameCache.addSpriteFrames(res.ninja_right_plist, res.ninja_right_png)
        this.sprite = new cc.Sprite('#monster_ninja_run_0020.png')
    },
    getActionByDirection: function (type = DIRECTION.DOWN) {
        switch (type) {
            case DIRECTION.DOWN:
                cc.spriteFrameCache.addSpriteFrames(res.ninja_down_plist, res.ninja_down_png)
                var animation = new cc.Animation()
                for (let i = 1; i < 9; i++) {
                    var str = "monster_ninja_run_000" + i + ".png"
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame(str))
                }
                animation.setDelayPerUnit(this.speed / NUM_OF_NINJA_FRAME_PER_ANIMATION)
                animation.setRestoreOriginalFrame(false);
                animation.setLoops(1)
                return cc.animate(animation)
            case DIRECTION.UP:
                cc.spriteFrameCache.addSpriteFrames(res.golem_up_plist, res.golem_up_png)
                var animation = new cc.Animation()
                for (let i = 80; i < 100; i++) {
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("monster_golem_run_00" + i + ".png"))
                }
                animation.setDelayPerUnit(this.speed / NUM_OF_FRAME_PER_ANIMATION)
                animation.setRestoreOriginalFrame(false);
                animation.setLoops(-1)
                return cc.animate(animation)
            case DIRECTION.LEFT:
                cc.spriteFrameCache.addSpriteFrames(res.golem_left_plist, res.golem_left_png)
                var animation = new cc.Animation()
                for (let i = 40; i < 59; i++) {
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("monster_golem_run_000" + i + ".png"))
                }
                animation.setDelayPerUnit(this.speed / NUM_OF_FRAME_PER_ANIMATION)
                animation.setRestoreOriginalFrame(false);
                animation.setLoops(1)
                return cc.animate(animation)
            case DIRECTION.RIGHT:
                cc.spriteFrameCache.addSpriteFrames(res.ninja_right_plist, res.ninja_right_png)
                var animation = new cc.Animation()
                for (let i = 20; i < 29; i++) {
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("monster_ninja_run_00" + i + ".png"))
                }
                animation.setDelayPerUnit(this.speed / NUM_OF_NINJA_FRAME_PER_ANIMATION)
                animation.setRestoreOriginalFrame(false);
                animation.setLoops(1)
                var animate = cc.animate(animation)
                return animate
            default:
                throw new Error()
        }
    }
})

var Monster = cc.Class.extend({
    ctor: function (begin, end, path, speed) {
        size = cc.director.getWinSize()
        this.path = path
        this.location = [begin[0], begin[1]]
        this.indexLocation = 0
        this.position = [size.width / (DIMEN.x * 2) - size.width / 2, -size.height / (DIMEN.y * 2) + size.height / 2]
        var random = Math.random()
        this.monster = random > 0.5 ? new Ninja() : new Golem()
        this.sprite = this.monster.sprite
        this.sprite.setPosition(this.position[0], this.position[1])
        this.action = []
        this.move.bind(this)
        this.getDirection.bind(this)
        this.move()


    },
    getDirection: function () {

        if (this.indexLocation < this.path.length - 1) {
            var currentX = this.path[this.indexLocation][0]
            var currentY = this.path[this.indexLocation][1]
            var nextX = this.path[this.indexLocation + 1][0]
            var nextY = this.path[this.indexLocation + 1][1]
            if (nextX > currentX) {
                return DIRECTION.DOWN
            }
            if (nextX < currentX) {
                return DIRECTION.UP
            }
            if (nextY > currentY) {
                return DIRECTION.RIGHT
            }
            if (nextY < currentY) {
                return DIRECTION.LEFT
            }
        } else {
            return -1
        }
    },

    move: function () {
        var direction = this.getDirection()
        while (direction != -1) {
            switch (direction) {
                case DIRECTION.LEFT:
                    var newPosition = [this.position[0] - size.width / DIMEN.x, this.position[1]]
                    this.action.push(cc.spawn(cc.moveTo(this.monster.speed, cc.p(newPosition[0], newPosition[1]))
                        , this.monster.getActionByDirection(DIRECTION.LEFT)))
                    this.position[0] = newPosition[0]
                    this.position[1] = newPosition[1]
                    break
                case DIRECTION.RIGHT:
                    var newPosition = [this.position[0] + size.width / DIMEN.x, this.position[1]]
                    this.action.push(cc.spawn(this.monster.getActionByDirection(DIRECTION.RIGHT)
                        , cc.moveTo(this.monster.speed, cc.p(newPosition[0], newPosition[1]))))
                    this.position[0] = newPosition[0]
                    this.position[1] = newPosition[1]
                    break
                case DIRECTION.UP:
                    var newPosition = [this.position[0], this.position[1] + size.height / DIMEN.y]
                    this.action.push(cc.moveTo(this.monster.speed, cc.p(newPosition[0], newPosition[1])))
                    this.position[0] = newPosition[0]
                    this.position[1] = newPosition[1]
                    break
                case DIRECTION.DOWN:
                    var newPosition = [this.position[0], this.position[1] - size.height / DIMEN.y]
                    this.action.push(cc.spawn(cc.moveTo(this.monster.speed, cc.p(newPosition[0], newPosition[1]))
                        , this.monster.getActionByDirection(DIRECTION.DOWN)))
                    this.position[0] = newPosition[0]
                    this.position[1] = newPosition[1]
                    break
                case -1:
                    break
                default:
                    cc.log(direction)
                    break
            }
            this.indexLocation = this.indexLocation + 1;
            direction = this.getDirection()
        }
        this.action.push(cc.fadeOut(1))
        this.action.push(cc.removeSelf(true))
        this.sprite.runAction(cc.sequence(this.action))
    }

})