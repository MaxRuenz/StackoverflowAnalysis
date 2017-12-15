import json
import numpy as np

answers = np.array([[0] * 10] * 5)
questions = np.array([[0] * 10] * 5)

with open('user_classes_time.json') as f:
    input = json.load(f)
    print ("File loaded")
    input = list(input.values())
    
print ("Init done")
#%%

for i in range(len(input)):
    class_ = int(input[i]["Class"])
    if "data" in input[i].keys():
        for j in range(len(input[i]["data"])):
            answers[class_][j] += int(input[i]["data"][j]["acnt"])
            questions[class_][j] += int(input[i]["data"][j]["qcnt"])

#%%

def calculate_question_area(last_values_array, class_):
    ret = []
    for i in range(len(questions[0])):
        ret.append([i, int(last_values_array[i]), int(questions[class_,i]) + int(last_values_array[i])])
    return ret


def calculate_answer_area(last_values_array, class_):
    ret = []
    for i in range(len(answers[0])):
        ret.append([i, int(last_values_array[i]), int(-answers[class_,i]) + int(last_values_array[i])])
    return ret


response = []
last_values = [0] *10
for i in range(5):
    data = calculate_question_area(last_values, i)
    last_values = np.array(data)[:,2]
    response.append({"label": "Questions Class {}".format(i),
                     "data": data})
    
last_values = [0] *10
for i in range(5):
    data = calculate_answer_area(last_values, i)
    last_values = np.array(data)[:,2]
    response.append({"label": "Answers Class {}".format(i),
                     "data": data})


# normalize per time
for i in range(5):
    for time in range(10):
        response[i]["data"][time][1] /= response[4]["data"][time][2]
        response[i]["data"][time][2] /= response[4]["data"][time][2]
    
for i in range(5,10):
    for time in range(10):
        response[i]["data"][time][1] /= -response[9]["data"][time][2]
        response[i]["data"][time][2] /= -response[9]["data"][time][2]
    
with open('data/aq_time.json', 'w') as f:
    json.dump(response, f, indent=2)