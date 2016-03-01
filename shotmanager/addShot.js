/**
 * Created by ozan on 2/29/16.
 */
var animationEntity = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/minotaur_fight.fbx",
    position: {x:470, y:700, z:800},
    dimension: {x: 40.2, y: 12.3, z:22.4},
    animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/minotaur_fight.fbx", running: true, currentFrame: 0, loop: true},
    script: {url: "file:///Users/ozan/WebstormProjects/play_animation/startstopAnimation.js"}
});
print("After var animEntitiy");
var myClip = SoundCache.getSound ("https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/audio/1_Minotaur_Fight_Final.wav");
Script.setTimeout(function(){
    Audio.playSound(myClip,{position: {x:470, y:700, z:800}});
    print("I am playing a sound");
},0);

function cleanup (){
    Entities.deleteEntity(animationEntity);
}
Script.scriptEnding.connect(cleanup);
print("Test");
print(animationEntity.position);
