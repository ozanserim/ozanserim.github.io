#Once you've put the file in your scripts folder, this is the command in Maya to make it work:
#import faceRigUtils
#faceRigUtils.updatePose("mouth_ctrl", "jaw_open")
#Git Test

import maya.cmds as cmds



def updatePose(control, attribute):
    """update the pose"""


    locatorCurveMap = getLocatorCurveMap(control, attribute)

    locs = []
    for locGrp in locatorCurveMap.keys():

        locGrpChild = cmds.listRelatives(locGrp, c=1)
        if not locGrpChild:
            cmds.warning("cant find control for : " + locGrp)
            continue

        locCtrl = locGrpChild[0]
        loc = cmds.spaceLocator()
        locs.append(loc[0])

        #snap the new locator to the position of the locator control
        cmds.delete(cmds.pointConstraint(locCtrl, loc))
        cmds.delete(cmds.orientConstraint(locCtrl, loc))

        #zero out the locator control
        cmds.setAttr(locCtrl + ".translate", 0, 0, 0)
        cmds.setAttr(locCtrl + ".rotate", 0, 0, 0)

        #snap the locator group to the new locator
        cmds.pointConstraint(loc, locGrp)
        cmds.orientConstraint(loc, locGrp)

        #force an evaluation of the scene to make sure that the right values are on the locator group
        cmds.dgdirty(a=1)

        attrs = locatorCurveMap[locGrp].keys()
        for attr in attrs:

            #get the value
            value = cmds.getAttr(locGrp + "." + attr)

            #get the animation curve that drives the locator
            animCurve = locatorCurveMap[locGrp][attr]

            #update the set driven key - for now we're always assuming 10
            cmds.setKeyframe(animCurve, f=10, v=value)

    #now delete the locators and force the evaluation
    cmds.delete(locs)
    cmds.select(cl=1)
    cmds.dgdirty(a=1)

    print "updating pose completed!"

def getLocatorCurveMap(control, attribute):
    """function to get all the driven locators for the specific control and attribute"""

    locatorCurveMap = {}

    #check that the attribute is valid
    if not cmds.attributeQuery(attribute, n=control, ex=1):
        cmds.error("no attribute: " + attribute + " exists on the node: " + control)
        return {}

    #get all the output connections from the control + attribute (eg mouth_ctrl.L_smile)
    animCurves = cmds.listConnections(control + "." + attribute, d=1, s=0, scn=True)
    if not animCurves:
        return {}

    #loop all the animation curves and lets walk their connections to get the transform
    for animCurve in animCurves:

        #list the anim
        animCurveOutputs = cmds.listConnections(animCurve + ".output", p=1, d=1, s=0, scn=1)

        #this means there is no output to animation curve - its dangling - we could delete this
        if not animCurveOutputs:
            continue

        #get the node itself because we asked for the plug
        animCurveOutputNode = animCurveOutputs[0].split(".")[0]

        #if its blendWeighted then we need to get its output to the locator
        if cmds.nodeType(animCurveOutputNode) == "blendWeighted":
            blendWeightedOutputConns = cmds.listConnections(animCurveOutputNode + ".output", p=1, d=1, s=0, scn=1)
            if blendWeightedOutputConns:
                locator, attr = blendWeightedOutputConns[0].split(".")
                if not locatorCurveMap.has_key(locator):
                    locatorCurveMap[locator] = {}
                locatorCurveMap[locator][attr] = animCurve

        else: #if its not blendweigthed then its the locator that we already have
            if cmds.nodeType(animCurveOutputNode) == "transform":
                locator, attr = animCurveOutputs[0].split(".")
                if not locatorCurveMap.has_key(locator):
                    locatorCurveMap[locator] = {}
                locatorCurveMap[locator][attr] = animCurve

    return locatorCurveMap
