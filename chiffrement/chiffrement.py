#!/usr/bin/env python3

import sys
import re
import numpy as np
import math

key_matrix = []
message_matrix = []
common_size = 0

def getHigher(tab):
    val = 0

    for i in tab:
        if val < len(i):
            val = len(i)
    return val

def affTab(tab):
    for y in range(len(tab)):
        for x in range(len(tab[y])):
            tab[y][x] = float(tab[y][x])
    for i in tab:
        print(i)

def makeTab(chaine):
    return re.findall(r"[\w']+",chaine)

def getSizeDiff(matrix1, matrix2):
    max_key = getHigher(matrix1)
    max_message = len(matrix2)

    return max_key if max_key > max_message else max_message

def scale_matrices(key, message):
    return getSizeDiff(key, message)

def create_decrypt_matrix(matrix, height):
    tab = [[1.0 for j in range(len(matrix))] for i in range(height)]

#    affTab(matrix)
    for i in range(len(matrix)):
        for j in range(height):
            tab[i][j] = matrix[i][j]
    return tab


def create_message_matrix(chaine, size):
    chaine = makeTab(chaine)
    tab = [[1.0 for j in range(size)] for i in range(size)]

    for i in range(len(chaine)):
        for j in range(len(chaine[i])):
            tab[i][j] = ord(chaine[i][j])
    return tab

def getIteration(key):
    return len(key)

def addDelta(key):
    delta = 0
    top1X = 0
    top1Y = 0
    bottom1X = 0
    bottom1Y = len(key) - 1
    top2X = len(key[0]) - 1
    top2Y = 0
    bottom2X = len(key[0]) - 1
    bottom2Y = len(key) - 1

    for count in range(len(key) if len(key) < len(key[0]) else len(key[0])):
        delta += (key[top1Y][top1X] + key[bottom1Y][bottom1X]) - (key[top2Y][top2X] + key[bottom2Y][bottom2X])
        top1Y += 1
        top1X += 1
        bottom1Y -= 1
        bottom1X += 1
        top2Y += 1
        top2X -= 1
        bottom2Y -= 1
        bottom2X -= 1
    return delta

def pow(tab, pow):
    for y in range(len(tab)):
        for x in range(len(tab[y])):
            tab[y][x] = round(tab[y][x] * pow)
    return tab

def create_key_matrix(chaine, size):
    chaine = makeTab(chaine)
    tab = [[1.0 for j in range(size)] for i in range(size)]

    for i in range(len(chaine)):
        for j in range(len(chaine[i])):
            tab[i][j] = ord(chaine[i][j])
    return tab

def doreverse(tab, idx):
    for y in range(len(tab)):
        for x in range(len(tab[y])):
            tab[y][x] *= idx
    return tab

def modulo(tab, mod):
    for y in range(len(tab)):
        for x in range(len(tab[y])):
            tab[y][x] %= mod
    return tab

def divide(tab, div):
    for y in range(len(tab)):
        for x in range(len(tab[y])):
            tab[y][x] = round(tab[y][x] / div, 2)
            # tab[y][x] /= div
    return tab

def add(tab, add):
    for y in range(len(tab)):
        for x in range(len(tab[y])):
            tab[y][x] += add if tab[y][x] > 0 else 0
    return tab


def getCommonSize(key, message):
    length = getHigher(makeTab(key)) if getHigher(makeTab(key)) >= getHigher(makeTab(message)) else getHigher(makeTab(message))
    height = len(makeTab(key)) if len(makeTab(key)) >= len(makeTab(message)) else len(makeTab(message))

    return length if length > height else height

def display_mean(tab):
    for y in range(len(tab)):
        # for x in range(len(tab[y])):
                # print(chr(-int(tab[y][x])))
        print(''.join(chr(int(abs(i)) if i > 48 else 0) for i in tab[y]))

def ajust_matrix(matrix, scale):
    tab = [[1.0 for j in range(scale)] for i in range(scale)]

    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            tab[i][j] = matrix[i][j]
    return tab

