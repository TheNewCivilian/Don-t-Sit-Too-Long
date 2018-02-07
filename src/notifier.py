#!/usr/bin/python
# -*- coding: latin-1 -*-
from tinydb import TinyDB, Query
from random import randint
import subprocess,os
import sched, time
import pyaudio
import wave
import random
import datetime
os.chdir(os.path.dirname(__file__))
def playsound():
    """Plays notification sound"""
    chunk = 1024
    wf = wave.open('../res/Belligerent.wav', 'rb')
    p = pyaudio.PyAudio()
    stream = p.open(
        format = p.get_format_from_width(wf.getsampwidth()),
        channels = wf.getnchannels(),
        rate = wf.getframerate(),
        output = True)
    data = wf.readframes(chunk)
    while data != '':
        stream.write(data)
        data = wf.readframes(chunk)
    stream.close()
    p.terminate()

def sendmessage(title,message):
    """Sends notification to user"""
    print os.getcwd() +os.path.join(os.path.dirname(__file__),'/../res/exercise.png')
    subprocess.Popen(['notify-send','-i',os.getcwd() +os.path.join(os.path.dirname(__file__),'/../res/exercise.png'),'-a','DEAL!',title, message])
    playsound()
    return

def add_log_entry(tid):
     db = TinyDB('../database/log.json')
     ts = time.time()
     year = datetime.datetime.fromtimestamp(ts).strftime("%Y")
     month = datetime.datetime.fromtimestamp(ts).strftime("%m")
     day = datetime.datetime.fromtimestamp(ts).strftime("%d")
     hour = datetime.datetime.fromtimestamp(ts).strftime("%H")
     minute = datetime.datetime.fromtimestamp(ts).strftime("%M")
     db.insert({'tid': tid, 'year': year,'month': month,'day': day,'hour': hour,'minute': minute}) #insertdate

def throw(inner_loop):
    db = TinyDB('../database/db.json')
    active_task_list = []
    db_query = Query()
    if (db.search((db_query.tid == -1) & (db_query.active == 1)) == [] ):
        result_task = db.search(db_query.active == 1)
        for item in result_task:
            active_task_list.append(item['tid'])
        print active_task_list
        print random.choice(active_task_list)
        for item in db.search(db_query.tid == random.choice(active_task_list)):
            add_log_entry(item['tid'])
            sendmessage(item['name'],item['disc'])
            break
    loop.enter(3600, 1, throw, (inner_loop,))


db = TinyDB('../database/db.json')
db_query = Query()
if (db.search(db_query.tid == -1) == []):
    db.insert({'tid': -1,'active': 0})
db.close()
loop = sched.scheduler(time.time, time.sleep)
loop.enter(0, 1, throw, (loop,))
loop.run()
