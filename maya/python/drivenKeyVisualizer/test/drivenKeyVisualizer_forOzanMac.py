'''
drivenKeyVisualizer - this is just a snippet example for traversal of driven-key relationships
Christopher Evans, Version 0.0, Oct 2014
'''

import os

import shiboken
from PySide import QtGui, QtCore
from cStringIO import StringIO
import xml.etree.ElementTree as xml
import pysideuic

import maya.cmds as cmds
import maya.OpenMayaUI as openMayaUI
import maya.OpenMaya as om

def show():
    global drivenKeyVisualizerWindow
    try:
        drivenKeyVisualizerWindow.close()
        win.deleteLater()
    except:
        pass

    drivenKeyVisualizerWindow = drivenKeyVisualizer()
    drivenKeyVisualizerWindow.show()
    return drivenKeyVisualizerWindow

def loadUiType(uiFile):
    """
    Pyside lacks the "loadUiType" command, so we have to convert the ui file to py code in-memory first
    and then execute it in a special frame to retrieve the form_class.
    http://tech-artists.org/forum/showthread.php?3035-PySide-in-Maya-2013
    """
    parsed = xml.parse(uiFile)
    widget_class = parsed.find('widget').get('class')
    form_class = parsed.find('class').text

    with open(uiFile, 'r') as f:
        o = StringIO()
        frame = {}

        pysideuic.compileUi(f, o, indent=0)
        pyc = compile(o.getvalue(), '<string>', 'exec')
        exec pyc in frame

        #Fetch the base_class and form class based on their type in the xml from designer
        form_class = frame['Ui_%s'%form_class]
        base_class = eval('QtGui.%s'%widget_class)
    return form_class, base_class

def getMayaWindow():
    ptr = openMayaUI.MQtUtil.mainWindow()
    if ptr is not None:
        return shiboken.wrapInstance(long(ptr), QtGui.QWidget)

uiFile = None	
try:
    selfDirectory = os.path.dirname(__file__)
    uiFile = selfDirectory + '/drivenKeyVisualizer.ui'
except:
    uiFile = '/Users/ozan/WebstormProjects/ozanserim/maya/python/drivenKeyVisualizer/drivenKeyVisualizer.ui'
if os.path.isfile(uiFile):
    form_class, base_class = loadUiType(uiFile)
else:
    cmds.error('Cannot find UI file: ' + uiFile)



########################################################################
## SDK WRANGLER
########################################################################
       

class drivenKeyVisualizer(base_class, form_class):	
  
    def __init__(self, parent=getMayaWindow()):
        self.closeExistingWindow()
        super(drivenKeyVisualizer, self).__init__(parent)
        
        self.setupUi(self)
        
        wName = openMayaUI.MQtUtil.fullName(long(shiboken.getCppPointer(self)[0]))
        
        ## Connect UI
        ########################################################################
        self.connect(self.findDrivenKeysBTN, QtCore.SIGNAL("clicked()"), self.findDrivenKeysFN)
        
        print 'drivenKeyVisualizer initialized as', wName
    
      
    def closeExistingWindow(self):
        for qt in QtGui.qApp.topLevelWidgets():
            try:
                if qt.__class__.__name__ == self.__class__.__name__:
                    qt.deleteLater()
            except:
                pass
    '''
    class sdk:
        def __init__(self):
            self.drivingAttr = None
            self.drivenAttr = None
            self.curve = None


    # BASE FUNCTIONS
    ########################################################################
    def parseDrivenKeys(self, debug=0):
        curves = cmds.ls(type=("animCurveUL","animCurveUU","animCurveUA","animCurveUT"))
        items = []
        for c in curves:
             drivingAttr = cmds.listConnections(c + '.input', p=1)
             
             dk = self.sdk()
             dk.drivingAttr = drivingAttr[0]
             dk.curve = c
                          
             #find the driven attribute
             futureNodes = [node for node in cmds.listHistory(c, future=1, ac=1)]
             futureNodes.reverse()
             drivenAttr = None
             for node in futureNodes:
                 if cmds.nodeType(node) == 'unitConversion':
                     try:
                         drivenAttr = cmds.listConnections(node + '.output', p=1)[0]
                         break
                     except:
                         cmds.warning('blendWeighted node with no output: ' + node)
                         break
                 elif cmds.nodeType(node) == 'blendWeighted':
                     try:
                         drivenAttr = cmds.listConnections(node + '.output', p=1)[0]
                         break
                     except:
                         cmds.warning('blendWeighted node with no output: ' + node)
                         break
             if not drivenAttr:
                 drivenAttr = cmds.listConnections(c + '.output', p=1)[0]
             if drivenAttr:
                 dk.drivenAttr = drivenAttr
             else:
                 cmds.warning('No driven attr found for ' + c)
             
             items.append(dk)
             if debug: print dk.drivingAttr, dk.curve, dk.drivenAttr
        return items
    
    def addItemsToTree(self, items, listWid):           
        
        itemDict = {}
        for item in items:
            if item.drivingAttr in itemDict:
                itemDict[item.drivingAttr].append(item)
            else:
                itemDict[item.drivingAttr] = [item]
        
        listWids = []
        for item in itemDict:            
            #ADD TOP LEVEL ITEMS (NODES)
            wid1 = QtGui.QTreeWidgetItem()

            font = wid1.font(0)
            font.setPointSize(15)
            wid1.setText(0, item)
            self.drivenTree.addTopLevelItem(wid1)
            wid1.setExpanded(True)
            wid1.setFont(0,font)
            
            #ADD CHILDREN
            drivenDict = {}
            for sdk in itemDict[item]:
                node = sdk.drivenAttr.split('.')[0]
                if node not in drivenDict:
                    drivenDict[node] = [sdk.drivenAttr.split('.')[-1]]
                else:
                    drivenDict[node].append(sdk.drivenAttr.split('.')[-1])
            
            for d in drivenDict:
                wid2 = QtGui.QTreeWidgetItem()
                wid2.setText(0, d)
                wid1.addChild(wid2)
                for att in drivenDict[d]:
                    wid3 = QtGui.QTreeWidgetItem()
                    wid3.setText(0, att)
                    wid2.addChild(wid3)

        '''
    ## UI HOOK FUNCTIONS
    ########################################################################
    def findDrivenKeysFN(self):
        #self.drivenTree.clear()
        #self.addItemsToTree(self.parseDrivenKeys(), self.drivenTree)
        print 'IN FDKFN'             


if __name__ == '__main__':
    show()