var scaleFactor = 3000;
var fightOrigDim = {x: 40.2, y: 12.3, z:22.4};
var xscale = fightOrigDim.x * scaleFactor;
var yscale = fightOrigDim.y * scaleFactor;
var zscale = fightOrigDim.z * scaleFactor;
var fightNewDim = {x: xscale, y: yscale, z: zscale};

var shot1 = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/minotaur_fight.fbx",
    position: {x:-174.2518, y:151.8066,z:2.5455},
    rotation: {x:0, y:-90, z:0},
    dimension: {x: 40.2, y: 12.3, z:22.4},
    animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/minotaur_fight.fbx", running: true, currentFrame: 0, loop: true},
    //script: "file:///Users/ozan/WebstormProjects/ozanserim/shotmanager/startstopAnimation2.js"
});
print("modelURL = " + JSON.stringify(Entities.getEntityProperties(shot1).modelURL));
var audio1 = SoundCache.getSound ("https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/audio/1_Minotaur_Fight_Final.wav");
Script.setTimeout(function(){
    Audio.playSound(audio1,{position: {x:-174.2518, y:151.8066, z:2.5455}, volume: 0.25, loop: true});
    print("I am playing a sound");
},0);

function cleanup (){
    //Entities.deleteEntity(shot1);
    //Entities.deleteEntity(shot2);
}
Script.scriptEnding.connect(cleanup);
print("Test");

