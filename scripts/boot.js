BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    preload: function () {
    	this.game.load.image('preloader', 'images/preloader.png');
    },

    create: function () {
        this.game.stage.backgroundColor = 0x112233;

        // TODO: See if I can move this
		//this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scaleStage();
        this.state.start('preload');
    },

    scaleStage: function(){
    	if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = this.game.gameWidth/2;
            this.scale.minHeight = this.game.gameHeight/2;
            this.scale.maxWidth = this.game.gameWidth;
            this.scale.maxHeight = this.game.gameHeight;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = this.game.gameWidth/2;
            this.scale.minHeight = this.game.gameHeight/2;
            this.scale.maxWidth = 2048; //You can change this to gameWidth*2.5 if needed
            this.scale.maxHeight = 1228; //Make sure these values are proportional to the gameWidth and gameHeight
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }

        /*var ow = parseInt(this.game.canvas.style.width,10);
		var oh = parseInt(this.game.canvas.style.height,10);
		var r = Math.max(window.innerWidth/ow,window.innerHeight/oh);
		var nw = ow*r;
		var nh = oh*r;
		this.game.canvas.style.width = nw+"px";
		this.game.canvas.style.height= nh+"px";
		this.game.canvas.style.marginLeft = (window.innerWidth/2 - nw/2)+"px"; 
		this.game.canvas.style.marginTop = (window.innerHeight/2 - nh/2)+"px";
		document.getElementById("game").style.width = window.innerWidth+"px";
		document.getElementById("game").style.height = window.innerHeight-1+"px";//The css for body includes 1px top margin, I believe this is the cause for this -1
		document.getElementById("game").style.overflow = "hidden";*/
    }
};