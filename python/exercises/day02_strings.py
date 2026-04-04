# Day 2: Strings & String Methods
# Run with: python3 day02_strings.py

# ─── CREATING STRINGS ─────────────────────────────────────────────────────────
single = 'Hello'
double = "World"
multi  = """This is a
multi-line string."""

print(single, double)
print(multi)

# ─── COMMON METHODS ───────────────────────────────────────────────────────────
s = "  Hello, Python World!  "

print(s.strip())            # remove leading/trailing whitespace
print(s.lower())            # all lowercase
print(s.upper())            # all uppercase
print(s.title())            # Title Case
print(s.strip().replace("Python", "Awesome"))  # replace substring

words = s.strip().split(" ")   # split into list by space
print(words)
print(", ".join(words))        # join list back into string

print(s.strip().startswith("Hello"))   # True
print(s.strip().endswith("!"))         # True
print(s.strip().find("Python"))        # index of first match, or -1
print("Python" in s)                   # membership test

# ─── INDEXING & SLICING ───────────────────────────────────────────────────────
word = "Python"
#        P  y  t  h  o  n
# index  0  1  2  3  4  5
#        -6 -5 -4 -3 -2 -1  (negative indices count from the end)

print(word[0])      # P
print(word[-1])     # n
print(word[0:3])    # Pyt   (start inclusive, end exclusive)
print(word[2:])     # thon  (to the end)
print(word[:4])     # Pyth  (from the start)
print(word[::2])    # Pto   (every 2nd character)
print(word[::-1])   # nohtyP (reversed)

# ─── F-STRINGS (formatted string literals) ───────────────────────────────────
name = "Alice"
score = 95.678

print(f"Name: {name}")
print(f"Score: {score:.2f}")        # 2 decimal places: 95.68
print(f"Score: {score:>10.2f}")     # right-aligned, width 10
print(f"{name!r}")                   # repr: 'Alice'
print(f"2 + 2 = {2 + 2}")           # expressions work inside {}

# ─── ESCAPE CHARACTERS ────────────────────────────────────────────────────────
print("Tab:\there")
print("Newline:\nhere")
print("Quote: \"quoted\"")
print(r"Raw string: \n is not a newline")  # raw string prefix r

# ─── EXERCISES ────────────────────────────────────────────────────────────────
# 1. Take the string "  the quick brown fox  " and:
#    - Strip whitespace
#    - Capitalize every word
#    - Replace "fox" with "dog"
#    - Print the result

# 2. Given s = "abcdefg", print every other character using slicing.

# 3. Write code that checks if a word is a palindrome (reads the same forwards
#    and backwards). Test with "racecar" and "hello".

# 4. Given a full name like "John Doe", extract the first and last name
#    into separate variables using split().
