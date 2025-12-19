# Contributing to Risk Assessment Buddy

Thank you for your interest in contributing to Risk Assessment Buddy! This document provides guidelines and instructions for contributing to the project.

## 🤝 Ways to Contribute

There are many ways you can contribute to this project:

- **Report Bugs**: Submit detailed bug reports
- **Suggest Features**: Propose new features or improvements
- **Improve Documentation**: Help clarify or expand documentation
- **Submit Code**: Fix bugs or implement new features
- **Review Code**: Review pull requests from other contributors
- **Test**: Help test new features and report issues

## 🚀 Getting Started

### Prerequisites

- Git installed on your computer
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Basic knowledge of HTML, CSS, and JavaScript
- A GitHub account

### Setting Up Your Development Environment

1. **Fork the Repository**
   - Visit https://github.com/Dilupillai/Risk_Assessment_Buddy
   - Click the "Fork" button in the top right
   - This creates a copy in your GitHub account

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Risk_Assessment_Buddy.git
   cd Risk_Assessment_Buddy
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/Dilupillai/Risk_Assessment_Buddy.git
   ```

4. **Open the Application**
   - Simply open `index.html` in your browser
   - No build process required!

## 🔧 Development Workflow

### Making Changes

1. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make Your Changes**
   - Edit files as needed
   - Test changes in the browser
   - Ensure code quality and consistency

3. **Test Thoroughly**
   - Test all three workflows (Rich Media, Free Text, Excel)
   - Test in multiple browsers if possible
   - Verify no console errors
   - Check responsive design on mobile

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Brief description of changes"
   ```
   
   **Commit Message Guidelines**:
   - Use present tense ("Add feature" not "Added feature")
   - Be clear and descriptive
   - Reference issue numbers if applicable
   - Examples:
     - "Add German language support for hazard categories"
     - "Fix face detection error on large images"
     - "Improve Excel import column detection"

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "Pull Request" button
   - Fill out the PR template
   - Reference any related issues

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

## 📋 Code Style Guidelines

### JavaScript

- **Use ES6+ syntax** where appropriate
- **Declare variables** with `const` or `let` (avoid `var`)
- **Function naming**: Use camelCase (`generateReport`, not `generate_report`)
- **Comments**: Add comments for complex logic
- **Error handling**: Use try-catch blocks where appropriate

**Example**:
```javascript
// Good
function calculateRiskScore(frequency, severity, likelihood) {
    try {
        const score = frequency * severity * likelihood;
        return Math.round(score);
    } catch (error) {
        console.error('Error calculating risk score:', error);
        return 0;
    }
}

// Avoid
function calculate_risk_score(f, s, l) {
    return f * s * l; // No error handling, no rounding
}
```

### HTML

- **Indentation**: Use 4 spaces (already established in project)
- **Semantic HTML**: Use appropriate tags (`<section>`, `<article>`, etc.)
- **Accessibility**: Include `alt` text, ARIA labels where needed
- **Class naming**: Follow Tailwind CSS utility classes

### CSS

- **Primary styling**: Use Tailwind CSS utility classes
- **Custom styles**: Add to `<style>` section in `index.html`
- **Naming**: Use kebab-case for custom classes
- **Organization**: Group related styles together

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test these scenarios:

#### Rich Media Workflow
- [ ] Upload image files (JPG, PNG)
- [ ] Upload video files (MP4, MOV)
- [ ] Verify face detection works
- [ ] Test manual face blurring
- [ ] Add notes to images
- [ ] Generate AI risk assessment
- [ ] Download project ZIP

#### Free Text Workflow
- [ ] Enter text description
- [ ] Generate task breakdown
- [ ] Verify AI generates steps
- [ ] Check risk scoring

#### Excel Import Workflow
- [ ] Upload Excel file (.xlsx)
- [ ] Verify column auto-detection
- [ ] Test manual column mapping
- [ ] Drag-drop images to cards
- [ ] Load as new project

#### General Features
- [ ] Language switching (EN/FR/DE)
- [ ] Save project to JSON
- [ ] Load project from JSON
- [ ] Print functionality
- [ ] Translate table feature
- [ ] Speech-to-text (if supported)

#### Browser Compatibility
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Edge

### Testing Face Detection

The face detection feature requires:
- Clear, well-lit images
- Faces visible (not turned away)
- Reasonable image size (<10MB)

Test with:
- Single person images
- Multiple people images
- Edge cases (hats, glasses, masks)

