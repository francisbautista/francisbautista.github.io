"""
Collate traffic status CSV files (for 1 day).
"""

from numpy import *
import os

fndir="../output_20140725"
fnlist=os.listdir(fndir)
nfn=len(fnlist)

# open file to output to
fn_out="../output/collated_status_20140725.csv"
fp=open(fn_out,'w')
fp.write("#year,month,day,hour,qtr,lineID,stationID,statusN,statusS\n")

#status dictionary: LMH -> 012
sdict={'L':0, 'M':1, 'H':2}

#142 stations 
#96 status updates a day (24 hours x 4 per hour)
#lineID, stationID, statusN, statusS, timestamp
for i in arange(nfn):
	fnbase=fnlist[i]
	fn=fndir+"/"+fnbase
	lineID, stationID = loadtxt(fn,unpack=True,delimiter=',',usecols=arange(2))
	statusN, statusS =	loadtxt(fn,unpack=True,delimiter=',',usecols=arange(2)+2,dtype='a')	

	# parse date, hour, quarter from filename
	yearS=fnbase.split("_")[1][0:4]
	monthS=fnbase.split("_")[1][4:6]
	dayS=fnbase.split("_")[1][6:8]
	hourS=fnbase.split("_")[2]
	qtrS=fnbase.split("_")[3].split(".")[0]

	# output lines
	nline=len(lineID)
	for j in arange(nline):
		fp.write("%s,%s,%s,%s,%s,%2d,%3d,%d,%d\n" % (yearS,monthS,dayS,hourS,qtrS, lineID[j],stationID[j],sdict[statusN[j].strip()],sdict[statusS[j].strip()]))
	
fp.close()
print "Written to %s." % fn_out
		
		
	