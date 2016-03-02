1 /**
 2  * @fileoverview gl-matrix - High performance matrix and vector operations for WebGL
 3  * @author Brandon Jones
 4  * @author Colin MacKenzie IV
 5  * @version 1.3.7
 6  */
7
8 /*
 9  * Copyright (c) 2012 Brandon Jones, Colin MacKenzie IV
 10  *
 11  * This software is provided 'as-is', without any express or implied
 12  * warranty. In no event will the authors be held liable for any damages
 13  * arising from the use of this software.
 14  *
 15  * Permission is granted to anyone to use this software for any purpose,
 16  * including commercial applications, and to alter it and redistribute it
 17  * freely, subject to the following restrictions:
 18  *
 19  *    1. The origin of this software must not be misrepresented; you must not
 20  *    claim that you wrote the original software. If you use this software
 21  *    in a product, an acknowledgment in the product documentation would be
 22  *    appreciated but is not required.
 23  *
 24  *    2. Altered source versions must be plainly marked as such, and must not
 25  *    be misrepresented as being the original software.
 26  *
 27  *    3. This notice may not be removed or altered from any source
 28  *    distribution.
 29  */
30
31 // Modification to plain glMatrix
32 //	- Always use Array for MatrixType
33 //	- Remove export management
34 //	- Remove vec2, mat2, mat3, vec4
35 //	- Comments some not needed functions
36 //	- Add mat4.project and mat4.rotateVec3
37
38 (function (root) {
    39
    40     // Tweak to your liking
    41     var FLOAT_EPSILON = 0.000001;
    42
    43     /**
     44      * @class System-specific optimal array type
     45      * @name MatrixArray
     46      */
    47     var MatrixArray = Array;
    48
    49     /**
     50      * @class 3 Dimensional Vector
     51      * @name vec3
     52      */
    53     var vec3 = {};
    54
    55     /**
     56      * Creates a new instance of a vec3 using the default array type
     57      * Any javascript array-like objects containing at least 3 numeric elements can serve as a vec3
     58      *
     59      * @param {vec3} [vec] vec3 containing values to initialize with
     60      *
     61      * @returns {vec3} New vec3
     62      */
    63     vec3.create = function (vec) {
        64         var dest = new MatrixArray(3);
        65
        66         if (vec) {
            67             dest[0] = vec[0];
            68             dest[1] = vec[1];
            69             dest[2] = vec[2];
            70         } else {
            71             dest[0] = dest[1] = dest[2] = 0;
            72         }
        73
        74         return dest;
        75     };
    76
    77     /**
     78      * Creates a new instance of a vec3, initializing it with the given arguments
     79      *
     80      * @param {number} x X value
     81      * @param {number} y Y value
     82      * @param {number} z Z value
     83
     84      * @returns {vec3} New vec3
     85      */
    86     vec3.createFrom = function (x, y, z) {
        87         var dest = new MatrixArray(3);
        88
        89         dest[0] = x;
        90         dest[1] = y;
        91         dest[2] = z;
        92
        93         return dest;
        94     };
    95
    96     /**
     97      * Copies the values of one vec3 to another
     98      *
     99      * @param {vec3} vec vec3 containing values to copy
     100      * @param {vec3} dest vec3 receiving copied values
     101      *
     102      * @returns {vec3} dest
     103      */
    104     vec3.set = function (vec, dest) {
        105         dest[0] = vec[0];
        106         dest[1] = vec[1];
        107         dest[2] = vec[2];
        108
        109         return dest;
        110     };
    111
    112     /**
     113      * Compares two vectors for equality within a certain margin of error
     114      *
     115      * @param {vec3} a First vector
     116      * @param {vec3} b Second vector
     117      *
     118      * @returns {Boolean} True if a is equivalent to b
     119      */
    120     vec3.equal = function (a, b) {
        121         return a === b || (
                122             Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
        123             Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
        124             Math.abs(a[2] - b[2]) < FLOAT_EPSILON
        125         );
        126     };
    127
    128     /**
     129      * Performs a vector addition
     130      *
     131      * @param {vec3} vec First operand
     132      * @param {vec3} vec2 Second operand
     133      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     134      *
     135      * @returns {vec3} dest if specified, vec otherwise
     136      */
    137     vec3.add = function (vec, vec2, dest) {
        138         if (!dest || vec === dest) {
            139             vec[0] += vec2[0];
            140             vec[1] += vec2[1];
            141             vec[2] += vec2[2];
            142             return vec;
            143         }
        144
        145         dest[0] = vec[0] + vec2[0];
        146         dest[1] = vec[1] + vec2[1];
        147         dest[2] = vec[2] + vec2[2];
        148         return dest;
        149     };
    150
    151     /**
     152      * Performs a vector subtraction
     153      *
     154      * @param {vec3} vec First operand
     155      * @param {vec3} vec2 Second operand
     156      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     157      *
     158      * @returns {vec3} dest if specified, vec otherwise
     159      */
    160     vec3.subtract = function (vec, vec2, dest) {
        161         if (!dest || vec === dest) {
            162             vec[0] -= vec2[0];
            163             vec[1] -= vec2[1];
            164             vec[2] -= vec2[2];
            165             return vec;
            166         }
        167
        168         dest[0] = vec[0] - vec2[0];
        169         dest[1] = vec[1] - vec2[1];
        170         dest[2] = vec[2] - vec2[2];
        171         return dest;
        172     };
    173
    174     /**
     175      * Performs a vector multiplication
     176      *
     177      * @param {vec3} vec First operand
     178      * @param {vec3} vec2 Second operand
     179      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     180      *
     181      * @returns {vec3} dest if specified, vec otherwise
     182      */
    183     vec3.multiply = function (vec, vec2, dest) {
        184         if (!dest || vec === dest) {
            185             vec[0] *= vec2[0];
            186             vec[1] *= vec2[1];
            187             vec[2] *= vec2[2];
            188             return vec;
            189         }
        190
        191         dest[0] = vec[0] * vec2[0];
        192         dest[1] = vec[1] * vec2[1];
        193         dest[2] = vec[2] * vec2[2];
        194         return dest;
        195     };
    196
    197     /**
     198      * Negates the components of a vec3
     199      *
     200      * @param {vec3} vec vec3 to negate
     201      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     202      *
     203      * @returns {vec3} dest if specified, vec otherwise
     204      */
    205     vec3.negate = function (vec, dest) {
        206         if (!dest) { dest = vec; }
        207
        208         dest[0] = -vec[0];
        209         dest[1] = -vec[1];
        210         dest[2] = -vec[2];
        211         return dest;
        212     };
    213
    214     /**
     215      * Multiplies the components of a vec3 by a scalar value
     216      *
     217      * @param {vec3} vec vec3 to scale
     218      * @param {number} val Value to scale by
     219      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     220      *
     221      * @returns {vec3} dest if specified, vec otherwise
     222      */
    223     vec3.scale = function (vec, val, dest) {
        224         if (!dest || vec === dest) {
            225             vec[0] *= val;
            226             vec[1] *= val;
            227             vec[2] *= val;
            228             return vec;
            229         }
        230
        231         dest[0] = vec[0] * val;
        232         dest[1] = vec[1] * val;
        233         dest[2] = vec[2] * val;
        234         return dest;
        235     };
    236
    237     /**
     238      * Generates a unit vector of the same direction as the provided vec3
     239      * If vector length is 0, returns [0, 0, 0]
     240      *
     241      * @param {vec3} vec vec3 to normalize
     242      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     243      *
     244      * @returns {vec3} dest if specified, vec otherwise
     245      */
    246     vec3.normalize = function (vec, dest) {
        247         if (!dest) { dest = vec; }
        248
        249         var x = vec[0], y = vec[1], z = vec[2],
            250             len = Math.sqrt(x * x + y * y + z * z);
        251
        252         if (!len) {
            253             dest[0] = 0;
            254             dest[1] = 0;
            255             dest[2] = 0;
            256             return dest;
            257         } else if (len === 1) {
            258             dest[0] = x;
            259             dest[1] = y;
            260             dest[2] = z;
            261             return dest;
            262         }
        263
        264         len = 1 / len;
        265         dest[0] = x * len;
        266         dest[1] = y * len;
        267         dest[2] = z * len;
        268         return dest;
        269     };
    270
    271     /**
     272      * Generates the cross product of two vec3s
     273      *
     274      * @param {vec3} vec First operand
     275      * @param {vec3} vec2 Second operand
     276      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     277      *
     278      * @returns {vec3} dest if specified, vec otherwise
     279      */
    280     vec3.cross = function (vec, vec2, dest) {
        281         if (!dest) { dest = vec; }
        282
        283         var x = vec[0], y = vec[1], z = vec[2],
            284             x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];
        285
        286         dest[0] = y * z2 - z * y2;
        287         dest[1] = z * x2 - x * z2;
        288         dest[2] = x * y2 - y * x2;
        289         return dest;
        290     };
    291
    292     /**
     293      * Caclulates the length of a vec3
     294      *
     295      * @param {vec3} vec vec3 to calculate length of
     296      *
     297      * @returns {number} Length of vec
     298      */
    299     vec3.length = function (vec) {
        300         var x = vec[0], y = vec[1], z = vec[2];
        301         return Math.sqrt(x * x + y * y + z * z);
        302     };
    303
    304     /**
     305      * Caclulates the squared length of a vec3
     306      *
     307      * @param {vec3} vec vec3 to calculate squared length of
     308      *
     309      * @returns {number} Squared Length of vec
     310      */
    311     vec3.squaredLength = function (vec) {
        312         var x = vec[0], y = vec[1], z = vec[2];
        313         return x * x + y * y + z * z;
        314     };
    315
    316     /**
     317      * Caclulates the dot product of two vec3s
     318      *
     319      * @param {vec3} vec First operand
     320      * @param {vec3} vec2 Second operand
     321      *
     322      * @returns {number} Dot product of vec and vec2
     323      */
    324     vec3.dot = function (vec, vec2) {
        325         return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
        326     };
    327
    328     /**
     329      * Generates a unit vector pointing from one vector to another
     330      *
     331      * @param {vec3} vec Origin vec3
     332      * @param {vec3} vec2 vec3 to point to
     333      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     334      *
     335      * @returns {vec3} dest if specified, vec otherwise
     336      */
    337 /*   vec3.direction = function (vec, vec2, dest) {
     338         if (!dest) { dest = vec; }
     339
     340         var x = vec[0] - vec2[0],
     341             y = vec[1] - vec2[1],
     342             z = vec[2] - vec2[2],
     343             len = Math.sqrt(x * x + y * y + z * z);
     344
     345         if (!len) {
     346             dest[0] = 0;
     347             dest[1] = 0;
     348             dest[2] = 0;
     349             return dest;
     350         }
     351
     352         len = 1 / len;
     353         dest[0] = x * len;
     354         dest[1] = y * len;
     355         dest[2] = z * len;
     356         return dest;
     357     };*/
    358
    359     /**
     360      * Performs a linear interpolation between two vec3
     361      *
     362      * @param {vec3} vec First vector
     363      * @param {vec3} vec2 Second vector
     364      * @param {number} lerp Interpolation amount between the two inputs
     365      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     366      *
     367      * @returns {vec3} dest if specified, vec otherwise
     368      */
    369     vec3.lerp = function (vec, vec2, lerp, dest) {
        370         if (!dest) { dest = vec; }
        371
        372         dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
        373         dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
        374         dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);
        375
        376         return dest;
        377     };
    378
    379     /**
     380      * Calculates the euclidian distance between two vec3
     381      *
     382      * Params:
     383      * @param {vec3} vec First vector
     384      * @param {vec3} vec2 Second vector
     385      *
     386      * @returns {number} Distance between vec and vec2
     387      */
    388     vec3.dist = function (vec, vec2) {
        389         var x = vec2[0] - vec[0],
            390             y = vec2[1] - vec[1],
            391             z = vec2[2] - vec[2];
        392
        393         return Math.sqrt(x*x + y*y + z*z);
        394     };
    395
    396     // Pre-allocated to prevent unecessary garbage collection
    397     var unprojectMat = null;
    398     var unprojectVec = new MatrixArray(4);
    399     /**
     400      * Projects the specified vec3 from screen space into object space
     401      * Based on the <a href="http://webcvs.freedesktop.org/mesa/Mesa/src/glu/mesa/project.c?revision=1.4&view=markup">Mesa gluUnProject implementation</a>
     402      *
     403      * @param {vec3} vec Screen-space vector to project
     404      * @param {mat4} view View matrix
     405      * @param {mat4} proj Projection matrix
     406      * @param {vec4} viewport Viewport as given to gl.viewport [x, y, width, height]
     407      * @param {vec3} [dest] vec3 receiving unprojected result. If not specified result is written to vec
     408      *
     409      * @returns {vec3} dest if specified, vec otherwise
     410      */
    411  /*   vec3.unproject = function (vec, view, proj, viewport, dest) {
     412         if (!dest) { dest = vec; }
     413
     414         if(!unprojectMat) {
     415             unprojectMat = mat4.create();
     416         }
     417
     418         var m = unprojectMat;
     419         var v = unprojectVec;
     420
     421         v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
     422         v[1] = (vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0;
     423         v[2] = 2.0 * vec[2] - 1.0;
     424         v[3] = 1.0;
     425
     426         mat4.multiply(proj, view, m);
     427         if(!mat4.inverse(m)) { return null; }
     428
     429         mat4.multiplyVec4(m, v);
     430         if(v[3] === 0.0) { return null; }
     431
     432         dest[0] = v[0] / v[3];
     433         dest[1] = v[1] / v[3];
     434         dest[2] = v[2] / v[3];
     435
     436         return dest;
     437     };*/
    438
    439 /*    var xUnitVec3 = vec3.createFrom(1,0,0);
     440     var yUnitVec3 = vec3.createFrom(0,1,0);
     441     var zUnitVec3 = vec3.createFrom(0,0,1);
     442
     443     var tmpvec3 = vec3.create();*/
    444     /**
     445      * Generates a quaternion of rotation between two given normalized vectors
     446      *
     447      * @param {vec3} a Normalized source vector
     448      * @param {vec3} b Normalized target vector
     449      * @param {quat4} [dest] quat4 receiving operation result.
     450      *
     451      * @returns {quat4} dest if specified, a new quat4 otherwise
     452      */
    453 /*    vec3.rotationTo = function (a, b, dest) {
     454         if (!dest) { dest = quat4.create(); }
     455
     456         var d = vec3.dot(a, b);
     457         var axis = tmpvec3;
     458         if (d >= 1.0) {
     459             quat4.set(identityQuat4, dest);
     460         } else if (d < (0.000001 - 1.0)) {
     461             vec3.cross(xUnitVec3, a, axis);
     462             if (vec3.length(axis) < 0.000001)
     463                 vec3.cross(yUnitVec3, a, axis);
     464             if (vec3.length(axis) < 0.000001)
     465                 vec3.cross(zUnitVec3, a, axis);
     466             vec3.normalize(axis);
     467             quat4.fromAngleAxis(Math.PI, axis, dest);
     468         } else {
     469             var s = Math.sqrt((1.0 + d) * 2.0);
     470             var sInv = 1.0 / s;
     471             vec3.cross(a, b, axis);
     472             dest[0] = axis[0] * sInv;
     473             dest[1] = axis[1] * sInv;
     474             dest[2] = axis[2] * sInv;
     475             dest[3] = s * 0.5;
     476             quat4.normalize(dest);
     477         }
     478         if (dest[3] > 1.0) dest[3] = 1.0;
     479         else if (dest[3] < -1.0) dest[3] = -1.0;
     480         return dest;
     481     };*/
    482
    483     /**
     484      * Returns a string representation of a vector
     485      *
     486      * @param {vec3} vec Vector to represent as a string
     487      *
     488      * @returns {string} String representation of vec
     489      */
    490     vec3.str = function (vec) {
        491         return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']';
        492     };
    493
    494     /**
     495      * @class 4x4 Matrix
     496      * @name mat4
     497      */
    498     var mat4 = {};
    499
    500     /**
     501      * Creates a new instance of a mat4 using the default array type
     502      * Any javascript array-like object containing at least 16 numeric elements can serve as a mat4
     503      *
     504      * @param {mat4} [mat] mat4 containing values to initialize with
     505      *
     506      * @returns {mat4} New mat4
     507      */
    508     mat4.create = function (mat) {
        509         var dest = new MatrixArray(16);
        510
        511         if (mat) {
            512             dest[0] = mat[0];
            513             dest[1] = mat[1];
            514             dest[2] = mat[2];
            515             dest[3] = mat[3];
            516             dest[4] = mat[4];
            517             dest[5] = mat[5];
            518             dest[6] = mat[6];
            519             dest[7] = mat[7];
            520             dest[8] = mat[8];
            521             dest[9] = mat[9];
            522             dest[10] = mat[10];
            523             dest[11] = mat[11];
            524             dest[12] = mat[12];
            525             dest[13] = mat[13];
            526             dest[14] = mat[14];
            527             dest[15] = mat[15];
            528         }
        529
        530         return dest;
        531     };
    532
    533     /**
     534      * Creates a new instance of a mat4, initializing it with the given arguments
     535      *
     536      * @param {number} m00
     537      * @param {number} m01
     538      * @param {number} m02
     539      * @param {number} m03
     540      * @param {number} m10
     541      * @param {number} m11
     542      * @param {number} m12
     543      * @param {number} m13
     544      * @param {number} m20
     545      * @param {number} m21
     546      * @param {number} m22
     547      * @param {number} m23
     548      * @param {number} m30
     549      * @param {number} m31
     550      * @param {number} m32
     551      * @param {number} m33
     552
     553      * @returns {mat4} New mat4
     554      */
    555  /*   mat4.createFrom = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
     556         var dest = new MatrixArray(16);
     557
     558         dest[0] = m00;
     559         dest[1] = m01;
     560         dest[2] = m02;
     561         dest[3] = m03;
     562         dest[4] = m10;
     563         dest[5] = m11;
     564         dest[6] = m12;
     565         dest[7] = m13;
     566         dest[8] = m20;
     567         dest[9] = m21;
     568         dest[10] = m22;
     569         dest[11] = m23;
     570         dest[12] = m30;
     571         dest[13] = m31;
     572         dest[14] = m32;
     573         dest[15] = m33;
     574
     575         return dest;
     576     };*/
    577
    578     /**
     579      * Copies the values of one mat4 to another
     580      *
     581      * @param {mat4} mat mat4 containing values to copy
     582      * @param {mat4} dest mat4 receiving copied values
     583      *
     584      * @returns {mat4} dest
     585      */
    586     mat4.set = function (mat, dest) {
        587         dest[0] = mat[0];
        588         dest[1] = mat[1];
        589         dest[2] = mat[2];
        590         dest[3] = mat[3];
        591         dest[4] = mat[4];
        592         dest[5] = mat[5];
        593         dest[6] = mat[6];
        594         dest[7] = mat[7];
        595         dest[8] = mat[8];
        596         dest[9] = mat[9];
        597         dest[10] = mat[10];
        598         dest[11] = mat[11];
        599         dest[12] = mat[12];
        600         dest[13] = mat[13];
        601         dest[14] = mat[14];
        602         dest[15] = mat[15];
        603         return dest;
        604     };
    605
    606     /**
     607      * Compares two matrices for equality within a certain margin of error
     608      *
     609      * @param {mat4} a First matrix
     610      * @param {mat4} b Second matrix
     611      *
     612      * @returns {Boolean} True if a is equivalent to b
     613      */
    614 /*    mat4.equal = function (a, b) {
     615         return a === b || (
     616             Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
     617             Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
     618             Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
     619             Math.abs(a[3] - b[3]) < FLOAT_EPSILON &&
     620             Math.abs(a[4] - b[4]) < FLOAT_EPSILON &&
     621             Math.abs(a[5] - b[5]) < FLOAT_EPSILON &&
     622             Math.abs(a[6] - b[6]) < FLOAT_EPSILON &&
     623             Math.abs(a[7] - b[7]) < FLOAT_EPSILON &&
     624             Math.abs(a[8] - b[8]) < FLOAT_EPSILON &&
     625             Math.abs(a[9] - b[9]) < FLOAT_EPSILON &&
     626             Math.abs(a[10] - b[10]) < FLOAT_EPSILON &&
     627             Math.abs(a[11] - b[11]) < FLOAT_EPSILON &&
     628             Math.abs(a[12] - b[12]) < FLOAT_EPSILON &&
     629             Math.abs(a[13] - b[13]) < FLOAT_EPSILON &&
     630             Math.abs(a[14] - b[14]) < FLOAT_EPSILON &&
     631             Math.abs(a[15] - b[15]) < FLOAT_EPSILON
     632         );
     633     };*/
    634
    635     /**
     636      * Sets a mat4 to an identity matrix
     637      *
     638      * @param {mat4} dest mat4 to set
     639      *
     640      * @returns {mat4} dest
     641      */
    642     mat4.identity = function (dest) {
        643         if (!dest) { dest = mat4.create(); }
        644         dest[0] = 1;
        645         dest[1] = 0;
        646         dest[2] = 0;
        647         dest[3] = 0;
        648         dest[4] = 0;
        649         dest[5] = 1;
        650         dest[6] = 0;
        651         dest[7] = 0;
        652         dest[8] = 0;
        653         dest[9] = 0;
        654         dest[10] = 1;
        655         dest[11] = 0;
        656         dest[12] = 0;
        657         dest[13] = 0;
        658         dest[14] = 0;
        659         dest[15] = 1;
        660         return dest;
        661     };
    662
    663     /**
     664      * Transposes a mat4 (flips the values over the diagonal)
     665      *
     666      * @param {mat4} mat mat4 to transpose
     667      * @param {mat4} [dest] mat4 receiving transposed values. If not specified result is written to mat
     668      *
     669      * @param {mat4} dest is specified, mat otherwise
     670      */
    671     mat4.transpose = function (mat, dest) {
        672         // If we are transposing ourselves we can skip a few steps but have to cache some values
        673         if (!dest || mat === dest) {
            674             var a01 = mat[1], a02 = mat[2], a03 = mat[3],
                675                 a12 = mat[6], a13 = mat[7],
                676                 a23 = mat[11];
            677
            678             mat[1] = mat[4];
            679             mat[2] = mat[8];
            680             mat[3] = mat[12];
            681             mat[4] = a01;
            682             mat[6] = mat[9];
            683             mat[7] = mat[13];
            684             mat[8] = a02;
            685             mat[9] = a12;
            686             mat[11] = mat[14];
            687             mat[12] = a03;
            688             mat[13] = a13;
            689             mat[14] = a23;
            690             return mat;
            691         }
        692
        693         dest[0] = mat[0];
        694         dest[1] = mat[4];
        695         dest[2] = mat[8];
        696         dest[3] = mat[12];
        697         dest[4] = mat[1];
        698         dest[5] = mat[5];
        699         dest[6] = mat[9];
        700         dest[7] = mat[13];
        701         dest[8] = mat[2];
        702         dest[9] = mat[6];
        703         dest[10] = mat[10];
        704         dest[11] = mat[14];
        705         dest[12] = mat[3];
        706         dest[13] = mat[7];
        707         dest[14] = mat[11];
        708         dest[15] = mat[15];
        709         return dest;
        710     };
    711
    712     /**
     713      * Calculates the determinant of a mat4
     714      *
     715      * @param {mat4} mat mat4 to calculate determinant of
     716      *
     717      * @returns {number} determinant of mat
     718      */
    719     mat4.determinant = function (mat) {
        720         // Cache the matrix values (makes for huge speed increases!)
        721         var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
            722             a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
            723             a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
            724             a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
        725
        726         return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
        727                 a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
        728                 a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
        729                 a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
        730                 a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
        731                 a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
        732     };
    733
    734     /**
     735      * Calculates the inverse matrix of a mat4
     736      *
     737      * @param {mat4} mat mat4 to calculate inverse of
     738      * @param {mat4} [dest] mat4 receiving inverse matrix. If not specified result is written to mat
     739      *
     740      * @param {mat4} dest is specified, mat otherwise, null if matrix cannot be inverted
     741      */
    742     mat4.inverse = function (mat, dest) {
        743         if (!dest) { dest = mat; }
        744
        745         // Cache the matrix values (makes for huge speed increases!)
        746         var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
            747             a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
            748             a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
            749             a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],
            750
        751             b00 = a00 * a11 - a01 * a10,
            752             b01 = a00 * a12 - a02 * a10,
            753             b02 = a00 * a13 - a03 * a10,
            754             b03 = a01 * a12 - a02 * a11,
            755             b04 = a01 * a13 - a03 * a11,
            756             b05 = a02 * a13 - a03 * a12,
            757             b06 = a20 * a31 - a21 * a30,
            758             b07 = a20 * a32 - a22 * a30,
            759             b08 = a20 * a33 - a23 * a30,
            760             b09 = a21 * a32 - a22 * a31,
            761             b10 = a21 * a33 - a23 * a31,
            762             b11 = a22 * a33 - a23 * a32,
            763
        764             d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
            765             invDet;
        766
        767             // Calculate the determinant
        768             if (!d) { return null; }
        769             invDet = 1 / d;
        770
        771         dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        772         dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        773         dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        774         dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
        775         dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        776         dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        777         dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        778         dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        779         dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        780         dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        781         dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        782         dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
        783         dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        784         dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        785         dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        786         dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        787
        788         return dest;
        789     };
    790
    791     /**
     792      * Copies the upper 3x3 elements of a mat4 into another mat4
     793      *
     794      * @param {mat4} mat mat4 containing values to copy
     795      * @param {mat4} [dest] mat4 receiving copied values
     796      *
     797      * @returns {mat4} dest is specified, a new mat4 otherwise
     798      */
    799     mat4.toRotationMat = function (mat, dest) {
        800         if (!dest) { dest = mat4.create(); }
        801
        802         dest[0] = mat[0];
        803         dest[1] = mat[1];
        804         dest[2] = mat[2];
        805         dest[3] = mat[3];
        806         dest[4] = mat[4];
        807         dest[5] = mat[5];
        808         dest[6] = mat[6];
        809         dest[7] = mat[7];
        810         dest[8] = mat[8];
        811         dest[9] = mat[9];
        812         dest[10] = mat[10];
        813         dest[11] = mat[11];
        814         dest[12] = 0;
        815         dest[13] = 0;
        816         dest[14] = 0;
        817         dest[15] = 1;
        818
        819         return dest;
        820     };
    821
    822     /**
     823      * Copies the upper 3x3 elements of a mat4 into a mat3
     824      *
     825      * @param {mat4} mat mat4 containing values to copy
     826      * @param {mat3} [dest] mat3 receiving copied values
     827      *
     828      * @returns {mat3} dest is specified, a new mat3 otherwise
     829      */
    830     mat4.toMat3 = function (mat, dest) {
        831         if (!dest) { dest = mat3.create(); }
        832
        833         dest[0] = mat[0];
        834         dest[1] = mat[1];
        835         dest[2] = mat[2];
        836         dest[3] = mat[4];
        837         dest[4] = mat[5];
        838         dest[5] = mat[6];
        839         dest[6] = mat[8];
        840         dest[7] = mat[9];
        841         dest[8] = mat[10];
        842
        843         return dest;
        844     };
    845
    846     /**
     847      * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
     848      * The resulting matrix is useful for calculating transformed normals
     849      *
     850      * Params:
     851      * @param {mat4} mat mat4 containing values to invert and copy
     852      * @param {mat3} [dest] mat3 receiving values
     853      *
     854      * @returns {mat3} dest is specified, a new mat3 otherwise, null if the matrix cannot be inverted
     855      */
    856  /*   mat4.toInverseMat3 = function (mat, dest) {
     857         // Cache the matrix values (makes for huge speed increases!)
     858         var a00 = mat[0], a01 = mat[1], a02 = mat[2],
     859             a10 = mat[4], a11 = mat[5], a12 = mat[6],
     860             a20 = mat[8], a21 = mat[9], a22 = mat[10],
     861
     862             b01 = a22 * a11 - a12 * a21,
     863             b11 = -a22 * a10 + a12 * a20,
     864             b21 = a21 * a10 - a11 * a20,
     865
     866             d = a00 * b01 + a01 * b11 + a02 * b21,
     867             id;
     868
     869         if (!d) { return null; }
     870         id = 1 / d;
     871
     872         if (!dest) { dest = mat3.create(); }
     873
     874         dest[0] = b01 * id;
     875         dest[1] = (-a22 * a01 + a02 * a21) * id;
     876         dest[2] = (a12 * a01 - a02 * a11) * id;
     877         dest[3] = b11 * id;
     878         dest[4] = (a22 * a00 - a02 * a20) * id;
     879         dest[5] = (-a12 * a00 + a02 * a10) * id;
     880         dest[6] = b21 * id;
     881         dest[7] = (-a21 * a00 + a01 * a20) * id;
     882         dest[8] = (a11 * a00 - a01 * a10) * id;
     883
     884         return dest;
     885     };*/
    886
    887     /**
     888      * Performs a matrix multiplication
     889      *
     890      * @param {mat4} mat First operand
     891      * @param {mat4} mat2 Second operand
     892      * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     893      *
     894      * @returns {mat4} dest if specified, mat otherwise
     895      */
    896     mat4.multiply = function (mat, mat2, dest) {
        897         if (!dest) { dest = mat; }
        898
        899         // Cache the matrix values (makes for huge speed increases!)
        900         var a00 = mat[ 0], a01 = mat[ 1], a02 = mat[ 2], a03 = mat[3];
        901         var a10 = mat[ 4], a11 = mat[ 5], a12 = mat[ 6], a13 = mat[7];
        902         var a20 = mat[ 8], a21 = mat[ 9], a22 = mat[10], a23 = mat[11];
        903         var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
        904
        905         // Cache only the current line of the second matrix
        906         var b0  = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];
        907         dest[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        908         dest[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        909         dest[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        910         dest[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
        911
        912         b0 = mat2[4];
        913         b1 = mat2[5];
        914         b2 = mat2[6];
        915         b3 = mat2[7];
        916         dest[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        917         dest[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        918         dest[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        919         dest[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
        920
        921         b0 = mat2[8];
        922         b1 = mat2[9];
        923         b2 = mat2[10];
        924         b3 = mat2[11];
        925         dest[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        926         dest[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        927         dest[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        928         dest[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
        929
        930         b0 = mat2[12];
        931         b1 = mat2[13];
        932         b2 = mat2[14];
        933         b3 = mat2[15];
        934         dest[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
        935         dest[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
        936         dest[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
        937         dest[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
        938
        939         return dest;
        940     };
    941
    942     /**
     943      * Transforms a vec3 with the given matrix
     944      * 4th vector component is implicitly '1'
     945      *
     946      * @param {mat4} mat mat4 to transform the vector with
     947      * @param {vec3} vec vec3 to transform
     948      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     949      *
     950      * @returns {vec3} dest if specified, vec otherwise
     951      */
    952     mat4.multiplyVec3 = function (mat, vec, dest) {
        953         if (!dest) { dest = vec; }
        954
        955         var x = vec[0], y = vec[1], z = vec[2];
        956
        957         dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
        958         dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
        959         dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
        960
        961         return dest;
        962     };
    963
    964     /**
     965      * Transforms a vec4 with the given matrix
     966      *
     967      * @param {mat4} mat mat4 to transform the vector with
     968      * @param {vec4} vec vec4 to transform
     969      * @param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vec
     970      *
     971      * @returns {vec4} dest if specified, vec otherwise
     972      */
    973     mat4.multiplyVec4 = function (mat, vec, dest) {
        974         if (!dest) { dest = vec; }
        975
        976         var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
        977
        978         dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
        979         dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
        980         dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
        981         dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;
        982
        983         return dest;
        984     };
    985
    986 	/**
     987 	  Project a vec3
     988 	*/
    989 	mat4.project = function(mat, vec, dest)
    990 	{
        991 		if(!dest) { dest = vec }
        992 		mat4.multiplyVec4( mat, vec, dest );
        993 		var iw = 1.0 / dest[3];
        994 		dest[0] *= iw;
        995 		dest[1] *= iw;
        996 		dest[2] *= iw;
        997 		return dest;
        998 	}
    999
    1000 	/**
     1001 	 * mat4.rotateVec3
     1002 	 * Rotate a vec3 with the given matrix
     1003 	 *
     1004 	 * Params:
     1005 	 * mat - mat4 to transform the vector with
     1006 	 * vec - vec3 to transform
     1007 	 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
     1008 	 *
     1009 	 * Returns:
     1010 	 * dest if specified, vec otherwise
     1011 	 */
    1012 	mat4.rotateVec3 = function(mat, vec, dest) {
        1013 		if(!dest) { dest = vec }
        1014
        1015 		var x = vec[0], y = vec[1], z = vec[2];
        1016
        1017 		dest[0] = mat[0]*x + mat[4]*y + mat[8]*z;
        1018 		dest[1] = mat[1]*x + mat[5]*y + mat[9]*z;
        1019 		dest[2] = mat[2]*x + mat[6]*y + mat[10]*z;
        1020
        1021 		return dest;
        1022 	};
    1023
    1024     /**
     1025      * Translates a matrix by the given vector
     1026      *
     1027      * @param {mat4} mat mat4 to translate
     1028      * @param {vec3} vec vec3 specifying the translation
     1029      * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     1030      *
     1031      * @returns {mat4} dest if specified, mat otherwise
     1032      */
    1033     mat4.translate = function (mat, vec, dest) {
        1034         var x = vec[0], y = vec[1], z = vec[2],
            1035             a00, a01, a02, a03,
            1036             a10, a11, a12, a13,
            1037             a20, a21, a22, a23;
        1038
        1039         if (!dest || mat === dest) {
            1040             mat[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
            1041             mat[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
            1042             mat[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
            1043             mat[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            1044             return mat;
            1045         }
        1046
        1047         a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
        1048         a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
        1049         a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];
        1050
        1051         dest[0] = a00; dest[1] = a01; dest[2] = a02; dest[3] = a03;
        1052         dest[4] = a10; dest[5] = a11; dest[6] = a12; dest[7] = a13;
        1053         dest[8] = a20; dest[9] = a21; dest[10] = a22; dest[11] = a23;
        1054
        1055         dest[12] = a00 * x + a10 * y + a20 * z + mat[12];
        1056         dest[13] = a01 * x + a11 * y + a21 * z + mat[13];
        1057         dest[14] = a02 * x + a12 * y + a22 * z + mat[14];
        1058         dest[15] = a03 * x + a13 * y + a23 * z + mat[15];
        1059         return dest;
        1060     };
    1061
    1062     /**
     1063      * Scales a matrix by the given vector
     1064      *
     1065      * @param {mat4} mat mat4 to scale
     1066      * @param {vec3} vec vec3 specifying the scale for each axis
     1067      * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     1068      *
     1069      * @param {mat4} dest if specified, mat otherwise
     1070      */
    1071     mat4.scale = function (mat, vec, dest) {
        1072         var x = vec[0], y = vec[1], z = vec[2];
        1073
        1074         if (!dest || mat === dest) {
            1075             mat[0] *= x;
            1076             mat[1] *= x;
            1077             mat[2] *= x;
            1078             mat[3] *= x;
            1079             mat[4] *= y;
            1080             mat[5] *= y;
            1081             mat[6] *= y;
            1082             mat[7] *= y;
            1083             mat[8] *= z;
            1084             mat[9] *= z;
            1085             mat[10] *= z;
            1086             mat[11] *= z;
            1087             return mat;
            1088         }
        1089
        1090         dest[0] = mat[0] * x;
        1091         dest[1] = mat[1] * x;
        1092         dest[2] = mat[2] * x;
        1093         dest[3] = mat[3] * x;
        1094         dest[4] = mat[4] * y;
        1095         dest[5] = mat[5] * y;
        1096         dest[6] = mat[6] * y;
        1097         dest[7] = mat[7] * y;
        1098         dest[8] = mat[8] * z;
        1099         dest[9] = mat[9] * z;
        1100         dest[10] = mat[10] * z;
        1101         dest[11] = mat[11] * z;
        1102         dest[12] = mat[12];
        1103         dest[13] = mat[13];
        1104         dest[14] = mat[14];
        1105         dest[15] = mat[15];
        1106         return dest;
        1107     };
    1108
    1109     /**
     1110      * Rotates a matrix by the given angle around the specified axis
     1111      * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
     1112      *
     1113      * @param {mat4} mat mat4 to rotate
     1114      * @param {number} angle Angle (in radians) to rotate
     1115      * @param {vec3} axis vec3 representing the axis to rotate around
     1116      * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     1117      *
     1118      * @returns {mat4} dest if specified, mat otherwise
     1119      */
    1120     mat4.rotate = function (mat, angle, axis, dest) {
        1121         var x = axis[0], y = axis[1], z = axis[2],
            1122             len = Math.sqrt(x * x + y * y + z * z),
            1123             s, c, t,
            1124             a00, a01, a02, a03,
            1125             a10, a11, a12, a13,
            1126             a20, a21, a22, a23,
            1127             b00, b01, b02,
            1128             b10, b11, b12,
            1129             b20, b21, b22;
        1130
        1131         if (!len) { return null; }
        1132         if (len !== 1) {
            1133             len = 1 / len;
            1134             x *= len;
            1135             y *= len;
            1136             z *= len;
            1137         }
        1138
        1139         s = Math.sin(angle);
        1140         c = Math.cos(angle);
        1141         t = 1 - c;
        1142
        1143         a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
        1144         a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
        1145         a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];
        1146
        1147         // Construct the elements of the rotation matrix
        1148         b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
        1149         b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
        1150         b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;
        1151
        1152         if (!dest) {
            1153             dest = mat;
            1154         } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
            1155             dest[12] = mat[12];
            1156             dest[13] = mat[13];
            1157             dest[14] = mat[14];
            1158             dest[15] = mat[15];
            1159         }
        1160
        1161         // Perform rotation-specific matrix multiplication
        1162         dest[0] = a00 * b00 + a10 * b01 + a20 * b02;
        1163         dest[1] = a01 * b00 + a11 * b01 + a21 * b02;
        1164         dest[2] = a02 * b00 + a12 * b01 + a22 * b02;
        1165         dest[3] = a03 * b00 + a13 * b01 + a23 * b02;
        1166
        1167         dest[4] = a00 * b10 + a10 * b11 + a20 * b12;
        1168         dest[5] = a01 * b10 + a11 * b11 + a21 * b12;
        1169         dest[6] = a02 * b10 + a12 * b11 + a22 * b12;
        1170         dest[7] = a03 * b10 + a13 * b11 + a23 * b12;
        1171
        1172         dest[8] = a00 * b20 + a10 * b21 + a20 * b22;
        1173         dest[9] = a01 * b20 + a11 * b21 + a21 * b22;
        1174         dest[10] = a02 * b20 + a12 * b21 + a22 * b22;
        1175         dest[11] = a03 * b20 + a13 * b21 + a23 * b22;
        1176         return dest;
        1177     };
    1178
    1179     /**
     1180      * Rotates a matrix by the given angle around the X axis
     1181      *
     1182      * @param {mat4} mat mat4 to rotate
     1183      * @param {number} angle Angle (in radians) to rotate
     1184      * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     1185      *
     1186      * @returns {mat4} dest if specified, mat otherwise
     1187      */
    1188     mat4.rotateX = function (mat, angle, dest) {
        1189         var s = Math.sin(angle),
            1190             c = Math.cos(angle),
            1191             a10 = mat[4],
            1192             a11 = mat[5],
            1193             a12 = mat[6],
            1194             a13 = mat[7],
            1195             a20 = mat[8],
            1196             a21 = mat[9],
            1197             a22 = mat[10],
            1198             a23 = mat[11];
        1199
        1200         if (!dest) {
            1201             dest = mat;
            1202         } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            1203             dest[0] = mat[0];
            1204             dest[1] = mat[1];
            1205             dest[2] = mat[2];
            1206             dest[3] = mat[3];
            1207
            1208             dest[12] = mat[12];
            1209             dest[13] = mat[13];
            1210             dest[14] = mat[14];
            1211             dest[15] = mat[15];
            1212         }
        1213
        1214         // Perform axis-specific matrix multiplication
        1215         dest[4] = a10 * c + a20 * s;
        1216         dest[5] = a11 * c + a21 * s;
        1217         dest[6] = a12 * c + a22 * s;
        1218         dest[7] = a13 * c + a23 * s;
        1219
        1220         dest[8] = a10 * -s + a20 * c;
        1221         dest[9] = a11 * -s + a21 * c;
        1222         dest[10] = a12 * -s + a22 * c;
        1223         dest[11] = a13 * -s + a23 * c;
        1224         return dest;
        1225     };
    1226
    1227     /**
     1228      * Rotates a matrix by the given angle around the Y axis
     1229      *
     1230      * @param {mat4} mat mat4 to rotate
     1231      * @param {number} angle Angle (in radians) to rotate
     1232      * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     1233      *
     1234      * @returns {mat4} dest if specified, mat otherwise
     1235      */
    1236     mat4.rotateY = function (mat, angle, dest) {
        1237         var s = Math.sin(angle),
            1238             c = Math.cos(angle),
            1239             a00 = mat[0],
            1240             a01 = mat[1],
            1241             a02 = mat[2],
            1242             a03 = mat[3],
            1243             a20 = mat[8],
            1244             a21 = mat[9],
            1245             a22 = mat[10],
            1246             a23 = mat[11];
        1247
        1248         if (!dest) {
            1249             dest = mat;
            1250         } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            1251             dest[4] = mat[4];
            1252             dest[5] = mat[5];
            1253             dest[6] = mat[6];
            1254             dest[7] = mat[7];
            1255
            1256             dest[12] = mat[12];
            1257             dest[13] = mat[13];
            1258             dest[14] = mat[14];
            1259             dest[15] = mat[15];
            1260         }
        1261
        1262         // Perform axis-specific matrix multiplication
        1263         dest[0] = a00 * c + a20 * -s;
        1264         dest[1] = a01 * c + a21 * -s;
        1265         dest[2] = a02 * c + a22 * -s;
        1266         dest[3] = a03 * c + a23 * -s;
        1267
        1268         dest[8] = a00 * s + a20 * c;
        1269         dest[9] = a01 * s + a21 * c;
        1270         dest[10] = a02 * s + a22 * c;
        1271         dest[11] = a03 * s + a23 * c;
        1272         return dest;
        1273     };
    1274
    1275     /**
     1276      * Rotates a matrix by the given angle around the Z axis
     1277      *
     1278      * @param {mat4} mat mat4 to rotate
     1279      * @param {number} angle Angle (in radians) to rotate
     1280      * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     1281      *
     1282      * @returns {mat4} dest if specified, mat otherwise
     1283      */
    1284     mat4.rotateZ = function (mat, angle, dest) {
        1285         var s = Math.sin(angle),
            1286             c = Math.cos(angle),
            1287             a00 = mat[0],
            1288             a01 = mat[1],
            1289             a02 = mat[2],
            1290             a03 = mat[3],
            1291             a10 = mat[4],
            1292             a11 = mat[5],
            1293             a12 = mat[6],
            1294             a13 = mat[7];
        1295
        1296         if (!dest) {
            1297             dest = mat;
            1298         } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
            1299             dest[8] = mat[8];
            1300             dest[9] = mat[9];
            1301             dest[10] = mat[10];
            1302             dest[11] = mat[11];
            1303
            1304             dest[12] = mat[12];
            1305             dest[13] = mat[13];
            1306             dest[14] = mat[14];
            1307             dest[15] = mat[15];
            1308         }
        1309
        1310         // Perform axis-specific matrix multiplication
        1311         dest[0] = a00 * c + a10 * s;
        1312         dest[1] = a01 * c + a11 * s;
        1313         dest[2] = a02 * c + a12 * s;
        1314         dest[3] = a03 * c + a13 * s;
        1315
        1316         dest[4] = a00 * -s + a10 * c;
        1317         dest[5] = a01 * -s + a11 * c;
        1318         dest[6] = a02 * -s + a12 * c;
        1319         dest[7] = a03 * -s + a13 * c;
        1320
        1321         return dest;
        1322     };
    1323
    1324     /**
     1325      * Generates a frustum matrix with the given bounds
     1326      *
     1327      * @param {number} left Left bound of the frustum
     1328      * @param {number} right Right bound of the frustum
     1329      * @param {number} bottom Bottom bound of the frustum
     1330      * @param {number} top Top bound of the frustum
     1331      * @param {number} near Near bound of the frustum
     1332      * @param {number} far Far bound of the frustum
     1333      * @param {mat4} [dest] mat4 frustum matrix will be written into
     1334      *
     1335      * @returns {mat4} dest if specified, a new mat4 otherwise
     1336      */
    1337     mat4.frustum = function (left, right, bottom, top, near, far, dest) {
        1338         if (!dest) { dest = mat4.create(); }
        1339         var rl = (right - left),
            1340             tb = (top - bottom),
            1341             fn = (far - near);
        1342         dest[0] = (near * 2) / rl;
        1343         dest[1] = 0;
        1344         dest[2] = 0;
        1345         dest[3] = 0;
        1346         dest[4] = 0;
        1347         dest[5] = (near * 2) / tb;
        1348         dest[6] = 0;
        1349         dest[7] = 0;
        1350         dest[8] = (right + left) / rl;
        1351         dest[9] = (top + bottom) / tb;
        1352         dest[10] = -(far + near) / fn;
        1353         dest[11] = -1;
        1354         dest[12] = 0;
        1355         dest[13] = 0;
        1356         dest[14] = -(far * near * 2) / fn;
        1357         dest[15] = 0;
        1358         return dest;
        1359     };
    1360
    1361     /**
     1362      * Generates a perspective projection matrix with the given bounds
     1363      *
     1364      * @param {number} fovy Vertical field of view
     1365      * @param {number} aspect Aspect ratio. typically viewport width/height
     1366      * @param {number} near Near bound of the frustum
     1367      * @param {number} far Far bound of the frustum
     1368      * @param {mat4} [dest] mat4 frustum matrix will be written into
     1369      *
     1370      * @returns {mat4} dest if specified, a new mat4 otherwise
     1371      */
    1372     mat4.perspective = function (fovy, aspect, near, far, dest) {
        1373         var top = near * Math.tan(fovy * Math.PI / 360.0),
            1374             right = top * aspect;
        1375         return mat4.frustum(-right, right, -top, top, near, far, dest);
        1376     };
    1377
    1378     /**
     1379      * Generates a orthogonal projection matrix with the given bounds
     1380      *
     1381      * @param {number} left Left bound of the frustum
     1382      * @param {number} right Right bound of the frustum
     1383      * @param {number} bottom Bottom bound of the frustum
     1384      * @param {number} top Top bound of the frustum
     1385      * @param {number} near Near bound of the frustum
     1386      * @param {number} far Far bound of the frustum
     1387      * @param {mat4} [dest] mat4 frustum matrix will be written into
     1388      *
     1389      * @returns {mat4} dest if specified, a new mat4 otherwise
     1390      */
    1391     mat4.ortho = function (left, right, bottom, top, near, far, dest) {
        1392         if (!dest) { dest = mat4.create(); }
        1393         var rl = (right - left),
            1394             tb = (top - bottom),
            1395             fn = (far - near);
        1396         dest[0] = 2 / rl;
        1397         dest[1] = 0;
        1398         dest[2] = 0;
        1399         dest[3] = 0;
        1400         dest[4] = 0;
        1401         dest[5] = 2 / tb;
        1402         dest[6] = 0;
        1403         dest[7] = 0;
        1404         dest[8] = 0;
        1405         dest[9] = 0;
        1406         dest[10] = -2 / fn;
        1407         dest[11] = 0;
        1408         dest[12] = -(left + right) / rl;
        1409         dest[13] = -(top + bottom) / tb;
        1410         dest[14] = -(far + near) / fn;
        1411         dest[15] = 1;
        1412         return dest;
        1413     };
    1414
    1415     /**
     1416      * Generates a look-at matrix with the given eye position, focal point, and up axis
     1417      *
     1418      * @param {vec3} eye Position of the viewer
     1419      * @param {vec3} center Point the viewer is looking at
     1420      * @param {vec3} up vec3 pointing "up"
     1421      * @param {mat4} [dest] mat4 frustum matrix will be written into
     1422      *
     1423      * @returns {mat4} dest if specified, a new mat4 otherwise
     1424      */
    1425     mat4.lookAt = function (eye, center, up, dest) {
        1426         if (!dest) { dest = mat4.create(); }
        1427
        1428         var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
            1429             eyex = eye[0],
            1430             eyey = eye[1],
            1431             eyez = eye[2],
            1432             upx = up[0],
            1433             upy = up[1],
            1434             upz = up[2],
            1435             centerx = center[0],
            1436             centery = center[1],
            1437             centerz = center[2];
        1438
        1439         if (eyex === centerx && eyey === centery && eyez === centerz) {
            1440             return mat4.identity(dest);
            1441         }
        1442
        1443         //vec3.direction(eye, center, z);
        1444         z0 = eyex - centerx;
        1445         z1 = eyey - centery;
        1446         z2 = eyez - centerz;
        1447
        1448         // normalize (no check needed for 0 because of early return)
        1449         len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        1450         z0 *= len;
        1451         z1 *= len;
        1452         z2 *= len;
        1453
        1454         //vec3.normalize(vec3.cross(up, z, x));
        1455         x0 = upy * z2 - upz * z1;
        1456         x1 = upz * z0 - upx * z2;
        1457         x2 = upx * z1 - upy * z0;
        1458         len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        1459         if (!len) {
            1460             x0 = 0;
            1461             x1 = 0;
            1462             x2 = 0;
            1463         } else {
            1464             len = 1 / len;
            1465             x0 *= len;
            1466             x1 *= len;
            1467             x2 *= len;
            1468         }
        1469
        1470         //vec3.normalize(vec3.cross(z, x, y));
        1471         y0 = z1 * x2 - z2 * x1;
        1472         y1 = z2 * x0 - z0 * x2;
        1473         y2 = z0 * x1 - z1 * x0;
        1474
        1475         len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        1476         if (!len) {
            1477             y0 = 0;
            1478             y1 = 0;
            1479             y2 = 0;
            1480         } else {
            1481             len = 1 / len;
            1482             y0 *= len;
            1483             y1 *= len;
            1484             y2 *= len;
            1485         }
        1486
        1487         dest[0] = x0;
        1488         dest[1] = y0;
        1489         dest[2] = z0;
        1490         dest[3] = 0;
        1491         dest[4] = x1;
        1492         dest[5] = y1;
        1493         dest[6] = z1;
        1494         dest[7] = 0;
        1495         dest[8] = x2;
        1496         dest[9] = y2;
        1497         dest[10] = z2;
        1498         dest[11] = 0;
        1499         dest[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        1500         dest[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        1501         dest[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        1502         dest[15] = 1;
        1503
        1504         return dest;
        1505     };
    1506
    1507     /**
     1508      * Creates a matrix from a quaternion rotation and vector translation
     1509      * This is equivalent to (but much faster than):
     1510      *
     1511      *     mat4.identity(dest);
     1512      *     mat4.translate(dest, vec);
     1513      *     var quatMat = mat4.create();
     1514      *     quat4.toMat4(quat, quatMat);
     1515      *     mat4.multiply(dest, quatMat);
     1516      *
     1517      * @param {quat4} quat Rotation quaternion
     1518      * @param {vec3} vec Translation vector
     1519      * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to a new mat4
     1520      *
     1521      * @returns {mat4} dest if specified, a new mat4 otherwise
     1522      */
    1523 /*    mat4.fromRotationTranslation = function (quat, vec, dest) {
     1524         if (!dest) { dest = mat4.create(); }
     1525
     1526         // Quaternion math
     1527         var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
     1528             x2 = x + x,
     1529             y2 = y + y,
     1530             z2 = z + z,
     1531
     1532             xx = x * x2,
     1533             xy = x * y2,
     1534             xz = x * z2,
     1535             yy = y * y2,
     1536             yz = y * z2,
     1537             zz = z * z2,
     1538             wx = w * x2,
     1539             wy = w * y2,
     1540             wz = w * z2;
     1541
     1542         dest[0] = 1 - (yy + zz);
     1543         dest[1] = xy + wz;
     1544         dest[2] = xz - wy;
     1545         dest[3] = 0;
     1546         dest[4] = xy - wz;
     1547         dest[5] = 1 - (xx + zz);
     1548         dest[6] = yz + wx;
     1549         dest[7] = 0;
     1550         dest[8] = xz + wy;
     1551         dest[9] = yz - wx;
     1552         dest[10] = 1 - (xx + yy);
     1553         dest[11] = 0;
     1554         dest[12] = vec[0];
     1555         dest[13] = vec[1];
     1556         dest[14] = vec[2];
     1557         dest[15] = 1;
     1558
     1559         return dest;
     1560     };*/
    1561
    1562     /**
     1563      * Returns a string representation of a mat4
     1564      *
     1565      * @param {mat4} mat mat4 to represent as a string
     1566      *
     1567      * @returns {string} String representation of mat
     1568      */
    1569     mat4.str = function (mat) {
        1570         return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] +
            1571             ', ' + mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] +
        1572             ', ' + mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] +
        1573             ', ' + mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
        1574     };
    1575
    1576     /**
     1577      * @class Quaternion
     1578      * @name quat4
     1579      */
    1580     var quat4 = {};
    1581
    1582     /**
     1583      * Creates a new instance of a quat4 using the default array type
     1584      * Any javascript array containing at least 4 numeric elements can serve as a quat4
     1585      *
     1586      * @param {quat4} [quat] quat4 containing values to initialize with
     1587      *
     1588      * @returns {quat4} New quat4
     1589      */
    1590     quat4.create = function (quat) {
        1591         var dest = new MatrixArray(4);
        1592
        1593         if (quat) {
            1594             dest[0] = quat[0];
            1595             dest[1] = quat[1];
            1596             dest[2] = quat[2];
            1597             dest[3] = quat[3];
            1598         } else {
            1599             dest[0] = dest[1] = dest[2] = dest[3] = 0;
            1600         }
        1601
        1602         return dest;
        1603     };
    1604
    1605     /**
     1606      * Creates a new instance of a quat4, initializing it with the given arguments
     1607      *
     1608      * @param {number} x X value
     1609      * @param {number} y Y value
     1610      * @param {number} z Z value
     1611      * @param {number} w W value
     1612
     1613      * @returns {quat4} New quat4
     1614      */
    1615     quat4.createFrom = function (x, y, z, w) {
        1616         var dest = new MatrixArray(4);
        1617
        1618         dest[0] = x;
        1619         dest[1] = y;
        1620         dest[2] = z;
        1621         dest[3] = w;
        1622
        1623         return dest;
        1624     };
    1625
    1626     /**
     1627      * Copies the values of one quat4 to another
     1628      *
     1629      * @param {quat4} quat quat4 containing values to copy
     1630      * @param {quat4} dest quat4 receiving copied values
     1631      *
     1632      * @returns {quat4} dest
     1633      */
    1634     quat4.set = function (quat, dest) {
        1635         dest[0] = quat[0];
        1636         dest[1] = quat[1];
        1637         dest[2] = quat[2];
        1638         dest[3] = quat[3];
        1639
        1640         return dest;
        1641     };
    1642
    1643     /**
     1644      * Compares two quaternions for equality within a certain margin of error
     1645      *
     1646      * @param {quat4} a First vector
     1647      * @param {quat4} b Second vector
     1648      *
     1649      * @returns {Boolean} True if a is equivalent to b
     1650      */
    1651     quat4.equal = function (a, b) {
        1652         return a === b || (
                1653             Math.abs(a[0] - b[0]) < FLOAT_EPSILON &&
        1654             Math.abs(a[1] - b[1]) < FLOAT_EPSILON &&
        1655             Math.abs(a[2] - b[2]) < FLOAT_EPSILON &&
        1656             Math.abs(a[3] - b[3]) < FLOAT_EPSILON
        1657         );
        1658     };
    1659
    1660     /**
     1661      * Creates a new identity Quat4
     1662      *
     1663      * @param {quat4} [dest] quat4 receiving copied values
     1664      *
     1665      * @returns {quat4} dest is specified, new quat4 otherwise
     1666      */
    1667     quat4.identity = function (dest) {
        1668         if (!dest) { dest = quat4.create(); }
        1669         dest[0] = 0;
        1670         dest[1] = 0;
        1671         dest[2] = 0;
        1672         dest[3] = 1;
        1673         return dest;
        1674     };
    1675
    1676     var identityQuat4 = quat4.identity();
    1677
    1678     /**
     1679      * Calculates the W component of a quat4 from the X, Y, and Z components.
     1680      * Assumes that quaternion is 1 unit in length.
     1681      * Any existing W component will be ignored.
     1682      *
     1683      * @param {quat4} quat quat4 to calculate W component of
     1684      * @param {quat4} [dest] quat4 receiving calculated values. If not specified result is written to quat
     1685      *
     1686      * @returns {quat4} dest if specified, quat otherwise
     1687      */
    1688     quat4.calculateW = function (quat, dest) {
        1689         var x = quat[0], y = quat[1], z = quat[2];
        1690
        1691         if (!dest || quat === dest) {
            1692             quat[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            1693             return quat;
            1694         }
        1695         dest[0] = x;
        1696         dest[1] = y;
        1697         dest[2] = z;
        1698         dest[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        1699         return dest;
        1700     };
    1701
    1702     /**
     1703      * Calculates the dot product of two quaternions
     1704      *
     1705      * @param {quat4} quat First operand
     1706      * @param {quat4} quat2 Second operand
     1707      *
     1708      * @return {number} Dot product of quat and quat2
     1709      */
    1710     quat4.dot = function(quat, quat2){
        1711         return quat[0]*quat2[0] + quat[1]*quat2[1] + quat[2]*quat2[2] + quat[3]*quat2[3];
        1712     };
    1713
    1714     /**
     1715      * Calculates the inverse of a quat4
     1716      *
     1717      * @param {quat4} quat quat4 to calculate inverse of
     1718      * @param {quat4} [dest] quat4 receiving inverse values. If not specified result is written to quat
     1719      *
     1720      * @returns {quat4} dest if specified, quat otherwise
     1721      */
    1722     quat4.inverse = function(quat, dest) {
        1723         var q0 = quat[0], q1 = quat[1], q2 = quat[2], q3 = quat[3],
            1724             dot = q0*q0 + q1*q1 + q2*q2 + q3*q3,
            1725             invDot = dot ? 1.0/dot : 0;
        1726
        1727         // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
        1728
        1729         if(!dest || quat === dest) {
            1730             quat[0] *= -invDot;
            1731             quat[1] *= -invDot;
            1732             quat[2] *= -invDot;
            1733             quat[3] *= invDot;
            1734             return quat;
            1735         }
        1736         dest[0] = -quat[0]*invDot;
        1737         dest[1] = -quat[1]*invDot;
        1738         dest[2] = -quat[2]*invDot;
        1739         dest[3] = quat[3]*invDot;
        1740         return dest;
        1741     };
    1742
    1743
    1744     /**
     1745      * Calculates the conjugate of a quat4
     1746      * If the quaternion is normalized, this function is faster than quat4.inverse and produces the same result.
     1747      *
     1748      * @param {quat4} quat quat4 to calculate conjugate of
     1749      * @param {quat4} [dest] quat4 receiving conjugate values. If not specified result is written to quat
     1750      *
     1751      * @returns {quat4} dest if specified, quat otherwise
     1752      */
    1753     quat4.conjugate = function (quat, dest) {
        1754         if (!dest || quat === dest) {
            1755             quat[0] *= -1;
            1756             quat[1] *= -1;
            1757             quat[2] *= -1;
            1758             return quat;
            1759         }
        1760         dest[0] = -quat[0];
        1761         dest[1] = -quat[1];
        1762         dest[2] = -quat[2];
        1763         dest[3] = quat[3];
        1764         return dest;
        1765     };
    1766
    1767     /**
     1768      * Calculates the length of a quat4
     1769      *
     1770      * Params:
     1771      * @param {quat4} quat quat4 to calculate length of
     1772      *
     1773      * @returns Length of quat
     1774      */
    1775     quat4.length = function (quat) {
        1776         var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
        1777         return Math.sqrt(x * x + y * y + z * z + w * w);
        1778     };
    1779
    1780     /**
     1781      * Generates a unit quaternion of the same direction as the provided quat4
     1782      * If quaternion length is 0, returns [0, 0, 0, 0]
     1783      *
     1784      * @param {quat4} quat quat4 to normalize
     1785      * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     1786      *
     1787      * @returns {quat4} dest if specified, quat otherwise
     1788      */
    1789     quat4.normalize = function (quat, dest) {
        1790         if (!dest) { dest = quat; }
        1791
        1792         var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            1793             len = Math.sqrt(x * x + y * y + z * z + w * w);
        1794         if (len === 0) {
            1795             dest[0] = 0;
            1796             dest[1] = 0;
            1797             dest[2] = 0;
            1798             dest[3] = 0;
            1799             return dest;
            1800         }
        1801         len = 1 / len;
        1802         dest[0] = x * len;
        1803         dest[1] = y * len;
        1804         dest[2] = z * len;
        1805         dest[3] = w * len;
        1806
        1807         return dest;
        1808     };
    1809
    1810     /**
     1811      * Performs quaternion addition
     1812      *
     1813      * @param {quat4} quat First operand
     1814      * @param {quat4} quat2 Second operand
     1815      * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     1816      *
     1817      * @returns {quat4} dest if specified, quat otherwise
     1818      */
    1819     quat4.add = function (quat, quat2, dest) {
        1820         if(!dest || quat === dest) {
            1821             quat[0] += quat2[0];
            1822             quat[1] += quat2[1];
            1823             quat[2] += quat2[2];
            1824             quat[3] += quat2[3];
            1825             return quat;
            1826         }
        1827         dest[0] = quat[0]+quat2[0];
        1828         dest[1] = quat[1]+quat2[1];
        1829         dest[2] = quat[2]+quat2[2];
        1830         dest[3] = quat[3]+quat2[3];
        1831         return dest;
        1832     };
    1833
    1834     /**
     1835      * Performs a quaternion multiplication
     1836      *
     1837      * @param {quat4} quat First operand
     1838      * @param {quat4} quat2 Second operand
     1839      * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     1840      *
     1841      * @returns {quat4} dest if specified, quat otherwise
     1842      */
    1843     quat4.multiply = function (quat, quat2, dest) {
        1844         if (!dest) { dest = quat; }
        1845
        1846         var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3],
            1847             qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];
        1848
        1849         dest[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        1850         dest[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        1851         dest[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        1852         dest[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        1853
        1854         return dest;
        1855     };
    1856
    1857     /**
     1858      * Transforms a vec3 with the given quaternion
     1859      *
     1860      * @param {quat4} quat quat4 to transform the vector with
     1861      * @param {vec3} vec vec3 to transform
     1862      * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     1863      *
     1864      * @returns dest if specified, vec otherwise
     1865      */
    1866     quat4.multiplyVec3 = function (quat, vec, dest) {
        1867         if (!dest) { dest = vec; }
        1868
        1869         var x = vec[0], y = vec[1], z = vec[2],
            1870             qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3],
            1871
        1872             // calculate quat * vec
        1873             ix = qw * x + qy * z - qz * y,
            1874             iy = qw * y + qz * x - qx * z,
            1875             iz = qw * z + qx * y - qy * x,
            1876             iw = -qx * x - qy * y - qz * z;
        1877
        1878         // calculate result * inverse quat
        1879         dest[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        1880         dest[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        1881         dest[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        1882
        1883         return dest;
        1884     };
    1885
    1886     /**
     1887      * Multiplies the components of a quaternion by a scalar value
     1888      *
     1889      * @param {quat4} quat to scale
     1890      * @param {number} val Value to scale by
     1891      * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     1892      *
     1893      * @returns {quat4} dest if specified, quat otherwise
     1894      */
    1895     quat4.scale = function (quat, val, dest) {
        1896         if(!dest || quat === dest) {
            1897             quat[0] *= val;
            1898             quat[1] *= val;
            1899             quat[2] *= val;
            1900             quat[3] *= val;
            1901             return quat;
            1902         }
        1903         dest[0] = quat[0]*val;
        1904         dest[1] = quat[1]*val;
        1905         dest[2] = quat[2]*val;
        1906         dest[3] = quat[3]*val;
        1907         return dest;
        1908     };
    1909
    1910     /**
     1911      * Calculates a 4x4 matrix from the given quat4
     1912      *
     1913      * @param {quat4} quat quat4 to create matrix from
     1914      * @param {mat4} [dest] mat4 receiving operation result
     1915      *
     1916      * @returns {mat4} dest if specified, a new mat4 otherwise
     1917      */
    1918     quat4.toMat4 = function (quat, dest) {
        1919         if (!dest) { dest = mat4.create(); }
        1920
        1921         var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
            1922             x2 = x + x,
            1923             y2 = y + y,
            1924             z2 = z + z,
            1925
        1926             xx = x * x2,
            1927             xy = x * y2,
            1928             xz = x * z2,
            1929             yy = y * y2,
            1930             yz = y * z2,
            1931             zz = z * z2,
            1932             wx = w * x2,
            1933             wy = w * y2,
            1934             wz = w * z2;
        1935
        1936         dest[0] = 1 - (yy + zz);
        1937         dest[1] = xy + wz;
        1938         dest[2] = xz - wy;
        1939         dest[3] = 0;
        1940
        1941         dest[4] = xy - wz;
        1942         dest[5] = 1 - (xx + zz);
        1943         dest[6] = yz + wx;
        1944         dest[7] = 0;
        1945
        1946         dest[8] = xz + wy;
        1947         dest[9] = yz - wx;
        1948         dest[10] = 1 - (xx + yy);
        1949         dest[11] = 0;
        1950
        1951         dest[12] = 0;
        1952         dest[13] = 0;
        1953         dest[14] = 0;
        1954         dest[15] = 1;
        1955
        1956         return dest;
        1957     };
    1958
    1959     /**
     1960      * Performs a spherical linear interpolation between two quat4
     1961      *
     1962      * @param {quat4} quat First quaternion
     1963      * @param {quat4} quat2 Second quaternion
     1964      * @param {number} slerp Interpolation amount between the two inputs
     1965      * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     1966      *
     1967      * @returns {quat4} dest if specified, quat otherwise
     1968      */
    1969     quat4.slerp = function (quat, quat2, slerp, dest) {
        1970         if (!dest) { dest = quat; }
        1971
        1972         var cosHalfTheta = quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3],
            1973             halfTheta,
            1974             sinHalfTheta,
            1975             ratioA,
            1976             ratioB;
        1977
        1978         if (Math.abs(cosHalfTheta) >= 1.0) {
            1979             if (dest !== quat) {
                1980                 dest[0] = quat[0];
                1981                 dest[1] = quat[1];
                1982                 dest[2] = quat[2];
                1983                 dest[3] = quat[3];
                1984             }
            1985             return dest;
            1986         }
        1987
        1988         halfTheta = Math.acos(cosHalfTheta);
        1989         sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        1990
        1991         if (Math.abs(sinHalfTheta) < 0.001) {
            1992             dest[0] = (quat[0] * 0.5 + quat2[0] * 0.5);
            1993             dest[1] = (quat[1] * 0.5 + quat2[1] * 0.5);
            1994             dest[2] = (quat[2] * 0.5 + quat2[2] * 0.5);
            1995             dest[3] = (quat[3] * 0.5 + quat2[3] * 0.5);
            1996             return dest;
            1997         }
        1998
        1999         ratioA = Math.sin((1 - slerp) * halfTheta) / sinHalfTheta;
        2000         ratioB = Math.sin(slerp * halfTheta) / sinHalfTheta;
        2001
        2002         dest[0] = (quat[0] * ratioA + quat2[0] * ratioB);
        2003         dest[1] = (quat[1] * ratioA + quat2[1] * ratioB);
        2004         dest[2] = (quat[2] * ratioA + quat2[2] * ratioB);
        2005         dest[3] = (quat[3] * ratioA + quat2[3] * ratioB);
        2006
        2007         return dest;
        2008     };
    2009
    2010     /**
     2011      * Creates a quaternion from the given 3x3 rotation matrix.
     2012      * If dest is omitted, a new quaternion will be created.
     2013      *
     2014      * @param {mat3}  mat    the rotation matrix
     2015      * @param {quat4} [dest] an optional receiving quaternion
     2016      *
     2017      * @returns {quat4} the quaternion constructed from the rotation matrix
     2018      *
     2019      */
    2020     quat4.fromRotationMatrix = function(mat, dest) {
        2021         if (!dest) dest = quat4.create();
        2022
        2023         // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        2024         // article "Quaternion Calculus and Fast Animation".
        2025
        2026         var fTrace = mat[0] + mat[4] + mat[8];
        2027         var fRoot;
        2028
        2029         if ( fTrace > 0.0 ) {
            2030             // |w| > 1/2, may as well choose w > 1/2
            2031             fRoot = Math.sqrt(fTrace + 1.0);  // 2w
            2032             dest[3] = 0.5 * fRoot;
            2033             fRoot = 0.5/fRoot;  // 1/(4w)
            2034             dest[0] = (mat[7]-mat[5])*fRoot;
            2035             dest[1] = (mat[2]-mat[6])*fRoot;
            2036             dest[2] = (mat[3]-mat[1])*fRoot;
            2037         } else {
            2038             // |w| <= 1/2
            2039             var s_iNext = quat4.fromRotationMatrix.s_iNext = quat4.fromRotationMatrix.s_iNext || [1,2,0];
            2040             var i = 0;
            2041             if ( mat[4] > mat[0] )
                2042               i = 1;
            2043             if ( mat[8] > mat[i*3+i] )
                2044               i = 2;
            2045             var j = s_iNext[i];
            2046             var k = s_iNext[j];
            2047
            2048             fRoot = Math.sqrt(mat[i*3+i]-mat[j*3+j]-mat[k*3+k] + 1.0);
            2049             dest[i] = 0.5 * fRoot;
            2050             fRoot = 0.5 / fRoot;
            2051             dest[3] = (mat[k*3+j] - mat[j*3+k]) * fRoot;
            2052             dest[j] = (mat[j*3+i] + mat[i*3+j]) * fRoot;
            2053             dest[k] = (mat[k*3+i] + mat[i*3+k]) * fRoot;
            2054         }
        2055
        2056         return dest;
        2057     };
    2058
    2059
    2060     /**
     2061      * Sets a quat4 to the Identity and returns it.
     2062      *
     2063      * @param {quat4} [dest] quat4 to set. If omitted, a
     2064      * new quat4 will be created.
     2065      *
     2066      * @returns {quat4} dest
     2067      */
    2068     quat4.identity = function(dest) {
        2069         if (!dest) dest = quat4.create();
        2070         dest[0] = 0;
        2071         dest[1] = 0;
        2072         dest[2] = 0;
        2073         dest[3] = 1;
        2074         return dest;
        2075     };
    2076
    2077     /**
     2078      * Sets a quat4 from the given angle and rotation axis,
     2079      * then returns it. If dest is not given, a new quat4 is created.
     2080      *
     2081      * @param {Number} angle  the angle in radians
     2082      * @param {vec3}   axis   the axis around which to rotate
     2083      * @param {quat4}  [dest] the optional quat4 to store the result
     2084      *
     2085      * @returns {quat4} dest
     2086      **/
    2087     quat4.fromAngleAxis = function(angle, axis, dest) {
        2088         // The quaternion representing the rotation is
        2089         //   q = cos(A/2)+sin(A/2)*(x*i+y*j+z*k)
        2090         if (!dest) dest = quat4.create();
        2091
        2092         var half = angle * 0.5;
        2093         var s = Math.sin(half);
        2094         dest[3] = Math.cos(half);
        2095         dest[0] = s * axis[0];
        2096         dest[1] = s * axis[1];
        2097         dest[2] = s * axis[2];
        2098
        2099         return dest;
        2100     };
    2101
    2102     /**
     2103      * Stores the angle and axis in a vec4, where the XYZ components represent
     2104      * the axis and the W (4th) component is the angle in radians.
     2105      *
     2106      * If dest is not given, src will be modified in place and returned, after
     2107      * which it should not be considered not a quaternion (just an axis and angle).
     2108      *
     2109      * @param {quat4} quat   the quaternion whose angle and axis to store
     2110      * @param {vec4}  [dest] the optional vec4 to receive the data
     2111      *
     2112      * @returns {vec4} dest
     2113      */
    2114     quat4.toAngleAxis = function(src, dest) {
        2115         if (!dest) dest = src;
        2116         // The quaternion representing the rotation is
        2117         //   q = cos(A/2)+sin(A/2)*(x*i+y*j+z*k)
        2118
        2119         var sqrlen = src[0]*src[0]+src[1]*src[1]+src[2]*src[2];
        2120         if (sqrlen > 0)
            2121         {
            2122             dest[3] = 2 * Math.acos(src[3]);
            2123             var invlen = 1.0 / Math.sqrt(sqrlen);
            2124             dest[0] = src[0]*invlen;
            2125             dest[1] = src[1]*invlen;
            2126             dest[2] = src[2]*invlen;
            2127         } else {
            2128             // angle is 0 (mod 2*pi), so any axis will do
            2129             dest[3] = 0;
            2130             dest[0] = 1;
            2131             dest[1] = 0;
            2132             dest[2] = 0;
            2133         }
        2134
        2135         return dest;
        2136     };
    2137
    2138     /**
     2139      * Returns a string representation of a quaternion
     2140      *
     2141      * @param {quat4} quat quat4 to represent as a string
     2142      *
     2143      * @returns {string} String representation of quat
     2144      */
    2145     quat4.str = function (quat) {
        2146         return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']';
        2147     };
    2148
    2149
    2150     /*
     2151      * Exports
     2152      */
    2153
    2154 	root.vec3 = vec3;
    2155 	root.mat4 = mat4;
    2156 	root.quat4 = quat4;
    2157
    2158 })(window);
2159