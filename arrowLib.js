//Requires Cloud reference in Alloy
//Requires util.js library

function checkIfNetworkAvailable(onSuccess,onError)
{
    if (!Ti.Network.online)
    {
        if (typeof onError != "undefined")
        {
            onError();
        }
        else 
        {
            Util.dialog({
                title: Ti.App.name,
                ok: "OK",
                message: "Você não possui uma conexão de internet neste momento. Por favor, verifique que sua conexão está estável e tente novamente."
            });    
        }  
    }
    else
    {
        onSuccess();
    }
}

function cloudErrorTreatment(onError)
{
    if (typeof onError != "undefined")
    {
        onError();    
    }
    else
    {
        return Util.dialog({
            message: 'Sistema indisponível no momento. Tente novamente mais tarde.'
        });     
    }
}

function login(user,password,loadingIndicator,onSuccess)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Users.login({
            login: user,
            password: password
        }, function (e) {
            
            loadingIndicator.hideIndicator();
            
            if (e.success) 
            {
                var userData = e.users[0]; 
                onSuccess(userData);
            }
            else if (e.code == 401 || e.code == 400)
            {
                Util.dialog({
                    title: Ti.App.name,
                    ok: "OK",
                    message: 'CPF ou matrícula inválidos. Por favor, verifique os dados de seu login.'
                });   
            } 
            else 
            { 
                console.log(JSON.stringify(e));
                cloudErrorTreatment();
                
            }    
        });
    });
    
}

function createCustomObject(fields,loadingIndicator,onSuccess,onError)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Objects.create(fields, function (event) 
        {
            loadingIndicator.hideIndicator();
            if (event.success) 
            {
                onSuccess(event[fields.classname][0]);
            }
            else if (event.code == 400 || event.code == 401)
            {
                console.log(JSON.stringify(event));
                Util.dialog({
                    title: Ti.App.name,
                    ok: "OK",
                    message: "Erro: " + event.code + ". Sistema indisponível no momento."
                });              
            }
            else 
            {
                console.log(JSON.stringify(event));
                cloudErrorTreatment();  
            }
        });
    },onError);
}

function updateCustomObject(fields,loadingIndicator,onSuccess,onError)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Objects.update(fields, function (event) 
        {
            loadingIndicator.hideIndicator();
            if (event.success) 
            {
                onSuccess(event[fields.classname][0]);
            }
            else if (event.code == 400 || event.code == 401)
            {
                console.log(JSON.stringify(event));
                Util.dialog({
                    title: Ti.App.name,
                    ok: "OK",
                    message: "Erro: " + event.code + ". Sistema indisponível no momento."
                });              
            }
            else 
            {
                console.log(JSON.stringify(event));
                cloudErrorTreatment(onError);  
            }
        });
    },onError);
}

function updateAllCustomObjects(_fieldsArray,loadingIndicator,i,objectArray,onSuccess,onError)
{
    if (i < _fieldsArray.length)
    {
        updateCustomObject(_fieldsArray[i],loadingIndicator,function(response)
        {
            objectArray.push(response);
            updateAllCustomObjects(_fieldsArray,loadingIndicator,i + 1,objectArray,onSuccess,onError)
        },onError)    
    }
    else
    {
        onSuccess();
    }
}

function queryCustomObjects(fields,loadingIndicator,onSuccess)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Objects.query(fields, function (event) 
        {
            loadingIndicator.hideIndicator();
            if (event.success) 
            {
                onSuccess(event[fields.classname]);
            }
            else 
            {
                console.log(JSON.stringify(event));
                cloudErrorTreatment();  
            }
        });
    });
}

function deleteCustomObject(fields,loadingIndicator,onSuccess)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Objects.remove(fields, function (event) 
        {
            loadingIndicator.hideIndicator();
            if (event.success) 
            {
                onSuccess();
            }
            else 
            {
                console.log(JSON.stringify(event));
                cloudErrorTreatment();  
            }
        });
    });
}

