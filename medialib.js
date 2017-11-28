//Default scale
var scale = 0.5;

var Image = require('imagelib');

function initialize(scaleValue)
{
    scale = scaleValue;
}

function showCamera(callback)
{
    Titanium.Media.showCamera({
    
        success: function(event)
        {
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
            {
                var img = Image.createFromBlob(event.media);	
				var scaled = img.scale(scale);
                callback(scaled);
            }
        },
        
        cancel:function() 
        {
			// called when user cancels taking a picture
		},
        
        error: function(error) 
        {
			// called when there's an error
			var alertDialog = Titanium.UI.createAlertDialog({title: Ti.App.name});
			if (error.code == Titanium.Media.NO_CAMERA) 
            {
				alertDialog.setMessage('O seu dispositivo não possui câmera.');
			} else 
            {
				alertDialog.setMessage('Erro não esperado: ' + error.code);
			}
			alertDialog.show();	
		},
        
		saveToPhotoGallery:true   
    });
}

function showGallery(callback)
{
	Titanium.Media.openPhotoGallery({
		
        success:function(event) 
        {

            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) 
            {				
				var img = Image.createFromBlob(event.media);	
				var scaled = img.scale(scale);
                callback(scaled);
			}	
		}
	});
}



function checkMediaPermissions(callback)
{
    if (Ti.Media.hasCameraPermissions()) 
    {
        callback();
    } 
    else 
    {
        Ti.Media.requestCameraPermissions(function(e) 
        {
            if (e.success)
            {
                callback();  
            }
                      
        });
    }
}

function getPhotoFromCamera(callback)
{
    checkMediaPermissions(function(){
        showCamera(callback);
    });
}

function getPhotoFromGallery(callback)
{
    checkMediaPermissions(function(){
        showGallery(callback);
    });
}

exports.initialize = initialize;
exports.getPhotoFromCamera = getPhotoFromCamera;
exports.getPhotoFromGallery = getPhotoFromGallery;