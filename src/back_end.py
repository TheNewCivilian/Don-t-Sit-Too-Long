import htmlPy
from tinydb import TinyDB, Query
import os
import json

os.chdir(os.path.dirname(__file__))
class BackEnd(htmlPy.Object):

    def __init__(self, app):
        super(BackEnd, self).__init__()
        self.app = app
        self.get_active_entries()

    @htmlPy.Slot(str)
    def debug_to_console(self,mes):
        print str(mes)

    @htmlPy.Slot(result=str)
    def get_log_data(self):
        log = TinyDB('../database/log.json')
        db = TinyDB('../database/db.json')
        query = Query()
        log_entries = log.all()
        log_result = []
        for item in log_entries:
            task_data = db.search(query.tid == item["tid"])
            timestamp = {"year":item["year"],"month":item["month"],"day":item["day"],"hour":item["hour"],"minute":item["minute"]}
            for item in task_data:
                log_result.append({"time":timestamp,"arms":item['arms'],"legs":item['legs'],"stomach":item['stomach'],"chest":item['chest']}) #berarbeiten
        return json.dumps(log_result, separators=(',',':'))


    @htmlPy.Slot()
    def get_active_entries(self):
        db = TinyDB(os.path.abspath(os.path.join(os.path.dirname(__file__),'../database/db.json')))
        query = Query()
        self.app.template = ("./index.html", {
        "active_tasks": db.search(query.active == 1),
        "archive_hidden": "hidden",
        "add_hidden":"hidden"
        })

    @htmlPy.Slot()
    def get_archive_entries(self):
        db = TinyDB(os.getcwd() +os.path.dirname(__file__)+'/../database/db.json')
        query = Query()
        self.app.template = ("./index.html", {
        "archive_tasks": db.search(query.active == 0),
        "add_hidden":"hidden",
        "home_hidden":"hidden"
        })

    @htmlPy.Slot(str, result=int)
    def add_table_entry(self, json_data):
        db = TinyDB(normpath(os.getcwd() +os.path.dirname(__file__)+'../database/db.json'))
        form_data = json.loads(json_data)
        db.insert({'tid': len(db.all())+1, 'name': form_data['name'],'disc':form_data['disc'], 'active': 1, 'arms':form_data['arms'], 'legs':form_data['legs'], 'stomach':form_data['stomach'], 'chest':form_data['chest']})
        return 0        #return str()

    @htmlPy.Slot(str, result=int)
    def remove_table_entry(self, json_data):
        db = TinyDB(os.getcwd() +os.path.dirname(__file__)+'/../database/db.json')
        update_query = Query()
        form_data = json.loads(json_data)
        entry_id = int(form_data['tid'])
        db.update({'active': 0}, update_query.tid == entry_id)
        self.get_active_entries();
        return 0

    @htmlPy.Slot(str, result=int)
    def activate_table_entry(self, json_data):
        db = TinyDB(os.getcwd() +os.path.dirname(__file__)+'/../database/db.json')
        update_query = Query()
        form_data = json.loads(json_data)
        entry_id = int(form_data['tid'])
        db.update({'active': 1}, update_query.tid == entry_id)
        self.get_archive_entries();
        return 0
