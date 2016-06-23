 var UNIQUE_NAME_ID = "Ozan's Object";

var SEARCH_RADIUS = 100000;
var entities = Entities.findEntities(MyAvatar.position, SEARCH_RADIUS);

for (var i = 0; i < entities.length; ++i) {
    var entityID = entities[i];
    var properties = Entities.getEntityProperties(entityID);

    // Delete all entities with name UNIQUE_NAME_ID
    if (properties.name == UNIQUE_NAME_ID) {
        Entities.deleteEntity(entityID);
    }
}

Script.stop();
