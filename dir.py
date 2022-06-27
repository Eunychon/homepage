import glob
import json

from github import Github
import os

json_obj = {}

urls = glob.glob('*assets/**/*.*', recursive = True)

for url in urls:
 url = url.replace('\\', '/')
 arr = url.split('/')
 name = arr[-1]
 dir = '/'.join(arr[0:-1])
 data = {"name": name, "path":dir}
 try:
  json_obj[dir]. append(data)
 except:
  json_obj. update({dir:[]})
  json_obj[dir]. append(data)

"""
str=json.dumps(json_obj)
print(str)
"""

########################

token=os.environ['GITHUB_TOKEN']
rep_name=os.environ['REPOSITORY'].split('/')[-1]

g = Github(token)
rep = g.get_user().get_repo(rep_name)

"""
filename='assets/list.json'
data='blabla'
#print([token, rep_name, filename, data])

files = rep.get_contents(filename);
rep.update_file(filename,'json commit',data,files.sha)

rep.create_file(filename,'json commit',data)
"""

for dir, data in json_obj.items():
 filename=dir+'/list.json'
 data=json.dumps(data)
 if not os.path.exists(filename):
  print('create_file')
  print(filename)
  print(data)
  rep.create_file(filename,'json commit',data)
 else:
  f=open(filename,'r')
  f_data=f.read()
  f.close()
  if data!=f_data:
   print('update_file')
   print(filename)
   print(data)
   files = rep.get_contents(filename);
   rep.update_file(filename,'json commit',data,files.sha)