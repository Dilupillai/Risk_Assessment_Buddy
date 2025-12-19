# Risk Assessment Buddy (SMART 2.0)

A powerful field accelerator tool designed to streamline and enhance risk assessment projects. This browser-based application helps teams create, manage, and analyze risk assessments using AI-powered features, rich media support, and comprehensive reporting.

## 📋 Overview

Risk Assessment Buddy SMART 2.0 is a comprehensive risk assessment platform that combines AI capabilities with intuitive interfaces to help teams:

- Create risk assessments from images, videos, or text descriptions
- Import and modernize legacy Excel-based risk assessments
- Automatically detect and blur faces for privacy compliance
- Generate AI-powered risk scores and recommendations
- Visualize risk distributions and trends
- Export reports in multiple formats (ZIP, CSV, PDF, HTML)

## 🌟 Key Features

### 🎥 Rich Media Workflow
- Upload images and videos of work processes
- Automatic face detection and blurring for privacy
- Manual blur capability for additional privacy control
- Add step descriptions, hazards, and controls to each image
- Speech-to-text support for hands-free documentation

### ✍️ Free Text Workflow
- Describe work processes in plain language
- AI automatically breaks down tasks into steps
- Generates comprehensive risk assessment tables
- Ideal for documenting new procedures

### 📊 Excel Import Workflow
- Import legacy risk assessment Excel files
- Intelligent column mapping with auto-detection
- Extract embedded images from Excel
- Drag-and-drop image management
- Update outdated assessments with new photos

### 🤖 AI-Powered Analysis
- Automatic risk scoring (Frequency, Severity, Likelihood)
- Hazard identification and categorization
- Control measure recommendations
- Risk evolution tracking with proposed mitigations
- Interactive risk visualization charts

### 🌐 Multi-Language Support
- English, French (Français), and German (Deutsch)
- Automatic UI translation
- Localized hazard and control descriptions

## 🚀 Getting Started

### For Team Members Viewing the Code

1. **Access the Repository**
   - Visit: https://github.com/Dilupillai/Risk_Assessment_Buddy
   - You can browse all the code directly on GitHub

2. **Clone the Repository (Optional)**
   ```bash
   git clone https://github.com/Dilupillai/Risk_Assessment_Buddy.git
   cd Risk_Assessment_Buddy
   ```

3. **View the Application Locally**
   - Simply open `index.html` in a modern web browser
   - No build process or server required!
   - Works offline after initial load

### System Requirements

- Modern web browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- Minimum 4GB RAM recommended
- Internet connection for AI features

## 📁 Project Structure

```
Risk_Assessment_Buddy/
├── index.html                      # Main application file
├── shareable_html_generator.js    # Report generation module
├── lib/                           # External libraries
│   ├── face-api.min.js           # Face detection
│   ├── jszip.min.js              # ZIP file handling
│   ├── pdfkit.min.js             # PDF generation
│   └── blob-stream.min.js        # Stream utilities
├── models/                        # AI models for face detection
└── README.md                      # This file
```

## 💻 Usage Instructions

### Quick Start: Creating a Risk Assessment

1. **Open the Application**
   - Open `index.html` in your browser
   - Wait for AI models to load (~5-10 seconds)

2. **Choose Your Workflow**
   - **Rich Media**: Start with photos/videos
   - **Free Text**: Describe the process in words
   - **Excel**: Import existing assessments

3. **Add Details**
   - For images: Click thumbnails to add descriptions, hazards, and controls
   - For text: Type your process description
   - For Excel: Map columns and assign images

4. **Generate AI Assessment**
   - Click "Generate AI Risk Assessment from Image Notes"
   - Review and edit the generated table
   - Add or modify controls as needed

5. **Export Results**
   - Click "Download Project ZIP" for all files
   - Or save project to continue later

### Key Features to Explore

- **Speech-to-Text**: Click microphone icons to dictate notes
- **Risk Evolution**: View before/after risk scores with proposed controls
- **Interactive Charts**: Click pie charts to filter by risk category
- **Translate Table**: Convert entire assessment to French or German
- **Save/Load Projects**: Save work and resume later

## 🔒 Privacy & Data Security

- **No Cloud Storage**: All data stays on your device
- **Automatic Face Blurring**: Protects worker privacy
- **Offline Capable**: Works without internet (after initial load)
- **Local Processing**: AI runs in your browser

