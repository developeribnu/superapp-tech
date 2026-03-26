import xmlrpc.client

s = xmlrpc.client.ServerProxy('http://127.0.0.1:8080')
print(s.vote("candidate_2"))

print(s.querry())

# Print list of available methods
#print(s.system.listMethods())
