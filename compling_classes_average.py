# Packages

import pandas as pd
import os
import xml.etree.ElementTree as et
import json
#import ijson
from dateutil import parser
import copy
import os

#%%

reputation_classes = [0] * 5
votes_classes = [0] * 5
acnt_classes = [0] * 5
qcnt_classes = [0] * 5
avotes_classes = [0] * 5
qvotes_classes = [0] * 5
cnt_classes = [0] * 5 

with open("user_classes_time.json") as f:
    data = json.load(f)
    
    for key, value in data.items():
        class_ = value["Class"]
        reputation_classes[class_] += int(value["Reputation"])
        if "data" in value.keys():
            votes_classes[class_] += int(value["data"][9]["votes"])
            acnt_classes[class_] += int(value["data"][9]["acnt"])
            qcnt_classes[class_] += int(value["data"][9]["qcnt"])
            avotes_classes[class_] += int(value["data"][9]["avotes"])
            qvotes_classes[class_] += int(value["data"][9]["qvotes"])
        cnt_classes[class_] += 1

avg_class = {}

for i in range(5):
    avg_class[i] = {}
    avg_class[i]["Reputation"] = float("{0:.2f}".format(reputation_classes[i] / cnt_classes[i]))
    avg_class[i]["votes"] = float("{0:.2f}".format(votes_classes[i] / cnt_classes[i]))
    avg_class[i]["acnt"] = float("{0:.2f}".format(acnt_classes[i] / cnt_classes[i]))
    avg_class[i]["qcnt"] = float("{0:.2f}".format(qcnt_classes[i] / cnt_classes[i]))
    avg_class[i]["avotes"] = float("{0:.2f}".format(avotes_classes[i] / cnt_classes[i]))
    avg_class[i]["qvotes"] = float("{0:.2f}".format(qvotes_classes[i] / cnt_classes[i]))
    avg_class[i]["cnt"] = cnt_classes[i]
    
json.dump(avg_class, open('classes_averages.json', 'w'), indent=2)