function createPhoto(fields,loadingIndicator,onSuccess)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Photos.create(fields, function (event) 
        {
            loadingIndicator.hideIndicator();
            if (event.success) 
            {
                var photo = event.photos[0];
                onSuccess(photo);
            }
            else if (event.code == 400 || event.code == 401)
            {
                console.log(JSON.stringify(event));
                Util.dialog({
                    title: Ti.App.name,
                    ok: "OK",
                    message: "Erro: " + event.code + ". Sistema indisponível no momento."
                });              
            }
            else 
            {
                cloudErrorTreatment();  
                console.log(JSON.stringify(event));
            }
        });
    });
}

function updatePhoto(fields,loadingIndicator,onSuccess)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Photos.update(fields, function (event) 
        {
            loadingIndicator.hideIndicator();
            if (event.success) 
            {
                var photo = event.photos[0];
                onSuccess(photo);
            }
            else if (event.code == 400 || event.code == 401)
            {
                console.log(JSON.stringify(event));
                Util.dialog({
                    title: Ti.App.name,
                    ok: "OK",
                    message: "Erro: " + event.code + ". Sistema indisponível no momento."
                });              
            }
            else 
            {
                cloudErrorTreatment();  
                console.log(JSON.stringify(event));
            }
        });
    });
}

function updateAllPhotos(_fieldsArray,loadingIndicator,i,photoArray,onSuccess,onError)
{
    if (i < _fieldsArray.length)
    {
        updatePhoto(_fieldsArray[i],loadingIndicator,function(response)
        {
            photoArray.push(response);
            updateAllPhotos(_fieldsArray,loadingIndicator,i + 1,photoArray,onSuccess,onError);
        },onError)    
    }
    else
    {
        onSuccess();
    }
}

function queryPhotos(fields,loadingIndicator,onSuccess)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Photos.query(fields, function (event) 
        {
            loadingIndicator.hideIndicator();
            if (event.success) 
            {
                var photos = event.photos;
                onSuccess(photos);
            } 
            else 
            {
                console.log(JSON.stringify(event));
                cloudErrorTreatment();  
            }
        });
    });
} 

function deletePhoto(fields,loadingIndicator,onSuccess)
{
    checkIfNetworkAvailable(function()
    {
        loadingIndicator.showIndicator();
        Cloud.Photos.remove(fields, function (event) 
        {
            loadingIndicator.hideIndicator();
            if (event.success) 
            {
                onSuccess();
            }
            else if (event.code == 400 || event.code == 401)
            {
                console.log(JSON.stringify(event));
                Util.dialog({
                    title: Ti.App.name,
                    ok: "OK",
                    message: "Erro: " + event.code + ". Sistema indisponível no momento."
                });              
            }
            else 
            {
                console.log(JSON.stringify(event));
                cloudErrorTreatment();  
            }
        });
    });
}

function deleteAllPhotos(_fieldsArray,loadingIndicator,i,onSuccess,onError)
{
    if (i < _fieldsArray.length)
    {
        deletePhoto(_fieldsArray[i],loadingIndicator,function()
        {
            deleteAllPhotos(_fieldsArray,loadingIndicator,i + 1,onSuccess,onError);
        },onError)    
    }
    else
    {
        onSuccess();
    }
}


//Background process: update custom object
function backgroundUpdateCustomObject(fields,onSuccess,onError)
{
    var errorCallback = (typeof onError != "undefined") ? onError : function(){};
    if (Ti.Network.online)
    {
        Cloud.Objects.update(fields, function (event) 
        {
            console.log(JSON.stringify(event));
            if (event.success) 
            {
                onSuccess(event[fields.classname][0]);
            } 
            else
            {
                errorCallback();
            }
        });    
    }
    else
    {
        errorCallback();
    }
}

//Background process: update custom object
function backgroundCreateCustomObject(fields,onSuccess,onError)
{
    var errorCallback = (typeof onError != "undefined") ? onError : function(){};
    if (Ti.Network.online)
    {
        Cloud.Objects.create(fields, function (event) 
        {
            console.log(JSON.stringify(event));
            if (event.success) 
            {
                onSuccess(event[fields.classname][0]);
            } 
            else
            {
                errorCallback();
            }
        });    
    }
    else
    {
        errorCallback();
    }
}

