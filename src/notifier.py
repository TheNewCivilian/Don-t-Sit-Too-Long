#!/usr/bin/python
# -*- coding: latin-1 -*-
from tinydb import TinyDB, Query
from random import randint
import subprocess,os
import sched, time
import pyaudio
import wave




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

def throw(inner_loop):
    db = TinyDB(os.getcwd() +os.path.dirname(__file__)[1:]+'/../database/db.json')
    # db.insert({'tid': 1, 'name': 'a','disc':'DO A'})
    # db.insert({'tid': 2, 'name': 'b','disc':'DO B'})
    db_items_count = len(db.all())
    db_query = Query()
    result_taskid = randint(1, db_items_count)
    result_task = db.search(db_query.tid == result_taskid)
    for item in result_task:
        sendmessage(item['name'],item['disc'])
        break
    loop.enter(10, 1, throw, (inner_loop,))

loop = sched.scheduler(time.time, time.sleep)
loop.enter(0, 1, throw, (loop,))
loop.run()