## 🐛 Bug Reports

When reporting bugs, include:

### Required Information
- **Browser & Version**: e.g., Chrome 120.0.6099.129
- **Operating System**: e.g., Windows 11, macOS 14.2
- **Steps to Reproduce**: Numbered list of exact steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Console Errors**: Copy any error messages

### Bug Report Template

```markdown
**Browser**: Chrome 120.0
**OS**: Windows 11

**Steps to Reproduce**:
1. Open application
2. Upload image file
3. Click "Process Files"
4. Error appears

**Expected**: Images should be processed and displayed
**Actual**: Error message "Cannot read property 'x' of undefined"

**Console Error**:
```
TypeError: Cannot read property 'x' of undefined
    at processImage (index.html:1234)
```

**Screenshots**: [Attach screenshot]
```

## 💡 Feature Requests

When suggesting features, include:

- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How would you implement it?
- **Alternatives Considered**: What other approaches were considered?
- **Use Cases**: Who would use this and when?
- **Implementation Complexity**: Your estimate (Low/Medium/High)

### Feature Request Template

```markdown
**Problem**: Users cannot export to PDF format

**Proposed Solution**: Add PDF export button that converts the risk assessment table to a formatted PDF document

**Alternatives**:
- Print to PDF (but loses formatting)
- Export to Word (requires conversion)

**Use Cases**: 
- Sharing with management who prefer PDF
- Archiving assessments
- Compliance documentation

**Complexity**: Medium (PDFKit already included)
```

## 📝 Documentation

### Updating Documentation

When making code changes that affect functionality:

1. **Update README.md** if adding features or changing setup
2. **Update inline comments** for complex logic changes
3. **Update this CONTRIBUTING.md** if changing workflows
4. **Add JSDoc comments** for new functions

### Documentation Style

```javascript
/**
 * Calculate risk score based on EHS standards
 * @param {number} frequency - Exposure frequency (1-2)
 * @param {number} severity - Injury severity (1-10)
 * @param {number} likelihood - Probability of occurrence (1-10)
 * @returns {number} Risk score (0-200)
 */
function calculateRiskScore(frequency, severity, likelihood) {
    return Math.round(frequency * severity * likelihood);
}
```

## 🔍 Code Review Process

### For Contributors

- Be responsive to feedback
- Make requested changes promptly
- Explain your approach if questioned
- Be open to suggestions
- Test again after making changes

### For Reviewers

- Be constructive and respectful
- Explain the "why" behind suggestions
- Acknowledge good work
- Test the changes locally
- Check for edge cases

## 🎯 Project Priorities

### Current Focus Areas

1. **Stability**: Fixing bugs takes priority
2. **Performance**: Optimize large file handling
3. **Accessibility**: Improve ARIA labels and keyboard navigation
4. **Mobile Support**: Enhance responsive design
5. **Documentation**: Keep docs up-to-date

### Feature Backlog Ideas

- Additional export formats (Word, XML)
- Custom risk matrix templates
- Bulk image upload optimizations
- Advanced image editing tools
- Integration with external systems
- Mobile camera capture support
- Offline service worker support

## 🚫 What Not to Submit

Please avoid:

- **Breaking Changes**: Don't remove existing features without discussion
- **External Dependencies**: Avoid adding new libraries without justification
- **Style-Only Changes**: Don't submit PRs that only reformat code
- **Unrelated Changes**: Keep PRs focused on single issues
- **Untested Code**: Always test before submitting

## ⚡ Quick Tips

### Debugging

1. **Use Browser DevTools**
   - Open Console (F12) to see errors
   - Use debugger statements
   - Inspect network requests

2. **Common Issues**
   - Check file paths for libraries
   - Verify async operations complete
   - Ensure event listeners are attached
   - Test with different image sizes

### Performance

- Optimize large image files before processing
- Use async/await for long-running operations
- Show loading indicators for AI operations
- Batch DOM updates where possible

### Security

- Never commit sensitive data
- Sanitize user inputs
- Use DOMPurify for HTML content
- Validate file types before processing

## 📞 Getting Help

If you need help:

1. **Check Existing Issues**: Your question may be answered
2. **Read the Code**: Many answers are in inline comments
3. **Ask in Issues**: Create a question issue
4. **Test Incrementally**: Isolate the problem

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Future release notes (for significant contributions)
- This project appreciates all contributions, big and small!

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Risk Assessment Buddy! Your efforts help make workplace safety documentation better for everyone. 🎉
