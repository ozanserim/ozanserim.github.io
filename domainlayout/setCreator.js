//fightclub bounding box: -16.41 15.441115 -0.598446 1.325297 -25.812627 28.701445 // 

//var origin_x = 0;
//var origin_y = 0;
//var origin_z = 0;

var objects = [
    {
    "url": "https://hifi-public.s3.amazonaws.com/ozan/sets/windmill/lowpoly/grass_terrain.fbx",
    "position": {
        "y": 0,
        "x": 0,
        "z": 0,
        }, 
    },
    {
    "url": "https://hifi-public.s3.amazonaws.com/ozan/sets/windmill/lowpoly/windmill_center.fbx",
    "position": {
        "y": 0,
        "x": 0,
        "z": 0,
        }, 
    },
    {
    "url": "https://hifi-public.s3.amazonaws.com/ozan/props/sun_lowpoly/sun.fbx",
    "position": {
        "y": 100,
        "x": 0,
        "z": 0,
        }, 
    },
    {
    "url": "https://hifi-public.s3.amazonaws.com/ozan/sets/fightClub/lowpoly/fightclub_lowpoly.fbx",
    "position": {
        "y": 0,
        "x": -50,
        "z": 0,
        }, 
    },
    {
    "url": "https://hifi-public.s3.amazonaws.com/ozan/sets/tuscany/tuscany.fbx",
    "position": {
        "y": .5,
        "x": -100,
        "z": 0,
        }, 
    },
    {
    "url": "https://hifi-public.s3.amazonaws.com/ozan/sets/secretGardenParty/lowPoly/SecretPartyGarden_lowPoly.fbx",
    "position": {
        "y": 0,
        "x": -150,
        "z": 0,
        }, 
    },
];

// Place the entities 5 meters in front of avatar
//var ROOT_OFFSET = Vec3.multiply(5, Quat.getFront(MyAvatar.orientation));
var ROOT_POSITION = {x:0,y:0,z:0};

var UNIQUE_NAME_ID = "Ozan's Object";

for (var i = 0; i < objects.length; ++i) {
    var object = objects[i];

    var properties = {
        type: "Model",
        name: UNIQUE_NAME_ID,
        position: Vec3.sum(ROOT_POSITION, object.position),
        //position: object.position,
        registrationPoint: {
            x: 0.5,
            y: 0.0,
            z: 0.5,
        },
        dimensions: object.dimensions,
        modelURL: object.url,
    };

    Entities.addEntity(properties);
}

Script.stop();
