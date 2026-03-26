# import library socket karena menggunakan IPC socket
import socket

# definisikan IP server tujuan file akan diupload
IP = "192.168.43.149"

# definisikan port number proses di server
PORT = 8080

# definisikan ukuran buffer untuk mengirim
buffer_size = 1024

# buat socket (apakah bertipe UDP atau TCP?)
socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# lakukan koneksi ke server
socket.connect((IP,PORT))

# buka file bernama "file_diupload.txt bertipe byte
file = open("file_diupload.txt", "rb")
# masih hard code, file harus ada dalam folder yang sama dengan script python


try:
    # baca file tersebut sebesar buffer 
    byte = file.read(buffer_size)
    
    # selama tidak END OF FILE; pada pyhton EOF adalah b''
    while byte != b'':
    # with open('file_upload.txt') as ff:
        # kirim hasil pembacaan file
        socket.send(byte)
        
        # baca sisa file hingga EOF
        byte = file.read(buffer_size)
        print(byte)
finally:
    print ("end sending")
    
    # tutup file jika semua file telah  dibaca
    file.close()

# tutup koneksi setelah file terkirim
socket.close()