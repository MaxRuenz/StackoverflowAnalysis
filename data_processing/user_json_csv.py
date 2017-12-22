"""Script that coverts the json of users over time into a csv needed for the PA chart"""


import json
import csv

with open('user_classes_time.json') as f:
    input = list(json.load(f).values())

#%%

for i in range(len(input)):
    input[i].pop('Id', None)
    input[i].pop('DisplayName', None)
    input[i].pop('CreationDate', None)
    data = input[i].pop('data', None)
    if data == None:
        input[i]["qvotes"] = 0
        input[i]["avotes"] = 0
        input[i]["qcnt"] = 0
        input[i]["acnt"] = 0
        input[i]["votes"] = 0
    else:
        for key, value in data[9].items():
            input[i][key] = value
        

#%%
columns = [ x for row in input for x in row.keys() ]
columns = list( set( columns ) )

with open( 'data/users_edited.csv', 'w' ) as out_file:
    csv_w = csv.writer( out_file )
    csv_w.writerow( columns )

    for i_r in input:
        csv_w.writerow( map( lambda x: i_r.get( x, "" ), columns ) )