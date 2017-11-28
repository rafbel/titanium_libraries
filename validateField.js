function validateName(name,fieldName)
{
    var splitName = name.split(" ");
    
    //Um espaço no começo
    if (name.indexOf(" ") == 0)
    {
        Util.dialog({
            message: fieldName + " inválido. Nome não pode começar com espaço."
        });
        return false;
    }
    //Dois espaços
    else if(name.indexOf("  ") != -1)
    {
        Util.dialog({
            message: fieldName + " inválido. Nome não pode possuir dois espaços."
        });
        return false;
    }
    //3 Carateres repetidos 
    else if ((/(.)\1\1/).test(name.toUpperCase()))
    {
        Util.dialog({
            message: fieldName + " inválido. Nome não pode conter mais que três letras iguais consecutivas."
        });
        return false;
    }
    //Primeira parte do nome deve ter no mínimo 2 letras
    else if (splitName[0].length < 2)
    {
        Util.dialog({
            message: fieldName + " inválido. A primeira parte do nome deve ter pelo menos duas letras."
        });
        return false;    
    }
    //Não pode ter mais de 2 letras isoladas (abreviações) em sequência
    var repeatedAbbreviationFlag = false;
    
    for (var i = 1; i < splitName.length; i++)
    {
        if (splitName[i].length == 1)
        {
            if (repeatedAbbreviationFlag)
            {
                Util.dialog({
                    message: fieldName + " inválido. A primeira parte do nome deve ter pelo menos duas letras."
                });
                return false;
            }
            repeatedAbbreviationFlag = true;
        }
        else
        {
            repeatedAbbreviationFlag = false;
        }
    }
    
    return true;
}

function validateEmail(email) 
{
    if (!email) 
    {
        return false;
    }

    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
}

function validateDate(date)
{
    var pattern = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
                                              
    return pattern.test(date);
}

function validateNumber(number)
{
    var regex = /^\d+$/;
    return regex.test(number);
}

function validateCPF (c) 
{
  
  if((c = c.replace(/[^\d]/g,"")).length != 11)
    return false;
  
  if (c == "00000000000")
    return false;
    
  var r;
  var s = 0;   
  
  for (i=1; i<=9; i++)
    s = s + parseInt(c[i-1]) * (11 - i); 

  r = (s * 10) % 11;

  if ((r == 10) || (r == 11)) 
    r = 0;

  if (r != parseInt(c[9]))
    return false;

  s = 0;

  for (i = 1; i <= 10; i++)
    s = s + parseInt(c[i-1]) * (12 - i);

  r = (s * 10) % 11;

  if ((r == 10) || (r == 11)) 
    r = 0;

  if (r != parseInt(c[10]))
    return false;

  return true;
}

function validateCNPJ(str) 
{
 
    str = str.replace('.','');
    str = str.replace('.','');
    str = str.replace('.','');
    str = str.replace('-','');
    str = str.replace('/','');
    cnpj = str;
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15)
        return false;
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1))
    {
        digitos_iguais = 0;
        break;
    }
    if (!digitos_iguais)
    {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--)
        {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    
    return false;
    
}

exports.validateName = validateName;
exports.validateEmail = validateEmail;
exports.validateDate = validateDate;
exports.validateNumber = validateNumber;
exports.validateCPF = validateCPF;
exports.validateCNPJ = validateCNPJ;