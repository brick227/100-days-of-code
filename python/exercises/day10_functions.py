# Day 10: Functions
# Run with: python3 day10_functions.py

# ─── DEFINING & CALLING ───────────────────────────────────────────────────────
def greet():
    print("Hello, World!")

greet()

# ─── PARAMETERS & RETURN ──────────────────────────────────────────────────────
def add(a, b):
    return a + b

result = add(3, 5)
print(result)   # 8

# Multiple return values (actually returns a tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([4, 1, 9, 2, 7])
print(lo, hi)   # 1 9

# ─── DEFAULT ARGUMENTS ────────────────────────────────────────────────────────
def greet_person(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet_person("Alice")            # Hello, Alice!
greet_person("Bob", "Hi")       # Hi, Bob!

# ─── KEYWORD ARGUMENTS ────────────────────────────────────────────────────────
def describe(name, age, city):
    print(f"{name} is {age} years old and lives in {city}.")

describe(age=25, city="Paris", name="Eve")   # order doesn't matter

# ─── *ARGS — variable number of positional arguments ─────────────────────────
def total(*nums):
    return sum(nums)

print(total(1, 2, 3))       # 6
print(total(10, 20))        # 30

# ─── **KWARGS — variable number of keyword arguments ─────────────────────────
def print_info(**info):
    for key, value in info.items():
        print(f"  {key}: {value}")

print_info(name="Alice", job="Engineer", city="NYC")

# ─── DOCSTRINGS ───────────────────────────────────────────────────────────────
def celsius_to_fahrenheit(c):
    """Convert Celsius to Fahrenheit.

    Args:
        c: Temperature in Celsius.

    Returns:
        Temperature in Fahrenheit.
    """
    return c * 9 / 5 + 32

print(celsius_to_fahrenheit(0))    # 32.0
print(celsius_to_fahrenheit(100))  # 212.0
help(celsius_to_fahrenheit)        # prints the docstring

# ─── LAMBDA (anonymous functions) ─────────────────────────────────────────────
square = lambda x: x ** 2
print(square(5))   # 25

# Useful with sorted / map / filter
nums = [3, 1, 4, 1, 5, 9]
print(sorted(nums, key=lambda x: -x))   # descending

# ─── EXERCISES ────────────────────────────────────────────────────────────────
# 1. Write a function is_even(n) that returns True if n is even, False otherwise.

# 2. Write a function factorial(n) that returns n! using a loop (no recursion).

# 3. Write a function count_vowels(s) that returns the number of vowels
#    in a string.

# 4. Write a function apply(func, values) that takes a function and a list,
#    and returns a new list with func applied to each element.
#    Example: apply(square, [1, 2, 3, 4]) -> [1, 4, 9, 16]
