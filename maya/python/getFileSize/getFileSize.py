import maya.cmds as cmds
import os, sys

av={'name':"null",'fileSize':"0",'triCount':0,'texSize':0}
avList=[]

#Get Tex Size
def getFolderSize(start_path):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
        	fp = os.path.join(dirpath, f)
        	total_size += os.path.getsize(fp) * 1e-6
	return  round(total_size, 2)


#rootDir = "D:\\assets\\avatars\\morph\\pyTest"
rootDir = "D:\\assets\\avatars\\morph\\females"
#rootDir = "D:\\assets\\avatars\\morph\\males\\copyOfAllSizes"
objs = os.listdir(rootDir)
for obj in objs:
    objPath = rootDir + "\\" + obj
    if os.path.isdir(objPath):
        dirPath = objPath
        print "dirPath = " + dirPath
        objs2 = os.listdir(dirPath)
        for obj2 in objs2:
            obj2Path = dirPath + "\\" + obj2
            print ("obj2Path = " + obj2Path) 
            if os.path.isfile(obj2Path):
            	if not obj2.endswith(".db"):	
	                fileSize = os.path.getsize(obj2Path) * 1e-6
	                cmds.file( obj2Path, o=True, f=True )
	                cmds.select(cmds.listRelatives(cmds.ls(geometry=True, visible=True), p=True, path=True), r=True)
	                triCount = cmds.polyEvaluate( t=True )
	                triCount = round(triCount, 2)
	                print (obj2  + " = " + repr(round(fileSize, 2)) + "mbs")
	                av['name']=obj2
	                av['fileSize']=repr(round(fileSize, 2)) + "mbs"
	                av['triCount']=triCount
            if obj2.endswith(".fbm"):
                print ("In .fbm")
                av['texSize']= getFolderSize(obj2Path)
            if obj2 == "textures":
            	print ("In textures")
	print ("name: {}, triCount: {}, texSize: {}".format(av['name'], av['triCount'], av['texSize']))
	avList.append(av.copy())

for av in avList:
	print ("avatar: "+av['name']+", fileSize: "+repr(av['fileSize'])+", triCount: "+repr(av['triCount'])+", texture size: "+repr(av['texSize']))

	


            
    
    
    
    
                

#Get File Names
fileName = 'D:\\assets\\avatars\\morph\\females\\F_StarCrew\\F_StarCrew.fbx'
texDirName = 'D:\\assets\\avatars\\morph\\females\\F_StarCrew\\F_StarCrew.fbm'

cmds.file( fileName, o=True, f=True )

#Get Tri Count
cmds.select(cmds.listRelatives(cmds.ls(geometry=True, visible=True), p=True, path=True), r=True)
triCount = cmds.polyEvaluate( t=True )
print (round(triCount, 2))

#Get Texture Size
texSize = get_size()
print (texSize)


#cmds.file( 'D:\\assets\\avatars\\morph\\females\\F_AniSuit\\F_AniSuit.fbx', o=True, f=True )

d={}
dlist=[]
for i in xrange(0,25):
	d['name']="a"
	d['vertSize']="b"
	d['texSize']="c"
	print(d)
	dlist.append(d.copy())

print(dlist)


{'data': 0}
{'data': 1}
{'data': 2}
print(dlist)
[{'data': 2}, {'data': 2}, {'data': 2}]


str = "texture";

suffix = ".fbm";
print str.endswith(suffix)
help(repr)

print ("name: {name}, triCount: {triCount}, texSize: {texSize}".format(**av))
print "filename"
print "\tname: ", av['name']