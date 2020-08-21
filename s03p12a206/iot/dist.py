from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
import RPi.GPIO as GPIO
import atexit
import sys
import time

trig = 23
echo = 24
LED = 18
buzzer = 12

GPIO.setmode(GPIO.BCM)
GPIO.setup(trig, GPIO.OUT)
GPIO.setup(echo, GPIO.IN)
GPIO.setup(LED, GPIO.OUT)
GPIO.setup(buzzer, GPIO.OUT)
p = GPIO.PWM(buzzer, 200)		#주파수 대역 설정


class pollingThread(QThread):
    def __init__(self):
        super().__init__()
  
    def run(self):
        
        while True:
            time.sleep(0.1)
            self.getDist()

    def getDist(self):
        global trig, echo, LED, p

        GPIO.output(trig, False)
        time.sleep(0.5)
        
        GPIO.output(trig, True)
        time.sleep(0.00001)
        GPIO.output(trig, False)

        while GPIO.input(echo) == 0:
            pulse_start = time.time()

        while GPIO.input(echo) == 1:
            pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start
        self.distance = pulse_duration * 17000
        self.distance = round(self.distance, 2)
                
        if self.distance < 10 :
            GPIO.output(LED, True)
            print("Warnnig : distance is less than 10cm!")
            p.start(30)
        else :
            GPIO.output(LED, False)
            p.stop()


th = pollingThread()
th.start()

app = QApplication([])

#infinity loop
while True: 
    pass