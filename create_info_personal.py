import json

user_ids = [22656, 5210584, 699854]

with open('users_edited_time.json', 'r') as f:
    users = json.load(f)
    
    for user in user_ids:
        with open('data/users/{}.json'.format(user), 'w') as u:
            u.write(json.dumps(users[str(user)]));
    
    