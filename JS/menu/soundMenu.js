var soundMenu = function(game){

};
soundMenu.prototype = {
    init:function(playerData,globalScores,playerWaves,buttonGroup,surroundings){
        this.playerData = playerData;
        this.globalScores = globalScores;
        this.playerWaves = playerWaves;
        this.buttonGroup = buttonGroup;
        this.surroundings = surroundings;
    },
    preload:function(){
        //do some murdering here
        this.buttonGroup.removeAll();
        this.game.load.audio('testi', 'assets/sounds/testi.mp3');

    },
    create:function(){
        
        this.sound = this.game.add.audio('testi');
        this.sound.play();
        //this.mastervolume = 1.0;
        
        var styleA = { font:'25px cyber', fill:'white'};
        var styleB = { font:'20px cyber', fill:'black'};
        //otsikko
        this.surroundings.menuLabel.text = "Sounds";
        this.surroundings.menuLabel.x = (this.game.width/2)-(this.surroundings.menuLabel.width/2);
        
        // mastervolumen säädin
       this.mastervolLabel = this.game.add.text(330, 300, 'Master volume', styleA);
       this.masterGroup = this.game.add.group();
       this.masterGroup.x = 630;
       this.masterGroup.y = 300;
       this.masterslider = this.game.add.sprite(0, 0, 'slider');
       this.masterslider.scale.setTo(1,2);
       this.masterneedle = this.game.add.sprite(170, 1, 'needle');
       this.masterneedle.inputEnabled = true;
       this.masterneedle.input.enableDrag();
       this.masterneedle.input.boundsSprite = this.masterslider;
       this.masterneedle.input.allowVerticalDrag = false;
       this.masterneedle.events.onDragUpdate.add(this.masterVolume,this);
       this.masterGroup.add(this.masterslider);
       this.masterGroup.add(this.masterneedle);
        
        // musiikkivolumen säädin
        this.musicvolLabel = this.game.add.text(330, 370, 'Music volume', styleA);
        this.musicGroup = this.game.add.group();
        this.musicGroup.x = 630;
        this.musicGroup.y = 370;
        this.musicslider = this.game.add.sprite(0, 0, 'slider');
        this.musicslider.scale.setTo(1,2);
        this.musicneedle = this.game.add.sprite(170, 1, 'needle');
        this.musicneedle.inputEnabled = true;
        this.musicneedle.input.enableDrag();
        this.musicneedle.input.boundsSprite = this.musicslider;
        this.musicneedle.input.allowVerticalDrag = false;
        this.musicneedle.events.onDragUpdate.add(this.musicVolume,this);
        this.musicGroup.add(this.musicslider);
        this.musicGroup.add(this.musicneedle);

        // efektivolumen säädin
        this.effectsvolLabel = this.game.add.text(330, 440, 'Effects volume', styleA);
        this.fxGroup = this.game.add.group();
        this.fxGroup.x = 630;
        this.fxGroup.y = 440;
        this.fxslider = this.game.add.sprite(0, 0, 'slider');
        this.fxslider.scale.setTo(1,2);
        this.fxneedle = this.game.add.sprite(170, 1, 'needle');
        this.fxneedle.inputEnabled = true;
        this.fxneedle.input.enableDrag();
        this.fxneedle.input.boundsSprite = this.fxslider;
        this.fxneedle.input.allowVerticalDrag = false;
        this.fxneedle.events.onDragUpdate.add(this.fxVolume,this);
        this.fxGroup.add(this.fxslider);
        this.fxGroup.add(this.fxneedle);
        
        // alustetaan äänten on/off painike
        this.onoffButton = this.game.add.button(590, 560, 'menuHeader', this.onOff, this);
        this.onoffButton.scale.setTo(0.08, 0.5);
        var onoffText = this.game.add.text(210,20,"On/Off",styleB);
        this.onoffButton.addChild(onoffText);
        this.onoffButton.getChildAt(0).scale.setTo(10, 1.5);
        
        // alustetaan äänien resetointi painike
        this.resetButton = this.game.add.button(660, 620, 'menuHeader', this.reset, this);
        this.resetButton.scale.setTo(0.08, 0.5);
        var resetText = this.game.add.text(400,20,"Reset",styleB);
        this.resetButton.addChild(resetText);
        this.resetButton.getChildAt(0).scale.setTo(10, 1.5);
        
        // alustetaan äänien tallennus painike
        this.saveButton = this.game.add.button(530, 620, 'menuHeader', this.save, this);
        this.saveButton.scale.setTo(0.08, 0.5);
        var saveText = this.game.add.text(400,20,"Save",styleB);
        this.saveButton.addChild(saveText);
        this.saveButton.getChildAt(0).scale.setTo(10, 1.5);

        //alustetaan takaisin nappula
        this.backButton = this.game.add.button(200, 120, 'menuHeader', this.back, this, 1, 0, 2);
        this.backButton.scale.setTo(0.08, 0.5);
        var backText = this.game.add.text(400,20,"Back",styleB);
        this.backButton.addChild(backText);
        this.backButton.getChildAt(0).scale.setTo(10, 1.5);
        

        this.buttonGroup.add(this.mastervolLabel);
        this.buttonGroup.add(this.musicvolLabel);
        this.buttonGroup.add(this.effectsvolLabel);
        this.buttonGroup.add(this.onoffButton);
        this.buttonGroup.add(this.saveButton);
        this.buttonGroup.add(this.backButton);
        this.buttonGroup.add(this.resetButton);
        
        
    }, // säädetään mastervolume-muuttuja/kerroin mastersliderin neulan x:n mukaan
    masterVolume:function() {
        //console.log(this.masterneedle.x);
        console.log(this.mastervolume);
        if (this.masterneedle.x < 1) {
            this.mastervolume = 0.0;
        } else if (this.masterneedle.x < 36) {
            this.mastervolume = 0.2;
        } else if (this.masterneedle.x < 72) {
            this.mastervolume = 0.4;
        } else if (this.masterneedle.x < 108) {
            this.mastervolume = 0.6;
        } else if (this.masterneedle.x < 144) {
            this.mastervolume = 0.8;
        } else if (this.masterneedle.x < 180) {
            this.mastervolume = 1.0;
        } else if (this.masterneedle.x < 216) {
            this.mastervolume = 1.2;
        } else if (this.masterneedle.x < 252) {
            this.mastervolume = 1.4;
        } else if (this.masterneedle.x < 288) {
            this.mastervolume = 1.6;
        } else if (this.masterneedle.x < 324) {
            this.mastervolume = 1.8;
        } else if (this.masterneedle.x > 324) {
            this.mastervolume = 2.0;
        }
        this.musicVolume()
        //this.fxVolume();
    }, // säädetään musiikkivolume musiikkisliderin neulan x:n mukaan
    musicVolume:function() {
        //console.log(this.musicneedle.x);
        console.log(this.sound.volume);
        if (this.musicneedle.x < 1) {
            this.sound.volume = 0.0 * this.mastervolume;
        } else if (this.musicneedle.x < 36) {
            this.sound.volume = 0.1 * this.mastervolume;
        } else if (this.musicneedle.x < 72) {
            this.sound.volume = 0.2 * this.mastervolume;
        } else if (this.musicneedle.x < 108) {
            this.sound.volume = 0.3 * this.mastervolume;
        } else if (this.musicneedle.x < 144) {
            this.sound.volume = 0.4 * this.mastervolume;
        } else if (this.musicneedle.x < 180) {
            this.sound.volume = 0.5 * this.mastervolume;
        } else if (this.musicneedle.x < 216) {
            this.sound.volume = 0.6 * this.mastervolume;
        } else if (this.musicneedle.x < 252) {
            this.sound.volume = 0.7 * this.mastervolume;
        } else if (this.musicneedle.x < 288) {
            this.sound.volume = 0.8 * this.mastervolume;
        } else if (this.musicneedle.x < 324) {
            this.sound.volume = 0.9 * this.mastervolume;
        } else if (this.musicneedle.x > 324) {
            this.sound.volume = 1.0 * this.mastervolume;
        }
    }, // säädetään efektivolume efektisliderin neulan x:n mukaan
    fxVolume:function() {
        //console.log(this.fxneedle.x);
        console.log(this.sound.volume);
        if (this.fxneedle.x < 1) {
            this.sound.volume = 0.0 * this.mastervolume;
        } else if (this.fxneedle.x < 36) {
            this.sound.volume = 0.1 * this.mastervolume;
        } else if (this.fxneedle.x < 72) {
            this.sound.volume = 0.2 * this.mastervolume;
        } else if (this.fxneedle.x < 108) {
            this.sound.volume = 0.3 * this.mastervolume;
        } else if (this.fxneedle.x < 144) {
            this.sound.volume = 0.4 * this.mastervolume;
        } else if (this.fxneedle.x < 180) {
            this.sound.volume = 0.5 * this.mastervolume;
        } else if (this.fxneedle.x < 216) {
            this.sound.volume = 0.6 * this.mastervolume;
        } else if (this.fxneedle.x < 252) {
            this.sound.volume = 0.7 * this.mastervolume;
        } else if (this.fxneedle.x < 288) {
            this.sound.volume = 0.8 * this.mastervolume;
        } else if (this.fxneedle.x < 324) {
            this.sound.volume = 0.9 * this.mastervolume;
        } else if (this.fxneedle.x > 324) {
            this.sound.volume = 1.0 * this.mastervolume;
        }
    },
    // asettaa sliderit takaisin keskelle ja ajaa volume funktiot
     reset:function(){
        this.masterneedle.x = 170;
        this.masterVolume();
        this.musicneedle.x = 170;
        this.musicVolume();
        this.fxneedle.x = 170;
        this.fxVolume();
        },   
    // vaihda mute on/off
    onOff:function(){
        this.game.sound.mute = !this.game.sound.mute;
        },
    // back-painike takaisin settings-valikkoon
    back:function(){
        this.masterGroup.removeAll();
        this.musicGroup.removeAll();
        this.fxGroup.removeAll();
        this.game.state.start('settings',false,false,
            this.playerData,
            this.globalScores,
            this.playerWaves,
            this.buttonGroup,
            this.surroundings
        );
    }

};