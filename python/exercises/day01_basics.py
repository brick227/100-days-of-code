# Day 1: Variables, Types, Print, Input
# Run with: python3 day01_basics.py

# ─── VARIABLES ────────────────────────────────────────────────────────────────
# Python is dynamically typed — no need to declare types explicitly.

name = "Alice"          # str
age = 30                # int
height = 5.6            # float
is_coder = True         # bool

print(name, age, height, is_coder)

# Check the type of a variable
print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>

# ─── PRINT ────────────────────────────────────────────────────────────────────
# f-strings are the modern way to embed variables in strings (Python 3.6+)
print(f"My name is {name} and I am {age} years old.")

# sep and end parameters
print("hello", "world", sep="-")   # hello-world
print("no newline", end=" | ")
print("continues here")

# ─── INPUT ────────────────────────────────────────────────────────────────────
# input() always returns a string
# user_name = input("What is your name? ")
# print(f"Hello, {user_name}!")

# ─── TYPE CONVERSION ──────────────────────────────────────────────────────────
num_str = "42"
num_int = int(num_str)      # str -> int
num_float = float(num_str)  # str -> float
back_to_str = str(num_int)  # int -> str

print(num_int + 8)          # 50
print(num_float)            # 42.0

# ─── MULTIPLE ASSIGNMENT ──────────────────────────────────────────────────────
x, y, z = 1, 2, 3
print(x, y, z)

a = b = c = 0   # all point to the same value
print(a, b, c)

# ─── EXERCISES ────────────────────────────────────────────────────────────────
# Try these yourself:

# 1. Create variables for your name, age, and favourite language.
#    Print them in a single sentence using an f-string.

# 2. Ask the user for two numbers (use input()), convert them to integers,
#    add them together, and print the result.

# 3. What happens if you try int("hello")? Try it and read the error message.

# 4. Swap two variables without using a third variable.
#    Hint: Python lets you do  a, b = b, a
p = 10
q = 20
p, q = q, p
print(p, q)     # 20 10
