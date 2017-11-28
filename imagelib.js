// function Image(width, height, file) {
function Image(file) {
	
	this.aspectRatio = function() {
		return this.width / this.height;
	};
	
	this.adjustByWidth = function(width_) {
		return width_ / this.aspectRatio(); 
	};
	
	this.adjustByHeight = function(height_) {
		return height_ * this.aspectRatio();
	};
		
	this.crop = function(anchorX, anchorY, width_, height_) {
		var croppedImage; 
		
		var trueAnchorX = - anchorX + this.width;
		var trueAnchorY = - anchorY + this.height;
		
		if (arguments.length == 3) {
			croppedImage = this.media.imageAsCropped({
				width: width_,
				height: this.adjustByWidth(width_),
				x: anchorX,
				y: anchorY,
			});
		} else {
			croppedImage = this.media.imageAsCropped({
				width: width_,
				height: height_,
				x: anchorX,
				y: anchorY,
			});
		}
			
		var imageObject = Image.createFromBlob(croppedImage);
		
		return imageObject;
	};
	
	this.cropByWidth = function(anchorX, anchorY, width_) {
		return this.crop(anchorX, anchorY, width_, this.adjustByWidth(width_));
	};
	
	this.cropByHeight = function(anchorX, anchorY, height_) {
		return this.crop(anchorX, anchorY, this.adjustByHeight(height_), height_);
	};
	
	this.scale = function(ratioX, ratioY) {
		var newWidth = this.width;
		var newHeight = this.height;
		
		if (arguments.length == 1) {
			newWidth *= ratioX;
			newHeight *= ratioX;
		} else {
			newWidth = this.width * ratioX;
			newHeight = this.height * ratioY;
		}
		
		var scaledImage = this.media.imageAsResized(newWidth, newHeight);
		
		var imageObject = Image.createFromBlob(scaledImage);
		
		return imageObject;
	};
	
	this.getView = function(width_, height_) {
		var imageView = Ti.UI.createImageView({
			image: this.imageFileHandle,
			width: width_,
			height: height_,
		});				
		
		return imageView;
	};
	
	this.getViewByWidth = function(width_) {
		return this.getView(width_, this.adjustByWidth(width_));
	};
	
	this.getViewByHeight = function(height_) {		
		return this.getView(this.adjustByHeight(height_), height_);		
	};
	
	this.getViewByBoundingBox = function(boxWidth, boxHeight) {
		// Start supposing width is supposed to be matched (naive)		
		var newHeight = this.adjustByWidth(boxWidth);
		
		// Wrong inference :( try again!
		if (newHeight > boxHeight) {
			return this.getViewByHeight(boxHeight);
		} else {
			return this.getViewByWidth(boxWidth);
		}
	};
	
	this.toBase64 = function() {
		return Titanium.Utils.base64encode(this.media).text;
	};
	
	// Constructor
	var blob = file.read();
	
	this.imageFileHandle = file;
	this.media = blob;
	this.width = blob.width;
	this.height = blob.height;
	// End constructor	
}

Image.randomString = function() {
    var text = "imagelib_";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 7; i++) {
    	text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	
	text += ".jpg";
	
    return text;
};

Image.createFromFile = function(path) {
	var imageFileHandle = Titanium.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, path);
	
	return new Image(imageFileHandle);
};

Image.createFromBlob = function(blob) {
	var imageFileHandle = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, Image.randomString());
	imageFileHandle.write(blob);
	
	return new Image(imageFileHandle);
};

Image.initialize = function() {
	var directoryHandle = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
	var directoryList = directoryHandle.getDirectoryListing();
	
	_.each(directoryList, function(value, index, list) {
		if (value.indexOf('imagelib_') == 0) {
			var fileHandle = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, value);
			fileHandle.deleteFile();
		}
	});
};

module.exports = Image;
