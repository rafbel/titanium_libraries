//cria arquivo se não existir e escreve JSON
function writeJSONFile(object,fileName)
{
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,fileName);
    var fileData = JSON.stringify(object);

    file.write(fileData,false);
}

//Pega JSON do arquivo
//Retorna falso caso não seja um arquivo JSON válido
function readJSONFile(fileName)
{
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,fileName);
    
    if (file.exists())
    {
        var fileContent = file.read().toString();
        var object;

        //Checa se é um JSON válido
        try
        {
            object = JSON.parse(fileContent);  
        }
        catch (exception)
        {
            console.log("Invalid JSON content in file: " + fileName);
            return false;
        }

        return object;
    }
    
    return false;
}

function deleteFile(fileName)
{
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,fileName);
    
    if (file.exists())
    {
        return file.deleteFile();    
    }
    
    return false;
}

function checkIfFileExists(fileName)
{
   var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,fileName);
    
   return file.exists();
}

exports.writeJSONFile = writeJSONFile;
exports.readJSONFile = readJSONFile;
exports.deleteFile = deleteFile;
exports.checkIfFileExists = checkIfFileExists;