"""
Written 07/03/2014
Parse MMDA-Interaksyon webpage for traffic status. 
Accepts as argument the output filename.
"""

from BeautifulSoup import BeautifulSoup
import urllib2
from numpy import *
import re
import sys

#fn_out="../output/status_20140703_21_4.csv" # 4th quarter of 21st hour of this day
fn_out=sys.argv[1]

# read in list of line names that is basis for URL
fn="../input/line_names.csv"
linekey=loadtxt(fn,unpack=True,usecols=arange(1)+2,delimiter=',',dtype='a')
nstation_line=loadtxt(fn,unpack=True,usecols=arange(1)+1,delimiter=',')
nlines=len(linekey)

fp=open(fn_out,'w')
fp.write("#lineID, stationID, statusN, statusS, timestamp\n")

# loop over lines (9)
for j in arange(nlines):
	url="http://mmdatraffic.interaksyon.com/line-view-"+linekey[j].strip()+".php"
	#print "Doing Line %d, %s." % (j, linekey[j])
	page=urllib2.urlopen(url)
	soup=BeautifulSoup(page)

	linename=soup.findAll(attrs={"class":"line-name"})
	linestatus=soup.findAll(attrs={"class":"line-status"}) # Northbound, Southbound
	timestamp=soup.findAll(attrs={"id":re.compile("datetime")}) # tag contains "datetime"

	nstation=len(linename)-1
	# check if number of stations read in = masterlist
	if(nstation!=nstation_line[j]):
		print "Warning for line %s: number of stations read in is %d, expected %d.\n" % (linekey[j],nstation,nstation_line[j])
	linenames=zeros(nstation,dtype='a30')
	linestatusN=zeros(nstation,dtype='a1') # just take 'L', 'M', 'H'
	linestatusS=zeros(nstation,dtype='a1')
	
	# get timestamp
	tstr=timestamp[0].string
	ts=tstr.split(':')[1].strip()+':'+tstr.split(':')[2][0:2]

	for i in arange(nstation):
		# skip first entry because that is "header"
		#linename[0].strong.string --> EDSA
		#linenames[i]=linename[i+1].p.a.string # not used; assumed same order
		linestatusN[i]=linestatus[2*i].findAll('div')[1].string
		linestatusS[i]=linestatus[2*i+1].findAll('div')[1].string	
		fp.write("%d, %d, %s, %s, %s\n" % (j, i, linestatusN[i], linestatusS[i], ts))
		
fp.close()
print "Written to %s." % fn_out