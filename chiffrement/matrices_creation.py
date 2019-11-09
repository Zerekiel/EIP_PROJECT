from useful import make_sized_tab

def create_key_matrix(chaine):
    chaine = make_sized_tab(chaine, 2)
    tab = [[0 for j in range(2)] for i in range(2)]
    
    for i in range(len(chaine)):
        for j in range(len(chaine[i])):
            tab[i][j] = ord(chaine[i][j])
    return tab

def create_message_matrix(chaine):
    chaine = make_sized_tab(chaine, 2)
    tab = [[0 for j in range(2)] for i in range(len(chaine))]

    for i in range(len(chaine)):
        for j in range(len(chaine[i])):
            tab[i][j] = ord(chaine[i][j])
    return tab