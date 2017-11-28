/**
 * @author rafael.bellotti
 */
function recursiveClear(element){
    if (element.children.length > 0){
        for ( var i=0; i< element.children.length; i++) {
           var child = element.children[i];
           if (child.children.length > 0) {
                recursiveClear(child);
           }else{
                element.remove(child);
                child = null;    
           }
        }    
    }        
}

exports.clear = function(window){
    window.addEventListener('close',function(){
    	recursiveClear(window);
        window = null; 
    });
};


