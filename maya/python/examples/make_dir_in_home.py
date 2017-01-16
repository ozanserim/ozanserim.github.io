#first import the module
import os

#get the home directory through the environment variable 'HOME' and store in var dir
dir =os.getenv('HOME')
print dir

#join dir with "/Documents"
newdir=os.path.join(dir,'Documents')
print newdir
makeDir=os.mkdir(os.path.join(newdir,'Test_folder'))