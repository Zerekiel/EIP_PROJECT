import re
import math

# Basically str_to_wordtab
def makeTab(chaine):
    return re.findall(r"[\w']+",chaine)

def make_sized_tab(chaine, size):
    return [chaine[i:i+size] for i in range(0, len(chaine), size)]

# translate the ascii values of the matrix into readable characters
def get_meaning(tab):
    mean = ""
    for y in range(len(tab)):
        for x in range(len(tab[y])):
            # transform the values into characters
            # print(int(tab[y][x]))
            mean += chr(int(tab[y][x]))
        # mean += " "
    return mean

def addDelta(key):
    # calculate the delta
    # the formla of the delta is ab - cd
    val = int(((key[0][0] * key[1][1]) - (key[0][1] * key[1][0])) % 127)
    for idx in range(1000):
        delta = val * idx
        # get the inverse delta to multiply with the adjugate matrix of the key
        if delta % 127 == 1:
            return idx