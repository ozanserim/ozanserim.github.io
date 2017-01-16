var GOKU_NORMAL_URL = 'https://hifi-content.s3.amazonaws.com/ozan/dev/avatars/dragonBallZ/vegeta/ssj/vegetaSSJ.fst';
var GOKU_SUPERSAIJAN_MODEL_URL = 'https://hifi-content.s3.amazonaws.com/ozan/dev/avatars/dragonBallZ/vegeta/ssj/vegetaSSJ.fst';
MyAvatar.skeletonModelURL = GOKU_NORMAL_URL;

var ozanFX =  {
    "accelerationSpread": {
        "x": 0,
        "y": 10,
        "z": 0
    },
    "clientOnly": 0,
    "color": {
        "blue": 79,
        "green": 79,
        "red": 95
    },
    "colorFinish": {
        "blue": 79,
        "green": 79,
        "red": 95
    },
    "colorStart": {
        "blue": 79,
        "green": 79,
        "red": 95
    },
    "dimensions": {
        "x": 14.566745758056641,
        "y": 14.566745758056641,
        "z": 14.566745758056641
    },
    "emitAcceleration": {
        "x": 0,
        "y": 1,
        "z": 0
    },
    "emitDimensions": {
        "x": 0,
        "y": 1,
        "z": 0
    },
    "emitOrientation": {
        "w": 0.47140955924987793,
        "x": 0.23568189144134521,
        "y": 0.47140955924987793,
        "z": 0.7071068286895752
    },
    "emitRate": 500,
    "emitSpeed": 0.5,
    "lifespan": 1,
    "name": "ozanParticle",
    "particleRadius": 1,
    "polarFinish": 1,
    "polarStart": 1,
    "radiusFinish": 1,
    "radiusStart": 1,
    "rotation": {
        "w": 1,
        "x": -1.52587890625e-05,
        "ay": -1.52587890625e-05,
        "z": -1.52587890625e-05
    },
    "textures": "https://hifi-public.s3.amazonaws.com/alan/Particles/Particle-Sprite-Smoke-1.png",
    "type": "ParticleEffect",
    "localPosition": {x: 0, y: 0, z: -1}
};

var thoysFX = {
    "accelerationSpread": {
        "x": 2,
        "y": 0,
        "z": 2
    },
    "alpha": 0.20000000298023224,
    "alphaFinish": 0.20000000298023224,
    "alphaStart": 0.20000000298023224,
    "azimuthFinish": 1,
    "azimuthStart": 0,
    "color": {
        "blue": 0,
        "green": 158,
        "red": 101
    },
    "colorFinish": {
        "blue": 0,
        "green": 158,
        "red": 101
    },
    "colorStart": {
        "blue": 0,
        "green": 158,
        "red": 101
    },
    "dimensions": {
        "x": 20.625,
        "y": 20.625,
        "z": 20.625
    },
    "emitAcceleration": {
        "x": 0,
        "y": 0,
        "z": 0
    },
    "emitOrientation": {
        "w": 1,
        "x": -1.52587890625e-05,
        "y": -1.52587890625e-05,
        "z": -1.52587890625e-05
    },
    "emitRate": 270,
    "emitSpeed": 1,
    "lifespan": 0.5,
    "maxParticles": 7940,
    "particleRadius": 1,
    "radiusFinish": 1,
    "radiusSpread": 8,
    "radiusStart": 1,
    "rotation": {
        "w": 0.70705735683441162,
        "x": -0.70717936754226685,
        "y": -1.52587890625e-05,
        "z": -1.52587890625e-05
    },
    "speedSpread": 17.200000762939453,
    "textures": "https://hifi-public.s3.amazonaws.com/alan/Particles/Particle-Sprite-Smoke-1.png",
    "type": "ParticleEffect",
    "localPosition": {x: 0, y: -1, z: 0}
};


var selectedFX = thoysFX;
var particleEntity = null;

MyAvatar.overrideAnimation("https://hifi-content.s3.amazonaws.com/ozan/dev/avatars/dragonBallZ/anims/standing_taunt_battlecry.fbx", 5.0, true, 0.0, 50);


Script.setTimeout(function() {
    //selectedFX['position'] = MyAvatar.position;
    selectedFX['parentID'] = MyAvatar.sessionUUID;
    particleEntity = Entities.addEntity(selectedFX);
}, 1500);

Script.setTimeout(function() {
    MyAvatar.skeletonModelURL = GOKU_SUPERSAIJAN_MODEL_URL;
    MyAvatar.overrideAnimation("https://hifi-content.s3.amazonaws.com/ozan/dev/avatars/dragonBallZ/anims/standing_taunt_battlecry.fbx", 5.0, true, 25, 50);
}, 2500);

Script.setTimeout(function() {
    Entities.editEntity(particleEntity, {isEmitting: false});
    MyAvatar.restoreAnimation();
}, 5000);



Script.scriptEnding.connect(function() {
    Entities.deleteEntity(particleEntity);
    MyAvatar.restoreAnimation();
});
