/**
 * Created by ozan on 2/25/16.
 */

//create window and link to html page
var reproWindow = new OverlayWebWindow({
    title: 'Repro3',
    source: "file:///Users/ozan/WebstormProjects/ozanserim/repro/repro.html",
    width: 800,
    height: 600,
    visible: false
});
reproWindow.setVisible(true);
reproWindow.raise();

var myName = "Ozan";
//var posText = JSON.stringify(MyAvatar.position);
var myAvatar = MyAvatar.skeletonModelURL;
var myLocation = location.href;
var myPosition = JSON.stringify(MyAvatar.position);
myPosition = myPosition.replace("{", "");
myPosition = myPosition.replace("}", "");
myPosition = myPosition.replace(/["]+/g, '');
var message = '{"avatar": "'+myAvatar+'", "location": "'+myLocation+'", "position": "'+myPosition+'"}';
//var message = '{"avatar": "'+myAvatar+'"}';
//var message = '{"location": "'+myLocation+'"}';
//var message = '{"position": "'+myPosition+'"}';
print ("ozan message = " + message);

getEntities();

function getEntities(){
    entList= Entities.findEntities(MyAvatar.position, 100.0)
    //print("entity length = " + entList.length);

    for( i = 0; i < entList.length; i++){
        var modelTyp  = JSON.stringify(Entities.getEntityProperties(entList[i]).type);
        var modelUrl  = JSON.stringify(Entities.getEntityProperties(entList[i]).modelURL);
        var modelPos = JSON.stringify(Entities.getEntityProperties(entList[i]).position);

        var entityInfo = modelTyp + ", "+modelUrl+", "+modelPos;
        print ("entityInfo = " + entityInfo);
        //print("modelType: "+ modelTyp);
        //print("modelUrl: "+ modelUrl);
        //print("modelPos: "+ modelPos);
    }
}
//create eventBridge
Script.setTimeout(function(){
    reproWindow.eventBridge.emitScriptEvent(message);
    //do stuff here
},3000)

