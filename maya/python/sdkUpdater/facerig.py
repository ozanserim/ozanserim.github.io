from collections import namedtuple

def trackDag(inCon,nodeType):
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

def createAdjustmentRig(driver,attr):
    
    drvn=pm.listConnections("{0}.{1}".format(str(driver),str(attr)),s=0,d=1,p=1)
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
            attr=node[1]
            node=node[0]
            if node:
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
        
        crv=pm.curve(d=1,p= [(0.5 ,0 ,0.5),(0.5 ,0 ,-0.5),(0 ,0.5 ,0),(0.5 ,0 ,0.5),(0 ,-0.5 ,0),(-0.5 ,0 ,0.5),(0.5 ,0 ,0.5),(0 ,0.5 ,0),(-0.5 ,0 ,0.5),(-0.5 ,0 ,-0.5),(0 ,-0.5 ,0),(0.5 ,0 ,-0.5),(-0.5 ,0 ,-0.5),(0 ,0.5, 0)],k=[0,1,2,3,4,5,6,7,8,9,10,11,12,13]) ;
        crv.rename(name+"_TEMP")
        for y in animCurves:
            attr=y[0]
            y=y[1]
            crv.addAttr("{0}___{1}".format(str(y),attr),at="message")
            y.connectAttr("message","{0}.{1}___{2}".format(str(crv),str(y),attr),f=1)    
                    
        crv.addAttr("driven",at="message")
        child[0].connectAttr("message","{0}.driven".format(str(crv)),f=1)
        
        p=pm.datatypes.Vector(pm.xform(node,q=1,ws=1,t=1))
        r=pm.datatypes.Vector(pm.xform(node,q=1,ws=1,ro=1))
        print p
        print r
        #pm.xform(crv,ws=1,t=p,ro=r)
        par=pm.parentConstraint(child,crv)
        pm.delete(par)
        
        if len(child)>0:
            pm.parentConstraint(crv,child)
                
def bakeBackTemp(controller):
    animCurves={}
    for x in pm.listAttr(controller, ud=True):
        if x=="driven":
            node=pm.listConnections("{0}.driven".format(str(controller)),s=1,d=0,p=0)[0]
        else:
            if pm.attributeQuery(x, node=controller,type="message"):
                buf=x.split("___")
                attr=buf[1]
                crv=pm.PyNode(buf[0])
                animCurves[attr]=crv
            
    pm.select(node,r=1)
    pm.delete(cn=True)
    pm.delete(controller)
    offT=node.t.get()
    offR=node.r.get()