def clean_matrix(matrix):
    for y in range(len(matrix)):
        for x in range(len(matrix[y])):
            # print("nb: {}, abs: {}".format(matrix[y][x], abs(matrix[y][x])))
            # value = matrix[y][x]
            if (math.isinf(matrix[y][x]) or math.isnan(matrix[y][x]) or matrix[y][x] == 0):
                matrix[y][x] = 1
            # value = matrix[y][x] if abs(matrix[y][x]) >= 0 else 0
            # print("value: {}".format(value))
    return matrix

def getMultCase(key, message, y):
    res = 0
    for i in range(len(key[y])):
        res += key[y][i] * message[i][y]
        print("key = {}, message = {}, res = {}".format(key[y][i], message[i][y], res))
    print("\n\n")
    return res

def getDivCase(val, line):
    print("val: {}, line: {}".format(val, line))
    res = 0
    for i in line:
        # print(i)
        res += i/val
    print("res: {}".format(res/val))
    return val/res

def matrix_mult(key, message, scale):
    matrix = [[1.0 for j in range(scale)] for i in range(scale)]

    for y in range(len(key)):
        for x in range(len(key[y])):
            matrix[y][x] = key[y][x] * message[y][x]
    return matrix

def matrix_div(key, message, scale):
    matrix = [[1.0 for j in range(scale)] for i in range(scale)]

    for y in range(len(key)):
        for x in range(len(key[y])):
            matrix[y][x] = message[y][x] / key[y][x]
    return matrix

common_size = getCommonSize(sys.argv[1], sys.argv[2])
print("Common size: {}".format(common_size))
key_matrix = create_key_matrix(sys.argv[1], common_size)
message_matrix = create_message_matrix(sys.argv[2], common_size)
delta = addDelta(key_matrix)
print("Delta: {}".format(delta))
# pow(key_matrix)
print("Key matrix: ")
affTab(key_matrix)
# print("reverse key: ")
# display_mean(key_matrix)

print("\n\nMessage matrix: ")
affTab(message_matrix)

#print("\nHighest size: ")
# scale = scale_matrices(key_matrix, message_matrix)
mult_matrix = matrix_mult(key_matrix, message_matrix, common_size)
# mult_matrix = np.matmul(key_matrix, message_matrix)
print("\n\nafter mult: ")
affTab(mult_matrix)
# mult_matrix = doreverse(mult_matrix, 1/delta)
# mult_matrix = modulo(mult_matrix, 26)
mult_matrix = divide(mult_matrix, 34)
print("\n\nAfter divide: ")
affTab(mult_matrix)

display_mean(mult_matrix)

# print("Decryption: ")
# key_matrix = ajust_matrix(key_matrix, common_size)
# mult_matrix = ajust_matrix(pow(mult_matrix, delta), common_size)
# print("\n\najusted key: ")
# affTab(key_matrix)
# print("\n\najusted mult: ")
mult_matrix = pow(mult_matrix, 34)
affTab(mult_matrix)
res_matrix = matrix_div(clean_matrix(key_matrix), clean_matrix(mult_matrix), common_size)
print("res: ")
affTab(res_matrix)
display_mean(res_matrix)
print("Message matrix: ")
affTab(message_matrix)
# decrypted_matrix = np.matdivide(clean_matrix(mult_matrix), clean_matrix(key_matrix))
# decrypted_matrix = decryption(mult_matrix, delta)
# print("\n\nDecrypted matrix")
# affTab(clean_matrix(decrypted_matrix))
# display_mean(clean_matrix(decrypted_matrix))
#decrypt_matrix = create_decrypt_matrix(mult_matrix, getHigher(makeTab(sys.argv[1])))
#print("\n\nDecrypt matrix: ")
#affTab(decrypt_matrix)

#final_matrix = np.matmul(key_matrix, decrypt_matrix)
#affTab(final_matrix)
