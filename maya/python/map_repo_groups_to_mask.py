#MAP REPO GROUPS TO MASK VERTS
#Tool that repositions the repo groups based off of the setup mask.
#Create a list/array with the index of the list equaling the repo group
#ie, myList[0]=repo group that matches to vertex[0] on the mask
#Then it needs a function that queries the world position of that vertex and 
#Applies that position to the matching group's translation.    

import maya.cmds as cmd
import pymel.core as pm
    
#GET REPO GROUPS
grps = cmds.ls("*reposition_grp")
#print repogrp
for grp in grps:
    print grp
repo_count = len(grps)
print repo_count

#GET OFFSET GROUPS
offset_grps = cmds.ls("*reposition_offset")
for offset_grp in offset_grps:
    print offset_grp
offset_count = len(offset_grps)
print offset_count

#SELECT ALL REPO GROUPS
cmds.select("*reposition_grp")
print len(cmds.ls())

#SELECT ALL OFFSETs
cmds.select("*reposition_offset")
print len(cmds.ls())


#SELECT MASK VERTS 
mc.select("mask.vtx[*]")
vrts = cmds.ls(sl=True)
print vrts
print len(vrts)

#GET VERT COUNT
cmds.select(cl=True)
mask = "mask"
cmds.select(mask)
vert_count = cmds.polyEvaluate(v=True)
print vert_count

#CREATE MASK MAP
#LOOP THROUGH REPOS
meshData = {} 
k=0                   
for i in range(0, offset_count):
    #repo_rp = cmds.xform(offset_grps[i],q=1,ws=1,rp=1)
    offset_tr = cmds.xform(offset_grps[i],q=1,ws=1,t=1)
    #print offset_tr[0]
    
    offset_x = (str(offset_tr[0]))[:4]
    offset_y = (str(offset_tr[1]))[:4]
    offset_z = (str(offset_tr[2]))[:4]
    #print 'offset_tr ' + str(i) + ': ' + offset_x + ' ' + offset_y + ' ' + ' ' + offset_z
    
    #LOOP THROUGH VERTS
    for j in range(0, vert_count):
        vert_tr = cmds.xform(mask+'.vtx['+str(j)+']',q=1,ws=1,t=1)
        vert_x = (str(vert_tr[0]))[:4]
        vert_y = (str(vert_tr[1]))[:4]
        vert_z = (str(vert_tr[2]))[:4]    
        #print 'vert_tr ' + str(j) + ': ' + vert_x + ' ' + vert_y + ' ' + ' ' + vert_z
        if (offset_x == vert_x):
            if (offset_y == vert_y):              
                if (offset_z == vert_z):
                    k = k+1
                    print k
                    print 'index: ' + offset_grps[i] + ' ' + str(j)
                    #print repo_x + ' ' + repo_y + ' ' + repo_z  
                    #print vert_x + ' ' + vert_y + ' ' + vert_z
                    meshData[str(offset_grps[i])] = str(j)    
                    #print meshData
                    

path = "/Users/ozan/WebstormProjects/ozanserim/maya/python/mask_dictionary/mask_data.txt"

toBeSaved = json.dumps(meshData , sort_keys = True , ensure_ascii= True , indent = 2)
f = open(path , 'w')
f.write(toBeSaved)
f.close()  



#POSITION OFFSET GROUPS
#======================
f = open(path)
mask_data = json.load(f)
#print mask_data

jaw_offset = 83
cv = mask_data[str(offset_grps[jaw_offset])]
vert_tr = cmds.xform(mask+'.vtx['+cv+']',q=1,ws=1,t=1)
vert_x = str(vert_tr[0])
vert_y = str(vert_tr[1])
vert_z = str(vert_tr[2]) 
print 'vert_tr ' + cv + ': ' + vert_x + ' ' + vert_y + ' ' + ' ' + vert_z
#print float(vert_y)
#cmds.setAttr(str(offset_grps[i])+'.translateY', float(vert_y))
cmds.xform(str(offset_grps[jaw_offset]),a=1,ws=1,t=(vert_x,vert_y,vert_z))

