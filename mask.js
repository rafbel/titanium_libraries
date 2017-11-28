
//DD/MM/AAAA
function maskDate(dateString)
{
    var maskedDate = dateString.replace(/D/g,"");
    if (maskedDate.split('/').length < 3)
    {
        maskedDate = maskedDate.replace(/(\d{2})(\d)/,"$1/$2");    
    }
    
    return maskedDate.slice(0,10);
}


function maskTel(telString)
{
    var maskedTel = telString.replace(/D/g,"");
    maskedTel = maskedTel.replace(/^(\d\d)(\d)/g,"($1) $2");
    maskedTel = maskedTel.replace(/(\d{4})(\d)/,"$1-$2");
    
    return maskedTel.slice(0,14);
    
}

function maskCel(celString)
{
    var maskedCel = celString.replace(/D/g,"");
    maskedCel = maskedCel.replace(/^(\d\d)(\d)/g,"($1) $2");
    maskedCel = maskedCel.replace(/(\d{5})(\d)/,"$1-$2");
    
    return maskedCel.slice(0,15);
    
}

exports.maskDate = maskDate;
exports.maskTel = maskTel;
exports.maskCel = maskCel;

