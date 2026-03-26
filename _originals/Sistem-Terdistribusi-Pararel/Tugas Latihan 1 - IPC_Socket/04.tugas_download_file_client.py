# import library socket karena menggunakan IPC socket
import socket

# definisikan IP server tujuan file akan diupload
ip_server = "192.168.43.149"

# definisikan port number proses di server
port_server = 8080

# definisikan ukuran buffer untuk mengirim
buffer_size = 1024

# buat socket (apakah bertipe UDP atau TCP?)
socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# lakukan koneksi ke server
socket.connect((ip_server,port_server))

# buka file bernama "hasil_download.txt bertipe byte
# masih hard code, file harus ada dalam folder yang sama dengan script python
file_download = open("hasil_download.txt","wb")

# loop forever
while 1:
    # terima pesan dari client
	data = socket.recv(buffer_size)
	print("Now Download")
    # tulis pesan yang diterima dari client ke file kita (result.txt)
	while (data):
		file_download.write(data)
		data = socket.recv(buffer_size)
    
    # berhenti jika sudah tidak ada pesan yang dikirim
	if not data: break
 
print("Download Complete")    
# tutup file_hasil_download.txt    
file_download.close()

#tutup socket
socket.close()