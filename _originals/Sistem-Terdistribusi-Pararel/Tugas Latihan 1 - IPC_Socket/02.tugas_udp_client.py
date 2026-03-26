# -*- coding: utf-8 -*-
"""
Created on Fri Jan 31 14:13:03 2020

@author: ASUS
"""

# import library socket karena akan menggunakan IPC socket
import socket

# definisikan target IP server yang akan dituju
IP = '192.168.43.149'

# definisikan target port number server yang akan dituju
PORT = 8080

#print ("target IP:", UDP_IP)
#print ("target port:", UDP_PORT)
#print ("pesan:", PESAN)

# buat socket bertipe UDP
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# lakukan loop 10 kali
for x in range (10):
    # definisikan pesan yang akan dikirim
    PESAN = "Hello World"
    
    # kirim pesan    
    s.sendto(PESAN.encode(),(IP,PORT))

