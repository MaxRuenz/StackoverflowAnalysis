"""Creates based on the question and answers jsons and the user XML the JSON for user details over time"""

import pandas as pd
import os
import xml.etree.ElementTree as et
import json
#import ijson
from dateutil import parser
import copy
import os

# Paths
users_path = os.path.join("Users.xml")

#%%

# Functions

#Function removes all attributed except for the ones listed by the user.
#Function asks for:
#  - a list of the desired elements in the xml
#  - the path of the xml file you would like to read
#  - the name of file you would like to create

def xml_tojson_cut(wanted_list, xml_path, new_file):
    write_path = os.path.join( new_file + '.json' )
    with open(write_path, 'w') as new_file:
        new_file.write('{')
        first = True

        for event, elem in et.iterparse( xml_path ):
            if first == True:
                first = False
            else:
                new_file.write(',\n')

            if elem.tag == "row":
                try:
                    parsed = {}
                    for i in wanted_list:
                        parsed[ i ] = elem.attrib[ i ]
                except Error as e:
                    print (e)
            new_file.write( "\"" + parsed['Id'] + "\":" + json.dumps(parsed))


            elem.clear()

        new_file.write('}')


# Operation

xml_tojson_cut(['Id','Reputation', 'CreationDate', 'DisplayName'], users_path, 'users_edited_time')

#%%
#Enrich Users File
 #with open('users_edited.json','w') as ue:
with open("users_edited_time.json") as f:
    use = json.load(f)

votes_dict = {}
avotes_dict = {}
qvotes_dict = {}
count_answers_dict = {}
count_questions_dict = {}
years = range(2009,2019)

data_dict = {'votes':0, 'avotes': 0, 'qvotes':0, 'acnt':0, 'qcnt':0}

#%%
with open('Answers.json') as a:
    data = json.load(a)
    
iter = 0

# Including Data from Answers.json
for key, value in data.items():
    if iter % 100000 == 0:
        print (iter)
    iter += 1
    oid = data[key]['owner_id']
    if oid in use.keys():
        if not "data" in use[oid].keys():
            use[oid]["data"] = [copy.deepcopy(data_dict) for i in range(len(years))] 
        
        year = parser.parse(data[key]['time']).year
        year_index = year - 2008
        
        for i in range(year_index, len(years)):
            use[oid]["data"][i]['votes'] += int(data[key]["votes"])
            use[oid]["data"][i]['avotes'] += int(data[key]["votes"])
            use[oid]["data"][i]['acnt'] += 1
data = None
print ("Saved Answers")
#%%
with open('Questions.json') as q:
    data2 = json.load(q)
    
iter= 0

# Including Data from Questions.json
for key, value in data2.items():
    if iter % 100000 == 0:
        print (iter)
    iter += 1
    oid2 = data2[key]['owner_id']
    if oid2 in use.keys():
        if not "data" in use[oid2].keys():
            use[oid2]["data"] = [copy.deepcopy(data_dict) for i in range(len(years))] 
                
        year = parser.parse(data2[key]['time']).year
        year_index = year - 2008
                
        for i in range(year_index, len(years)):
            use[oid2]["data"][i]['votes'] += int(data2[key]["votes"])
            use[oid2]["data"][i]['qvotes'] += int(data2[key]["votes"])
            use[oid2]["data"][i]['qcnt'] += 1
            
data2 = None
print ("Saved Questions")

#%%

for key, value in use.items():
    if "data" in value.keys():
        for i in range(0,10):
            if not value["data"][i]['qcnt'] == 0:
                use[key]["data"][i]['qvotes'] /=  value["data"][i]['qcnt']
            if not value["data"][i]['acnt'] == 0:
                use[key]["data"][i]['avotes'] /=  value["data"][i]['acnt']

#%%
# Dumping all the things
json.dump(use, open('users_edited_time.json','w'))