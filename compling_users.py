# Packages

import pandas as pd
import os
import xml.etree.ElementTree as et
import json
#import ijson
from dateutil import parser

# Paths
users_path = os.path.join("Users.xml")

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

xml_tojson_cut(['Id','Reputation'], users_path,'users_edited')
#Enrich Users File
 #with open('users_edited.json','w') as ue:
data = json.load(open('Answers.json'))
use = json.load(open("users_edited.json"))
data2 = json.load(open('Questions.json'))

votes_dict = {}
avotes_dict = {}
qvotes_dict = {}
count_answers_dict = {}
count_questions_dict = {}

# Including Data from Answers.json
for key, value in data.items():
    oid = data[key]['owner_id']
    if oid in use.keys():
        votes_proxy = votes_dict[oid]
        avotes_proxy = avotes_dict[oid]
        count_answers_proxy = count_answers_dict[oid]

        votes_proxy  += int(data[key]["votes"])
        avotes_proxy += int(data[key]["votes"])
        count_answers_proxy += 1

        votes_dict[oid] = votes_proxy
        avotes_dict[oid] = avotes_proxy
        count_answers_dict[oid] = count_answers_proxy


# Including Data from Questions.json
for key, value in data2.items():
    oid2 = data2[key]['owner_id']
    if oid in use.keys():
        votes_proxy = votes_dict[oid]
        qvotes_proxy = qvotes_dict[oid]
        count_questions_proxy = count_questions_dict[oid]

        votes_proxy += int(data2[key]["votes"])
        qvotes_proxy += int(data2[key]['votes'])
        count_questions_proxy += 1

        votes_dict[oid] = votes_proxy
        qvotes_dict[oid] = qvotes_proxy
        count_questions_dict[oid] = count_questions_proxy

for oid in votes_dict.keys()            
    use[oid]["votes"] = votes_proxy
    use[oid]["avotes"] = avotes_proxy
    use[oid]["qvotes"] = qvotes_proxy
    use[oid]["count_of_answers"] = count_answers_proxy
    use[oid]["count_of_questions"] = count_questions_proxy
    # Dumping all the things
json.dump(use, open('users_edited.json','w'))

# Copied out here for convienence
    # if count == 40:
    #     break
    #
    # count = count +1
