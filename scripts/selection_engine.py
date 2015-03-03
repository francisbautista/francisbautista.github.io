# Authors: Francis Bautista and Eyana Mallari
# Created At: 2015
# Data Visualization Final Project
# Traffic Forecasting Visualization

import sys, collections, os, os.path, time, datetime
from numpy import *

# Set filename list and prefixer for directory navigation
INPUT_FILE = "../data/status_filenames.txt"
DIR_PREFIX = "../data/daily_status/"
FN_LINE = "../output/collated_status.csv"
OUT_PREFIX = "../output/stations/collated_station_"
DAY_PREFIX = "../output/station_days/"
SD_PREFIX = "../output/station_day_summary/"
OUT_HEADER = "#year,month,day,hour,lineID,stationID,statusN,statusS\n"
FINAL_HEADER = "lineID,stationID,day,hour,nHigh,nMed,nLow,sHigh,sMed,sLow\n"

# Loop through filename list and add prefixer to each element
NAME_LIST = [DIR_PREFIX + s  for s in loadtxt(INPUT_FILE, dtype='a',unpack=False)]

def main():
	print "Running LINE SELECTION ENGINE:"
	print "------------------------------"
	line_number = raw_input('Enter a Line Number: ')
	line_selection_engine(int(line_number))
	time.sleep(1)
	print "\n"
	print "Running STATION SELECTION ENGINE:"
	print "------------------------------"
	station_isolation_engine()
	time.sleep(1)
	print "\n"
	print "Running day_isolation_engine:"
	print "------------------------------"
	day_isolation_engine()
	time.sleep(1)
	print "\n"
	print "Running day_summary_engine:"
	print "------------------------------"
	day_summary_engine()
	time.sleep(1)
	sys.exit(1)

# Day Summary Engine works to read the per station day data and summarizes
# and collates HML data into percentage values
def day_summary_engine():
	DIR = '../output/stations'
	station_count = len([name for name in os.listdir(DIR) if os.path.isfile(os.path.join(DIR, name))])

	for station in arange(station_count):
		for day in arange(7):
			fn = DAY_PREFIX+'s'+str(station)+'d0'+ str(day)+".csv"
			year,month,day_stuff,hour,lineID,stationID,statusN,statusS=loadtxt(fn, usecols =(0,1,2,3,4,5,6,7), unpack=True, delimiter=",", dtype=int, skiprows = 1)
			# Loop through time and derive percentage value for HML
			for time in arange(24):
				nData = statusN[hour==time]
				nTot = len(nData[nData>-1])
				nHigh = round(len(nData[nData==2])/float(nTot)*100)
				nMed = round(len(nData[nData==1])/float(nTot)*100)
				nLow = round(len(nData[nData==0])/float(nTot)*100)

				sData = statusS[hour==time]
				sTot = len(sData[sData>-1])
				sHigh = round(len(sData[sData==2])/float(sTot)*100)
				sMed = round(len(sData[sData==1])/float(sTot)*100)
				sLow = round(len(sData[sData==0])/float(sTot)*100)

				day_sum_writer(lineID[0], stationID[0], day, time, nHigh,nMed,nLow,sHigh,sMed,sLow )

# Maps per station day CSV data
def day_isolation_engine():
	DIR = '../output/stations'
	station_count = len([name for name in os.listdir(DIR) if os.path.isfile(os.path.join(DIR, name))])
	for i in arange(station_count):
		station_file = OUT_PREFIX + str(i)+".csv"
		year,month,day_stuff,hour,lineID,stationID,statusN,statusS=loadtxt(station_file, usecols =(0,1,2,3,4,5,6,7), unpack=True, delimiter=",", dtype=int, skiprows = 1)
		for k in arange(len(year)):
			year_val = year[k]
			month_val = month[k]
			day_val = day_stuff[k]
			hour_val = hour[k]
			line_val = lineID[k]
			station_val = stationID[k]
			statusN_val = statusN[k]
			statusS_val = statusS[k]
			for j in arange(7):
				day = datetime.datetime(year_val, month_val, day_val).weekday()
				if (day==j):
					day_writer(year_val,month_val,day_val,hour_val, line_val,station_val,statusN_val,statusS_val, i,j)
			percentage = i/float(station_count)*100
			sys.stdout.write("\r")
			progress = ""
			for l in range(100):
				if l < int(percentage):
					progress += "#"
				else:
					progress += " "
			sys.stdout.write("[ %s ] %.2f%%" % (progress, percentage))
			sys.stdout.flush()


