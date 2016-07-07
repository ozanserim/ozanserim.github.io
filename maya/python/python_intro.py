from PySide import QtCore as qc
from PySide import QtGui as qg



class simpleUI(qg.QDialog):
    def __init__(self):
        qg.QDialog.__init__(self)

        self.setWindowTitle('Simple UI')
        self.setWindowFlags(qc.Qt.WindowStaysOnTopHint)
        self.setFixedHeight(200)
        self.setFixedWidth(300)
        self.show()

dialog = simpleUI()
dialog.show()

