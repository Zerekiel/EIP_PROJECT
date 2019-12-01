#!/usr/bin/env python3

import sys
from matrices_creation import create_key_matrix, create_message_matrix
from matrices_operations import matrix_mult
from useful import get_meaning

key_matrix = []
message_matrix = []
encrypted = ""

def write(encrypted):
    myfile = open("encrypted.txt", "w")

    for char in encrypted:
        myfile.write(char)
    myfile.close()

# the x of the first one must match the y on the second one
# creation of matrice of the key
key_matrix = create_key_matrix(sys.argv[1])
# creation of the matrice of the message
message_matrix = create_message_matrix(sys.argv[2])
# matrices multiplication
mult_matrix = matrix_mult(key_matrix, message_matrix)
print("Encrypted message: ")
encrypted = get_meaning(mult_matrix)
print(encrypted)
# write the size and the encrypted message in the file
write(encrypted)