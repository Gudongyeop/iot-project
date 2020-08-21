## amg8833 모듈 세팅  

- 모듈 연결 확인
```
$ sudo i2cdetect -y 1
```
- Adafruit_Python_GPIO 다운로드
```
$ sudo apt-get install -y build-essential python-pip python-smbus git
$ git clone https://github.com/adafruit/Adafruit_Python_GPIO
$ cd Adafruit_Python_GPIO
$ sudo python setup.py install
$ sudo apt-get install -y python-scipy python-pygame
$ sudo pip3 install colour Adafruit_AMG88xx
$ cd
```
- Adafruit_AMG88xx_python 다운로드
```
$ git clone https://github.com/adafruit/Adafruit_AMG88xx_python
$ cd Adafruit_AMG88xx_python
$ cd examples

$ python3 pixels_test.py
$ python3 thermal_cam.py
```
- VNC 해상도 변경하기
```
$ vncserver -geometry 1280x1024
```
## mjpg 카메라 스트리밍  
- 디렉토리 생성
```
$ sudo apt-get update
$ mkdir mjpg
$ cd mjpg
```

- git 다운로드
```
$ git clone https://github.com/jacksonliam/mjpg-streamer.git
$ cd mjpg-streamer
$ cd mjpg-streamer-experimental
```

- mjpg-streamer 패키지 설치
```
$ sudo apt-get install cmake
$ make CMAKE_BUILD_TYPE=Debug
$ sudo make install
$ cd
```

- 실행
```
$ sudo nano mjpg.sh
    export STREAMER_PATH=$HOME/mjpg/mjpg-streamer/mjpg-streamer-experimental
    export LD_LIBRARY_PATH=$STREAMER_PATH
    $STREAMER_PATH/mjpg_streamer -i "input_raspicam.so" -o "output_http.so -p 8091 -w $STREAMER_PATH/www"
$ sh mjpg.sh
$ ifconfig
    -> 라즈베리파이의 ip주소 확인
    -> 브라우저 주소창에 ip주소:8091/?action=stream 입력
종료 : Ctrl+Z
```
- 재실행 오류
```
$ sh mjpg.sh -> 프로세스간 충돌 발생 가능
$ ps
$ kill -9 [sh의 PID]
$ sh mjpg.sh -> 재실행
```
## NFC 모듈  
- I2C 사용 허용
```
$ sudo raspi-config
```
- 패키지 설치
```
$ sudo apt-get update
$ sudo apt-get install libusb-dev libpcsclite-dev i2c-tools
```
- libnfc 소스코드 다운
```
$ cd
$ wget http://dl.bintray.com/nfc-tools/sources/libnfc-1.7.1.tar.bz2
$ tar -xf libnfc-1.7.1.tar.bz2
```
- 컴파일 후 설치
```
$ cd libnfc-1.7.1
$ ./configure --prefix=/usr --sysconfdir=/etc
$ make
$ sudo make install
```
- NFC 설정 수정
```
$ cd /etc
$ sudo mkdir nfc
$ sudo vi /etc/nfc/libnfc.conf
```
- /etc/nfc/libnfc.conf
```
# Allow device auto-detection (default: true)

# Note: if this auto-detection is disabled, user has to set manually a device

# configuration using file or environment variable

allow_autoscan = true

 

# Allow intrusive auto-detection (default: false)

# Warning: intrusive auto-detection can seriously disturb other devices

# This option is not recommended, user should prefer to add manually his device.

allow_intrusive_scan = false

 

# Set log level (default: error)

# Valid log levels are (in order of verbosity): 0 (none), 1 (error), 2 (info), 3 (debug)

# Note: if you compiled with --enable-debug option, the default log level is "debug"

log_level = 1

 

# Manually set default device (no default)

# To set a default device, you must set both name and connstring for your device

# Note: if autoscan is enabled, default device will be the first device available in device list.

#device.name = "_PN532_SPI"

#device.connstring = "pn532_spi:/dev/spidev0.0:500000"

device.name = "_PN532_I2c"

device.connstring = "pn532_i2c:/dev/i2c-1"

출처: https://software-craftsman.tistory.com/48 [소프트웨어 장인]
```
- 연결 확인
```
$ i2cdetect -y 1
```
-> 24 출력되면 인식 성공.
- NFC Card 읽기
```
$ nfc-poll
```  
## MariaDB 설치
- 설치
```
$ sudo apt-get update
$ sudo apt-get install mariadb-server
$ sudo mysql
MariaDB [(none)] > show databases;
```
- 계정 설정
```
$ sudo mysql -u root
MariaDB [(none)] > use mysql;
MariaDB [(mysql)] > update user set password=password('ssafy') where user='root';
MariaDB [(mysql)] > select user, host, password from user;
```
- 외부 접속 설정
```
$ sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
-> bind-address = 127.0.0.1 부분 주석 처리하기.
```
- 방화벽 설정
```
$ sudo iptables -A INPUT -p tcp --dport 3306 -j ACCEPT
$ sudo iptables -A OUTPUT -p tcp --dport 3306 -j ACCEPT
$ sudo iptables-save
```
- mysql 권한 설정
```
$ sudo mysql -u root
MariaDB [(none)] > use mysql;
MariaDB [(mysql)] > grant all privileges on *.* to 'root'@'%' identified by 'ssafy';
MariaDB [(mysql)] > flush privileges;
$ sudoo service mysql restart
```
- 접속 테스트
    + IP : raspberry pi의 ip주소
    + 사용자 : root
    + 암호 : ssafy

## PyQt 사용법
- PyQt 기본 설치
```
$ sudo apt-get install python3-pyqt5
$ sudo apt-get install qttools5-dev-tools
```
- PyQt 테스트
```
$ python3
$ import PyQt5
```
- PyQt 기본 구조
```
from PyQt5.QtWidgets imoprt *
from PyQt5.uic import *

class MyApp(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("lay.ui", self)
app = QApplication([])
win = MyApp()
win.show()
app.exec_()
```
