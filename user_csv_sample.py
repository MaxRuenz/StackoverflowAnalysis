import csv
import numpy as np

#%%

threshhold_0 = 1
threshhold_1 = 1
threshhold_2 = 0.9995
threshhold_3 = 0.999
threshhold_4 = 0.995

with open( 'data/users_edited.csv', 'r' ) as in_file, open( 'data/users_edited_sample.csv', 'w', newline='' ) as out_file:
    reader = reader = csv.reader(in_file)
    writer = csv.writer(out_file)
    
    first = True
    for row in reader:
        if first:
            # dimensions
            writer.writerow(row)
            first = False
        elif len(row) > 0 and float(row[0]) > 0 and float(row[1]) > 0 and float(row[2]) > 0\
                and float(row[4]) > 0 and float(row[5]) > 0:
            # subsample
            if row[2] == "0":
                if np.random.random_sample()  > threshhold_0:
                    writer.writerow(row)
            elif row[2] == "1":
                if np.random.random_sample()  > threshhold_1:
                    writer.writerow(row)
            elif row[2] == "2":
                if np.random.random_sample()  > threshhold_2:
                    writer.writerow(row)
            elif row[2] == "3":
                if np.random.random_sample()  > threshhold_3:
                    writer.writerow(row)
            elif row[2] == "4":
                if np.random.random_sample()  > threshhold_4:
                    writer.writerow(row)