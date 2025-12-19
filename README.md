# 📋 Risk Assessment Buddy (SMART 2.0)

A field accelerator tool designed to streamline and accelerate risk assessment projects. This web-based application helps safety professionals create comprehensive risk assessments using rich media (images/videos), free text descriptions, or by converting legacy Excel files.

## ✨ Key Features

- **🎥 Rich Media Support**: Upload images and videos with automatic face detection and blurring for privacy compliance
- **🤖 AI-Powered Analysis**: Automatic hazard identification, risk scoring, and control recommendations
- **📝 Multiple Input Methods**: Start from scratch with media, describe tasks in plain language, or import legacy Excel files
- **🌐 Multi-Language Support**: Interface available in English, French, and German
- **🎤 Voice Input**: Speech-to-text functionality for hands-free data entry
- **📊 Visual Risk Analytics**: Interactive charts and dashboards for risk distribution and evolution
- **🛡️ Hierarchy of Controls**: Built-in control effectiveness framework (Eliminate → Substitute → Engineer → Admin → Individual)
- **💾 Project Management**: Save and resume projects, no cloud storage required - all data stays local
- **📦 Export Options**: Generate comprehensive ZIP packages with reports, images, and shareable HTML files

## 🚀 Three Workflows

### 1. 🎥 Rich Media Workflow (Images/Videos)
Perfect for field assessments with visual documentation:
1. Upload images or videos of your work process
2. Automatic face detection and blurring for privacy
3. Add descriptions, hazards, and controls for each image
4. Generate AI-powered risk assessment table
5. Review, edit, and download complete project package

**Best for**: Field safety assessments, equipment inspections, workplace audits

### 2. 📝 Free Text Workflow
Ideal for documenting existing processes:
1. Describe your task or process in plain language
2. Click "Generate Task Breakdown"
3. AI automatically splits tasks and generates risk assessment
4. Review and refine the generated assessment
5. Export completed assessment

**Best for**: Standard operating procedures, process documentation, quick assessments

### 3. 📊 Excel Import Workflow
Modernize legacy risk assessments:
1. Upload existing Excel risk assessment files
2. Map columns using the visual Column Mapper
3. Handle embedded images with drag-and-drop interface
4. Replace outdated images with new ones
5. Load as new project and generate updated assessment

**Best for**: Updating old assessments, standardizing formats, consolidating multiple assessments

## 🛠️ Technology Stack

### Frontend
- **HTML5/CSS3**: Modern responsive design
- **JavaScript (ES6+)**: Core application logic
- **Tailwind CSS**: Utility-first styling via CDN
- **Google Charts**: Data visualization

### AI/ML & Processing
- **face-api.js**: Real-time face detection and blurring
- **OpenAI GPT**: Natural language processing for hazard analysis and recommendations
- **Custom risk scoring algorithms**: EHS-compliant risk matrices

### File Processing
- **JSZip**: ZIP file generation and Excel parsing
- **XLSX.js**: Excel file reading and writing
- **FileSaver.js**: Client-side file downloads
- **PDFKit**: PDF report generation
- **Blob-stream**: Binary data handling

### Models
- **TinyFaceDetector**: Lightweight face detection model
- **SSD MobileNetV1**: Object detection for enhanced analysis

## 📁 Project Structure

```
Risk_Assessment_Buddy/
├── index.html                          # Main application file (~10,000+ lines)
├── shareable_html_generator.js         # Standalone HTML report generator
├── lib/                                # JavaScript libraries
│   ├── face-api.min.js                # Face detection library
│   ├── jszip.min.js                   # ZIP file handling
│   ├── pdfkit.min.js                  # PDF generation
│   └── blob-stream.min.js             # Binary stream handling
├── models/                             # AI/ML model files
│   ├── tiny_face_detector_model-*     # Face detection model
│   └── ssd_mobilenetv1_*              # Object detection model
└── README.md                           # This file
```

