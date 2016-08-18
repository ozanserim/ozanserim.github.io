"""
#This is the code to run in the maya script editor
import sys
sys.path.append('C:/Users/ozan/Source/Repos/ozanserim/maya/python/digital_tutors')
import digital_tutors
digital_tutors.run()
"""
import maya.cmds as mc
    
def run():
    print "hello python"
    #mc.polySphere (r=1, sx=20, sy=20, ax=(0, 1, 0), cuv=2, ch=1)
    #print "mc.polySphere (r=1, sx=20, sy=20, ax=(0, 1, 0), cuv=2, ch=1)"
    #mc.setAttr ("polySphere1.radius", 5)
    #mc.move (5, 0, 0, r=1)
    #mc.rotate (45, 45, 45, r=True)
    #select -r square pSphere1 ;
    #doCreateParentConstraintArgList 1 { "1","0","0","0","0","0","0","1","","1" };
    #mc.parentConstraint ("square", "pSphere1", mo=True, weight=1)
    #mc.scaleConstraint ("square", "pSphere1", mo=True, weight=1)
    #my_var = "hello"
    #print my_var
    #my_ctrl = "square"
    #my_sphere = "pSphere1"
    #mc.parentConstraint (my_ctrl, my_sphere, mo=True, weight=1)
    that = "cool"
    print that + " is the value of that"

    this_num = 5.3
    print "%f is the value of this_num. " % this_num + that

    this_val = 1
    mc.rename ("pCube1","cool_cube_%d" % this_val)