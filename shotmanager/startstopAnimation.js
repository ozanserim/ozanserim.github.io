/**
 * Created by ozan on 3/1/16.
 */
(function(){
    var newProperties = {
        animation: {url: "https://hifi-content.s3.amazonaws.com/ozan/dev/shots/minotaur_fight/minotaur_fight.fbx", running: false, currentFrame: 0, loop: true},
    };
    print("In Start Stop Animation");

    var clicked = false;
    this.clickDownOnEntity = function(entityID, mouseEvent) {
        print("In clickdownOnEntity");
        if (clicked){
            Entities.editEntity(entityID, newProperties);
            clicked = false;
        }else{
            Entities.editEntity(entityID, newProperties);
            clicked = true;
        }
    };
})