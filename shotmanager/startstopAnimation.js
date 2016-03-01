/**
 * Created by ozan on 3/1/16.
 */
(function(){
    print("In Start Stop Animation");
    var clicked = false;
    this.clickDownOnEntity = function(entityID, mouseEvent) {
        if (clicked){
            Entities.editEntity(entityID, { running: false });
            clicked = false;
        }else{
            Entities.editEntity(entityID, { running: true });
            clicked = true;
        }
    };
})