/**
 * Created by ozan on 2/25/16.
 */

//create window and link to html page
var reproWindow = new OverlayWebWindow({
    title: 'Repro3',
    //source: "file:///Users/ozan/WebstormProjects/ozanserim/repro/repro.html",
    source: "C:\\Users\\ozan\\WebstormProjects\\ozanserim\\ozanserim.github.io\\repro\\repro.html",
    width: 800,
    height: 600,
    visible: false
});
reproWindow.setVisible(true);
reproWindow.raise();

var myName;
var myAvatar;
var myLocation;
var myPosition;
var myEntities;
var message;

function getUser(){
    myName = "Ozan";
}
function getAvatar(){
    myAvatar = MyAvatar.skeletonModelURL;
}
function getLocation(){
    myLocation = location.href;
}
function getPosition(){
    myPosition = JSON.stringify(MyAvatar.position);
    myPosition = myPosition.replace("{", "");
    myPosition = myPosition.replace("}", "");
    myPosition = myPosition.replace(/["]+/g, '');
}

function getEntities(){
    entList= Entities.findEntities(MyAvatar.position, 100.0);
    //print("entity length = " + entList.length);
    //"Model", "https://hifi-content.s3.amazonaws.com/ozan/dev/props/sun_lowpoly/sun.fbx", {"x":0,"y":0,"z":0}
    for( i = 0; i < entList.length; i++){
        var modelTyp  = JSON.stringify(Entities.getEntityProperties(entList[i]).type);
        var modelUrl  = JSON.stringify(Entities.getEntityProperties(entList[i]).modelURL);
        var modelPos = JSON.stringify(Entities.getEntityProperties(entList[i]).position);
        if (myEntities == null){
            myEntities = modelTyp + ", "+modelUrl+", "+modelPos;
        }
        else{
            myEntities = myEntities + "<br>" + modelTyp + ", "+modelUrl+", "+modelPos;
        }
        //print("modelType: "+ modelTyp);
        //print("modelUrl: "+ modelUrl);
        //print("modelPos: "+ modelPos);
    }
    myEntities = myEntities.replace(/["]+/g, '');
    print ("entityInfo = " + myEntities);

}
function setMessage(){
    message = '{"avatar": "'+myAvatar+'", "location": "'+myLocation+'", "position": "'+myPosition+'", "entities": "'+myEntities+'"}';
}

Script.setTimeout(function(){
    print ("TEST");
    getUser();
    getAvatar();
    getLocation();
    getPosition();
    getEntities();
    setMessage();

    //var message = '{"avatar": "'+myAvatar+'"}';
    //var message = '{"location": "'+myLocation+'"}';
    //var message = '{"position": "'+myPosition+'"}';
    print ("ozan message = " + message);
    reproWindow.eventBridge.emitScriptEvent(message);
},3000)

