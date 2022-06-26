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
 dir = arr[-2]
 try:
  json_obj[dir]. append(name)
 except:
  json_obj. update({dir:[]})
  json_obj[dir]. append(name)

str=json.dumps(json_obj)
print(str)

f = open('dir.json','w')
f.write(str)
f.close()

########################
token=os.environ['GITHUB_TOKEN']
rep_name=os.environ['REPOSITORY'].split('/')[-1]
filename='/assets/test.txt'
data='blabla'
print([token, rep_name, filename, data])

g = Github(token)
rep = g.get_user().get_repo(rep_name)
file = rep.get_file_contents(filename);

rep.update_file(filename,'json commit',data,file.sha)