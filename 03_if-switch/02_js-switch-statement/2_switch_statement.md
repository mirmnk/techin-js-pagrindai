## **Statement `switch` Exercises**

### **1. Days Until Weekend**

**Task:**
Write a function `daysUntilWeekend(day)` that takes a weekday name and returns how many days are left until Saturday.
Use a `switch` to convert the day name to a number.

---

### **2. Basic Calculator (with validation)**

**Task:**
Create a function `calculate(a, b, operator)` where `operator` is `"+"`, `"-"`, `"*"`, or `"/"`.
Use a `switch` to perform the calculation.
If an invalid operator is provided, return an error message.

---

### **3. Month Days**

**Task:**
Write a function that takes a month number (1–12) and returns the number of days in that month.
Use a `switch` with grouped cases (28/29 not required to differentiate).

---

### **4. Grade to Description**

**Task:**
Given a letter grade (`"A"`, `"B"`, `"C"`, `"D"`, `"F"`), return a description:
A → "Excellent", B → "Good", C → "Average", D → "Poor", F → "Fail".
Handle lowercase letters too.

---

### **5. Traffic Light Behavior Simulator**

**Task:**
Write a function that takes a traffic light color (`"red"`, `"yellow"`, `"green"`) and returns what a driver should do.
Use `switch` and default to `"Unknown light"`.

---

### **6. Language Code Translator**

**Task:**
Given a language code (`"en"`, `"lt"`, `"fr"`, `"es"`), return a greeting ("Hello", "Labas", "Bonjour", "Hola").
If unsupported, return `"Language not supported"`.

---

### **7. String Command Interpreter**

**Task:**
Create a function `runCommand(cmd)` that supports commands:

* `"start"` → return `"Starting..."`
* `"stop"` → return `"Stopping..."`
* `"pause"` → return `"Pausing..."`
* `"resume"` → return `"Resuming..."`
  Default: `"Unknown command"`.

---

### **8. Season By Temperature Range**

**Task:**
Input: an integer temperature.
Use a `switch(true)` pattern to determine:

* temp < 0 → "Freezing"
* 0–10 → "Cold"
* 11–20 → "Mild"
* 21–30 → "Warm"
* > 30 → "Hot"

---

### **9. Pokémon Type Advantage**

**Task:**
Write a function `typeAdvantage(type)` returning its strength:

* `"fire"` → `"grass"`
* `"water"` → `"fire"`
* `"grass"` → `"water"`
  If unknown type → `"No advantage"`.

---

### **10. Currency Symbol Finder**

**Task:**
Create a function that receives a currency code (`"USD"`, `"EUR"`, `"GBP"`, `"JPY"`, `"CHF"`) and returns its symbol (`"$"`, `"€"`, `"£"`, `"¥"`, `"Fr"`).
Use fallback for unsupported codes.

---

