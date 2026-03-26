# import library socket karena akan digunakan request reply protocol sederhana
import socket

# definisikan IP dan port dari webserver yang akan kita gunakan. Port HTTP adalah 80
HOST, PORT = '127.0.0.1', 80

# buat socket bertipe TCP
listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# lakukan binding 
listen_socket.bind((HOST, PORT))

# socket mendengarkan
listen_socket.listen(1)

# tampilkan dengan print () "Server berjalan dan melayani HTTP pada port xx"
print ("Serving HTTP on port %s ..." %PORT)

# loop forever
while True:
    # socket menerima koneksi
    client_connection, client_address = listen_socket.accept()
    
    # socket menerima data
    request = client_connection.recv(1024)
    
    # print data hasil koneksi
    print (request)
    
    # buat response sesuai spesifikasi HTTP untuk diberikan kepada client
    http_response = """\HTTP/1.1 200 OK

<html>
<head>
<title>Web Server Sederhana</title>
</head>
<body>

<h1>Heading 1</h1>
<p>Ini adalah contoh paragraf.</p>
<img src="https://www.surfertoday.com/images/stories/surfetiquette.jpg">

</body>
</html>
"""
    # kirim response kepada client dengan sendall() jangan lupa diencode response dengan utf-8 
    client_connection.sendall(http_response.encode('utf-8'))
    
    # tutup koneksi
    client_connection.close()

# Selamat! Kamu telah berhasil membuat web server sederhana. 
