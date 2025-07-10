# 📝 Advanced Todo List Application

A modern, feature-rich todo list application built with vanilla JavaScript, featuring API integration, advanced filtering, pagination, and responsive design.

![Todo App Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-green)

## ✨ Features

### 🎯 Core Functionality
- **Add/Delete/Toggle Todos** - Complete CRUD operations
- **Real-time Search** - Instant filtering by task name
- **Date Range Filtering** - Filter todos by creation date
- **Client-side Pagination** - Navigate through large lists efficiently
- **Local Storage** - Persistent data across browser sessions

### 🌐 API Integration
- **GET Todos** - Fetch sample todos from JSONPlaceholder API
- **POST Todos** - Save new todos to API (optional)
- **Error Handling** - Comprehensive error management with retry logic
- **Connectivity Check** - Pre-validates API availability
- **Fallback System** - Graceful degradation when API is unavailable

### 📱 Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Touch-Friendly** - Perfect for mobile and tablet devices
- **Cross-Device** - Works seamlessly on phones, tablets, and desktops
- **Modern UI** - Clean, professional interface with smooth animations

### ⚡ Advanced Features
- **Loading States** - Visual feedback for all operations
- **Auto-retry** - Automatic API retry with exponential backoff
- **Input Validation** - Prevents invalid data entry
- **Performance Optimized** - Efficient code structure and rendering

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.com) *(Replace with your actual deployment URL)*

## 📱 Screenshots

### Desktop View
![Desktop View](images/desktop-preview.png)

### Mobile View
![Mobile View](images/mobile-preview.png)

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: JSONPlaceholder REST API
- **Storage**: Local Storage API
- **Styling**: Custom CSS with responsive design
- **Icons**: Custom images and Unicode symbols

## 📦 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Quick Start
1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server for better development experience
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Deploy (Optional)**
   - Upload files to any static hosting service
   - No build process required

## 🎮 How to Use

### Adding Todos
1. Type your task in the input field
2. Click "Add" or press Enter
3. Choose whether to save to API (toggle checkbox)

### Searching & Filtering
- **Search**: Type in the search box for instant filtering
- **Date Filter**: Select "From Date" and/or "To Date" to filter by creation date
- **Clear Filters**: Click "Clear Date Filter" to reset

### API Integration
- **Load Sample Data**: Click "Load Todos from API" to fetch 200 sample todos
- **Save to API**: Toggle "Save to API" checkbox to enable/disable API posting
- **Offline Mode**: App works perfectly without internet connection

### Pagination
- **Navigate**: Use Previous/Next buttons or click page numbers
- **Items per Page**: Choose 5, 10, 20, or 50 items per page
- **Info Display**: Shows current page range and total items

## 📁 Project Structure

```
todo-app/
├── index.html          # Main HTML file
├── style.css           # All styles and responsive design
├── script.js           # Application logic (Class-based)
├── images/             # App icons and images
│   ├── img1.jpg        # Header icon
│   ├── img2.png        # Checked todo icon
│   ├── img3.jpg        # Unchecked todo icon
│   └── img4.png        # Favicon
└── README.md           # This file
```

## 🔧 Code Architecture

### Class-Based Structure
The application uses a modern ES6 class-based architecture:

```javascript
class TodoApp {
    constructor() {
        // Initialize properties
    }
    
    // Core operations
    async addTask() { /* ... */ }
    searchTasks() { /* ... */ }
    filterByDate() { /* ... */ }
    
    // API operations
    async fetchTodosFromAPI() { /* ... */ }
    async postTodoToAPI() { /* ... */ }
    
    // UI management
    showLoading() { /* ... */ }
    showMessage() { /* ... */ }
}
```

### Key Features
- **Modular Design**: Each feature is a separate method
- **Error Handling**: Comprehensive try-catch blocks
- **Async/Await**: Modern JavaScript for API calls
- **Event Delegation**: Efficient event handling
- **Data Persistence**: Local storage integration

## 🌐 Deployment

### Static Hosting (Recommended)

#### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Drag and drop your project folder
4. Get instant live URL!

#### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import your repository
4. Deploy automatically

#### GitHub Pages
1. Create a GitHub repository
2. Upload your files
3. Go to Settings → Pages
4. Select source branch
5. Get your live URL

### File Upload
- Upload all files to any web hosting service
- No build process required
- Works immediately

## 📱 Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security & Privacy

- **No Data Collection**: All data stays in your browser
- **Local Storage**: Data is stored locally, not on servers
- **API Integration**: Optional, uses public JSONPlaceholder API
- **No Tracking**: No analytics or tracking scripts

## 🐛 Troubleshooting

### Common Issues

**Search not working after page reload**
- ✅ Fixed in latest version
- Data persistence issue resolved

**API not accessible**
- App works offline with local storage
- Check internet connection for API features

**Mobile display issues**
- ✅ Fully responsive design implemented
- Tested on all device sizes

### Performance Tips
- Use pagination for large lists
- Clear search/filters when not needed
- Disable API toggle for faster local-only operation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **JSONPlaceholder** - For providing the free API
- **Modern CSS** - For responsive design techniques
- **ES6+ JavaScript** - For modern development features

## 📞 Support

If you encounter any issues or have questions:

- **GitHub Issues**: Create an issue in the repository
- **Email**: your-email@example.com
- **Documentation**: Check this README for common solutions

---

<div align="center">

**Made with ❤️ by [Your Name]**

[![GitHub](https://img.shields.io/badge/GitHub-Follow-blue?style=social&logo=github)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=social&logo=linkedin)](https://linkedin.com/in/yourusername)

*Star this repository if you found it helpful! ⭐*

</div>
