## omxplayer  

- library 설치
```
$ pip3 install dbus-python
$ pip3 install omxplayer-wrapper
```
- source code - play.py
```
from omxplayer import OMXPlayer
from time import sleep

player = OMXPlayer("sitdown.m4a")

player.play()
sleep(5)
player.pause()

player.quit()

* "sitdown.m4a" 파일을 5초간 실행.
* 각각의 음성 파일 길이를 생각해서 코드를 작성할 것
```