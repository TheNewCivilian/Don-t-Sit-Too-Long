#!/usr/bin/python
import htmlPy
from back_end import BackEnd
from PyQt4 import QtCore
import os

if os.path.dirname(__file__) != '':
    os.chdir(os.path.dirname(__file__))
# Initial confiurations
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = htmlPy.AppGUI(title=u"Dont sit too long!",width=700,height=820)
app.template_path = "."
app.static_path = os.path.join(BASE_DIR, ".")
app.bind(BackEnd(app))

if __name__ == "__main__":
    app.start()
