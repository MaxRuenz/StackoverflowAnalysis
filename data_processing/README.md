# Data Processing

This folder contains all scripts and notebooks used for data Processing

## DataFetching notebook
Notebook containing the code which creates jsons for questions and answers, edge lists and edge lists per tag

## Data Processing notebook
Notebook that analysed one of the networks created with data fetching

## StatisticsCreation
Notebook used to create histograms and scatters per feature

## user_json_csv.py
Script that coverts the json of users over time into a csv needed for the PA chart

## user_csv_sample.py
Samples users from the user csv in order to reduce chart complexity

## qa_time.py
Creates the input json for the stream graph from the users over time json

## create_info_personal.py
Creates a file for selected users to that they are able to view their data

## compiling_users_time.py
Creates based on the question and answers jsons and the user XML the JSON for user details over time

## compilin_classes_average.py
Calculates the average values per class and stores them in a json

## classification.py
Creates a new json for users over time which includes their class

## compiling_user_evol.py
Creates the input for the bubble evolution chart
