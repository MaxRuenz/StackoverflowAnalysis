import json
import matplotlib
import matplotlib.pyplot as plt
import os
import numpy as np
import scipy.stats as stat

#Why and how would we like to classify our users?

# You gain reputation when:
#
# - question is voted up: +5
# - answer is voted up: +10
# - answer is marked “accepted”: +15 (+2 to acceptor)
# - suggested edit is accepted: +2 (up to +1000 total per user)
# - bounty awarded to your answer: + full bounty amount
# - one of your answers is awarded a bounty automatically: + half of the bounty amount (see more details about how bounties work)
# - site association bonus: +100 on each site (awarded a maximum of one time per site)
# - example you contributed to is voted up: +5
# - proposed change is approved: +2
# - first time an answer that cites documentation you contributed to is upvoted: +5

# You lose reputation when:
#
# - your question is voted down: −2
# - your answer is voted down: −2
# - you vote down an answer: −1
# - you place a bounty on a question: − full bounty amount
# - one of your posts receives 6 spam or offensive flags: −100



path ='C:/Users/asus/Desktop/epfl courses/Data Visualization/Data'
os.chdir(path)

#Creating Json File containing all users, their reputation and there users class
#Classification based on Reputation
with open('users_edited.json') as json_file:
    data = json.load(json_file)

key_array = []

for key in data:
    key_array.append(key)
#key_array = list(map(int, key_array))

user_class = {}

type(int(key_array[1]))
for key in key_array:
    if key == -1:
        continue
    if int(key) <=10:
        user_class[key] = (data[key]['Reputation'], 'ten')

    if 10 < int(key) <= 100:
        user_class[key] = (data[key]['Reputation'], 'hun')

    if 100 < int(key) <= 1000:
        user_class[key] = (data[key]['Reputation'], 'tho')

    if int(key) > 1000:
        user_class[key] = (data[key]['Reputation'], 'mil')


json.dump(user_class, open('user_classes.json', 'w'), indent = 2)

# rep_array=[]
#
# for key in key_array:
#     rep_array.append(data[key]['Reputation'])
#
#
# #Wie viele User haben eine Reputation von 1?
# test2 =  rep_array
# test2 = list(map(int, test2))
# test2 = sorted(test2)
# i =0
#
# for runner in test2:
#     i = i + 1
#     if runner > 1:
#         print(i)
#         break
#
# #Antwort: 20106765
#
# #Wie viele User haben eine Reputation von weniger als 10?
# test10 = rep_array
# test10 = list(map(int, test10))
# test10 = sorted(test10)
#
# k =0
#
# for runner in test2:
#     k = k + 1
#     if runner > 10:
#         print(k)
#         break
#
#
#
#
# #Was ist mit dem Rest?
# test2[22943561]
# cut = test2[22943561:30468764]
# max(cut)
# min(cut)
#
# plt.scatter(range(22943561, 30468764, 1), cut)
# plt.yscale('log')
# plt.show()

# Proposed Binning
# [0,10,100,1000,1000000]