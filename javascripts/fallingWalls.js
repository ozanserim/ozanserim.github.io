const TEST_MODE = true;

const REVERB_ZONE_ENTITY_SCRIPT_URL = 'https://dl.dropboxusercontent.com/u/14997455/hifi/fallingwall/changingReverbZone.js';

//Audio files need to be 48hz, 16bit, mono
const WALL_FALLING_SOUND_URL = 'https://dl.dropboxusercontent.com/u/14997455/hifi/fallingwall/falling-wall-a2.wav';
const WALL_COLLISION_SOUND_URL = 'https://dl.dropboxusercontent.com/u/14997455/hifi/fallingwall/falling-wall-b2.wav';


//Definitions for Changing reverb zone. 
//Depends on external script
const REVERB_SETTINGS_KEY = 'reverbSettings';
const REVERB_CHANGE_CHANNEL = 'reverbChange';


//Can set custom values in reverbTest.js (utilities/tools/reverbTest.js)
const SMALL_ROOM_REVERB = {
        bandwidth: 7000,
        preDelay: 20,
        lateDelay: 0,
        reverbTime: 1.5,
        earlyDiffusion: 100,
        lateDiffusion: 100,
        roomSize: 50,
        density: 100,
        bassMult: 1.5,
        bassFreq: 250,
        highGain: -12,
        highFreq: 3000,
        modRate: 2.3,
        modDepth: 50,
        earlyGain: -24,
        lateGain: -24,
        earlyMixLeft: 20,
        earlyMixRight: 20,
        lateMixLeft: 90,
        lateMixRight: 90,
        wetDryMix: 0
    };

const LARGE_HALL_REVERB = {
        bandwidth: 7000,
        preDelay: 80,
        lateDelay: 0,
        reverbTime: 3,
        earlyDiffusion: 100,
        lateDiffusion: 100,
        roomSize: 50,
        density: 100,
        bassMult: 1.5,
        bassFreq: 250,
        highGain: -12,
        highFreq: 3000,
        modRate: 2.3,
        modDepth: 50,
        earlyGain: 2,
        lateGain: 3.9,
        earlyMixLeft: 20,
        earlyMixRight: 20,
        lateMixLeft: 50,
        lateMixRight: 50,
        wetDryMix: 75
    };

const WALL_COLOR = {
    red: 72,
    green: 106,
    blue: 178
};

//TODO: hardcode these for the filming place
const BUILDING_LOCATION = {
    //position: MyAvatar.position,
    position: {x:-30,y:1,z:-5},
    rotation: {x:0,y:0,z:0,w:1}
};

// This function is used to get the ideal y-location for a floor
//Helper function to get the location of the floor. (y axis)
function grabLowestJointY() {
    var jointNames = MyAvatar.getJointNames();
    var floorY = MyAvatar.position.y;
    for (var jointName in jointNames) {
        if (MyAvatar.getJointPosition(jointNames[jointName]).y < floorY) {
            floorY = MyAvatar.getJointPosition(jointNames[jointName]).y;
        }
    }
    return floorY;
}

//Creates an entity and returns a mixed object of the creation properties and the assigned entityID
//Task create the assets: 
var createEntity = function(entityProperties, parent) {
    if (parent.rotation !== undefined) {
        if (entityProperties.rotation !== undefined) {
            entityProperties.rotation = Quat.multiply(parent.rotation, entityProperties.rotation);
        } else {
            entityProperties.rotation = parent.rotation;
        }
    }
    if (parent.position !== undefined) {
        var localPosition = (parent.rotation !== undefined) ? Vec3.multiplyQbyV(parent.rotation, entityProperties.position) : entityProperties.position;
        entityProperties.position = Vec3.sum(localPosition, parent.position)
    }
    if (parent.id !== undefined) {
        entityProperties.parentID = parent.id;
    }
    entityProperties.id = Entities.addEntity(entityProperties);
    return entityProperties;
};

//Building - root building - floor and large outer building
function createBuilding(transform) {
    var entityProperties = {
        position: {
            x: 0.0,
            y: grabLowestJointY() - MyAvatar.position.y,
            z: -1.0
        },
        dimensions: {
            x: 12,
            y: 0.1,
            z: 12
        },
        name: 'Floor',
        type: 'Model',
        modelURL: 'http://hifi-content.s3.amazonaws.com/ozan/dev/sets/3d_audio_set/wood_floor.fbx',
        shapeType: 'box'
    };
    return createEntity(entityProperties, transform);
}

//Needed for collision of walls
function createOutsideFloor(parent) {

    var entityProperties = {
        position: {
            x: 0.0,
            y: -0.2
        },
        dimensions: {
            x: 60,
            y: 0.05,
            z: 60
        },
        color: {
            red: 255,
            green: 255,
            blue: 255
        },
        name: 'Floor',
        type: 'Model',
        modelURL: 'http://hifi-content.s3.amazonaws.com/ozan/dev/sets/3d_audio_set/stone_floor.fbx',
        shapeType: 'box',
        visible: false
    };
    return createEntity(entityProperties, parent);
}

