import json

lines = open("my_cards.txt").readlines()
j = {}
for line in lines:
    exp, rest = line.split(":")
    cards = rest.split(",")
    j[exp.strip()] = [c.strip() for c in cards]

print("cardjson = ", json.dumps(j, indent=4))
print(sum(len(k) for k in j.values()))

# + platyna/kolonia