⚠️ **Important**: Refreshing the browser clears in-memory data. Always save your project!

## 🤝 Sharing This Repository with Your Team

### Option 1: GitHub Access (Recommended)

1. **Make Repository Public** (if it's currently private)
   - Go to: https://github.com/Dilupillai/Risk_Assessment_Buddy/settings
   - Scroll to "Danger Zone"
   - Click "Change repository visibility"
   - Select "Make public"

2. **Share the URL**
   - Share: https://github.com/Dilupillai/Risk_Assessment_Buddy
   - Team members can view code directly on GitHub
   - They can clone it if they want a local copy

### Option 2: Add Team as Collaborators (Private Repository)

1. **Add Collaborators**
   - Go to: https://github.com/Dilupillai/Risk_Assessment_Buddy/settings/access
   - Click "Invite a collaborator"
   - Enter GitHub usernames or emails

2. **Set Permissions**
   - Read: View code only
   - Write: Can push changes
   - Admin: Full control

### Option 3: Share as ZIP File

1. **Download Repository**
   - Click "Code" → "Download ZIP" on GitHub
   - Or run: `git archive --format zip --output repo.zip HEAD`

2. **Share via Email/Drive**
   - Share the ZIP file through your preferred method
   - Recipients can extract and view all files

## 🛠️ For Developers

### Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **AI/ML**: TensorFlow.js (face-api.js)
- **Charts**: Google Charts API
- **File Handling**: JSZip, FileSaver.js, XLSX.js
- **PDF Generation**: PDFKit
- **Security**: DOMPurify for XSS prevention

### Key Libraries

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script src="lib/face-api.min.js"></script>
<script src="lib/jszip.min.js"></script>
```

### Making Changes

1. **Fork the Repository**
   ```bash
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/Risk_Assessment_Buddy.git
   ```

2. **Make Changes**
   - Edit `index.html` for main UI/logic
   - Edit `shareable_html_generator.js` for report generation

3. **Test Locally**
   - Open `index.html` in browser
   - Test all workflows

4. **Submit Pull Request**
   - Push to your fork
   - Create PR on original repository

## 📖 Additional Resources

### Understanding the Code

- **Main Application**: `index.html` (~10,000 lines) contains all UI, logic, and AI integration
- **Report Generator**: `shareable_html_generator.js` creates standalone HTML reports
- **Modular Design**: Each workflow (Rich Media, Free Text, Excel) is self-contained
- **Event-Driven**: Uses JavaScript event listeners extensively

### Common Customizations

- **Add New Languages**: Edit language selector and translation mappings
- **Modify Risk Scoring**: Update scoring logic in AI generation functions
- **Custom Branding**: Edit header gradient colors and logo areas
- **Add Export Formats**: Extend export functions for new formats

## 🐛 Troubleshooting

### Common Issues

**Problem**: AI models not loading
- **Solution**: Check internet connection, refresh page

**Problem**: Images not displaying
- **Solution**: Check file size (<10MB recommended per image)

**Problem**: Face detection not working
- **Solution**: Ensure good lighting and clear face visibility

**Problem**: Excel import fails
- **Solution**: Verify column names match expected format

## 📞 Support & Contribution

### Getting Help

- Review inline documentation in code
- Check browser console for error messages
- Test with sample data first

### Contributing

Contributions are welcome! To contribute:

1. Review the code structure
2. Follow existing code style
3. Test thoroughly before submitting
4. Document your changes

## 📄 License

This project is intended for internal use. Please check with the repository owner regarding licensing and distribution rights.

## 🎯 Best Practices

### For End Users
- Save projects frequently
- Use descriptive filenames
- Review AI suggestions before finalizing
- Take clear, well-lit photos
- Document hazards thoroughly

### For Developers
- Maintain code comments
- Test cross-browser compatibility
- Optimize image sizes
- Handle errors gracefully
- Keep dependencies updated

## 🔄 Version History

- **SMART 2.0**: Current version with AI features, Excel import, multi-language support
- Focus on field usability and offline capability
- Enhanced privacy features with automatic face blurring

---

**Note**: This is a browser-based application with no server component. All processing happens locally in the browser, ensuring data privacy and offline capability.

For questions or issues, contact the repository owner or create an issue on GitHub.
