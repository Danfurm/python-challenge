import os
import csv
from pathlib import Path 
data_folder = Path ("Resources")
file_to_open = data_folder / "election_data.csv"
f = open(file_to_open)
csvreader = csv.reader(f, delimiter=",")
header = next(csvreader)
TV = 0
candidates = []
cv = []
pc = []
for row in csvreader:
    TV += 1
    if row[2] not in candidates:
        candidates.append(row[2])
    if len(cv) < len(candidates):
        cv.append(0)
    for i in range(len(cv)):
        if row[2] == candidates[i]:
            cv[i] +=1
print("Election Results" + "\n"
+ "-------------------------" + "\n"
+ "Total Votes: " + str(TV) + "\n"
"-------------------------")
for i in range(len(candidates)):        
    pc.append(str(round(cv[i] / TV * 100,3)) + "%")
    print(str(candidates[i]) + ": " + str(pc[i]) + " (" + str(cv[i]) + ")")
mv = max(cv)
ind = cv.index(mv)
print("-------------------------" + "\n"
+ "Winner: " + candidates[ind] + "\n"
+"-------------------------")


