/**
 * Created by RAndom MC on 18/03/2016.
 */
function powerSystemEditor(self){
    /*var self = self;*/
    var levels = {
        1:1,
        1.25:2,
        1.5:3,
        1.75:4,
        2:5
    };
    var style = { font:'15px cyber', fill:'black'};
    console.log(self);
    self.centerWindow.removeAll(true);
    self.editGunsBtn.setFrames(0, 1, 2);
    console.log(self.centerWindow.length);
    self.editPowersBtn.setFrames(1,2,2);
    //jätetty koodin koska näitä voidaan käyttää sivuina tarpeen vaatiessa
    /*self.wave1Btn = self.game.add.button(25,25,'buttonSprite',wave1,self,0, 1, 2);
     var round1 = self.game.add.text(0,20,"Round 1",style);
     self.wave1Btn.addChild(round1);
     self.wave2Btn = self.game.add.button(175,25,'buttonSprite',wave2,self,0, 1, 2);
     var round2 = self.game.add.text(0,20,"Round 2",style);
     self.wave2Btn.addChild(round2);
     self.wave3Btn = self.game.add.button(325,25,'buttonSprite',wave3,self,0, 1, 2);
     var round3 = self.game.add.text(0,20,"Round 3",style);
     self.wave3Btn.addChild(round3);*/

    //paluunappula kassalta
    self.cancelCheckout = self.game.add.button(25,25,'buttonSprite',function(){powerSystemEditor(self)},self,0, 1, 2);
    var cancelText = self.game.add.text(0,20,"Cancel",style);
    self.cancelCheckout.addChild(cancelText);
    self.cancelCheckout.visible = false;

    style = { font:'18px cyber', fill:'white'};
    var styleSmall = { font:'14px cyber', fill:'white'};
    //pelaajan pisteet
    var money = self.game.add.text(515,25,self.playerRelatedData.playerData.money,style);


    //checkoutin otsikko
    var checkOutLabel = self.game.add.text(0,80,"Your buying a following item:",style);
    checkOutLabel.x = (680/2)-(checkOutLabel.width/2);
    checkOutLabel.visible = false;
    //kokonaiskustannus, kommentoitu mutta saatetaan käyttää checkoutissa vielä
    /* self.waveTotalCost = self.game.add.text(0,400,"Total cost: 0",style);//Tätä päivitetään calcTotal funktiossa
     self.waveTotalCost.x = (680/2)-(self.waveTotalCost.width/2);//centerTray leveys/2 - tekstin pituus / 2*/

    //Painike kassalle
    self.checkoutBtn = self.game.add.button(0,450,'buttonSprite',checkOut,0,1,2);
    self.checkoutBtn.x = (680/2)-(self.checkoutBtn.width/2);
    var checkoutBtnText = self.game.add.text(0,20,"Checkout",{font:'25px cyber',fill:'black'});
    checkoutBtnText.x  = (self.checkoutBtn.width/2)-(checkoutBtnText.width/2);
    self.checkoutBtn.addChild(checkoutBtnText);
    self.checkoutBtn.visible = false;

    //aallon kasaus
    self.subMenu = 1;
    self.subFunctions = [wave1,wave2,wave3];

    var reloadLine = self.game.add.group();
    reloadLine.name = "powerReloadBonus";
    reloadLine.price = 1000*self.playerRelatedData.shipStats.powers.powerReloadBonus;
    var AOELine = self.game.add.group();
    AOELine.name = "powerAOEBonus";
    AOELine.price = 1000*self.playerRelatedData.shipStats.powers.powerAOEBonus;
    var efcTmiLine = self.game.add.group();
    efcTmiLine.name = "powerEffectTime";
    efcTmiLine.price = 1000*self.playerRelatedData.shipStats.powers.powerEffectTime;

    //pwer reload line
    var reloadPic = self.game.add.image(32.5,110,'destroyer');
    reloadPic.scale.setTo(0.35,0.35);
    var lineName = self.game.add.text(100,130,"Liquid Cooling Mod "+levels[self.playerRelatedData.shipStats.powers.powerReloadBonus]+"",style);
    var lineInfo = self.game.add.text(100,170,"Your powers reload "+(self.playerRelatedData.shipStats.powers.powerReloadBonus+0.25)+" times faster",styleSmall);
    reloadLine.addChild(reloadPic);
    reloadLine.addChild(lineName);
    reloadLine.addChild(lineInfo);
    if(levels[self.playerRelatedData.shipStats.powers.powerReloadBonus] != 5){
        var linePrice = self.game.add.text(100,150,"Price: "+(1000*self.playerRelatedData.shipStats.powers.powerReloadBonus),styleSmall);
         /*var minus = self.game.add.button(480,120,'minus',function() {
         if (self.waveCreateData[self.subMenu - 1][0] > 0){
         self.waveCreateData[self.subMenu - 1][0] -= 1;
         self.subFunctions[self.subMenu-1]();
         }
         });
         var shipAmount = self.game.add.text(540,130,self.waveCreateData[self.subMenu-1][0],style);*/
        var plus = self.game.add.button(540,120,'plus',function(){
            /*self.waveCreateData[self.subMenu-1][0]+=1;
             self.subFunctions[self.subMenu-1]();*/
            checkOut(reloadLine);
        });
        reloadLine.addChild(linePrice);
        reloadLine.addChild(plus);
    } else {
        lineInfo.text = "Your powers reload "+self.playerRelatedData.shipStats.powers.powerReloadBonus+" times faster";
    }
    /*reloadLine.addChild(shipAmount);
     reloadLine.addChild(minus);*/

    //AOE line
    var AOEPic = self.game.add.image(25,200,'hunter');
    AOEPic.scale.setTo(0.35,0.35);
    lineName = self.game.add.text(100,220,"High-Tec Capasitors Pack "+levels[self.playerRelatedData.shipStats.powers.powerAOEBonus]+"",style);
    lineInfo = self.game.add.text(100,260,"Powers have "+(self.playerRelatedData.shipStats.powers.powerAOEBonus+0.25)+" times larger area of effect",styleSmall);
    AOELine.addChild(AOEPic);
    AOELine.addChild(lineName);
    AOELine.addChild(lineInfo);
    if(levels[self.playerRelatedData.shipStats.powers.powerAOEBonus] != 5){
        linePrice = self.game.add.text(100,240,"Price:  "+(1000*self.playerRelatedData.shipStats.powers.powerAOEBonus),styleSmall);
        /* minus = self.game.add.button(480,210,'minus',function() {
         if (self.waveCreateData[self.subMenu - 1][1] > 0){
         self.waveCreateData[self.subMenu - 1][1] -= 1;
         self.subFunctions[self.subMenu-1]();
         }
         });
         shipAmount = self.game.add.text(540,220,self.waveCreateData[self.subMenu-1][1],style);*/
        plus = self.game.add.button(540,210,'plus',function(){
            /*self.waveCreateData[self.subMenu-1][1]+=1;
             self.subFunctions[self.subMenu-1]();*/
            checkOut(AOELine);
        });
        AOELine.addChild(linePrice);
        AOELine.addChild(plus);
    } else {
        lineInfo.text = "Powers have "+self.playerRelatedData.shipStats.powers.powerAOEBonus+" times larger area of effect";
    }
    /* AOELine.addChild(shipAmount);
     AOELine.addChild(minus);*/


    //commander line
    var efcTmiPic = self.game.add.image(25,290,'commander');
    efcTmiPic.scale.setTo(0.35,0.32);
    lineName = self.game.add.text(100,310,"Tweaked Power Supply Mod "+levels[self.playerRelatedData.shipStats.powers.powerEffectTime]+"",style);
    lineInfo = self.game.add.text(100,350,"Your powers last "+(self.playerRelatedData.shipStats.powers.powerEffectTime+0.25)+" times longer",styleSmall);
    efcTmiLine.addChild(efcTmiPic);
    efcTmiLine.addChild(lineName);
    efcTmiLine.addChild(lineInfo);
    if(levels[self.playerRelatedData.shipStats.powers.powerEffectTime] != 5){
        linePrice = self.game.add.text(100,330,"Price: "+(1000*self.playerRelatedData.shipStats.powers.powerEffectTime),styleSmall);
         /* minus = self.game.add.button(480,300,'minus',function() {
         if (self.waveCreateData[self.subMenu - 1][2] > 0){
         self.waveCreateData[self.subMenu - 1][2] -= 1;
         self.subFunctions[self.subMenu-1]();
         }
         });
         shipAmount = self.game.add.text(540,310,self.waveCreateData[self.subMenu-1][2],style);*/
        plus = self.game.add.button(540,300,'plus',function(){
            /*self.waveCreateData[self.subMenu-1][2]+=1;
             self.subFunctions[self.subMenu-1]();*/
            checkOut(efcTmiLine);
        });
        efcTmiLine.addChild(linePrice);
        efcTmiLine.addChild(plus);
    } else {
        lineInfo.text = "Your powers last "+self.playerRelatedData.shipStats.powers.powerEffectTime+" times longer";
    }
    /*efcTmiLine.addChild(shipAmount);
     efcTmiLine.addChild(minus);*/


    //kasataan
    /*self.centerWindow.addChild(self.wave1Btn);
     self.centerWindow.addChild(self.wave2Btn);
     self.centerWindow.addChild(self.wave3Btn);*/
    self.centerWindow.addChild(self.checkoutBtn);
    self.centerWindow.addChild(self.cancelCheckout);
    self.centerWindow.forEach(function(btn) {//skaalataan yläpalin nappulat ja piirretään niille grafiikat
        btn.scale.setTo(0.3, 0.5);
        var g = self.game.add.graphics(0, 0);
        g.lineStyle(1, 0x000000, 1);
        g.lineTo(0, btn.height);
        g.lineTo(btn.width, btn.height);
        g.lineTo(btn.width, 0);
        g.lineTo(0, 0);
        btn.addChild(g);
        if (btn.getChildAt(0).text != "Checkout"){
            btn.getChildAt(0).scale.setTo(1 / 0.3, 1 / 0.5);
            btn.getChildAt(0).x = 90;//Tämän ei pitäisi toimia näin, bugi. 120 on painikkeen koko leveys
            btn.getChildAt(1).scale.setTo(1 / 0.3, 1 / 0.5);
        } else {//tämä on checkout nappula jolla eri asetukset
            btn.scale.setTo(1,1);
            btn.getChildAt(1).scale.setTo(1 / 0.3, 1 / 0.5);
            btn.setFrames(0,1,2);//korjaa bugin missä nappula sai jostain syystä framen 2 oletuksena
        }
    });
    var shipLines = self.game.add.group();
    shipLines.addChild(reloadLine);
    shipLines.addChild(AOELine);
    shipLines.addChild(efcTmiLine);
    shipLines.name = "shipLines";
    self.centerWindow.addChild(shipLines);
    /*self.centerWindow.addChild(self.waveTotalCost);*/
    self.centerWindow.addChild(checkOutLabel);
    self.centerWindow.addChild(money);
    /*wave1();*/
    //aaltovalikon funktiot
    function wave1(){
        //alert("workkii");
        self.subMenu = 1;
        reloadLine.getChildAt(4).text = self.waveCreateData[self.subMenu-1][0];
        AOELine.getChildAt(4).text = self.waveCreateData[self.subMenu-1][1];
        reloadLine.getChildAt(4).text = self.waveCreateData[self.subMenu-1][2];
        /*self.wave1Btn.setFrames(0,2,1);
         self.wave2Btn.setFrames(0, 1, 2);
         self.wave3Btn.setFrames(0, 1, 2);*/
        calcTotal();
    }
    function wave2(){
        self.subMenu = 2;
        reloadLine.getChildAt(2).text = self.waveCreateData[self.subMenu-1][0];
        AOELine.getChildAt(2).text = self.waveCreateData[self.subMenu-1][1];
        reloadLine.getChildAt(2).text = self.waveCreateData[self.subMenu-1][2];
        self.wave1Btn.setFrames(0, 1, 2);
        self.wave2Btn.setFrames(0,2,1);
        self.wave3Btn.setFrames(0, 1, 2);
        calcTotal();
    }
    function wave3(){
        self.subMenu = 3;
        reloadLine.getChildAt(2).text = self.waveCreateData[self.subMenu-1][0];
        AOELine.getChildAt(2).text = self.waveCreateData[self.subMenu-1][1];
        reloadLine.getChildAt(2).text = self.waveCreateData[self.subMenu-1][2];
        self.wave1Btn.setFrames(0, 1, 2);
        self.wave2Btn.setFrames(0, 1, 2);
        self.wave3Btn.setFrames(0,2,1);
        calcTotal();
    }
    function calcTotal(){
        //asetetaan checkout nappulan teksti ja minus ja plus näppäinten näkyvyys. Siksi että checkout vaihtaa nämä ja tämä funktio ajetaan varmasti kun pelaaja poistuu checkoutista
        self.checkoutBtn.getChildAt(0).text = "Checkout";
        self.checkoutBtn.getChildAt(0).x  = (self.checkoutBtn.width/2)-(self.checkoutBtn.getChildAt(0).width/2);
        checkOutLabel.visible = false;
        reloadLine.y = 0;//Jälleen kerran..miksi näin??? Ei tämän pitäisi olla 0
        AOELine.y = 0;
        reloadLine.y = 0;
        self.waveTotalCost.y = 400;

        //lasketaan kokonaismäärät
        var wCD  = self.waveCreateData;//shorthand
        wCD[3][0] = wCD[0][0]+wCD[1][0]+wCD[2][0];
        wCD[3][1] = wCD[0][1]+wCD[1][1]+wCD[2][1];
        wCD[3][2] = wCD[0][2]+wCD[1][2]+wCD[2][2];
        //lasketaan kokonaiskustannus
        var totalCost = (wCD[3][0]*50)+(wCD[3][1]*75)+(wCD[3][2]*250);
        self.waveTotalCost.text = "Total cost: "+totalCost;
        self.waveTotalCost.x = (680/2)-(self.waveTotalCost.width/2);//centerTray leveys/2 - tekstin pituus / 2

    }
    function checkOut(selected) {
        if (self.checkoutBtn.getChildAt(0).text == "Checkout"){
            self.cancelCheckout.visible = true;
            self.checkoutBtn.visible = true;
            self.checkoutBtn.getChildAt(0).text = "Buy item";
            self.checkoutBtn.getChildAt(0).x = (self.checkoutBtn.width / 2) - (self.checkoutBtn.getChildAt(0).width / 2);
            shipLines.forEach(function (item) {
                if(item.name != selected.name){
                    item.visible = false;//Tyhjennetään shipLines
                }
                item.getChildAt(item.length - 1).visible = false;
                /*selected.y = 200;*/
            });
            /*reloadLine.getChildAt(2).text = self.waveCreateData[3][0];
             AOELine.getChildAt(2).text = self.waveCreateData[3][1];
             efcTmiLine.getChildAt(2).text = self.waveCreateData[3][2];
             reloadLine.y += 25;
             AOELine.y += 25;
             efcTmiLine.y += 25;
             self.waveTotalCost.y += 25;*/
            checkOutLabel.visible = true;
            /*self.wave1Btn.setFrames(0, 1, 2);
             self.wave2Btn.setFrames(0, 1, 2);
             self.wave3Btn.setFrames(0, 1, 2);*/
            self.checkoutBtn.selected = selected;
        } else {
            // jos pelaajalla ei ole tarpeeksi rahaa
            if(self.playerRelatedData.playerData.money < self.checkoutBtn.selected.price && self.tweenActive == false){
                //do some animation
                var newstyle = { font:'35px calibri', fill:'red'};
                money.setStyle(newstyle);
                self.tweenActive = true;
                var tween = self.game.add.tween(money).to({width:money.width+20,height:money.height+10,x:money.x-10},300,"Linear",true,0,2,true);
                tween.onComplete.add(function(){
                    newstyle = { font:'35px calibri', fill:'black'};
                    money.setStyle(newstyle);
                    self.tweenActive = false;
                },self);
                //jos pelaajalla on tarpeeksi rahaa
            } else if(self.checkoutBtn.selected.price > 0 && self.playerRelatedData.playerData.money >= self.checkoutBtn.selected.price){
                self.playerRelatedData.playerData.money -= self.checkoutBtn.selected.price;
                self.playerRelatedData.shipStats.powers[self.checkoutBtn.selected.name] += 0.25;
                var shipStat = JSON.stringify(self.playerRelatedData.shipStats.powers);
                var saveShipState = $.ajax({
                    method:"POST",
                    url:"PHP/SQLcontroller/updateData.php",
                    data:{
                        usage:7,
                        location:window.location.href,
                        loginFollowID: self.playerRelatedData.loginFollowID,
                        playerName:self.playerRelatedData.playerData.playerName,
                       // shipStats:self.playerRelatedData.shipStats.powers
                        shipStats:shipStat,
                        money:self.playerRelatedData.playerData.money
                    }
                 });
                 saveShipState.done(function(returnValue){
                    alert("Saved successfully");
                    console.log(returnValue);
                 });
                 saveShipState.fail(function(returnData){
                    console.log(returnData);
                    alert("Couldn't create new wave, database unreachable");
                 });
                //console.log(JSON.stringify(self.playerRelatedData.shipStats));
                money.text = self.playerRelatedData.playerData.money;
                self.surroundings.menuheader.getChildAt(2).text = "Money: "+self.playerRelatedData.playerData.money;
                powerSystemEditor(self);
            } else if(self.checkoutBtn.selected.price == 0){
                alert("Can not create empty wave");
            }
        }
    }
}