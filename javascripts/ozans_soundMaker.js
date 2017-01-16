//
//  Copyright 2016 High Fidelity, Inc.
//
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

(function(){ 

    //var soundURL = 'D:\\assets\\audio\\3d_audio_examples\\bell.wav';
    var soundURL = 'https://hifi-content.s3.amazonaws.com/ozan/dev/audio/3d_audio_examples/bell.wav';
    //var soundURL = 'http://hifi-production.s3.amazonaws.com/tutorials/soundMaker/bell.wav';
    //var soundURL = 'http://hifi-content.s3.amazonaws.com/ozan/dev/audio/3d_audio_examples/imperial_march.wav';
    var ringSound;

    this.preload = function(entityID) { 
        print("preload("+entityID+")");
        ringSound = SoundCache.getSound(soundURL);
    }; 

    this.clickDownOnEntity = function(entityID, mouseEvent) { 
        var bellPosition = Entities.getEntityProperties(entityID).position;
        print("clickDownOnEntity()...");
        Audio.playSound(ringSound,  {
            position: bellPosition,
            volume: 1
            });
    }; 

})
