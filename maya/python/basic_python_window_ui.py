from maya import OpenMayaUI as omui 
from PySide.QtCore import * 
from PySide.QtGui import * 
from shiboken import wrapInstance 

mayaMainWindowPtr = omui.MQtUtil.mainWindow() 
mayaMainWindow= wrapInstance(long(mayaMainWindowPtr), QWidget) 

# WORKS: Widget is fine 
hello = QLabel("Hello, World", parent=mayaMainWindow) 
hello.setObjectName('MyLabel') 
hello.setWindowFlags(Qt.Window) # Make this widget a standalone window even though it is parented 
hello.show() 
hello = None # the "hello" widget is parented, so it will not be destroyed. 

# BROKEN: Widget is destroyed 
hello = QLabel("Hello, World Orphan", parent=None) 
hello.setObjectName('MyLabel') 
hello.show() 
hello = None # the "hello" widget is not parented, so it will be destroyed.