## 🚦 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- Minimum 4GB RAM recommended for processing large images/videos
- Internet connection for loading CDN resources and AI features

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Dilupillai/Risk_Assessment_Buddy.git
   cd Risk_Assessment_Buddy
   ```

2. **Serve the Application**
   
   Option A - Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Option B - Using Node.js:
   ```bash
   npx http-server -p 8000
   ```
   
   Option C - Using any web server (Apache, Nginx, etc.)

3. **Access the Application**
   ```
   Open browser and navigate to: http://localhost:8000
   ```

### Quick Start (No Installation)
Simply open `index.html` directly in your web browser for immediate use. Note: Some features may require a web server for full functionality.

## 📖 Usage Guide

### Workflow 1: Rich Media Assessment

1. **Upload Media**
   - Click "Upload Images & Videos" section
   - Select images (JPG, PNG) or videos (MP4, MOV, AVI, MKV)
   - Wait for automatic face detection and blurring

2. **Add Risk Information**
   - Click any thumbnail to open detail view
   - Fill in:
     - **Description**: What's happening in this step
     - **Hazards**: What can go wrong (optional 1-5 rating)
     - **Controls**: Existing safety measures
   - Optional: Set manual risk ratings (Frequency, Severity, Likelihood)

3. **Generate Assessment**
   - Click "Generate AI Risk Assessment from Image Notes"
   - AI processes your notes and identifies additional hazards
   - Review the generated risk assessment table

4. **Export**
   - Click "Download Project ZIP" for complete package
   - Includes: images, CSV, Excel, shareable HTML, and PDF reports

### Workflow 2: Free Text Assessment

1. Navigate to "Free Text" tab
2. Describe your process in plain language
3. Click "Generate Task Breakdown"
4. AI generates structured risk assessment
5. Review and edit as needed
6. Export using "Download Project ZIP"

### Workflow 3: Excel Import

1. Navigate to "Excel Sheet" tab
2. Upload existing Excel file
3. In the modal:
   - Drag and drop your Excel file
   - Map columns (Step, Description, Hazards, Controls, etc.)
   - Handle images: drag from left panel to steps
   - Add missing images or replace outdated ones
4. Click "Load as New Project"
5. Generate AI assessment and export

## ⚙️ Key Features Explained

### Automatic Face Blurring
- Uses TinyFaceDetector model for privacy compliance
- Real-time detection during upload
- Manual blur option: click on faces in lightbox view
- Undo last blur if needed

### AI Risk Scoring
The application uses a sophisticated EHS-compliant risk matrix:

**Frequency (F)**
- 1.0: Rarely
- 1.25: Occasional
- 1.5: Intermediate
- 1.75: Frequently
- 2.0: Permanent

**Severity (S)**
- 1: No injury potential
- 3: First aid potential
- 5: Medical treatment potential
- 7: DART potential (Days Away, Restricted, or Transferred)
- 9: SIA potential (Serious Injury or Illness)
- 10: Fatality potential

**Likelihood (L)**
- 1: Almost impossible
- 3: Very unlikely
- 5: Possible
- 8: Likely
- 10: Very likely

**Risk Score** = F × S × L

**Risk Categories**
- **Low**: 0-19 (Green)
- **Medium**: 20-49 (Yellow)
- **High**: 50-71 (Orange)
- **Critical**: 72+ (Red)

### Hierarchy of Controls
Built-in effectiveness framework for risk reduction:
1. **Eliminate** (100% effective) - Remove the hazard
2. **Substitute** (65% effective) - Replace with safer alternative
3. **Engineer** (55% effective) - Engineering controls
4. **Visual** (45% effective) - Warning signs and signals
5. **Admin** (30% effective) - Administrative controls, procedures
6. **Individual** (15% effective) - PPE and personal protection

### Project Management
- **Save Project**: Downloads JSON file with all data
- **Load Project**: Resume work from saved JSON
- **No Cloud Storage**: All data remains on your local device
- **Version Control**: Manual via saved JSON files

## ⚠️ Important Notes

### Data Privacy & Storage
- ✅ **No Cloud Storage**: All data is processed and stored locally
- ✅ **Privacy Compliant**: Automatic face blurring for GDPR/privacy compliance
- ✅ **Offline Capable**: Core features work without internet (AI features require connection)
- ❌ **Browser Refresh Warning**: Refreshing the browser will lose unsaved work

### Best Practices
- 💾 **Save Frequently**: Use "Save Project" button regularly
- 📸 **High-Quality Images**: Better images = better AI analysis
- 📝 **Detailed Descriptions**: More context = more accurate risk assessment
- 🔄 **Review AI Suggestions**: Always validate AI-generated content
- 📋 **Mention Incidents**: Including past incidents improves risk scoring accuracy

### Browser Compatibility
- ✅ Chrome/Chromium (Recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari (limited voice input support)
- ❌ Internet Explorer (not supported)

### Performance Tips
- Compress large images before upload for better performance
- Process videos frame-by-frame rather than entire video at once
- Limit batch processing to 10-15 images at a time for optimal speed
- Use "Save Project" feature for large assessments and work in sessions

## 🔒 Security & Compliance

- **Face Detection**: Automatic PII protection through face blurring
- **Local Processing**: No data transmitted to external servers (except AI API calls)
- **DOMPurify**: Built-in XSS protection for user inputs
- **Content Security**: Sanitized HTML outputs prevent injection attacks

## 🌐 Multi-Language Support

Switch between languages using the language selector (🌐):
- **English**: Full interface and hazard library
- **Français (French)**: Complete translation
- **Deutsch (German)**: Complete translation

All dropdowns, labels, and hazard categories are translated while maintaining data integrity.

## 📊 Output Formats

The application generates multiple output formats:

1. **Excel (.xlsx)**: Structured data table with all assessments
2. **CSV (.csv)**: Compatible with other tools and systems
3. **Shareable HTML**: Standalone interactive report with embedded images
4. **PDF Report**: Professional document for printing and sharing
5. **ZIP Package**: Complete bundle with all formats and images
6. **JSON Project File**: Save/resume capability

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

### Areas for Contribution
- Additional language translations
- Enhanced AI prompts for better hazard detection
- Additional export formats
- Mobile app version
- Offline AI models
- Integration with EHS management systems

## 📄 License

This project is provided as-is for safety and risk assessment purposes. Please review and comply with all applicable safety regulations and standards in your jurisdiction.

## 🆘 Support & Troubleshooting

### Common Issues

**Issue**: Faces not detected automatically
- **Solution**: Use manual blur by clicking on faces in lightbox view

**Issue**: AI generation fails
- **Solution**: Check internet connection, ensure API key is valid (if using custom AI endpoint)

**Issue**: Large file upload fails
- **Solution**: Compress images/videos before upload, or split into multiple smaller uploads

**Issue**: Excel import not working
- **Solution**: Ensure Excel file is .xlsx format (not .xls), check column mapping is correct

**Issue**: Lost data after browser refresh
- **Solution**: Always save project before closing. Recovery not possible without saved file.

### Performance Issues
- Clear browser cache
- Close unnecessary browser tabs
- Use modern browser (Chrome recommended)
- Reduce image sizes before upload
- Work with smaller batches (<15 images)

## 📞 Contact & Credits

**Project**: Risk Assessment Buddy (SMART 2.0)
**Purpose**: Field accelerator tool for safety professionals
**Version**: 2.0

### Technologies Used
Special thanks to the open-source projects that make this possible:
- face-api.js by Vincent Muehler
- Tailwind CSS team
- JSZip by Stuart Knightley
- Google Charts team
- OpenAI for GPT API

---

**Made with ❤️ for Safety Professionals**

*Remember: This tool assists in risk assessment but doesn't replace professional safety judgment. Always validate AI-generated content and consult with qualified safety professionals.*
