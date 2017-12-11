import json
import csv

with open('users_edited.json') as f:
    input = list(json.load(f).values())

#%%

for i in range(len(input)):
    input[i].pop('Id', None)
    if not input[i]['count_of_answers'] == 0:
        input[i]['avotes'] /= input[i]['count_of_answers']
    if not input[i]['count_of_questions'] == 0:
        input[i]['qvotes'] /= input[i]['count_of_questions']     

#%%
columns = [ x for row in input for x in row.keys() ]
columns = list( set( columns ) )

with open( 'data/users_edited.csv', 'w' ) as out_file:
    csv_w = csv.writer( out_file )
    csv_w.writerow( columns )

    for i_r in input:
        csv_w.writerow( map( lambda x: i_r.get( x, "" ), columns ) )