function backgroundCreateAllCustomObjects(_fieldsArray,returnArray,i,onSuccess,onError)
{
    if (i < _fieldsArray.length)
    {
        backgroundCreateCustomObject(_fieldsArray[i],function(objectResponse)
        {
            returnArray.push(objectResponse);
            backgroundCreateAllCustomObjects(_fieldsArray,returnArray,(i + 1),onSuccess,onError); 
            
        },onError);    
    }
    else
    {
        onSuccess();
    }
}

function backgroundUpdateAllCustomObjects(_fieldsArray,i,onSuccess,onError)
{
    if (i < _fieldsArray.length)
    {
        backgroundUpdateCustomObject(_fieldsArray[i],function(){
            backgroundUpdateAllCustomObjects(_fieldsArray,(i + 1),onSuccess,onError);    
        },onError);    
    }
    else
    {
        onSuccess();
    }
}

function backgroundDeletePhoto(id,onSuccess,onError)
{
    var errorCallback = (typeof onError != "undefined") ? onError : function(){};
    if (Ti.Network.online)
    {
        Cloud.Photos.remove({
            photo_id: id
        }, function (event) 
        {
            console.log(JSON.stringify(event));
            if (event.success) 
            {
                onSuccess();
            } 
            else
            {
                errorCallback();
            }
        });
    }
    else
    {
        errorCallback();
    }
}

function backgroundDeleteAllPhotos(_fieldsArray,i,onSuccess,onError)
{
    if (i < _fieldsArray.length)
    {
        backgroundDeletePhoto(_fieldsArray[i],function(){
            backgroundDeleteAllPhotos(_fieldsArray,(i + 1),onSuccess,onError);    
        },onError);    
    }
    else
    {
        onSuccess();
    }
}

function backgroundCreatePhoto(fields,onSuccess,onError)
{
    var errorCallback = (typeof onError != "undefined") ? onError : function(){};
    if (Ti.Network.online)
    {
        Cloud.Photos.create(fields, function (event) 
        {
            console.log("Creating photo: " + JSON.stringify(fields));
            console.log(JSON.stringify(event));
            if (event.success) 
            {
                var photo = event.photos[0];
                photo.photo = fields.photo;
                onSuccess(photo);
            } 
            else
            {
                errorCallback(); 
            }
        });    
    }
    else 
    {
        errorCallback();    
    }
}

function backgroundCreateAllPhotos(_fieldsArray,i,photoArray,onSuccess,onError)
{
    if (i < _fieldsArray.length) 
    {
        backgroundCreatePhoto(_fieldsArray[i],function(createdPhoto){
            photoArray.push(createdPhoto);
            backgroundCreateAllPhotos(_fieldsArray,(i + 1),photoArray,onSuccess,onError);    
        },onError);    
    }
    else
    {
        onSuccess();
    }
}


exports.login = login;

exports.createCustomObject = createCustomObject;
exports.updateCustomObject = updateCustomObject;
exports.queryCustomObjects = queryCustomObjects;
exports.deleteCustomObject = deleteCustomObject;
exports.updateAllCustomObjects = updateAllCustomObjects;

exports.createPhoto = createPhoto;
exports.queryPhotos = queryPhotos;
exports.deletePhoto = deletePhoto;
exports.updatePhoto = updatePhoto;
exports.updateAllPhotos = updateAllPhotos;
exports.deleteAllPhotos = deleteAllPhotos;

//Background processes
exports.backgroundUpdateCustomObject = backgroundUpdateCustomObject;
exports.backgroundUpdateAllCustomObjects = backgroundUpdateAllCustomObjects;
exports.backgroundDeletePhoto = backgroundDeletePhoto;
exports.backgroundDeleteAllPhotos = backgroundDeleteAllPhotos;
exports.backgroundCreatePhoto = backgroundCreatePhoto;
exports.backgroundCreateAllPhotos = backgroundCreateAllPhotos;
exports.backgroundCreateCustomObject = backgroundCreateCustomObject;
exports.backgroundCreateAllCustomObjects = backgroundCreateAllCustomObjects;