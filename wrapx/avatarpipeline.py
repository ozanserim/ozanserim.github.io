# avatar pipeline

import os
import subprocess

# this opens up the SimpleWrappingBust.py script with Wrap-X as a starting point
result = subprocess.check_output([r'..\Program Files\Wrap-X\WrapX.exe', 
	r'R3DS\WrapX\PythonScripts\SimpleWrappingBust.py'])

print("Initial output: ")
resultString = result.decode("utf-8")
print(result)

output = resultString.split("Files to load: ")
files = output[1].split(",")
fileName = files[0]
textureFileName = files[1]

# here are the names of the output files from Wrap-X you want to load into Maya
print("Files for Maya: \n" + fileName + "\n" + textureFileName)

# opens up Maya 2016 automatically
subprocess.call([r"..\Program Files\Autodesk\Maya2016\bin\maya.exe"])



input("Press enter to exit")

		###### useless code ######

#fileName, textureFileName = subprocess.call('return (fileName, textureFileName)')

# print("Files saved at: \n" + fileName + "\n" + textureFileName)

#print(proc.returncode)


#os.startfile('E:\Program Files\Wrap-X\WrapX.exe')

#os.startfile("E:\Program Files\Autodesk\Maya2016\Bin\maya.exe")

# subprocess.call([r'E:\Program Files\Wrap-X\WrapX.exe', 
# 	r'C:\Users\elisa\Documents\pg_project\R3DS\WrapX\PythonScripts\SimpleWrappingBust.py'])

# process = subprocess.Popen([r'E:\Program Files\Wrap-X\WrapX.exe', 
# 	r'C:\Users\elisa\Documents\pg_project\R3DS\WrapX\PythonScripts\SimpleWrappingBust.py'])

# subprocess.run([r'E:\Program Files\Wrap-X\WrapX.exe', 
# 	r'C:\Users\elisa\Documents\pg_project\R3DS\WrapX\PythonScripts\SimpleWrappingBust.py'], 
# 	stdout=subprocess.PIPE, universal_newlines=True)

#(fileName, textureFileName) = process.communicate()
#exit_code = process.wait()

#if (process.poll()):
#	(fileName, textureFileName) = process.stdout
