from datetime import date

from flask import jsonify

from models.database import tasks, projects


def createTask(email, projectid, task):
    project = projects.find_one({"projectId": projectid})

    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403

    exist_task = tasks.find_one({'name': task['name'], 'projectId': projectid})
    if exist_task is not None:
        return jsonify({'message': 'Task with this name already there in this Project'}), 301

    task['projectId'] = projectid
    task['status'] = 'to do'
    task['createDate'] = str(date.today())
    tasks.insert_one(task)

    return jsonify(task), 200


def deleteTask(email, projectid, taskName):
    project = projects.find_one({"projectId": projectid})

    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403

    exist_task = tasks.find_one({'name': taskName, 'projectId': projectid})
    if exist_task is None:
        return jsonify({'message': 'Task Not Found'}), 302

    tasks.delete_one({'name': taskName, 'projectId': projectid})

    return jsonify({'message': 'Task Deleted Successfully'}), 200


def updateTask(email, projectid, task):
    project = projects.find_one({"projectId": projectid})

    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403

    exist_task = tasks.find_one({'name': task['name'], 'projectId': projectid})
    if exist_task is None:
        return jsonify({'message': 'Task Not Found'}), 302

    tasks.update_one({'name': task['name'], 'projectId': projectid}, {'$set': task})

    return jsonify({'message': 'Task is Updated Successfully'}), 200


def showTasks(email, projectid):
    project = projects.find_one({"projectId": projectid})

    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403

    arr = list(tasks.find({'projectId': projectid}))
    for tk in arr:
        tk['_id'] = str(tk['_id'])

    return jsonify(arr), 200


def showSingleTask(email, projectid, taskid):
    project = projects.find_one({"projectId": projectid})

    if project is None:
        return jsonify({'message': "Project Not Found"}), 301
    if project['manager'] != email:
        return jsonify({'message': 'You are not Authorized'}), 403

    tk = tasks.find_one({'projectId': projectid, 'name': taskid})
    tk['_id'] = str(tk['_id'])

    return jsonify(tk), 200
