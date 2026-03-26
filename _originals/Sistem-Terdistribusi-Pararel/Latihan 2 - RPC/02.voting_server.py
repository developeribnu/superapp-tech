from xmlrpc.server import SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCRequestHandler
import threading

# Batasi hanya pada path /RPC2 saja supaya tidak bisa mengakses path lainnya
class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/RPC2',)

# Buat server
with SimpleXMLRPCServer(("127.0.0.1", 8080),
                        requestHandler=RequestHandler) as server:
    server.register_introspection_functions()
    
    candidate_dict = {'candidate_1':0,'candidate_2':0}
    
    lock = threading.Lock()
    
    # Register a function under a different name
    def vote_candidate(x):
        
        
        lock.acquire()
        if candidate_dict.get(x) != None :
            candidate_dict[x] = candidate_dict[x] + 1
            pesan = "Anda telah memilih " + x
            lock.release()
            return pesan

        pesan = "Anda memilih kandidat "+x+" yang tidak ada dalam list"
        lock.release()
        return pesan
    
    server.register_function(vote_candidate, 'vote')

    def querry_result():
        lock.acquire()
        total = 0
        for i in candidate_dict:
            total = total + candidate_dict[i]
        if total == 0:
            lock.release()    
            return "Anda memilih kandidat yang tidak terdaftar" 
        pesan = ""
        for i in candidate_dict:
            hasil_vote = (candidate_dict[i]/total) * 100
            pesan = pesan + i + " memperoleh " + str(hasil_vote) + " %\n"
        lock.release()    
        return pesan
    
    server.register_function(querry_result, 'querry')


    print ("Server voting berjalan...")
    # Run the server's main loop
    server.serve_forever()
    

