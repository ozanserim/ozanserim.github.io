import wrap

# 1. Loading Basemesh
print "Loading basemesh..."
basemeshFileName = wrap.openFileDialog("Select Basemesh",filter = "OBJ-file (*.obj)",dir = wrap.demoModelsPath)
basemesh = wrap.Geom(basemeshFileName)
print "OK"

# 2. Loading Scan
print "Loading scan..."
scanFileName = wrap.openFileDialog("Select Scan",filter = "OBJ-file (*.obj)",dir = wrap.demoModelsPath)
scaleFactor = 1000
scan = wrap.Geom(scanFileName,scaleFactor = scaleFactor)
scan.wireframe = False
print "OK"

print "Loading texture..."
textureFileName = wrap.openFileDialog("Select Scan\'s Texture",filter = "Image (*.jpg *.png *.bmp *.tga)",dir = wrap.demoModelsPath)
if textureFileName is not None:
    scan.texture = wrap.Image(textureFileName)
    scan.texture.show()
    print "OK"
else:
    print "No texture set"

print "Quick navigation: \n\tZoom: Scroll OR Alt + Right Click\n\tRotate: Alt + Left Click\n\tTranslate:Alt + Scroll Click"

# 3. Rigid Alignment: pick three points on the face to align the models
print "Rigid alignment... pick three points to match up on the models' faces"
(pointsScan, pointsBasemesh) = wrap.selectPoints(scan,basemesh)
rigidTransformation = wrap.rigidAlignment(basemesh,pointsBasemesh,scan,pointsScan,matchScale = True)
basemesh.transform(rigidTransformation)
basemesh.fitToView()
print "OK"

# Female Daz mesh (genesis_3_female.obj)
print "Select okay, since this process has been automated for you"
index = wrap.loadPolygons(r"D:\assets\avatars\_daz\male\separated_body\daz_male_bust_ids.txt")
selection = wrap.selectPolygons(basemesh, index)
headmesh, vertexMapping = wrap.subset(basemesh, selection)
basemesh.hide()
headmesh.show()


# 4. Non-rigid Registration: pick as many points to mark out areas for fine detail
print "Non-rigid Registration... the more points you match up, the better (aim for 100)"
(controlPointsScan,controlPointsBasemesh) = wrap.selectPoints(scan,headmesh)
#faceIndices = wrap.loadPolygons(r"C:\Users\elisa\Documents\pg_project\hifi_body\dazbasemesh\daz_body_separated_verts.txt")
#freePolygonsBasemesh = wrap.selectPolygons(basemesh, selectedPolygonIndices = faceIndices)
#basemesh = wrap.nonRigidRegistration(basemesh,scan,controlPointsBasemesh,controlPointsScan,freePolygonsBasemesh,minNodes = 15,initialRadiusMultiplier = 1.0,smoothnessFinal = 0.1,maxIterations = 20)
headmesh = wrap.nonRigidRegistration(headmesh,scan,controlPointsBasemesh,controlPointsScan,minNodes = 15,initialRadiusMultiplier = 1.0,smoothnessFinal = 0.1,maxIterations = 20)
print "OK"

# 7. Texture Transfer
print "Texture transfer..."
if scan.texture is not None:
    #basemesh.texture = wrap.transferTexture(scan,scan.texture,basemesh,(2048,2048),maxRelativeDist = 3)
    basemesh.texture = wrap.transferTexture(scan,scan.texture,headmesh,(2048,2048),maxRelativeDist = 3)
    #basemesh.texture.extrapolate()

print "OK"

basemesh.show()
wrap.applySubset(basemesh,headmesh,vertexMapping)
scan.hide()

# 8. Saving Result
print "Saving result..."
fileName = wrap.saveFileDialog("Save resulting model",filter = "OBJ-file (*.obj)")
basemesh.save(fileName,scaleFactor = 1.0 / scaleFactor)
if scan.texture is not None:
    textureFileName = wrap.saveFileDialog("Save resulting texture",filter = "Image (*.jpg *.png *.bmp *.tga)")
    basemesh.texture.save(textureFileName)
# print("OK")


print("Files to load: "+ fileName + "," + textureFileName)
