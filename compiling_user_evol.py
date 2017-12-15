import json
import copy
from dateutil import parser

YEARS = range(2008,2018)
NUM_YEARS = len(YEARS)
CLASSES = 5

dic_base = {"cnt":0, "votes":0, "ucnt": 0}

# Create 
stats_questions = [[copy.deepcopy(dic_base) for i in range(CLASSES)] for j in range(NUM_YEARS)]
stats_answers = [[copy.deepcopy(dic_base) for i in range(CLASSES)] for j in range(NUM_YEARS)]

#%%

with open('user_classes_time.json', 'r') as f:
    users = json.load(f)

#%%

# Iterate over users
for key, user in users.items():
    
    # check creation year
    year = parser.parse(user['CreationDate']).year
    year_index = year - 2008
    
    # find class
    class_ = user['Class']
        
    # For each year where user existed
    for i in range(year_index,NUM_YEARS):
        # increase user count
        stats_questions[i][class_]["ucnt"] +=  1
        stats_answers[i][class_]["ucnt"] +=  1
        
        # Did user do any interactions
        if "data" in user.keys():
            # question stats
            stats_questions[i][class_]["cnt"] += user["data"][i]["qcnt"]
            stats_questions[i][class_]["votes"] += user["data"][i]["qvotes"]
            
            # answer stats
            stats_answers[i][class_]["cnt"] += user["data"][i]["acnt"]
            stats_answers[i][class_]["votes"] += user["data"][i]["avotes"]
#%%
     
# Calculate averages per year
for year in range(NUM_YEARS):
    for class_ in range(CLASSES):
        num_users = stats_questions[year][class_]["ucnt"]
        if num_users > 0:
            stats_questions[year][class_]["cnt"] /= num_users
            stats_questions[year][class_]["votes"] /= num_users
            stats_answers[year][class_]["cnt"] /= num_users
            stats_answers[year][class_]["votes"] /= num_users


#%%
# dict for questions, answers with cnt, vote over NUM_YEARS
response = {}

def create_year_dataset(arr):
    datasets = []
    for class_ in range(CLASSES):
        datasets.append({"data": [{"x": arr[class_]["cnt"],\
                                   "y": arr[class_]["votes"],\
                                   "v": arr[class_]["ucnt"]}],\
                        "label":class_})
    return datasets

def create_feature_data(arr):
    feature = {}
    for year in YEARS:
        feature[str(year)] = { "datasets": create_year_dataset(arr[year-2008])}
    return feature

response["Questions"] = create_feature_data(stats_questions)
response["Answers"] = create_feature_data(stats_answers)

json.dump(response, open('data/user_classes_evol.json', 'w'), indent=2)