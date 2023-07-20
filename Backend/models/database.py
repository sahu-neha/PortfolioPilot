from pymongo import MongoClient

client = MongoClient('mongodb+srv://nehasahu2227:nehasahu@cluster0.aq0jdpb.mongodb.net/?retryWrites=true&w=majority')
db = client['PortfolioPilot']
user = db['users']
projects = db['projects']
tasks = db['tasks']
resource = db['resources']
activeUser = db['activeUser']
count = db['counter']
