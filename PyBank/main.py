import os
import csv
from pathlib import Path 
data_folder = Path ("Resources")
file_to_open = data_folder / "budget_data.csv"
f = open(file_to_open)
Tm = 0
T = 0
R = []
RC = []
csvreader = csv.reader(f, delimiter=",")
header = next(csvreader)
for row in csvreader:
     Tm = Tm + 1
     T +=int(row[1])
     R.append(int(row[1]))
     Mp = max(R)
     Np = min(R)
     if int(row[1]) == Np:
             dn = row[0]
     if int(row[1]) == Mp:
             dm = row[0]
for i in range(1,len(R)):
     RC.append(R[i] - R[i-1])
     AV = sum(RC) / len(RC)
print("Financial Analysis" + "\n" 
+ "----------------------------" + "\n" 
+ "Total Months: " + str(Tm) + "\n" 
+ "Total: " + str(T) + "\n" 
+ "Average Change:" + str(round(AV,2)) + "\n" 
+ "Greatest Increase in Profits: " + dm + " ($" + str(Mp) +")" + "\n" 
+ "Greatest Decrease in Profits: "+ dn + " ($" + str(Np) + ")")
file = open('main.txt', 'w')
file.write("Financial Analysis" + "\n" 
+ "----------------------------" + "\n" 
+ "Total Months: " + str(Tm) + "\n" 
+ "Total: " + str(T) + "\n" 
+ "Average Change:" + str(round(AV,2)) + "\n" 
+ "Greatest Increase in Profits: " + dm + " ($" + str(Mp) +")" + "\n" 
+ "Greatest Decrease in Profits: "+ dn + " ($" + str(Np) + ")")
file.close