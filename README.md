# GitHub Pages Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript, ready for deployment on GitHub Pages.

## Features

- 🎨 Modern and responsive design
- 📱 Mobile-first approach
- ✨ Smooth animations and transitions
- 🎯 Interactive elements and hover effects
- 📧 Contact form with validation
- 🌟 Particle background animation
- 📍 Smooth scrolling navigation

## Sections

- **Hero**: Eye-catching introduction with call-to-action buttons
- **About**: Personal information and skills showcase
- **Projects**: Portfolio of work with project cards
- **Contact**: Contact form and social media links

## How to Deploy to GitHub Pages

### Method 1: Using GitHub Web Interface

1. **Create a new repository on GitHub**
   - Go to [github.com](https://github.com) and sign in
   - Click the "+" icon and select "New repository"
   - Name it `your-username.github.io` (replace `your-username` with your actual GitHub username)
   - Make sure it's set to "Public"
   - Click "Create repository"

2. **Upload your files**
   - Click "uploading an existing file"
   - Drag and drop all files from this project (`index.html`, `styles.css`, `script.js`, `README.md`)
   - Add a commit message like "Initial website setup"
   - Click "Commit changes"

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your website**
   - Your website will be available at `https://your-username.github.io`
   - It may take a few minutes to deploy

### Method 2: Using Git Command Line

1. **Initialize a git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Add your GitHub repository as remote**:
   ```bash
   git remote add origin https://github.com/your-username/your-username.github.io.git
   ```

3. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages** (follow step 3 from Method 1)

## Customization

### Personal Information
Update the following in `index.html`:
- Replace "Your Name" with your actual name
- Update the hero description
- Add your actual projects in the projects section
- Update social media links
- Modify the about section with your information

### Styling
- Colors can be changed in `styles.css` by modifying the CSS variables
- The gradient colors are defined in the hero section
- Font can be changed by updating the Google Fonts import

### Content
- Add your own project images by replacing the placeholder divs
- Update project descriptions and links
- Modify skills in the about section
- Update contact information

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript
- Google Fonts (Inter)

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Support

If you encounter any issues or have questions about deployment, please check the [GitHub Pages documentation](https://docs.github.com/en/pages) or create an issue in this repository.
