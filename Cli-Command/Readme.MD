# 📄 File Analyze CLI

A fast and memory-efficient CLI tool to analyze text files using Node.js streams.
It counts **lines, words, and characters** even for very large files.

---

## 🚀 Features

* 📊 Count lines, words, and characters
* ⚡ Stream-based (handles large files efficiently)
* 🧾 JSON output support
* 💾 Save output to a file
* 🎯 CLI flags for custom output

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/vrajgajjar/open-source.git
cd Cli-Command
```

### 2. Install dependencies

```bash
npm install
```

### 3. Link globally (for CLI usage)

```bash
npm link
```

---

## 🧠 Usage

```bash
vraj <filepath> [options]
```

---

## ⚙️ Options / Flags

| Flag                  | Description                  |
| --------------------- | ---------------------------- |
| `-j, --json`              | Output result in JSON format |
| `-l, --lines`             | Show only line count         |
| `-w, --words`             | Show only word count         |
| `-c, --chars`             | Show only character count    |
| `-o, --output <file>` | Save output to a file        |

---

## 🔥 Examples

### ✅ Basic usage

```bash
vraj test.txt
```

### ✅ Only word count

```bash
vraj test.txt --words
```

### ✅ Only line count

```bash
vraj test.txt --lines
```

### ✅ JSON output

```bash
vraj test.txt --json
```

Output:

```json
{
  "lines": 10,
  "words": 50,
  "characters": 300
}
```

### ✅ Save output to file

```bash
vraj test.txt -o result.txt
```

---

## ❌ Error Handling

* Shows error if file is not found
* Handles read/write stream errors gracefully

Example:

```bash
vraj wrong.txt
```

Output:

```
❌ File not found or cannot be read
```

---

## 📁 Project Structure

```
project/
│
├── index.js        # CLI entry point
├── package.json
├── README.md
```

---

## 🛠️ Tech Stack

* Node.js
* Commander.js
* Streams API

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to open issues for bugs or feature suggestions.

---

## 📄 License

MIT License
