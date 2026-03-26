# -*- coding: utf-8 -*-
"""
Created on Fri Jan 31 14:03:27 2020

@author: ASUS
"""

import socket               
 
s = socket.socket()         
port = 12345               
s.connect(('192.168.43.149', port))
print (s.recv(1024).decode())
s.close()