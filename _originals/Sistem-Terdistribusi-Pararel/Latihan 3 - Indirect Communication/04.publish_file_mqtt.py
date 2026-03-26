# import paho
import paho.mqtt.client as mqtt #import the client1

# definsi broker yang digunakan
broker_address="localhost"

# buat client bernama P1
print("creating new instance")
client = mqtt.Client("P1") 

# client terkoneksi ke broker
print("connecting to broker")
client.connect(broker_address, port=3333) #connect to broker

# print "baca file"
print ("read file")

# buka file
f = open ("surf.jpg","rb")

# baca semua isi file
imagestring = f.read()

# ubah file dalam bentuk byte gunakan fungsi byte()
byteArray = bytes(imagestring)

# publish dengan topik photo dan data dipublish adalah file
print("publish foto")
client.publish("photo", byteArray ,0)

#client.loop_forever()
client.loop_start()

# tutup file
f.close()