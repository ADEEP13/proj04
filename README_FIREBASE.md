# HTML

A modern HTML project utilizing Tailwind CSS for building responsive web applications with minimal setup.

## 🚀 Features

- **HTML5** - Modern HTML structure with best practices
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Custom Components** - Pre-built component classes for buttons and containers
- **NPM Scripts** - Easy-to-use commands for development and building
- **Responsive Design** - Mobile-first approach for all screen sizes

## 📋 Prerequisites

- Node.js (v12.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```
html_app/
├── css/
│   ├── tailwind.css   # Tailwind source file with custom utilities
│   └── main.css       # Compiled CSS (generated)
├── pages/             # HTML pages
├── index.html         # Main entry point
├── package.json       # Project dependencies and scripts
└── tailwind.config.js # Tailwind CSS configuration
```

## 🎨 Styling

This project uses Tailwind CSS for styling. Custom utility classes include:


## 🧩 Customization

To customize the Tailwind configuration, edit the `tailwind.config.js` file:


## 📦 Build for Production

Build the CSS for production:

```bash
npm run build:css
# or
yarn build:css
```

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## 🙏 Acknowledgments


- Powered by HTML and Tailwind CSS

Built with ❤️ on Rocket.new


## Firebase integration (added)

Files added:
- `js/firebase-config.js` — add your Firebase config object here (see instructions).
- `js/app.js` — minimal client-side Firestore reads to populate the UI.

### Steps to integrate Firebase
1. Create a Firebase project at https://console.firebase.google.com
2. Add a Web App and copy the Firebase config object.
3. Open `js/firebase-config.js` and replace placeholder values with your project's config.
4. In Firebase Console -> Build -> Firestore, create a database (test mode okay for dev).
5. Optionally create collections/documents:
   - `users/public_profile` — with `{ "name": "Your Name" }`
   - `goals` collection — documents with `{ "name": "...", "goal": "..." }`
   - `sessions` collection — documents with `{ "durationMinutes": 25 }`
6. Host the site on GitHub Pages (push the repo and enable Pages).

