var scaleFactor = 30;
var fightOrigDim = {x: 40.2, y: 12.3, z:22.4};
var xscale = fightOrigDim.x * scaleFactor;
var yscale = fightOrigDim.y * scaleFactor;
var zscale = fightOrigDim.z * scaleFactor;
var fightNewDim = {x: xscale, y: yscale, z: zscale};

var kissOrigDim = {x: 1.2, y: 1.5, z:1.2};
var xscale = kissOrigDim.x * scaleFactor;
var yscale = kissOrigDim.y * scaleFactor;
var zscale = kissOrigDim.z * scaleFactor;
var kissNewDim = {x: xscale, y: yscale, z: zscale};


print(fightOrigDim.x);
print(fightNewDim.x);
print("kiss");
print(kissOrigDim.x);
print(kissNewDim.x);



