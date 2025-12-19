# Quick Setup Guide for Team Members

This guide helps team members quickly access and view the Risk Assessment Buddy code.

## 🎯 Goal

You want to view the code for Risk Assessment Buddy and potentially run it locally.

## ✅ Simple Option: View on GitHub (No Setup Required)

1. **Visit the Repository**
   ```
   https://github.com/Dilupillai/Risk_Assessment_Buddy
   ```

2. **Browse the Code**
   - Click on any file to view it
   - Main application: `index.html`
   - Report generator: `shareable_html_generator.js`
   - Libraries: `lib/` folder

3. **That's it!** You can now view all the code directly in your browser.

## 🚀 Advanced Option: Run Locally (5 Minutes)

If you want to run the application on your computer:

### Step 1: Download the Code

**Option A: Download ZIP (No Git Required)**
1. Go to https://github.com/Dilupillai/Risk_Assessment_Buddy
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract the ZIP file to a folder

**Option B: Clone with Git**
```bash
git clone https://github.com/Dilupillai/Risk_Assessment_Buddy.git
cd Risk_Assessment_Buddy
```

### Step 2: Open the Application

1. Navigate to the folder where you extracted/cloned the code
2. Double-click `index.html`
3. It will open in your default browser
4. Wait 5-10 seconds for AI models to load
5. You're ready to use it!

**That's it!** No installation, no build process, no server needed.

## 📱 What You Need

- A modern web browser (Chrome, Firefox, Edge, or Safari)
- Internet connection (for first load)
- That's all!

## 🔍 Understanding the Code

### Main Files

```
Risk_Assessment_Buddy/
├── index.html                    ← Main application (start here)
├── shareable_html_generator.js   ← Generates shareable reports  
├── lib/                          ← External JavaScript libraries
│   ├── face-api.min.js          ← Face detection AI
│   ├── jszip.min.js             ← ZIP file handling
│   └── ...
├── models/                       ← AI models for face detection
├── README.md                     ← Detailed documentation
└── CONTRIBUTING.md               ← How to contribute
```

### Key Technologies

- **HTML/CSS/JavaScript**: No frameworks, pure vanilla JS
- **Tailwind CSS**: For styling (loaded from CDN)
- **Face-API.js**: For automatic face blurring
- **Google Charts**: For risk visualization
- **JSZip**: For creating downloadable ZIP files

## 💡 Common Questions

**Q: Do I need to install Node.js or npm?**
A: No! This is a pure HTML/JavaScript app. Just open `index.html`.

**Q: Why does it take a few seconds to load?**
A: The app downloads AI models for face detection on first load.

**Q: Can I use this offline?**
A: Yes, after the first load. But AI features require initial internet connection.

**Q: How do I make changes?**
A: Edit `index.html` in any text editor, save, and refresh your browser.

**Q: Where is the data stored?**
A: All data stays in your browser. Nothing is sent to a server (unless using AI features).

## 🛠️ For Developers

### Making Changes

1. Open `index.html` in your favorite text editor
2. Make your changes
3. Save the file
4. Refresh your browser (Ctrl+R or Cmd+R)
5. Test your changes

### Common Edits

**Change the title:**
```html
<!-- Line 6 in index.html -->
<title>Risk Assessment Buddy Smart (2.0)</title>
```

**Add a new language:**
```html
<!-- Find the language selector around line 760 -->
<select id="langSelect">
    <option value="en">English</option>
    <option value="fr">Français</option>
    <option value="de">Deutsch</option>
    <option value="es">Español</option> <!-- Add this -->
</select>
```

**Modify colors:**
```html
<!-- Find the header section around line 744 -->
<section class="bg-gradient-to-r from-indigo-600 to-blue-700">
```

## 🐛 Troubleshooting

**Problem**: Browser shows blank page
- **Solution**: Open browser console (F12), check for errors

**Problem**: "AI models failed to load"
- **Solution**: Check internet connection, try refreshing

**Problem**: Images not showing
- **Solution**: Make sure `lib/` and `models/` folders are in same directory as `index.html`

**Problem**: Excel import not working
- **Solution**: Check that XLSX library loaded (check browser console)

## 📚 Next Steps

1. **Read the full README.md** for comprehensive documentation
2. **Check CONTRIBUTING.md** if you want to make changes
3. **Explore the code** - it's well-commented!
4. **Try the features** - upload some images and test it out

## 🤝 Getting Help

- **Found a bug?** Create an issue on GitHub
- **Have a question?** Ask in GitHub Discussions or create an issue
- **Want to contribute?** Read CONTRIBUTING.md

## 📞 Contact

For questions about accessing the repository, contact the repository owner:
- GitHub: [@Dilupillai](https://github.com/Dilupillai)

---

**Welcome to the team!** We're glad you're here. 🎉
