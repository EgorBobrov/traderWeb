function query (slaves, cotton, guns) {
	this.slaves = slaves;
	this.cotton = cotton;
	this.guns = guns;
}

function randMult(rand, slMul, cotMul, gunMul) {
    this.rand = Math.floor(Math.random() * 10);
    this.slMul = Math.random() * 2;
    this.cotMul = Math.random() * 2;
    this.gunMul = Math.random() * 2;
}

function alerts (sp, cp, gp) {
    message = "Price fluctuations: ";
    noFluc = true;
    if (sp > 1.2*(30000 / slaves)) {
        message += "Slaves prices are rising. "
        noFluc = false;
    };
    if (sp < 0.8*(30000 / slaves)) {
        message += "Slaves prices are dropping. "
        noFluc = false;
    };
    if (cp > 1.2*(30000 / cotton)) {
        message += "Cotton prices are rising. "
        noFluc = false;
    };
    if (cp < 0.8*(30000 / cotton)) {
        message += "Cotton prices are dropping. "
        noFluc = false;
    };

    if (gp > 1.2*(20000 / guns)) {
        message += "Guns prices are rising. ";
        noFluc = false;
    };
    if (gp < 0.8*(20000 / guns)) {
        message += "Guns prices are dropping.";
        noFluc = false;
    };
    if(noFluc) {
        message += "Nothing significant.";
    };

    window.alert(message);
}

var x = 1000;
document.getElementById("cash").innerHTML = x + '$';

var slaves = 50;
var mySlaves = 0;
var slavesPrice = 30000 / slaves;
document.getElementById("slavesMarket").innerHTML = slaves;
document.getElementById("slavesStorage").innerHTML = mySlaves;
document.getElementById("slavesPrice").innerHTML = slavesPrice + '$';
document.getElementById("slavePrice").innerHTML = slavesPrice + '$';

var cotton = 1000;
var myCotton = 0;
var cottonPrice = 30000 / cotton;
document.getElementById("cottonMarket").innerHTML = cotton;
document.getElementById("cottonStorage").innerHTML = myCotton;
document.getElementById("cottonPrice").innerHTML = cottonPrice + '$';
document.getElementById("cottoPrice").innerHTML = cottonPrice + '$';

var guns = 400;
var myGuns = 0;
var gunsPrice = 20000 / guns;
document.getElementById("gunsMarket").innerHTML = guns;
document.getElementById("gunsStorage").innerHTML = myGuns;
document.getElementById("gunsPrice").innerHTML = gunsPrice + '$';
document.getElementById("gunPrice").innerHTML = gunsPrice + '$';

function tradeStuff(a) {
	var tradeQuery; //= new query(0, 0, 0);
	if (a == 1) {
		tradeQuery = new query(document.getElementById('buySlaves').value, document.getElementById('buyCotton').value, document.getElementById('buyGuns').value);
        if (tradeQuery.slaves < 0 || tradeQuery.cotton < 0 || tradeQuery.guns < 0) {
            window.alert("You can't buy negative amount of goods!");
            return;
        };

        if (slaves >= tradeQuery.slaves && cotton >= tradeQuery.cotton && guns >= tradeQuery.guns) {
            slaves = slaves - a*tradeQuery.slaves;
            mySlaves = mySlaves -  a*-tradeQuery.slaves;
            cotton = cotton - a*tradeQuery.cotton;
            myCotton = myCotton - a*-tradeQuery.cotton;
            guns = guns - a*tradeQuery.guns;
            myGuns = myGuns - a*-tradeQuery.guns;
        }

        else {
            window.alert ("You are trying to buy more goods than available for sale!")
            return;
        };
        
	}
	else if (a == -1){
		tradeQuery = new query(document.getElementById('sellSlaves').value, document.getElementById('sellCotton').value, document.getElementById('sellGuns').value);
        if (tradeQuery.slaves < 0 || tradeQuery.cotton < 0 || tradeQuery.guns < 0) {
            window.alert("You can't sell negative amount of goods!");
            return;
        };

        if (mySlaves >= tradeQuery.slaves && myCotton >= tradeQuery.cotton && myGuns >= tradeQuery.guns) {
            slaves = slaves - a*tradeQuery.slaves;
            mySlaves = mySlaves -  a*-tradeQuery.slaves;
            cotton = cotton - a*tradeQuery.cotton;
            myCotton = myCotton - a*-tradeQuery.cotton;
            guns = guns - a*tradeQuery.guns;
            myGuns = myGuns - a*-tradeQuery.guns;
        }
        else {
            window.alert ("You are trying to sell more goods than you have for sale!")
            return;
        };
	}
    
    document.getElementById("slavesMarket").innerHTML = slaves;
    document.getElementById("cottonMarket").innerHTML = cotton;
    document.getElementById("gunsMarket").innerHTML = guns;

    document.getElementById("slavesStorage").innerHTML = mySlaves;
    document.getElementById("cottonStorage").innerHTML = myCotton;
    document.getElementById("gunsStorage").innerHTML = myGuns;

    x = x - a*(tradeQuery.slaves * slavesPrice + tradeQuery.cotton * cottonPrice + tradeQuery.guns * gunsPrice);
    document.getElementById("cash").innerHTML = x + '$';

}

