function dialog(object) 
{
    var defaultAlert = {
        message: "Alert!",
        ok: "OK",
        title:  Ti.App.name
    };

    if (object) {
        if (!object.hasOwnProperty('message')) {
            object.message = defaultAlert.message;
        }

        if (!object.hasOwnProperty('ok')) {
            object.ok = defaultAlert.ok;
        }

        if (!object.hasOwnProperty('title')) {
            object.title = defaultAlert.title;
        }
    } else {
        object = defaultAlert;
    }

    var dialog = Ti.UI.createAlertDialog(object);
    dialog.show();
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printObject(object, tabCount) {
    if (!tabCount) {
        tabCount = 0;
    }

    var tabs = '';
    for (var i = 0; i < tabCount; i++) {
        tabs = tabs + '    ';
    }

    for (k in object) {
        if (object.hasOwnProperty(k)) {
            if (typeof(object[k]) == 'object') {
                console.log('|' + tabs + k + ': {');
                printObject(object[k], tabCount + 1);
                console.log('|' + tabs + '}');
            } else {
                console.log('|' + tabs + k + ': ' + object[k]);
            }
        }
    }
}

function formatDate(date)
{
    return date.slice(0,2) + "/" + date.slice(2,4) + "/" + date.slice(4,8);
}

function removeWhiteSpaces(str)
{
    return str.replace(/\s/g, ""); 
}

function removeBarFromDate(date)
{
    var splitDate = date.split("/");
    return (splitDate[0] + splitDate[1] + splitDate[2]);
}

function extractNumber(numberString)
{
    return numberString.replace(/\D/g,'');
}

function displayBigString(s) {
    var chunkSize = 32;

    var length = s.length;

    for (var i = 0; i < length; i += chunkSize) {
        console.log(s.substring(i, Math.min(length, i + chunkSize)));
    }
}

//Funciona para dd/MM/aaaa
function getDateDifference(dateString)
{
    var todaysDate = new Date();
    var splitDateString = dateString.split("/");
    var date = new Date(splitDateString[2],splitDateString[1] - 1, splitDateString[0]);

    return new Date (todaysDate - date);
}

function getPlatformWidth(fraction) {
    fraction = (typeof fraction === 'undefined') ? 100 : fraction;
    fraction /= 100.0;

    var width = Titanium.Platform.displayCaps.platformWidth;

    // Titanium.Platform.displayCaps.platformWidth é 'px' em Android e 'dp' em iOS. Compensar isso (quero 'dp')
    if (!OS_IOS) {
        width /= parseFloat(Ti.Platform.displayCaps.logicalDensityFactor);
    }

    return width * fraction;
};

function getPlatformHeight(fraction) {
    fraction = (typeof fraction === 'undefined') ? 100 : fraction;
    fraction /= 100.0;

    var height = Titanium.Platform.displayCaps.platformHeight;

    // Titanium.Platform.displayCaps.platformHeight é 'px' em Android e 'dp' em iOS. Compensar isso (quero 'dp')
    if (!OS_IOS) {
        height /= parseFloat(Ti.Platform.displayCaps.logicalDensityFactor);
    }

    return height * fraction;
};

function sortArrayAlphabetically(array)
{
    if (array.length > 0)
    {
        array.sort(function(a, b)
        {
             var nameA = a.toUpperCase(), nameB=b.toUpperCase();
             if (nameA < nameB) //sort string ascending
              return -1;

             if (nameA > nameB)
              return 1;

             return 0; //default return value (no sorting)
        });

    }
}

function sortJSONArrayByAttribute(array,attribute)
{
    if (array.length > 0)
    {
        array.sort(function(a, b)
        {
             var nameA = ((a[attribute]).toString()).toUpperCase(), nameB= ((b[attribute]).toString()).toUpperCase();
             if (nameA < nameB) //sort string ascending
              return -1;

             if (nameA > nameB)
              return 1; 

             return 0; //default return value (no sorting)
        });

    }
}

function displayAtScreenBottom(view,used,toUse)
{
    if (getPlatformHeight() > (used + toUse) ) 
    {
        var newTop = getPlatformHeight() - (OS_IOS ? 60 : (50 + 24)) - used - toUse;
        view.setTop(newTop);
    }
}


exports.getPlatformWidth = getPlatformWidth;
exports.getPlatformHeight = getPlatformHeight;
exports.dialog = dialog;
exports.printObject = printObject;
exports.displayBigString = displayBigString;
exports.getRandomInt = getRandomInt;
exports.formatDate = formatDate;
exports.removeWhiteSpaces = removeWhiteSpaces;
exports.removeBarFromDate = removeBarFromDate;
exports.extractNumber = extractNumber;
exports.sortArrayAlphabetically = sortArrayAlphabetically;
exports.sortJSONArrayByAttribute = sortJSONArrayByAttribute;
exports.getDateDifference = getDateDifference;
exports.displayAtScreenBottom = displayAtScreenBottom;

exports.cDateToString = function(dateString){

    var compString = dateString.replace("+0000","Z");
    var date = new Date(compString);
    //  date =new Date(date.toISOString());
    date.setHours(date.getHours() - 3);
    //  var iso =  date.toISOString();
    var month = date.getMonth() + 1;
    if (month < 10) {month = "0" + month;}
    //  alert(date.toISOString());
    // d= new Date();
    alert(date.toISOString() + " " +  date.getDate(), date.toString());
    return date.getDate() + "." + month  + "." + date.getFullYear();
};

