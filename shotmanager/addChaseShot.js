var scaleFactor = 3000;
var chaseOrigDim = {x: 1.2, y: 1.5, z:1.2};
var xscale = chaseOrigDim.x * scaleFactor;
var yscale = chaseOrigDim.y * scaleFactor;
var zscale = chaseOrigDim.z * scaleFactor;
var chaseNewDim = {x: xscale, y: yscale, z: zscale};

var chaseShot = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/chase/chase.fbx",
    position: {x:12.7302, y:196.0516 , z:129.8049},
    dimension: {x:1.1983, y:0.4192, z:6.2364},
    animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/chase/chase.fbx ", running: true, currentFrame: 0, loop: true},
    //script: "file:///Users/ozan/WebstormProjects/ozanserim/shotmanager/startstopAnimation2.js"
});

function cleanup (){
    //Entities.deleteEntity(chaseShot);
}
Script.scriptEnding.connect(cleanup);
print("Test");

