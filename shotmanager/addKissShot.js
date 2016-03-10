var scaleFactor = 3000;
var kissOrigDim = {x: 1.2, y: 1.5, z:1.2};
var xscale = kissOrigDim.x * scaleFactor;
var yscale = kissOrigDim.y * scaleFactor;
var zscale = kissOrigDim.z * scaleFactor;
var kissNewDim = {x: xscale, y: yscale, z: zscale};

var shot2 = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/kiss/kiss2.fbx",
    position: {x:-166, y:150 , z:28},
    dimension: {x:1.2, y:1.5, z:1.2},
    animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/kiss/kiss2.fbx", running: true, currentFrame: 0, loop: true},
    //script: "file:///Users/ozan/WebstormProjects/ozanserim/shotmanager/startstopAnimation2.js"
});

function cleanup (){
    //Entities.deleteEntity(shot2);
}
Script.scriptEnding.connect(cleanup);
print("Test");

