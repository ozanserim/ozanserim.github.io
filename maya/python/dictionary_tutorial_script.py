from maya import cmds
import json 

sel = cmds.ls(sl = 1)
meshes =[]
for s in sel : 
    shape = cmds.listRelatives(s , shapes = 1 ) 
    if shape : 
        if cmds.nodeType(shape[0]) == "mesh" :
            meshes.append(s )
          
meshData = {}  
for m in meshes : 
    pos = cmds.xform ( m , q =1 , ws = 1 , t = 1)
    rot = cmds.xform( m , q =1  , ws = 1 , rotation =  1 )
    scl = cmds.getAttr ( m  + '.s' )[0]
    vtxNumber = len ( cmds.ls( m + '.vtx[*]' , fl = 1 ))
    par = cmds.listRelatives ( m , parent = 1)
    if par :
        par = par[0]
    children = cmds.listRelatives( m   )
    
    currentDict = {
                    "pos" : pos ,
                    "rot" : rot ,
                    "scl" : scl ,
                    "vtxNumber" : vtxNumber,
                    "par"  : par ,
                    "children" : children
   
                    }
    
    meshData[m] = currentDict
    
print meshData
path = "C:/tmp/testScene.meshData"

toBeSaved = json.dumps(meshData , sort_keys = True , ensure_ascii= True , indent = 2)
f = open(path , 'w')
f.write(toBeSaved)
f.close()


f = open(path)
dataFile = json.load(f)
print dataFile

for k in dataFile : 
    print dataFile[k]["par"]



