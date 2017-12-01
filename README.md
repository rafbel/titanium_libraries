# Titanium Libraries for Your Everyday Project

Custom made libraries for Appcelerator Titanium.

## ArrowLib

###### Makes operations with any Appcelerator ArrowDB solution easy

```
ArrowLib.login(username,password,$.loadingIndicator,function(user)
{
  console.log(user.username " is logged in!");
});
```

## UI Elements Garbage Collector

###### Clears device memory on window close!

```
MemoryClear.clear($.window);
```
## ImageLib

###### Handles image resizing, crop, styling, and uploading easier.

```
var imageAdditionalInformation = Image.createFromFile("images/menu_additional_information.png");
var imageViewAdditionalInformation = imageAdditionalInformation.getViewByHeight(buttonImageHeight);
$.menuAdditionalInformation.add(imageViewAdditionalInformation);
```

## JSON File Handler

##### Using JSON files has never been easier!

```
var object = JSONHandler.readJSONFile(fileName);
```

## Field Mask

##### It truly is annoying. But your app user demands it!

```
$.textFieldBirthDate.value = Mask.maskDate(event.value);
```

## MediaLib

##### Reduces the amount of coding necessary for opening the device gallery or camera

```
Media.getPhotoFromCamera(function(photo){
    //Do whatever you want with the photo. It is this simple!
});    
```

## Util

##### Utility library for your everyday app

```
Util.dialog({
  title: "Dialog is now open"
  message: "This is a standard message"  
});    
```

## Field Validation

##### Validates all kinds of fields

```
if (!ValidateField.validateDate($.textFieldBirthDate.getValue())){
  console.log("Invalid date!");
}
```