function createRadio(parent) {

    var entityProperties = {
        position: {
            x: 0.0,
            y: .6,
            z: 3
        },
        color: {
            red: 255,
            green: 255,
            blue: 255
        },
        name: 'Radio',
        type: 'Model',
        modelURL: 'http://hifi-content.s3.amazonaws.com/ozan/dev/sets/3d_audio_set/chair_table_radio.fbx',
        shapeType: 'box',
        userData: JSON.stringify({
            soundKey: {
                url: 'https://hifi-content.s3.amazonaws.com/ozan/dev/audio/3d_audio_examples/star-wars-cantina-song-fixed.wav',
                volume: 1,
                loop: true,
                playbackGap: 0,
                playbackGapRange: 0
            }
        })
    };
    return createEntity(entityProperties, parent);
}


function getLocalWallRotation(sideNumber) {
    return Quat.fromPitchYawRollDegrees(0.0, 90 * sideNumber, 0.0);
}

//Create inner room - composed 4 walls
function createSideWall(sideNumber, parent) {
    var height = 10.0;
    var rotation = getLocalWallRotation(sideNumber);
    var position = Vec3.multiplyQbyV(rotation, {
        x: 0,
        y: height / 2.0,
        z: 6.0
    });
    var entityProperties = {
        type: 'Model',
        modelURL: 'http://hifi-content.s3.amazonaws.com/ozan/dev/sets/3d_audio_set/brick_wall.fbx',
        shapeType: 'box',
        rotation: rotation,
        position: position,
        dimensions: {
            x: 12,
            y: height,
            z: 0.2
        },
        color: WALL_COLOR,
        rotation: rotation,
        name: 'SideWall_' + sideNumber
    };
    var wall = createEntity(entityProperties, parent);
    wall.sideNumber = sideNumber;
    wall.collided = false;
    return wall;
}

//Zone skybox
function whiteZone(parent) {
    var userData = {};
    userData[REVERB_SETTINGS_KEY] = SMALL_ROOM_REVERB;
    var entityProperties = {
        backgroundMode: 'skybox',
        dimensions: {
            x: 300,
            y: 300,
            z: 300
        },
        keyLight: {
            ambientIntensity: 0.25,
            direction: {
                x: 0,
                y: -0.76604443788528442,
                z: 0.6427876353263855
            }
        },
        name: 'White Zone',
        shapeType: 'box',
        skybox: {
            url: 'http://hifi-content.s3.amazonaws.com/ozan/dev/skyboxes/polyworld/polyworld_desert.jpg'
        },
        type: 'Zone',
        userData: JSON.stringify(userData),
        script: REVERB_ZONE_ENTITY_SCRIPT_URL + '?t=' + Date.now()
    };
    
    return createEntity(entityProperties, parent);
}

var wallsFallingSound = SoundCache.getSound(WALL_FALLING_SOUND_URL);
var wallsCollisionSound = SoundCache.getSound(WALL_COLLISION_SOUND_URL);

var building = createBuilding(BUILDING_LOCATION);

var outsideFloor = createOutsideFloor(building);

var radio = createRadio(building);

var sideWalls = [];
for (var i = 0; i < 4; i++) {
    sideWalls.push(createSideWall(i, building));
}
var whiteZone = whiteZone(building);


var letTheWallsFallDown = function() {
    sideWalls.forEach(function(sideWall) {
        var rotation = Quat.multiply(building.rotation, getLocalWallRotation(sideWall.sideNumber));
        Entities.editEntity(sideWall.id, {
            parentID: '',
            dynamic: true,
            velocity: Vec3.multiplyQbyV(rotation, {z: 1.0}),
            gravity: {
                x: 0.0, 
                y: -29.8,
                z: 0.0
            }
        });
        Audio.playSound(wallsFallingSound, {
            volume: 20,
            position: sideWall.position
        });
    });
    Entities.collisionWithEntity.connect(function(entityA, entityB, collision) {
        var sideWall = null;
        sideWalls.forEach(function(aSideWall) {
            if (entityA === aSideWall.id || entityB === aSideWall.id) {
                sideWall = aSideWall;
            }
        });
        
        if (collision.type !== 0 || sideWall === null || sideWall.collided || (entityA !== outsideFloor.id && entityB !== outsideFloor.id)) {
            return;
        }
        //print(JSON.stringify(collision));
        sideWall.collided = true;
        var position = Entities.getEntityProperties(sideWall.id, ['position']).position;
        Audio.playSound(wallsCollisionSound, {
            volume: 40,
            position: position
        });
        
    });
    var userData = {};
    userData[REVERB_SETTINGS_KEY] = LARGE_HALL_REVERB;
    Entities.editEntity(whiteZone.id, {
        userData: JSON.stringify(userData)
    });
    Messages.sendMessage(REVERB_CHANGE_CHANNEL, '{}');
};

Script.setTimeout(letTheWallsFallDown, 5000);

if (TEST_MODE) {
    Script.scriptEnding.connect(function() {
        // should only have to delete the parent entity
        Entities.deleteEntity(building.id);
        sideWalls.forEach(function(sideWall) {
            Entities.deleteEntity(sideWall.id);
        });
    });
} else {
    Script.stop();
}
