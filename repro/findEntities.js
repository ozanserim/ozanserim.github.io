function randomProperites(){
    var position = Vec3.sum(MyAvatar.position,{x:Math.random(),y:Math.random(), z:Math.random()});
    var color = {red:Math.random()*200,green:Math.random()*100,blue:Math.random()*200};

    var properties = {
        type: "Sphere",
        position: position,
        color: color
    };
//print("Created some random colors" + JSON.stringify(color) + "\n at some random location" + JSON.stringify(position));
    return properties;
}

//Creates a bunch of entities
//for (i = 0; i < 20; i++){
//    Original = Entities.addEntity(randomProperites());
//    print("Created an entity with: " + JSON.stringify(Entities.getEntityProperties(Original).color));
//}

// find the closes one and make it white
entList= Entities.findEntities(MyAvatar.position, 100.0)
//print(entList.length);

for( i = 0; i < entList.length; i++){
    //Entities.editEntity(arrayFound[i], {color: {red:200, blue:200, green:200}});
    var modelUrl  = JSON.stringify(Entities.getEntityProperties(entList[i]).modelURL);
    var modelPos = JSON.stringify(Entities.getEntityProperties(entList[i]).position);
    if (modelUrl != null)
    {
        print("modelUrl: "+ modelUrl);
        print("modelPos: "+ modelPos);

    }
}
