from datetime import date

from flask import jsonify

from models.database import user, activeUser


def signUp(response):
    email = response.get('user')['email']
    existing_user = user.find_one({'email': email})

    if existing_user is not None:
        return jsonify({"message": "User with this email already exists"}), 400

    if response.get('user')["role"] == 'ADMIN' and response.get('secretKey') == 'PortfolioPilot':
        obj = response.get('user')
        user.insert_one(
            createUser(obj['firstName'], obj['lastName'], obj['role'], obj['about'], obj['email'], obj['password']))

    elif response.get('user')["role"] == 'ADMIN' and response.get('secretKey') != 'PortfolioPilot':
        return jsonify({"message": "This secret key is not valid"}), 400

    else:
        obj = response.get('user')
        obj["role"] = "Manager"
        obj['startDate'] = str(date.today())
        user.insert_one(
            createUser(obj['firstName'], obj['lastName'], obj['role'], obj['about'], obj['email'], obj['password']))

    return jsonify(response.get('user')), 200


def logIn(request):
    email = request.get("email")
    password = request.get("password")

    activeUserDetails = activeUser.find_one({'email': email})
    if activeUserDetails is not None:
        return jsonify({"message": "You are already logged in"}), 403

    existing_user = user.find_one({'email': email})
    if existing_user is None:
        return jsonify({"message": "No user found with this email"}), 404

    else:
        if existing_user["password"] == password:
            activeUser.insert_one({"email": existing_user["email"], "role": existing_user["role"]})
            return jsonify({"message": "Logged In SuccessFully"}), 200
        else:
            return jsonify({"message": "credentials not valid"}), 401


def logOut(email):
    # user=activeUser.find_one({"email":email})
    activeUser.delete_one({"email": email})
    return jsonify({"message": "You have Logged Out Successfully"}), 200


def createUser(firstName, lastName, role, about, email, password):
    return {
        'firstName': firstName,
        'lastName': lastName,
        'role': role,
        'isActive': True,
        'startDate': str(date.today()),
        'about': about,
        'email': email,
        'password': password
    }


def deleteUser(email):
    activeUserDetails = activeUser.find_one({'email': email})

    if activeUserDetails is None:
        return jsonify({'message': "You have to Log In First"}), 403
    else:
        user.delete_one({'email': email})
        activeUser.delete_one({'email': email})
        return jsonify({'isDone': True}), 200


def updateUser(email, request):
    activeUserDetails = activeUser.find_one({'email': email})

    if activeUserDetails is None:
        return jsonify({'message': "You have to Log In First"}), 403
    else:
        user.update_one({'email': email}, {'$set': request})
        return jsonify(jsonify({'isUpdate': True})), 200


def readManager(email):
    activeUserDetails = activeUser.find_one({'email': email, 'role': 'ADMIN'})
    if activeUserDetails is None:
        return jsonify({'message': "You have to Log In First"}), 403

    managers = list(user.find({'role': 'Manager'}))
    for manager in managers:
        manager['_id'] = str(manager['_id'])

    return jsonify(managers), 201
