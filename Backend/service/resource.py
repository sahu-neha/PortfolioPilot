from flask import jsonify

from models.database import activeUser, resource, tasks, projects, count

if count.find_one({'name': 'cc'}) is None:
    count.insert_one({'cc': 1, 'name': 'cc'})


def addResource(email, res):
    activeUserDetails = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if activeUserDetails is None:
        return jsonify({'message': 'You are Not allowed'}), 403
    else:
        cc = count.find_one({'name': 'cc'})['cc']
        resource['rid'] = cc;
        count.update_one({'name': 'cc'}, {'$set': {'cc': cc + 1}})
        resource.insert_one(res)

    return jsonify(res), 200


def deleteResource(email, resid):
    activeUserDetails = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if activeUserDetails is None:
        return jsonify({'message': 'You are Not allowed'}), 403
    else:
        resource.delete_one({'rid': resid})

    return jsonify({'message': "Resource has been deleted"}), 200


def updateResource(email, resid, res):
    activeUserDetails = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if activeUserDetails is None:
        return jsonify({'message': 'You are Not allowed'}), 403

    existingResource = resource.find({'rid': resid})
    if existingResource is None:
        return jsonify({'message': "Rosource not Found"}), 401

    resource.update_one({'rid': resid}, {'$set': res})

    return jsonify({'message': "Resource has been updated"}), 200


def showResources(email):
    activeUserDetails = activeUser.find_one({'email': email})
    if activeUserDetails is None:
        return jsonify({'message': 'Please Log In First'}), 403

    arr = list(resource.find())
    for r in arr:
        r['_id'] = str(r['_id'])

    return jsonify(arr), 200


def assignResourceToTask(email, task, resId):
    existingResource = resource.find({'rid': resId})
    if existingResource is None:
        return jsonify({'message': "Rosource not Found"}), 401

    existingTask = tasks.find_one({'name': task})
    if existingTask is None:
        return jsonify({'message': "Task not Found"}), 404

    existingProject = projects.find_one({"projectId": existingTask['projectId']})
    if existingProject is None:
        return jsonify({'message': "Project not Found"}), 404

    if email != existingProject['manager']:
        return jsonify({'message': "You are not authorized"}), 403

    task['resource'] = resId
    tasks.update_one({'name': task['name'], 'projectId': existingProject['projectId']}, {'$set': task})

    return jsonify({'message': "Resource is assign Successfully"})


def showSingleResource(email, rid):
    activeUserDetails = activeUser.find_one({'email': email})
    if activeUserDetails is None:
        return jsonify({'message': 'Please Log In First'}), 403

    res = resource.find_one({'rid': rid})
    res['_id'] = str(res['_id'])

    return jsonify(res)
