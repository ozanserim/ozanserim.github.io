var scaleFactor = 3000;
var fightOrigDim = {x: 40.2, y: 12.3, z:22.4};
var xscale = fightOrigDim.x * scaleFactor;
var yscale = fightOrigDim.y * scaleFactor;
var zscale = fightOrigDim.z * scaleFactor;
var fightNewDim = {x: xscale, y: yscale, z: zscale};

var kissOrigDim = {x: 1.2, y: 1.5, z:1.2};
var xscale = kissOrigDim.x * scaleFactor;
var yscale = kissOrigDim.y * scaleFactor;
var zscale = kissOrigDim.z * scaleFactor;
var kissNewDim = {x: xscale, y: yscale, z: zscale};

var shot1 = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/minotaur_fight.fbx",
    position: {x:0, y:0, z:0},
    dimension: {x: 40.2, y: 12.3, z:22.4},
    animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/minotaur_fight.fbx", running: true, currentFrame: 0, loop: true},
    //script: "file:///Users/ozan/WebstormProjects/ozanserim/shotmanager/startstopAnimation2.js"
});
print("modelURL = " + JSON.stringify(Entities.getEntityProperties(shot1).modelURL));
var audio1 = SoundCache.getSound ("https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/audio/1_Minotaur_Fight_Final.wav");
Script.setTimeout(function(){
    Audio.playSound(audio1,{position: {x:0, y:0, z:0}});
    print("I am playing a sound");
},0);

var shot2 = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/kiss/kiss_cm.fbx",
    position: {x:0, y:0, z:0},
    dimension: {x:1.2, y:1.5, z:1.2},
    animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/kiss/kiss2.fbx", running: true, currentFrame: 0, loop: true},
    //script: "file:///Users/ozan/WebstormProjects/ozanserim/shotmanager/startstopAnimation2.js"
});

function cleanup (){
    Entities.deleteEntity(shot1);
    Entities.deleteEntity(shot2);
}
Script.scriptEnding.connect(cleanup);
print("Test");