for i in range(0, offset_count):
    if i != jaw_offset:
        #print mask_data[str(grps[i])]
        cv = mask_data[str(offset_grps[i])]
        vert_tr = cmds.xform(mask+'.vtx['+cv+']',q=1,ws=1,t=1)
        vert_x = str(vert_tr[0])
        vert_y = str(vert_tr[1])
        vert_z = str(vert_tr[2]) 
        print 'vert_tr ' + cv + ': ' + vert_x + ' ' + vert_y + ' ' + ' ' + vert_z
        #print float(vert_y)
        #cmds.setAttr(str(offset_grps[i])+'.translateY', float(vert_y))
        cmds.xform(str(offset_grps[i]),a=1,ws=1,t=(vert_x,vert_y,vert_z))
    


#TEST
cv = str(85)
vert_tr = cmds.xform(mask+'.vtx['+cv+']',q=1,ws=1,t=1)
vert_x = str(vert_tr[0])
vert_y = str(vert_tr[1])
vert_z = str(vert_tr[2])
print offset_grps[0]
print 'vert_tr ' + cv + ': ' + vert_x + ' ' + vert_y + ' ' + ' ' + vert_z
#cmds.xform("L_forehead_inner_fLoc_reposition_offset",a=1,ws=1,t=(2.453,170.864,11.001))
cmds.xform("L_forehead_inner_fLoc_reposition_offset",a=1,ws=1,t=(vert_x,vert_y,vert_z))


#CREATE OFFSET GROUP TO WORKAROUND FROZEN REPO TRANSFORMS
#=========================================================
for myCon in pm.ls(sl=1):
    myConP=pm.datatypes.Vector(pm.xform(myCon,q=1,ws=1,rp=1))
    par=myCon.getParent()
    newGrp=pm.createNode("transform",n=str(myCon).replace("_grp","_offset"))
    newGrp.t.set(myConP)
    pm.parent(newGrp,par)
    pm.parent(myCon, newGrp)
    

#myVert="mask.vtx[85]"
#myCon=pm.PyNode("L_forehead_inner_fLoc_reposition_grp")
#pos=pm.datatypes.Vector(pm.xform(myVert,q=1,ws=1,t=1))
#myConP=pm.datatypes.Vector(pm.xform(myCon,q=1,ws=1,rp=1))
#delta=pos-myConP
#myCon.t.set(myCon.t.get()+delta)

vert_tr 85: 2.44 170.  10.9
vert_tr 85: 2.32 171.  10.9

L_forehead_inner_fLoc_reposition_grp
1.652
0.639
-0.751

vertex positions
2.453
170.864
11.001

-0.0863
1.111
0.112


#QA GROUPS AND VERTS
#L_lid_lower_mid_pivot_fLoc_reposition_offset
#L_lid_lower_inner_pivot_fLoc_reposition_offset
#R_brow_mid_a_fLoc_reposition_offset
#L_lid_lower_mid_pivot_fLoc_reposition_offset
#L_lid_lower_outer_pivot_fLoc_reposition_offset
#R_lid_lower_outer_pivot_fLoc_reposition_offset
#chin_mid_fLoc_reposition_offset
#lip_lower_below_mid_fLoc_reposition_offset

cv=6
offset_nam = "chin_mid_fLoc_reposition_offset"
cmd.select (offset_nam)
vert = cmds.xform(mask+'.vtx['+str(cv)+']',q=1,ws=1,t=1)
offset = cmds.xform(offset_nam,q=1,ws=1,t=1)

print "vert: " + str(vert[0]) + " " + str(vert[1]) + " " + str(vert[2]) 
print "offset: " + str(offset[0]) + " " + str(offset[1]) + " " + str(offset[2])