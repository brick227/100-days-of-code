# Day 7: Conditionals (if / elif / else)
# Run with: python3 day07_conditionals.py

# ─── BASIC IF / ELIF / ELSE ───────────────────────────────────────────────────
age = 20

if age < 13:
    print("Child")
elif age < 18:
    print("Teenager")
elif age < 65:
    print("Adult")
else:
    print("Senior")

# ─── COMPARISON OPERATORS ─────────────────────────────────────────────────────
# ==  equal
# !=  not equal
# >   greater than
# <   less than
# >=  greater than or equal
# <=  less than or equal

# ─── LOGICAL OPERATORS ────────────────────────────────────────────────────────
x = 15
if x > 10 and x < 20:
    print("x is between 10 and 20")   # prints

if x < 5 or x > 10:
    print("x is outside 5-10")         # prints

if not x == 100:
    print("x is not 100")              # prints

# Chained comparisons (Pythonic)
if 10 < x < 20:
    print("Chained: x is between 10 and 20")

# ─── TRUTHINESS ───────────────────────────────────────────────────────────────
# Falsy values: False, None, 0, 0.0, "", [], {}, set()
# Everything else is truthy

name = ""
if name:
    print("Got a name")
else:
    print("Name is empty")   # prints

items = [1, 2, 3]
if items:
    print("List has items")   # prints

# ─── TERNARY (one-liner if) ───────────────────────────────────────────────────
score = 75
grade = "Pass" if score >= 50 else "Fail"
print(grade)   # Pass

# ─── MATCH STATEMENT (Python 3.10+) ──────────────────────────────────────────
# Similar to switch/case in other languages
command = "quit"

match command:
    case "start":
        print("Starting...")
    case "stop" | "quit":
        print("Stopping.")
    case _:
        print("Unknown command")

# ─── EXERCISES ────────────────────────────────────────────────────────────────
# 1. Write a program that takes a number and prints whether it is
#    positive, negative, or zero.

# 2. FizzBuzz: for numbers 1-20, print "Fizz" if divisible by 3,
#    "Buzz" if divisible by 5, "FizzBuzz" if both, else the number.
for n in range(1, 21):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)

# 3. Given a temperature in Celsius, print "Hot" (>30), "Warm" (15-30),
#    "Cool" (0-15), or "Cold" (<0).

# 4. Write a simple login check: if username == "admin" and password == "1234",
#    print "Access granted", else "Access denied".
