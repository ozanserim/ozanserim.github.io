//  makeAirship.js
//  
// creaste one 

var SIZE = 0.2; 
var TYPE = "Model";            //   Right now this can be "Box" or "Model" or "Sphere"
//var MODEL_URL = "https://s3.amazonaws.com/hifi-public/philip/airship_untextured.fbx";
var MODEL_URL = "https://hifi-content.s3.amazonaws.com/ozan/dev/props/airship/airship.fbx"
//var MODEL_URL = "https://s3.amazonaws.com/hifi-public/philip/airship.fbx";
var MODEL_DIMENSION = { x: 19.257, y: 24.094, z: 40.3122 };
var ENTITY_URL = "https://s3.amazonaws.com/hifi-public/philip/airship.js?"+Math.random();
//var ENTITY_URL = "file:///c:/users/dev/desktop/airship.js?"+Math.random()

var LIFETIME = 3600;            

var GRAVITY = { x: 0, y: 0, z: 0 };
var VELOCITY = { x: 0.0, y: 0, z: 0 };
var ANGULAR_VELOCITY = { x: 1, y: 1, z: 1 };

var DAMPING = 0.05;
var ANGULAR_DAMPING = 0.01;

var collidable = true; 
var gravity = true; 

var HOW_FAR_IN_FRONT_OF_ME = 30;
var HOW_FAR_ABOVE_ME = 15;

var shipLocation = Vec3.sum(MyAvatar.position, Vec3.multiply(HOW_FAR_IN_FRONT_OF_ME, Quat.getFront(Camera.orientation)));
shipLocation.y += HOW_FAR_ABOVE_ME;


var airship = Entities.addEntity({ 
            type: TYPE,
            modelURL: MODEL_URL,
            name: "airship",
            position: shipLocation,
            dimensions: (TYPE == "Model") ? MODEL_DIMENSION : { x: SIZE, y: SIZE, z: SIZE },       
            damping: DAMPING,
            angularDamping: ANGULAR_DAMPING,
            gravity: (gravity ? GRAVITY : { x: 0, y: 0, z: 0}),
            dynamic: collidable,
            lifetime: LIFETIME, 
            animation: {url: MODEL_URL, running: true, currentFrame: 0, loop: true},
            script: ENTITY_URL
        });

function scriptEnding() {
    Entities.deleteEntity(airship);
}

Script.scriptEnding.connect(scriptEnding);