def station_isolation_engine():
	# Map CSV cols to labels for manipulation
	year,month,day,hour,lineID,stationID,statusN,statusS = loadtxt(FN_LINE, usecols =(0,1,2,3,4,5,6,7), unpack=True, delimiter=",", dtype=int, skiprows = 1)
	ctr = 0

	# Loop through each item of the file
	for i in arange(len(year)):
		ctr = ctr + 1

		# Loop through each station and check if it matches with current station
		for current_station in arange(19):
			if stationID[i]==current_station: # if stationID[0]==0
				station_writer(current_station, year[i],month[i],day[i],hour[i],lineID[i],stationID[i],statusN[i],statusS[i], i)

		# Progress Bar
		percentage = ctr/float(len(year))*100
		sys.stdout.write("\r")
		progress = ""
		for i in range(100):
			if i < int(percentage):
				progress += "#"
			else:
				progress += " "
		sys.stdout.write("[ %s ] %.2f%%" % (progress, percentage))
		sys.stdout.flush()


#TODO Modify for stdout printing of progress bar
def line_selection_engine(line_number):
	ctr = 0
	# Loop through each filename
	fn_out= FN_LINE
	fp=open(fn_out,'w')
	fp.write(OUT_HEADER)
	# Loop through every filename in the list
	for fn in NAME_LIST[0:(len(NAME_LIST)-1)]:
		ctr = ctr + 1

		# Assign column names to CSV cols
		year,month,day,hour,lineID,stationID,statusN,statusS = loadtxt(fn, usecols = (0,1,2,3,5,6,7,8), unpack=True, delimiter=",", dtype=int, skiprows = 1)

		# Loop through every element in each file and store
		for i in arange(len(year)):
			if(lineID[i]==line_number):
				fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year[i],month[i],day[i],hour[i],lineID[i],stationID[i],statusN[i],statusS[i]))

		# Progress Bar
		total_percentage = (ctr/float(len(NAME_LIST)))*100
		current_file =" Currently reading \""+ fn + "\""
		bar_length=100
		hashes = '#' * int(total_percentage)
		spaces = ' ' * (bar_length - len(hashes))
		os.system('clear')
		print("\rPercent Completed: [{0}] {1}%".format(hashes + spaces, int(total_percentage)))
		print current_file
	fp.close()
	print "Written to %s." % fn_out

# Day Summary Writer
def day_sum_writer(lineID,stationID,day,hour,nHigh,nMed,nLow,sHigh,sMed,sLow):
	station_ctr = stationID
	day_ctr = day
	if(os.path.isfile(SD_PREFIX+'s'+str(station_ctr)+'d0'+str(day_ctr)+'.csv')==False):
		fp=open(SD_PREFIX+'s'+str(station_ctr)+'d0'+str(day_ctr)+'.csv','a')
		fp.write(FINAL_HEADER)
	else:
		fp=open(SD_PREFIX+'s'+str(station_ctr)+'d0'+str(day_ctr)+'.csv','a')
	fp.write("%d,%d,%d,%d,%d,%d,%d,%d,%d,%d\n" % (lineID,stationID,day,hour,nHigh,nMed,nLow,sHigh,sMed,sLow))
	fp.close()

# Creates file for each station with write-append rules.
def station_writer(num,year,month,day,hour,lineID,stationID,statusN,statusS, loop_ctr ):
	if(os.path.isfile(OUT_PREFIX+str(num)+'.csv')==False):
		fp=open(OUT_PREFIX+str(num)+'.csv','a')
		fp.write(OUT_HEADER)
	else:
		fp=open(OUT_PREFIX+str(num)+'.csv','a')
	fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year,month,day,hour,lineID,stationID,statusN,statusS))
	fp.close()

# Creates a file for each day and station
def day_writer(year,month,day,hour,lineID,stationID,statusN,statusS, station_ctr,day_ctr  ):
	if(os.path.isfile(DAY_PREFIX+'s'+str(station_ctr)+'d0'+str(day_ctr)+'.csv')==False):
		fp=open(DAY_PREFIX+'s'+str(station_ctr)+'d0'+str(day_ctr)+'.csv','a')
		fp.write(OUT_HEADER)
	else:
		fp=open(DAY_PREFIX+'s'+str(station_ctr)+'d0'+str(day_ctr)+'.csv','a')
	fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year,month,day,hour,lineID,stationID,statusN,statusS))
	fp.close()


if __name__ == '__main__':
	main()
