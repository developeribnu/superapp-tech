# import library xmlrpc karena akan digunakan komunikasi dengan metode RPC
import xmlrpc

# import xmlrpc bagian client
import xmlrpc.client

import base64

# buat proxy untuk mengakses server. Gunakan parameter URL server yang akan diakses berupa IP dan port. Bentuk http://IP:port
proxy = xmlrpc.client.ServerProxy('http://localhost:8001/')

# buat/buka file baru dengan nama "hasil_download.txt" sebagai hasil download dari server
with open("hasil_download.txt","wb") as handle:
    # tulis/isi file hasil_download.jpg dengan hasil dari memanggil fungsi "download" yang berada server
    #handle.write(proxy.download().data)
    handle.write(proxy.download().data)
    #print (proxy.download().data)
    # tutup file hasil_download.jpg
    #handle.close()


