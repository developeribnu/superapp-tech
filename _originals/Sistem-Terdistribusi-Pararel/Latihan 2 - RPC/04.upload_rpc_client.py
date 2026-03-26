import xmlrpc.client


proxy = xmlrpc.client.ServerProxy("http://localhost:9999")
with open("file_diupload.txt",'rb') as handle:
    data = xmlrpc.client.Binary(handle.read())
    #handle.close()
result = proxy.file_upload(data)
#handle.close()