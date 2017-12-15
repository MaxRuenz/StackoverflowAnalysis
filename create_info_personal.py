import json
import copy

user_ids = [22656, 5210584, 699854]
data_dict = {'votes':0, 'avotes': 0, 'qvotes':0, 'acnt':0, 'qcnt':0}

with open('user_classes_time.json', 'r') as f:
    users = json.load(f)
    
    for user in user_ids:
        with open('data/users/{}.json'.format(user), 'w') as u:
            userdata = users[str(user)]
            if "data" in userdata.keys():
                for i in range(0,10):
                    userdata["data"][i]['qvotes'] = float("{0:.2f}".format(userdata["data"][i]['qvotes']))
                    userdata["data"][i]['avotes'] = float("{0:.2f}".format(userdata["data"][i]['avotes']))
            else:
                userdata["data"] = [copy.deepcopy(data_dict) for i in range(10)] 
            u.write(json.dumps(userdata));
    
    