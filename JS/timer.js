
function blaa() {
    var toCompare = [ "L", "u", "e", "J", "'", "A", "f", "r", "W", "6" ];
    var match = 0;
    for (var k = 0; k <= 100000;k++){
        var possible = "b8EFGHdefMNTUXYZVghiOC#¤%KaIJP)=?@56opA£QRL\"&WtSjklmyncu/(\$\^\*\'vw34sxD79Bqrz012\!";
        var length = 10;
        toPick = [];
        randString = [];
        for(var j = 0;j < length;j++){
            toPick = [];
            for(var i = 0;i < length;i++){
                toPick.push(possible.charAt(rnd.integerInRange(0,possible.length-1)));
            }
            randString.push(rnd.pick(toPick));
        }

        //compare
        for(var l = 0; l < 10;l++){
            if(randString[l] == toCompare[l]){
                if(i == 9){
                    match++;
                }
            } else {
                l = 10;
            }
        }
    }
	postMessage(match);
}
blaa();

/*var possible = "b8EFGHdefMNTUXYZVghiOC#¤%KaIJP)=?@56opA£QRL\"&WtSjklmyncu/(\$\^\*\'vw34sxD79Bqrz012\!";
var length = 10;
toPick = [];
randString = [];
for(var j = 0;j < length;j++){
	toPick = [];
	for(var i = 0;i < length;i++){
		toPick.push(possible.chatAr(rnd.interInRange(0,79)));
	}
	randString.push(rnd.pick(toPick));
}*/
//


