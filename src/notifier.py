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


def playsound():
    """Plays notification sound"""
    chunk = 1024
    wf = wave.open(os.path.dirname(__file__)+'../res/Belligerent.wav', 'rb')
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
    subprocess.Popen(['notify-send','-i',os.getcwd() +os.path.dirname(__file__)[1:]+ "/../res/exercise.png",'-a','DEAL!',title, message])
    playsound()
    return

def add_log_entry(tid):
     db = TinyDB(os.getcwd() +os.path.dirname(__file__)[1:]+'/../database/log.json')
     ts = time.time()
     year = datetime.datetime.fromtimestamp(ts).strftime("%Y")
     month = datetime.datetime.fromtimestamp(ts).strftime("%m")
     day = datetime.datetime.fromtimestamp(ts).strftime("%d")
     hour = datetime.datetime.fromtimestamp(ts).strftime("%H")
     minute = datetime.datetime.fromtimestamp(ts).strftime("%M")
     db.insert({'tid': tid, 'year': year,'month': month,'day': day,'hour': hour,'minute': minute}) #insertdate

def throw(inner_loop):
    db = TinyDB(os.getcwd() +os.path.dirname(__file__)[1:]+'/../database/db.json')
    active_task_list = []
    db_query = Query()
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

loop = sched.scheduler(time.time, time.sleep)
loop.enter(0, 1, throw, (loop,))
loop.run()
