# multiply every value of the matrix with an given index
def multiply(tab, idx):
    for y in range(len(tab)):
        for x in range(len(tab[y])):
            tab[y][x] = (round(tab[y][x] * idx) % 127)
    return tab

# function to obtain the adjugate matrix of the key
def get_adj(key):
    tab = [[1 for j in range(2)] for i in range(2)]
    
    # the formula to the adjugate matrix [a, b] is [d, -b]
    #                                    [c, d]    [-c, a]
    tab[0][0] = key[1][1]
    tab[0][1] = (-key[0][1] % 127)
    tab[1][0] = (-key[1][0] % 127)
    tab[1][1] = key[0][0]
    return tab

def hill(key, line):
    tab = []

    for y in range(len(key)):
        val = 0
        for x in range(len(key[y])):
            val += key[y][x] * line[x]
        # apply a modulo 127 to every value too otain a readable value
        tab.append(val % 127)
    return tab

def matrix_mult(key, message):
    matrix = message

    for y in range(len(message)):
        # multiply the key with every line of the message
        matrix[y] = hill(key, message[y])
    return matrix