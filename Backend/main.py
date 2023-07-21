from flask import Flask, request

from service.authLog import signUp, logIn, logOut, deleteUser, updateUser, readManager
from service.projects import createProject, assignProjectToManager, updateProject, deleteProject, displayProjects, \
    displaySingleProject
from service.resource import addResource, deleteResource, updateResource, showResources, assignResourceToTask, \
    showSingleResource
from service.tasks import createTask, deleteTask, updateTask, showTasks, showSingleTask

app = Flask(__name__)


# ================== Auth routes ================== #

@app.route('/user/signup', methods=["POST"])
def signup(): return signUp(request.get_json())


@app.route('/user/login', methods=["GET"])
def login(): return logIn(request.get_json())


@app.route('/user/logout/<email>', methods=["DELETE"])
def logout(email): return logOut(email)


@app.route('/user/delete/<email>', methods=["DELETE"])
def deleteUserRoute(email): return deleteUser(email)


@app.route('/user/update/<email>', methods=["PATCH"])
def updateUserRoute(email): return updateUser(email, request.get_json())


# ================== Project routes ================== #

@app.route('/user/managers/<email>', methods=["GET"])
def showManagers(email): return readManager(email)


@app.route('/project/<email>', methods=['POST'])
def addProject(email): return createProject(email, request.get_json())


@app.route('/project/<email>', methods=['PUT'])
def assignProject(email): return assignProjectToManager(email, request.get_json())


@app.route('/project/<email>', methods=['PATCH'])
def update_project(email): return updateProject(email, request.get_json())


@app.route('/project/<email>', methods=['GET'])
def allProjects(email): return displayProjects(email);


@app.route('/project/<email>/<projectid>', methods=['GET'])
def getProject(email, projectid): return displaySingleProject(email, projectid);


@app.route('/project/<email>/<projectid>', methods=['DELETE'])
def delete_project(email, projectid): return deleteProject(email, projectid)


# ================== Resource routes ================== #

@app.route('/res/<email>', methods=['POST'])
def createResource(email): return addResource(email, request.get_json())


@app.route('/res/<email>/<resid>', methods=['DELETE'])
def removeResource(email, resid): return deleteResource(email, resid)


@app.route('/res/<email>/<resid>', methods=['PATCH'])
def update_resource(email, resid): return updateResource(email, resid, request.get_json())


@app.route('/res/<email>', methods=['GET'])
def getAllResources(email): return showResources(email)


@app.route('/res/<email>/<resid>')
def getSingleResource(email, resid): return showSingleResource(email, resid)


@app.route('/res/<email>/<task>/<resId>', methods=['PATCH'])
def assignResources(email, task, resId): return assignResourceToTask(email, task, resId)


# ================== Task routes ================== #

@app.route('/task/<email>/<projectid>/<task>', methods=['POST'])
def create_task(email, projectid, task): return createTask(email, projectid, task)


@app.route('/task/<email>/<projectid>/<task>', methods=['DELETE'])
def delete_task(email, projectid, task): return deleteTask(email, projectid, task)


@app.route('/task/<email>/<projectid>/<task>', methods=['PATCH'])
def delete_task(email, projectid, task): return updateTask(email, projectid, task)


@app.route('/task/<email>/<projectid>', methods=['GET'])
def show_all_tasks(email, projectid): return showTasks(email, projectid)


@app.route('/task/<email>/<projectid>/<taskid>')
def show_one_task(email, projectid, taskid): return showSingleTask(email, projectid, taskid)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
