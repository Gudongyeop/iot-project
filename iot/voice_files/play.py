from omxplayer import OMXPlayer
from time import sleep

player = OMXPlayer("sitdown.m4a")

player.play()
sleep(5)
player.pause()

player.quit()
