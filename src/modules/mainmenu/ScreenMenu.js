/**
 * Created by GSN on 7/6/2015.
 */

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        this.size = cc.director.getVisibleSize();
        this.mapBg= ccs.load('MainScene.json','').node
        this.addChild(this.mapBg,0)
        this.map= new MapLayer()
        this.map.setPosition(this.size.width/2,this.size.height/2)
        this.addChild(this.map)
    },
    onEnter:function(){
        this._super();
    },
});