function nextTurn() {
    if (x < 0) {
        window.alert("You are a bancrupt!");
        location.reload();
    };

    var random = new randMult(0, 0, 0, 0);

    switch(random.rand) {
        case 0:
        case 1: 
            slaves = slaves + Math.floor(Math.random() * 5);
            slavesPrice = (30000 / slaves)*random.slMul;
            document.getElementById("slavesPrice").innerHTML = slavesPrice + '$';
            document.getElementById("slavePrice").innerHTML = slavesPrice + '$';
            document.getElementById("slavesMarket").innerHTML = slaves;
            window.alert("Slaves supply is abundant this week. Cotton and gun industry are not doing so well.");
            break;

        case 2:
        case 3:
            cotton = cotton + Math.floor(Math.random() * 30);
            cottonPrice = (30000 / cotton)*random.cotMul;
            document.getElementById("cottonPrice").innerHTML = cottonPrice + '$';
            document.getElementById("cottoPrice").innerHTML = cottonPrice + '$';
            document.getElementById("cottonMarket").innerHTML = cotton;

            window.alert("Cotton supply is abundant this week. Slaves and gun industry are not doing so well.");
            break;

        case 4:
        case 5:
            guns = guns + Math.floor(Math.random() * 20);
            gunsPrice = (20000 / guns)*random.gunMul;
            document.getElementById("gunsPrice").innerHTML = gunsPrice + '$';
            document.getElementById("gunPrice").innerHTML = gunsPrice + '$';
            document.getElementById("gunsMarket").innerHTML = guns;

            window.alert("Guns supply is abundant this week. Cotton and slaves industry are not doing so well.");

            break;

        case 6:
        case 7:
            slaves = slaves + Math.floor(Math.random() * 3);
            cotton = cotton + Math.floor(Math.random() * 30);
            guns = guns + Math.floor(Math.random() * 15);
            slavesPrice = (30000 / slaves)*random.slMul;
            cottonPrice = (30000 / cotton)*random.cotMul;
            gunsPrice = (20000 / guns)*random.gunMul;
            document.getElementById("slavesPrice").innerHTML = slavesPrice + '$';
            document.getElementById("slavePrice").innerHTML = slavesPrice + '$';
            document.getElementById("cottonPrice").innerHTML = cottonPrice + '$';
            document.getElementById("cottoPrice").innerHTML = cottonPrice + '$';
            document.getElementById("gunsPrice").innerHTML = gunsPrice + '$';
            document.getElementById("gunPrice").innerHTML = gunsPrice + '$';
            document.getElementById("gunsMarket").innerHTML = guns;
            document.getElementById("cottonMarket").innerHTML = cotton;
            document.getElementById("slavesMarket").innerHTML = slaves;
            window.alert("Supply of all types of goods grows steadily.");
            break;


        case 8:
        case 9:
            slaves = slaves + Math.floor(Math.random() * 2);
            cotton = cotton + Math.floor(Math.random() * 20);
            guns = guns + Math.floor(Math.random() * 10);
            slavesPrice = (30000 / slaves)*random.slMul;
            cottonPrice = (30000 / cotton)*random.cotMul;
            gunsPrice = (20000 / guns)*random.gunMul;
            document.getElementById("slavesPrice").innerHTML = slavesPrice + '$';
            document.getElementById("slavePrice").innerHTML = slavesPrice + '$';
            document.getElementById("cottonPrice").innerHTML = cottonPrice + '$';
            document.getElementById("cottoPrice").innerHTML = cottonPrice + '$';
            document.getElementById("gunsPrice").innerHTML = gunsPrice + '$';
            document.getElementById("gunPrice").innerHTML = gunsPrice + '$';
            document.getElementById("gunsMarket").innerHTML = guns;
            document.getElementById("cottonMarket").innerHTML = cotton;
            document.getElementById("slavesMarket").innerHTML = slaves;

            window.alert("Supply of all types of goods grows slightly.");
            break;
    }

    var al = new alerts(slavesPrice, cottonPrice, gunsPrice);

}

