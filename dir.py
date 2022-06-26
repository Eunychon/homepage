import glob
import json

json_obj = {}

urls = glob.glob('*/**/*.*', recursive = True)

for url in urls:
 url = url.replace('\\', '/')
 arr = url.split('/')
 name = arr[-1]
 dir = arr[-2]
 try:
  json_obj[dir]. append(name)
 except:
  json_obj. update({dir:[]})
  json_obj[dir]. append(name)

print(json.dumps(json_obj))