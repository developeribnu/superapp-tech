# import library SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCServer

# import xmlrpc bagian client
import xmlrpc.client


# buatlah fungsi bernama download()
def file_download():
    # definisi ukuran buffer
    #BUFFER_SIZE = os.path.getsize("file_didownload.txt")
    #print (BUFFER_SIZE)
    
    # buka file bernama "file_didownload.txt"
    with open("file_didownload.txt",'rb') as handle:
        # kirimkan file tersebut dalam bentuk xml dengan cara memanggil xmlrpc.client.Binary()
        return xmlrpc.client.Binary(handle.read())
        # tutup file "file_didownload.jpg"
        #handle.close()

# buat server pada IP dan port yang telah ditentukan
server = SimpleXMLRPCServer(('localhost',8001))

# print bahwa "server mendengarkan pada port xxx"
print ("Listening on port 8001")

# register fungsi download pada server
server.register_function(file_download,'download')

# jalankan server
server.serve_forever()