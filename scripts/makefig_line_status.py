"""
Plot traffic status over C5 over 07/25/2014.
"""

from numpy import *
from matplotlib import pyplot as plt

fn="../output/collated_status_20140725.csv"
#year,month,day,hour,qtr,lineID,stationID,statusN,statusS
year,month,day,hour,qtr,lineID,stationID,statusN,statusS=loadtxt(fn,unpack=True,delimiter=',')

fnB="../input/line_stations.csv"
lineIDA,stationIDA=loadtxt(fnB,unpack=True,delimiter=',',usecols=arange(2))
stationNameA=loadtxt(fnB,unpack=True,delimiter=',',usecols=arange(1)+2,dtype='a')

lineID0=4 #c5
iline=[lineID==lineID0] 
nstation=max(stationID[iline])+1
ybase=arange(nstation)
xx=arange(96)
timeS=zeros(96)
fac=3
yoffset=1

stn_names=stationNameA[lineIDA==lineID0]

yref=arange(nstation)*3+2

plt.clf()
# loop over stations
for istn in arange(nstation):
    iline_stn=[(lineID==lineID0)&(stationID==istn)]
    yy=statusN[iline_stn]
    yyB=statusS[iline_stn]
    plt.plot(xx,yy+ybase[istn]*fac+yoffset,'k-',lw=2,alpha=0.6)
    plt.plot(xx,yyB+ybase[istn]*fac+yoffset,'b-',lw=2,alpha=0.6)  
    plt.axhline(yref[istn],c='0.6',ls=':')
    
plt.yticks(arange(nstation)*3+2,stn_names)
plt.xticks(arange(24)*4,arange(24))
plt.title("July 25, 2014 - Stations along C-5")
plt.xlim((0,95))

plt.savefig("../fig/fig_line_status_c5.png")
