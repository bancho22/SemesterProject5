import matplotlib
from mpl_toolkits.basemap import Basemap
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.cm as cm
import Image
import json
import sys
from pprint import pprint

id = sys.argv[1]

with open('plotting/data/' + id + '.json') as data_file:    
    data = json.load(data_file)

lats = []
lons = []

for i in range(0, len(data)):
    lats.append(data[i]['lat'])
    lons.append(data[i]['lon'])


# pprint(len(lats))
# pprint(len(lons))

m = Basemap(resolution='i',projection='mill',
            llcrnrlon=-179,llcrnrlat=-82,
            urcrnrlon=180,urcrnrlat=80)

x,y = m(lons,lats)

fig = plt.figure(figsize=(100,80))#100,80
#m.arcgisimage(service='World_Imagery')
m.drawcoastlines(linewidth=0.9,color='grey')
#m.plot(x,y,'o',color='r',s=1)#,alpha=0.5)
m.scatter(x,y,marker='o',color='#1c9616',s=300.0)
plt.savefig('public/images/' + id + '.png')
# plt.show()
