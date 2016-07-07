from collections import namedtuple
import pymel.core as pm
import os
import sys
import re


class sdkUpdater(object):
    # to do :
    #     handle non transforms as well
    #     add to temp controls 
    #     store more data into class
    #     
    
    
    def __init__(self):
        print "initializing SDK Updater"
        self.tempControls=[]
        
    def trackDag(self,inCon,nodeType):
        """
        uses the inCon as a source to track down the dag network to find 
        and return all nodes that are driven by the output attr on it
        """
        
        retValue=[]
        if pm.attributeQuery("output",n=inCon,ex=True):
            outs=pm.listConnections("{0}.output".format(inCon),s=0,d=1,p=1) 
            for out in outs:
                outNode=pm.PyNode(str(out).split(".")[0])
                attr=str(out).split(".")[1]
                if isinstance(nodeType, list):
                    for x in nodeType:
                        tempValue=None
                        if isinstance(outNode,x):
                            tempValue=(outNode,attr)
                        else:
                            tempValue=(trackDag(outNode,nodeType))
                    
                        if tempValue:
                            retValue.append(tempValue)
                            break        
                else:
                    if isinstance(outNode,nodeType):
                        retValue.append((outNode,attr))
                    else:
                        retValue.append(trackDag(outNode,nodeType))
            if len(retValue)>1:
                return retValue
            else:
                return retValue[0]
        else:
            return None

    def createAdjustmentRig(self,driver,attr):
        """
        creates a temp control rig for the specified driver/control and attr on that 
        controller
        each transform node at the end of that is driven
        """
        
        if len(self.tempControls)>0:
            print "temp list is occupied..."
            return None
        
        self.tempControls=[]
        drvn=pm.listConnections("{0}.{1}".format(str(driver),str(attr)),s=0,d=1,p=1)
        srcAttr=attr
        animCurves=[]
        nodes={}
        misc=[]
        for x in drvn:
            test=pm.PyNode(str(x).split(".")[0])
            if isinstance(test, pm.nodetypes.AnimCurve):
                animCurves.append(test)
            else:
                buf=trackDag(test,pm.nodetypes.AnimCurve)
                animCurves.append()
                    
        if len(misc)>0:
            print "do dag tracking here"
            print misc
            
        for anim in animCurves:
            outs=pm.listConnections("{0}.output".format(str(anim)),s=0,d=1,p=1)
            for x in outs:
                test=pm.PyNode(str(x).split(".")[0])
                node=trackDag(test,pm.nodetypes.Transform)
                if node:
                    attr=node[1]
                    node=node[0]
                    if node in nodes.keys():
                        nodes[str(node)].append((attr,anim))
                    else:
                        nodes[str(node)]=[(attr,anim)]
                
        for x in nodes.keys():
            node=pm.PyNode(x)
            animCurves=nodes[x]
            child=node.getChildren()
            if len(child)>0:
                name=str(child[0])
            else:
                name="TEMP_{0}".format(str(node))
            
            crv=pm.curve(d=1,p=[(0.5,0,0.5),(0.5,0,-0.5),(0,0.5,0),(0.5,0,0.5),(0,-0.5,0),(-0.5,0,0.5),(0.5,0,0.5),(0,0.5,0),(-0.5,0,0.5),(-0.5,0,-0.5),(0,-0.5,0),(0.5,0,-0.5),(-0.5,0,-0.5),(0,0.5,0)],k=[0,1,2,3,4,5,6,7,8,9,10,11,12,13]) ;
            crv.rename(name+"_TEMP")
            crv.addAttr("driverAttribute",dt="string")
            crv.driverAttribute.set("{0}.{1}".format(str(driver),srcAttr))
            for y in animCurves:
                attr=y[0]
                y=y[1]
                crv.addAttr("{0}___{1}".format(str(y),attr),at="message")
                y.connectAttr("message","{0}.{1}___{2}".format(str(crv),str(y),attr),f=1)    
                        
            grp=pm.createNode("transform",n=str(crv).replace("_TEMP","_TEMPGROUP"))
            crv.addAttr("driven",at="message")
            pm.parent(crv,grp)
            child[0].connectAttr("message","{0}.driven".format(str(crv)),f=1)
            
            p=pm.datatypes.Vector(pm.xform(node,q=1,ws=1,t=1))
            r=pm.datatypes.Vector(pm.xform(node,q=1,ws=1,ro=1))
            print p
            print r
            #pm.xform(crv,ws=1,t=p,ro=r)
            par=pm.parentConstraint(child,grp)
            pm.delete(par)
            
            self.tempControls.append(crv)
            if len(child)>0:
                pm.parentConstraint(crv,child)
                    
    def bakeBackTemp(self,controller):
        """
        bakes temp controller values over to SDK curves for driver attribute
        ... works with blendWeight nodes by tracking thru dag for what controller
        is driving the node currently
        """
        
        animCurves={}
        for x in pm.listAttr(controller, ud=True):
            if x=="driven":
                node=pm.listConnections("{0}.driven".format(str(controller)),s=1,d=0,p=0)[0]
            elif x=="driverAttribute":
                driverAttr=pm.PyNode(controller).driverAttribute.get()
            else:
                if pm.addAttr("{0}.{1}".format(str(controller),x),q=True,at=True) == "message":
                    buf=x.split("___")
                    attr=buf[1]
                    crv=pm.PyNode(buf[0])
                    animCurves[attr]=crv
                      
        offT=node.t.get()
        offR=node.r.get()
        offS=node.s.get()
        curValue=pm.getAttr(driverAttr)
        
        sdk=node.getParent()
        cValue=None
                         
        pm.delete(pm.PyNode(controller).getParent())

        for x in animCurves.keys():
            
            ac=pm.PyNode(animCurves[x])
            keys=ac.numKeys()
            value=0.0
            if re.match("trans.*",x):
                if x[-1]=="X":
                    cValue=sdk.tx.get()
                    value=offT.x
                if x[-1]=="Y":
                    cValue=sdk.ty.get()
                    value=offT.y
                if x[-1]=="Z":
                    cValue=sdk.tz.get()
                    value=offT.z                
            elif re.match("rota.*",x):
                if x[-1]=="X":
                    cValue=sdk.rx.get()
                    value=offR.x
                if x[-1]=="Y":
                    cValue=sdk.ry.get()
                    value=offR.y
                if x[-1]=="Z":
                    cValue=sdk.rz.get()
                    value=offR.z              
            elif re.match("scal.*",x):
                if x[-1]=="X":
                    cValue=sdk.sx.get()
                    value=offS.x
                if x[-1]=="Y":
                    cValue=sdk.sy.get()
                    value=offS.y
                if x[-1]=="Z":
                    cValue=sdk.sz.get()
                    value=offS.z 
            else:
                print "WTF?????"
                
            #always set
            ac.setValue(curValue, (cValue+value)) 
            
            #set only when it matches a predone SDK key  
            #for y in range(keys):
                #if curValue==ac.getUnitlessInput(y):
                    #ac.setValue(y, (ac.getValue(y) + value))
                    #break
                                        
            node.t.set(0,0,0)
            node.r.set(0,0,0)
            node.s.set(1,1,1)
      
    def bakeAllForShape(self):
        """
        auto bakes all current temp controls down to their set driven keys
        """
        
        for x in self.tempControls:
              self.bakeBackTemp(x)
        self.tempControls=[]
       
    
    
  




## sample usage
##--------------------------------------------
#
#bob=sdkUpdater()
#
#bob.createAdjustmentRig(myController,myAttr)
#
#bob.bakeAllForShape()












