import os


from PySide import QtCore, QtGui


import maya.OpenMaya as OpenMaya
import maya.OpenMayaUI as OpenMayaUI
import maya.cmds as cmds
import maya.mel as mel
from functools import partial
import cPickle as pickle


import qt_lib

import faceRigUtils

#The UI file must live in the same place as this file
uiPath = os.path.dirname(__file__) + "/hfFaceToolUI.ui"
form_class, base_class = qt_lib.loadUiType(uiPath)



class Window(form_class, base_class):
    """Window class for the main UI"""

    def __init__(self, parent=qt_lib.getMayaWindow()):
        super(Window, self).__init__(parent)

        self.setupUi(self)
        self.setWindowTitle("Face Tool UI")

        self.control_listWidget.itemClicked.connect(self.loadPoses)
        self.setPoseToTen_pushButton.clicked.connect(self.setPoseToTen)

        self.updatePose_pushButton.clicked.connect(self.updatePose)

        self.loadControls()



    def loadControls(self):


        allControls = ["eyes_ctrl", "mouth_ctrl", "brows_ctrl", "nose_ctrl" , "dummy_ctrl"]
        for control in allControls:

            if not cmds.objExists(control):
                cmds.warning(control + " doesnt exist, skipping.")
                continue


            item = QtGui.QListWidgetItem(control)
            self.control_listWidget.addItem(item)


    def loadPoses(self, item):

        self.pose_listWidget.clear()

        control = item.text()

        attrs = cmds.listAttr(control, ud=1, k=1)
        for attr in attrs:

            if cmds.getAttr(control + "." + attr, l=1):
                continue

            item = QtGui.QListWidgetItem(attr)
            self.pose_listWidget.addItem(item)

        cmds.select(control, r=1)

    def setPoseToTen(self):

        count = self.control_listWidget.count()
        for i in range(count):
            item = self.control_listWidget.item(i)
            control = item.text()

            attrs = cmds.listAttr(control, ud=1, k=1)
            for attr in attrs:

                if cmds.getAttr(control + "." + attr, l=1):
                    continue

                cmds.setAttr(control + "." + attr, 0)

        #get the control and pose from the UI return as a list of 2 items
        control, pose = self.getControlAndPoseFromUI()

        cmds.setAttr(control + "." + pose, 10)

    def updatePose(self):
        """function that will query the list for control and pose and then update the SDK's on the rig"""


        #get the control and pose from the UI return as a list of 2 items
        control, pose = self.getControlAndPoseFromUI()

        #call the faceRigUtils update method to append the new locator positions to the SDK's
        faceRigUtils.updatePose(control, pose)


    def getControlAndPoseFromUI(self):


        items = self.control_listWidget.selectedItems()
        if not items:
            raise BaseException("Please select a control first!")

        control = items[0].text()

        items = self.pose_listWidget.selectedItems()
        if not items:
            raise BaseException("Please select a pose first!")

        pose = items[0].text()

        return control, pose


def showUI():
    """function to show the window - if it exists in __main__ it closes it first"""

    #import main to make sure we can store the UI there
    import __main__

    if hasattr(__main__, "faceToolWindow"):
        __main__.faceToolWindow.close()
    __main__.faceToolWindow = Window()
    __main__.faceToolWindow.show()

    return __main__.faceToolWindow
