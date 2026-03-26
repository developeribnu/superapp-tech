from xmlrpc.server import SimpleXMLRPCServer
import base64

def file_upload(filedata):
    with open("hasil_upload.txt",'wb') as handle:
        data1=filedata.data #convert from byte to binary IMPORTANT!
        handle.write(data1)
        #handle.write(filedata)
        #handle.close()
        return True  #IMPORTANT
        
# must have return value
# else error messsage: "cannot marshal None unless allow_none is enabled"

server = SimpleXMLRPCServer(('127.0.0.1',9999))
print ("Listening on port 9999")

server.register_function(file_upload,'file_upload')

server.serve_forever()