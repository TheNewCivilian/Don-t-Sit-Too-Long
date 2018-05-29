#!/usr/bin/env python
import sys
import subprocess
from os.path import expanduser
subprocess.call(["sudo","apt-get","install","python-qt4"])
subprocess.call(["sudo","apt-get","install","python-pyside"])
subprocess.call(["pip","install","Jinja2"])
subprocess.call(["pip","install","htmlPy"])
print "Install complete"
