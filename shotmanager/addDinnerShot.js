var scaleFactor = 3000;
var dinnerOrigDim = {x: 1.2, y: 1.5, z:1.2};
var xscale = dinnerOrigDim.x * scaleFactor;
var yscale = dinnerOrigDim.y * scaleFactor;
var zscale = dinnerOrigDim.z * scaleFactor;
var dinnerNewDim = {x: xscale, y: yscale, z: zscale};

var dadTableShot = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/dinner/dad_table1.fbx",
    position: {x:-175.3846, y:161.9100 , z:20.9786},
    dimension: {x:2.4977, y:1.2748, z:2.5926},
    animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/dinner/dad_table1.fbx", running: true, currentFrame: 0, loop: true},
    //script: "file:///Users/ozan/WebstormProjects/ozanserim/shotmanager/startstopAnimation2.js"
});


var boyShot = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/dinner/boy_anim4.fbx",
    position: {x:-174.8802, y:161.9899 , z:20.3790},
    dimension: {x:0.4601, y:1.1075, z:0.6108},
    animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/dinner/boy_anim4.fbx", running: true, currentFrame: 0, loop: true},
    //script: "file:///Users/ozan/WebstormProjects/ozanserim/shotmanager/startstopAnimation2.js"
});

function cleanup (){
    //Entities.deleteEntity(dadTableShot);
    //Entities.deleteEntity(boyShot)
}
Script.scriptEnding.connect(cleanup);
print("DinnerEnd");

