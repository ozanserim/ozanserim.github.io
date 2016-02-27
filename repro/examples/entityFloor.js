/**
 * Created by ozan on 2/25/16.
 */
//  Builds a 20 mtr x 20 mtr chequered Entity floor directly under your avatar.
//  Created by Adrian McCarlie, 9 January 2015

//  Copyright 2015 High Fidelity, Inc.
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html

var myPosition = MyAvatar.position;
var X_POS = myPosition.x - 10;
var Y_POS = myPosition.y - 1;
var Z_POS = myPosition.z - 10;
var size = 20;
var color = 255;
var x = X_POS;
var y = Y_POS;
var z = Z_POS;

function checkeredFloor (){
    while (z < (Z_POS + size)){
        while (x < (X_POS + size-1)){
            if (color == 0){
                color = 255;
            }else {
                color = 0;
            }
            var properties = {
                type: "Box",
                position: {x: x, y: y, z: z},
                color: {red: color, green: color, blue: 255},
                dimensions: {x: 1, y: 1, z: 1},
            };
            floor = Entities.addEntity(properties);
            x++
        }
        x = X_POS;
        z++;
    }
    Script.stop();
}
checkeredFloor();
