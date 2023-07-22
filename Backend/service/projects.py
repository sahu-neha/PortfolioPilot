from flask import jsonify

from models.database import user, activeUser, projects


def createProject(email, project):
    existing_project = projects.find_one({"projectId": project['projectId']})
    if existing_project is not None:
        return jsonify({"message": "Project with same Id already Present"}), 301

    # project["startDate"] = str(date.today())

    project["status"] = "Pending"

    activeUserDetails = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if activeUserDetails is None:
        return jsonify({'message': 'you are not Authorize to Create Project'}), 403

    projects.insert_one(project)
    project['_id'] = str(project['_id'])

    return jsonify(project), 201


def assignProjectToManager(adminEmail, request):
    managerEmail = request.get('managerEmail')
    projectid = request.get('projectid')

    existing_project = projects.find_one({"projectId": projectid})
    if existing_project is None:
        return jsonify({'message': "Not Found"}), 301

    activeUserDetails = activeUser.find_one({'email': adminEmail, 'role': 'ADMIN'})
    if activeUserDetails is None:
        return jsonify({'message': 'you are not Authorize to assign Project'}), 403

    manager = user.find_one({'email': managerEmail, 'role': 'Manager'})
    if manager is None:
        return jsonify({'message': 'Manager not Found'})

    projects.update_one({"projectId": projectid}, {'$set': {'manager': managerEmail}})

    return jsonify({'message': "Project is Assigned SuccessFully"}), 200


def updateProject(adminEmail, request):
    project = request.get('project')

    activeUserDetails = activeUser.find_one({'email': adminEmail, 'role': 'ADMIN'})
    if activeUserDetails is None:
        return jsonify({'message': 'you are not Authorize to assign Project'}), 403

    projects.update_one({"projectId": project['projectId']}, {'$set': project})

    return jsonify({'message': "Project is Updated SuccessFully"}), 200


def deleteProject(email, projectid):
    project = projects.find_one({'projectId': projectid})
    if project is None:
        return jsonify({'message': 'Project not found'}), 301

    activeUserDetails = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if activeUserDetails is None:
        return jsonify({'message': 'you are not Authorize to assign Project'}), 403

    projects.delete_one({'projectId': projectid})

    return jsonify({'message': "Project is Deleted Successfully"}), 200


def displayProjects(email):
    activeUserDetails = activeUser.find_one({'email': email})
    if activeUserDetails["role"] == 'ADMIN':
        return jsonify(list(projects.find())), 200
    else:
        arr = list(projects.find({'manager': email}))
        for pr in arr:
            pr['_id'] = str(pr['_id'])

        return jsonify(arr), 200


def displaySingleProject(email, projectid):
    project = projects.find_one({'projectId': projectid})
    if project is None:
        return jsonify({'message': 'Project not found'}), 301

    activeUserDetails = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    project['_id'] = str(project['_id'])

    if activeUserDetails is None:
        current_active_user = activeUser.find_one({'email': email})
        if current_active_user is None:
            return jsonify({'message': 'you are not Authorize to assign Project'}), 403
        else:
            if project['manager'] == current_active_user['email']:
                return jsonify(project), 200
            else:
                return jsonify({'message': 'you are not Authorize to assign Project'}), 403

    return jsonify(project), 200
