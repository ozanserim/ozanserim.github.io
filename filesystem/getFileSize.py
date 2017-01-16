#!/usr/bin/python

import os, sys

# Open a file
rootDir = "D:\\assets\\avatars\\morph\\females"
#rootDir = "D:\\assets\\avatars\\morph\\males\\copyOfAllSizes"
objs = os.listdir(rootDir)

# This would print all the files and directories
for obj in objs:
    objPath = rootDir + "\\" + obj
    if os.path.isdir(objPath):
        dirPath = objPath
        objs2 = os.listdir(dirPath)
        for obj2 in objs2:
            obj2Path = dirPath + "\\" + obj2
            if os.path.isfile(obj2Path):
                fileSize = os.path.getsize(obj2Path) * 1e-6
                print (obj2  + " = " + str(round(fileSize, 2)) + "mbs")
        #subDir = "D:\\assets\\avatars\\morph\\females\\" + obj
        #print path
        #os.path.getsize(obj)
    #else:
    #    print obj
