# -*- coding: utf-8 -*-
"""
Created on Fri Jan 31 13:54:29 2020

@author: ASUS
"""

import socket               
 
s = socket.socket()         
print ("Socket berhasil dibuat")

ip = "127.0.0.1" 
port = 12345               
 
s.bind((ip, port))
pesan = "socket bind ke alamat " + ip + " dan port " + str(port)
print (pesan)
 
s.listen(5)     
print ("socket dalam state mendengarkan")           
 
while True:
   c, addr = s.accept()     
   print ('Mendapat koneksi dari', addr)
   pesan = "halo " + str(addr) + " Anda telah berhasil terkoneksi ke server" 
   c.send (pesan.encode())
   c.close()
