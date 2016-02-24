function query (Oil, coal, metals) {
	this.Oil = Oil;
	this.coal = coal;
	this.metals = metals;
}

function randMult(rand, oilMul, coalMul, metalMul) {
    this.rand = Math.floor(Math.random() * 10);
    this.oilMul = 0.5 + Math.random();
    this.coalMul = 0.5 + Math.random();
    this.metalMul = 0.5 + Math.random();
}

function alerts (sp, cp, gp) {
    message += " Price fluctuations: ";
    noFluc = true;
    if (sp > 1.2*(300000 / Oil)) {
        message += "Oil prices are rising. "
        noFluc = false;
    };
    if (sp < 0.8*(300000 / Oil)) {
        message += "Oil prices are dropping. "
        noFluc = false;
    };
    if (cp > 1.2*(300000 / coal)) {
        message += "Coal prices are rising. "
        noFluc = false;
    };
    if (cp < 0.8*(300000 / coal)) {
        message += "Coal prices are dropping. "
        noFluc = false;
    };

    if (gp > 1.2*(200000 / metals)) {
        message += "Metals prices are rising. ";
        noFluc = false;
    };
    if (gp < 0.8*(200000 / metals)) {
        message += "Metals prices are dropping.";
        noFluc = false;
    };
    if(noFluc) {
        message += "Nothing significant.";
    };

    return message;
}

var x = 1000;
var message = "Market report: nothing significant.";
document.getElementById("cash").innerHTML = x + '$';

var Oil = 500;
var myoil = 0;
var oilPrice = 300000 / Oil;
document.getElementById("oilMarket").innerHTML = Oil;
document.getElementById("oilStorage").innerHTML = myoil;
document.getElementById("oilPrice").innerHTML = oilPrice + '$';
document.getElementById("oiPrice").innerHTML = oilPrice + '$';

var coal = 10000;
var mycoal = 0;
var coalPrice = 300000 / coal;
document.getElementById("coalMarket").innerHTML = coal;
document.getElementById("coalStorage").innerHTML = mycoal;
document.getElementById("coalPrice").innerHTML = coalPrice + '$';
document.getElementById("coaPrice").innerHTML = coalPrice + '$';

var metals = 4000;
var mymetals = 0;
var metalsPrice = 200000 / metals;
document.getElementById("metalsMarket").innerHTML = metals;
document.getElementById("metalsStorage").innerHTML = mymetals;
document.getElementById("metalsPrice").innerHTML = metalsPrice + '$';
document.getElementById("metalPrice").innerHTML = metalsPrice + '$';

document.getElementById("marketAlerts").innerHTML =  message;

window.alert("Welcome to Global Market! That's the place where you can make a good profit." +  
    " Just remember that every day you have to pay 100$ to the brockers and 13% of your money as a tax. " + 
    "If you have negative amount of money at the end of the day, you are a bancrupt which means game over! Good luck.");

function tradeStuff(a) {
	var tradeQuery; //= new query(0, 0, 0);
	if (a == 1) {
		tradeQuery = new query(document.getElementById('buyoil').value, document.getElementById('buycoal').value, document.getElementById('buymetals').value);
        if (tradeQuery.Oil < 0 || tradeQuery.coal < 0 || tradeQuery.metals < 0) {
            window.alert("You can't buy negative amount of goods!");
            return;
        };

        if (Oil >= tradeQuery.Oil && coal >= tradeQuery.coal && metals >= tradeQuery.metals) {
            Oil = Oil - a*tradeQuery.Oil;
            myoil = myoil -  a*-tradeQuery.Oil;
            coal = coal - a*tradeQuery.coal;
            mycoal = mycoal - a*-tradeQuery.coal;
            metals = metals - a*tradeQuery.metals;
            mymetals = mymetals - a*-tradeQuery.metals;
        }

        else {
            window.alert ("You are trying to buy more goods than available for sale!")
            return;
        };
        
	}
	else if (a == -1){
		tradeQuery = new query(document.getElementById('selloil').value, document.getElementById('sellcoal').value, document.getElementById('sellmetals').value);
        if (tradeQuery.Oil < 0 || tradeQuery.coal < 0 || tradeQuery.metals < 0) {
            window.alert("You can't sell negative amount of goods!");
            return;
        };

        if (myoil >= tradeQuery.Oil && mycoal >= tradeQuery.coal && mymetals >= tradeQuery.metals) {
            Oil = Oil - a*tradeQuery.Oil;
            myoil = myoil -  a*-tradeQuery.Oil;
            coal = coal - a*tradeQuery.coal;
            mycoal = mycoal - a*-tradeQuery.coal;
            metals = metals - a*tradeQuery.metals;
            mymetals = mymetals - a*-tradeQuery.metals;
        }
        else {
            window.alert ("You are trying to sell more goods than you have for sale!")
            return;
        };
	}
    
    document.getElementById("oilMarket").innerHTML = Oil;
    document.getElementById("coalMarket").innerHTML = coal;
    document.getElementById("metalsMarket").innerHTML = metals;

    document.getElementById("oilStorage").innerHTML = myoil;
    document.getElementById("coalStorage").innerHTML = mycoal;
    document.getElementById("metalsStorage").innerHTML = mymetals;

    x = x - a*(tradeQuery.Oil * oilPrice + tradeQuery.coal * coalPrice + tradeQuery.metals * metalsPrice);
    document.getElementById("cash").innerHTML = (Math.round(x * 100)/100).toFixed(2) + '$';

}

