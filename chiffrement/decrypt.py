#!/usr/bin/env python3

import sys
from matrices_creation import create_key_matrix, create_message_matrix
from matrices_operations import *
from useful import get_meaning
from useful import addDelta

key_matrix = []
message_matrix = []
encrypted = ""

print("decrypted message:")

def get_content(file):
    myfile = open(file, "r")
    return myfile.read()

# creating the matrix from the key
key_matrix = create_key_matrix(sys.argv[1])
# retrieve the content of the file containing the encrypted message
get_encrypted = get_content(sys.argv[2])
# creating the matrix from the encrypted message
message_matrix = create_message_matrix(get_encrypted)
# calculate the delta from the key matrix
delta = addDelta(key_matrix)
# get the adjugate matrix of the key
adj_key_matrix = get_adj(key_matrix)
# multiply the adjugate matrix with the delta to obtain the inverse matrix of the key
adj_key_matrix = multiply(adj_key_matrix, delta)
# multiply the invert key and the encrypted message to obtain the decrypted message
mult_matrix = matrix_mult(adj_key_matrix, message_matrix)
# mult_matrix = sub(mult_matrix, 32)
print(get_meaning(mult_matrix))
