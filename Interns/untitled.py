import os

def clear():
    # For Windows
    if os.name == 'nt':
        _ = os.system('cls')
    # For Mac and Linux (os.name is 'posix')
    else:
        _ = os.system('clear')
print("select the type of dishes: \n 1) low carbs \n 2) high sugar \n 3) Highe Protien")
low_carbs=["daal","bajra","peas"]
x=int(input())
if(x==1):
    clear()
    for i in range(2):
        print(low_carbs[i])
elif(x==2):
    print("xxxx")
