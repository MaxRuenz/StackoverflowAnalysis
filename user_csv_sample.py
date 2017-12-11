import csv
import numpy as np

#%%

threshhold = 0.9999

with open( 'data/users_edited.csv', 'r' ) as in_file, open( 'data/users_edited_sample.csv', 'w' ) as out_file:
    reader = reader = csv.reader(in_file)
    writer = csv.writer(out_file)
    
    first = True
    for row in reader:
        if first:
            # dimensions
            writer.writerow(row)
            first = False
        else:
            # subsample
            if np.random.random_sample()  > threshhold:
                writer.writerow(row)