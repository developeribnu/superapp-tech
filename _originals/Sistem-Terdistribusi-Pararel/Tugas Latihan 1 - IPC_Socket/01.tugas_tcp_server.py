# -*- coding: utf-8 -*-
"""
Created on Fri Jan 31 14:06:46 2020

@author: ASUS
"""

# import library socket karena akan menggunakan IPC socket
import socket

# definisikan alamat IP binding  yang akan digunakan 
ip_server = '192.168.43.39'

# definisikan port number binding  yang akan digunakan 
tcp_port = 8081

# definisikan ukuran buffer untuk mengirimkan pesan
BUFFER_SIZE = 1024

# buat socket bertipe TCP
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# lakukan bind
s.bind((ip_server, tcp_port))

# server akan listen menunggu hingga ada koneksi dari client
s.listen(1)

# lakukan loop forever
while 1:
	# menerima koneksi
    koneksi, addr = s.accept() 
	
	# menampilkan koneksi berupa IP dan port client yang terhubung menggunakan print
    print("Alamat koneksi : ", addr)
	
	# menerima data berdasarkan ukuran buffer
    data = koneksi.recv(BUFFER_SIZE)
	
	# menampilkan pesan yang diterima oleh server menggunakan print
    print("Pesan yang diterima :", data.decode())
	
	# mengirim kembali data yang diterima dari client kepada client
    koneksi.send(data)

# tutup koneksi
koneksi.close()	