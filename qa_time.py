import json

answers = [0] * 10
questions = [0] * 10

with open('users_edited_time.json') as f:
    input = json.load(f)
    print ("File loaded")
    input = list(input.values())
    
print ("Init done")
#%%

for i in range(len(input)):
    if "data" in input[i].keys():
        for j in range(len(input[i]["data"])):
            answers[j] += int(input[i]["data"][j]["acnt"])
            questions[j] += int(input[i]["data"][j]["qcnt"])

#%%

def calculate_question_area(question_array):
    ret = []
    for i in range(len(question_array)):
        ret.append([i, 0, question_array[i]])
    return ret


def calculate_answer_area(answer_array):
    ret = []
    for i in range(len(answer_array)):
        ret.append([i, 0, -answer_array[i]])
    return ret

response = [{
  "label": "Questions",
  "data": calculate_question_area(questions)
},
{
  "label": "Answers",
  "data": calculate_answer_area(answers)
}]

with open('data/aq_time.json', 'w') as f:
    json.dump(response, f)