function nextTurn() {
    if (x < 0) {
        window.alert("You are a bancrupt!");
        document.getElementById("selloil").value = 0;
        document.getElementById("sellcoal").value = 0;
        document.getElementById("sellmetals").value = 0;
        document.getElementById("buyoil").value = 0;
        document.getElementById("buycoal").value = 0;
        document.getElementById("buymetals").value = 0;

        location.reload();
    };

    var random = new randMult(0, 0, 0, 0);

    switch(random.rand) {
        case 0:
        case 1: 
            Oil = Oil + Math.floor(Math.random() * 50);
            oilPrice = Math.round((300000 / Oil)*random.oilMul*100)/100;
            document.getElementById("oilPrice").innerHTML = oilPrice + '$';
            document.getElementById("oiPrice").innerHTML = oilPrice + '$';
            document.getElementById("oilMarket").innerHTML = Oil;
            message = "Market report: Oil supply is abundant. Coal and Metal industries are not doing so well.";
            break;

        case 2:
        case 3:
            coal = coal + Math.floor(Math.random() * 300);
            coalPrice = Math.round((300000 / coal)*random.coalMul*100)/100;
            document.getElementById("coalPrice").innerHTML = coalPrice + '$';
            document.getElementById("coaPrice").innerHTML = coalPrice + '$';
            document.getElementById("coalMarket").innerHTML = coal;

            message = "Market report: Coal supply is abundant. Oil and Metal industries are not doing so well.";
            break;

        case 4:
        case 5:
            metals = metals + Math.floor(Math.random() * 200);
            metalsPrice = Math.round((200000 / metals)*random.metalMul*100)/100;
            document.getElementById("metalsPrice").innerHTML = metalsPrice + '$';
            document.getElementById("metalPrice").innerHTML = metalsPrice + '$';
            document.getElementById("metalsMarket").innerHTML = metals;

            message = "Market report: Metals supply is abundant. Coal and Oil industries are not doing so well.";

            break;

        case 6:
        case 7:
            Oil = Oil + Math.floor(Math.random() * 30);
            coal = coal + Math.floor(Math.random() * 300);
            metals = metals + Math.floor(Math.random() * 150);
            oilPrice = Math.round((300000 / Oil)*random.oilMul*100)/100;
            coalPrice = Math.round((300000 / coal)*random.coalMul*100)/100;
            metalsPrice = Math.round((200000 / metals)*random.metalMul*100)/100;
            document.getElementById("oilPrice").innerHTML = oilPrice + '$';
            document.getElementById("oiPrice").innerHTML = oilPrice + '$';
            document.getElementById("coalPrice").innerHTML = coalPrice + '$';
            document.getElementById("coaPrice").innerHTML = coalPrice + '$';
            document.getElementById("metalsPrice").innerHTML = metalsPrice + '$';
            document.getElementById("metalPrice").innerHTML = metalsPrice + '$';
            document.getElementById("metalsMarket").innerHTML = metals;
            document.getElementById("coalMarket").innerHTML = coal;
            document.getElementById("oilMarket").innerHTML = Oil;
            message = "Market report: Supply of all types of goods grows steadily.";
            break;


        case 8:
        case 9:
            Oil = Oil - Math.floor(Math.random() * 30);
            coal = coal - Math.floor(Math.random() * 300);
            metals = metals - Math.floor(Math.random() * 150);
            oilPrice = Math.round((300000 / Oil)*random.oilMul*100)/100;
            coalPrice = Math.round((300000 / coal)*random.coalMul*100)/100;
            metalsPrice = Math.round((200000 / metals)*random.metalMul*100)/100;
            document.getElementById("oilPrice").innerHTML = oilPrice + '$';
            document.getElementById("oiPrice").innerHTML = oilPrice + '$';
            document.getElementById("coalPrice").innerHTML = coalPrice + '$';
            document.getElementById("coaPrice").innerHTML = coalPrice + '$';
            document.getElementById("metalsPrice").innerHTML = metalsPrice + '$';
            document.getElementById("metalPrice").innerHTML = metalsPrice + '$';
            document.getElementById("metalsMarket").innerHTML = metals;
            document.getElementById("coalMarket").innerHTML = coal;
            document.getElementById("oilMarket").innerHTML = Oil;

            message = "Market report: Supply of all types of goods drops.";
            break;
    }

    document.getElementById("marketAlerts").innerHTML = alerts(oilPrice, coalPrice, metalsPrice);

    var tax = x * 0.13;
    x = x - 100 - tax;
    document.getElementById("cash").innerHTML = (Math.round(x * 100)/100).toFixed(2) + '$';
    document.getElementById("selloil").value = 0;
    document.getElementById("sellcoal").value = 0;
    document.getElementById("sellmetals").value = 0;
    document.getElementById("buyoil").value = 0;
    document.getElementById("buycoal").value = 0;
    document.getElementById("buymetals").value = 0;

}

