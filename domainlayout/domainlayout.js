//SCRIPT SNIPPETS FOR LAYING-OUT DOMAIN CONTENT

//var BASE_URL = "https://hifi-public.s3.amazonaws.com/";
//var models = [];
//var floorPosition = Vec3.sum(MyAvatar.position, Vec3.multiply(3, Quat.getFront(Camera.getOrientation())));;
//floorPosition.y = MyAvatar.position.y - 5;
/*
var floor = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/_floor/floor.fbx",
    position: {x:0, y:-10 , z:0},
    shapeType: 'box',
    dimensions: {
        x: 2000,
        y: 9,
        z: 2000
    }
});


//ADD WINDMIILL
var windmill_terrain = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/windmill/grass_terrain.fbx",
    position: {x:0, y:-5 , z:0},
    shapeType: 'box',
    dimensions: {x: 1600.8475, y: .1, z: 1600.8475}
});


*/
/*
var windmill = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/windmill/windmill_center.fbx",
    position: {x:50, y:13 , z:110},
    shapeType: 'box',
    dimensions: {x:106.6199, y:39.2208 , z:118.3671}
});
*/
/*
var village = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/ancient_east/village.fbx",
    position: {x:115, y:4 , z:-50},
    shapeType: 'box',
    dimensions: {x:49.8692, y:17.4767 , z:81.9817}
});



var classroom_ship = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/classroom_ship/classroom_ship.fbx",
    position: {x:125, y:20 , z:-30},
    shapeType: 'box',
    dimensions: {x:13.0633, y:8.6461 , z:21.5752}
});


var dojo = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/dojo/dojo.fbx",
    position: {x:105, y:0 , z:35},
    shapeType: 'box',
    dimensions: {x:31.8511, y:7.7463 , z:54.5141}
});



var floating_island = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/floating_island/floating_island.fbx",
    position: {x:50, y:85 , z:400},
    shapeType: 'box',
    dimensions: {x:129.5968, y:120.0765 , z:123.5611}
});
*/
/*
var tf2_char_lineup = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/avatars/tf2/tf2_char_lineup.fbx",
    position: {x:22, y:-3.5 , z:2.5},
    shapeType: 'box',
    dimensions: {x:8.5156, y:2.2371 , z:0.7443}
});
*/
/*
var tf2_char_stage = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/avatars/tf2/stage.fbx",
    position: {x:22, y:-5 , z:2.5},
    shapeType: 'box',
    dimensions: {x:15.0557, y:0.4646 , z:15.4223}
});
*/

/*

var tuscany = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/tuscany/tuscany.fbx",
    position: {x:-20, y:-1.7120 , z:-44.8714},
    shapeType: 'box',
    dimensions: {x:68.2074, y:24.3885 , z:68.2074}
});

*/
/*
var secret_garden = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/secret_garden/secret_garden.fbx",
    position: {x:55, y:-2.1539 , z:-103},
    shapeType: 'box',
    dimensions: {x:24.0000, y:6.6250 , z:57.1018}
});
*/
/*
var cliff_vista = Entities.addEntity({
    type: "Model",
    modelURL: "https://hifi-content.s3.amazonaws.com/ozan/dev/backlot/sets/vistas/cliffs.fbx",
    position: {x:0, y:0 , z:0},
    //shapeType: 'box',
    //dimensions: {x:24.0000, y:6.6250 , z:57.1018}
});
*/


/*
var urls = [];
var req = new XMLHttpRequest();
req.open("GET", "https://serene-headland-4300.herokuapp.com/?assetDir=ozan/3d_marketplace/sets", false);
req.send();

var res = req.responseText;
var urls = JSON.parse(res).urls;
if (urls.length > 0) {
        // We've got an array of urls back from server- let's display them in grid
    createGrid();
}

function createGrid() {
    var fbxUrls = urls.filter(function(url) {
        return url.indexOf('fbx') !== -1;
    });

    var modelParams = {
        type: "Model",
        dimensions: {
            x: 10,
            y: 10,
            z: 10
        },
    };

    var modelPosition = {
        x: floorPosition.x + 10,
        y: floorPosition.y + 8.5,
        z: floorPosition.z
    };

    for (var i = 0; i < fbxUrls.length; i++) {
        if(i % 2 === 0) {
          modelPosition.x = floorPosition.x - 40
        } else {
            modelPosition.x = floorPosition.x + 40
        }
        modelPosition.z -= 30;
        modelParams.position = modelPosition;
        modelParams.modelURL = BASE_URL + fbxUrls[i]
        var model = Entities.addEntity(modelParams);
        models.push(model);
    }

    Script.setTimeout(function() {
        //Until we add callbacks on model loaded, we need to set a timeout and hope model is loaded by the time 
        //we hit it in order to set model dimensions correctly
        for(var i = 0; i < models.length; i++){
            var modelDimensions = Entities.getEntityProperties(models[i], 'naturalDimensions').naturalDimensions;
            Entities.editEntity(models[i], {dimensions: modelDimensions});
        }    
    }, 10000);
}

function cleanup() {
    Entities.deleteEntity(floor);
    models.forEach(function(model) {
        Entities.deleteEntity(model);
    });
    Entities.deleteEntity(model);
}

Script.scriptEnding.connect(cleanup);
*/
