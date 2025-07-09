// setup_remaining_project.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// These two lines help emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Assume the script is run inside the Vite-initialized project directory
const projectRoot = '.';

// You can now continue with your script using fs and path

// Define only the *additional* folders required within src/
const srcFolders = {
    'assets': { // Vite creates assets/, but we might want specific subfolders
        'images': [],
        'icons': [],
        'fonts': []
    },
    'components': {
        'common': [],
        'auth': [],
        'dashboard': [],
        'content': [],
        'payments': [],
        'ai-tutor': [],
        'progress-gamification': [],
        'admin': []
    },
    'config': [],
    'contexts': [],
    'hooks': [],
    'layouts': [],
    'pages': {
        'Auth': [],
        'Public': [],
        'Dashboard': [],
        'Learning': [],
        'Payment': [],
        'AI': [],
        'Progress': [],
        'Admin': []
    },
    'routes': [],
    'services': [],
    'styles': [], // Vite creates index.css or style.css, we'll add global.css
    'utils': []
};

// Define top-level folders that Vite doesn't create
const rootFolders = {
    'functions': {
        'auth': [],
        'firestore': [],
        'openai': [],
        'payments': []
    }
};

// Define files with initial content (or empty)
const files = {
    // Root level files (Vite doesn't create these, except .env which it might if configured)
    '.env': `# Firebase Configuration (replace with your actual values)
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID

# OpenAI API Key (for Cloud Functions - keep this secure!)
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
`,
    'firebase.json': JSON.stringify({
        "hosting": {
            "public": "dist", // Vite's default build output
            "ignore": [
                "firebase.json",
                "**/.*",
                "**/node_modules/**"
            ],
            "rewrites": [
                {
                    "source": "**",
                    "destination": "/index.html"
                }
            ]
        },
        "functions": {
            "source": "functions",
            "runtime": "nodejs20" // Or nodejs18, etc. Ensure this matches your functions/package.json
        },
        "firestore": {
            "rules": "firestore.rules",
            "indexes": "firestore.indexes.json"
        },
        "storage": {
            "rules": "storage.rules"
        }
    }, null, 2),
    'firestore.rules': `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to your 'users' collection for authenticated users
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow read-only access to 'content' for authenticated users
    match /content/{document=**} {
      allow read: if request.auth != null;
    }

    // Admin access (example - implement roles in Firestore)
    // match /{path=**} {
    //   allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    // }

    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`,
    'firestore.indexes.json': `{
  "indexes": [],
  "fieldOverrides": []
}`,
    'storage.rules': `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read/write for authenticated users
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}`,

    // src/ files (these will REPLACE or supplement what Vite generated)
    'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css'; // Your main global styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Add Bootstrap CSS

// If Vite generated an index.css or App.css, you might want to keep or merge its content
// import './index.css'; // Example if Vite created this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`,
    'src/App.jsx': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Import all your pages
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import LandingPage from './pages/Public/LandingPage';
import AboutUsPage from './pages/Public/AboutUsPage';
import PrivacyPolicyPage from './pages/Public/PrivacyPolicyPage';
import TermsOfUsePage from './pages/Public/TermsOfUsePage';
import RefundPolicyPage from './pages/Public/RefundPolicyPage';
import DashboardHome from './pages/Dashboard/DashboardHome';
import UserProfileSettingsPage from './pages/Dashboard/UserProfileSettingsPage';
import SubjectsPage from './pages/Learning/SubjectsPage';
import NotesPage from './pages/Learning/NotesPage';
import McqsPage from './pages/Learning/McqsPage';
import FlashcardsPage from './pages/Learning/FlashcardsPage';
import PastPapersPage from './pages/Learning/PastPapersPage';
import MockExamsPage from './pages/Learning/MockExamsPage';
import UpgradePage from './pages/Payment/UpgradePage';
import PaymentStatusPage from './pages/Payment/PaymentStatusPage';
import AITeacherAssistantPage from './pages/AI/AITeacherAssistantPage';
import ProgressPage from './pages/Progress/ProgressPage';
import LeaderboardPage from './pages/Progress/LeaderboardPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagementPage from './pages/Admin/UserManagementPage';
import PaymentVerificationPage from './pages/Admin/PaymentVerificationPage';
import ContentManagementPage from './pages/Admin/ContentManagementPage';

// Import route components
import PrivateRoute from './routes/PrivateRoute';
// import AdminRoute from './routes/AdminRoute'; // You will create this later for admin access control

function App() {
  return (
    <Router>
      <AuthProvider> {/* Provides authentication context to the entire app */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />

          {/* Auth Layout Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Private Routes (requires authentication) */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/profile" element={<UserProfileSettingsPage />} />
              <Route path="/subjects" element={<SubjectsPage />} />
              <Route path="/subjects/:subjectId/notes/:chapterId" element={<NotesPage />} />
              <Route path="/subjects/:subjectId/mcqs/:chapterId" element={<McqsPage />} />
              <Route path="/subjects/:subjectId/flashcards/:chapterId" element={<FlashcardsPage />} />
              <Route path="/past-papers" element={<PastPapersPage />} />
              <Route path="/mock-exams" element={<MockExamsPage />} />
              <Route path="/upgrade" element={<UpgradePage />} />
              <Route path="/payment-status" element={<PaymentStatusPage />} />
              <Route path="/ai-tutor" element={<AITeacherAssistantPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Route>
          </Route>

          {/* Admin Routes (requires admin role) - Uncomment and implement AdminRoute later */}
          {/*
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}> // You will create AdminLayout similar to DashboardLayout
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagementPage />} />
              <Route path="/admin/payments" element={<PaymentVerificationPage />} />
              <Route path="/admin/content" element={<ContentManagementPage />} />
            </Route>
          </Route>
          */}

          {/* Fallback for unknown routes */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;`,
    'src/config/firebase.js': `// src/config/firebase.js
// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics'; // Optional: if using Firebase Analytics

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
let analytics = null;
if (app.name && typeof window !== 'undefined') { // Check if window is defined for SSR compatibility
  analytics = getAnalytics(app);
}

export { app, auth, db, storage, analytics };
`,
    'src/contexts/AuthContext.jsx': `import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase'; // Assuming firebase.js is in config

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
`,
    'src/styles/global.css': `/* src/styles/global.css */
/* Basic reset and global styles */
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f0f2f5;
    color: #333;
}

code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
}

#root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
`,
    'src/routes/PrivateRoute.jsx': `import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the nested routes
  return <Outlet />;
};

export default PrivateRoute;
`,
    'src/layouts/AuthLayout.jsx': `import React from 'react';
import { Outlet } from 'react-router-dom';
// import './AuthLayout.css'; // Optional: specific styles for auth layout

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* You can add a logo, a background image, or a simple centered container here */}
      <div className="auth-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
`,
    'src/layouts/DashboardLayout.jsx': `import React from 'react';
import { Outlet } from 'react-router-dom';
// These components will be created later in src/components/dashboard/
// import Sidebar from '../components/dashboard/Sidebar';
// import Navbar from '../components/dashboard/Navbar';
// import './DashboardLayout.css'; // Optional: specific styles for dashboard layout

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      {/* <Navbar /> */}
      <div className="dashboard-main">
        {/* <Sidebar /> */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
`,
    // Placeholder Pages (Vite typically only creates App.jsx, but we need these for routing)
    'src/pages/Auth/LoginPage.jsx': `import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h2>Login Page</h2>
      {/* Your login form goes here */}
    </div>
  );
};

export default LoginPage;
`,
    'src/pages/Auth/SignupPage.jsx': `import React from 'react';

const SignupPage = () => {
  return (
    <div>
      <h2>Sign Up Page</h2>
      {/* Your signup form goes here */}
    </div>
  );
};

export default SignupPage;
`,
    'src/pages/Auth/ForgotPasswordPage.jsx': `import React from 'react';

const ForgotPasswordPage = () => {
  return (
    <div>
      <h2>Forgot Password Page</h2>
      {/* Your forgot password form goes here */}
    </div>
  );
};

export default ForgotPasswordPage;
`,
    'src/pages/Public/LandingPage.jsx': `import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to CrackEd LMS!</h1>
      <p>Your journey to success starts here.</p>
      {/* Add more marketing content */}
    </div>
  );
};

export default LandingPage;
`,
    'src/pages/Public/AboutUsPage.jsx': `import React from 'react';
const AboutUsPage = () => { return (<div><h2>About Us</h2><p>Learn more about CrackEd LMS.</p></div>); }; export default AboutUsPage;`,
    'src/pages/Public/PrivacyPolicyPage.jsx': `import React from 'react';
const PrivacyPolicyPage = () => { return (<div><h2>Privacy Policy</h2><p>Our commitment to your privacy.</p></div>); }; export default PrivacyPolicyPage;`,
    'src/pages/Public/TermsOfUsePage.jsx': `import React from 'react';
const TermsOfUsePage = () => { return (<div><h2>Terms of Use</h2><p>Please read our terms and conditions.</p></div>); }; export default TermsOfUsePage;`,
    'src/pages/Public/RefundPolicyPage.jsx': `import React from 'react';
const RefundPolicyPage = () => { return (<div><h2>Refund Policy</h2><p>Information regarding refunds.</p></div>); }; export default RefundPolicyPage;`,
    'src/pages/Dashboard/DashboardHome.jsx': `import React from 'react';

const DashboardHome = () => {
  return (
    <div>
      <h2>Your Dashboard</h2>
      <p>Welcome back! Here's an overview of your progress.</p>
    </div>
  );
};

export default DashboardHome;
`,
    'src/pages/Dashboard/UserProfileSettingsPage.jsx': `import React from 'react';
const UserProfileSettingsPage = () => { return (<div><h2>Profile Settings</h2><p>Manage your account details.</p></div>); }; export default UserProfileSettingsPage;`,
    'src/pages/Learning/SubjectsPage.jsx': `import React from 'react';
const SubjectsPage = () => { return (<div><h2>Subjects</h2><p>Explore available subjects.</p></div>); }; export default SubjectsPage;`,
    'src/pages/Learning/NotesPage.jsx': `import React from 'react';
const NotesPage = () => { return (<div><h2>Notes</h2><p>Detailed notes for your studies.</p></div>); }; export default NotesPage;`,
    'src/pages/Learning/McqsPage.jsx': `import React from 'react';
const McqsPage = () => { return (<div><h2>MCQs Practice</h2><p>Practice multiple choice questions.</p></div>); }; export default McqsPage;`,
    'src/pages/Learning/FlashcardsPage.jsx': `import React from 'react';
const FlashcardsPage = () => { return (<div><h2>Flashcards</h2><p>Interactive flashcards for revision.</p></div>); }; export default FlashcardsPage;`,
    'src/pages/Learning/PastPapersPage.jsx': `import React from 'react';
const PastPapersPage = () => { return (<div><h2>Past Papers</h2><p>Access previous exam papers.</p></div>); }; export default PastPapersPage;`,
    'src/pages/Learning/MockExamsPage.jsx': `import React from 'react';
const MockExamsPage = () => { return (<div><h2>Mock Exams</h2><p>Test your knowledge with full mock exams.</p></div>); }; export default MockExamsPage;`,
    'src/pages/Payment/UpgradePage.jsx': `import React from 'react';
const UpgradePage = () => { return (<div><h2>Upgrade Your Plan</h2><p>Unlock premium features.</p></div>); }; export default UpgradePage;`,
    'src/pages/Payment/PaymentStatusPage.jsx': `import React from 'react';
const PaymentStatusPage = () => { return (<div><h2>Payment Status</h2><p>Check the status of your payment.</p></div>); }; export default PaymentStatusPage;`,
    'src/pages/AI/AITeacherAssistantPage.jsx': `import React from 'react';
const AITeacherAssistantPage = () => { return (<div><h2>AI Teacher Assistant</h2><p>Get instant help from your AI tutor.</p></div>); }; export default AITeacherAssistantPage;`,
    'src/pages/Progress/ProgressPage.jsx': `import React from 'react';
const ProgressPage = () => { return (<div><h2>My Progress</h2><p>Track your learning journey.</p></div>); }; export default ProgressPage;`,
    'src/pages/Progress/LeaderboardPage.jsx': `import React from 'react';
const LeaderboardPage = () => { return (<div><h2>Leaderboard</h2><p>See how you rank against others.</p></div>); }; export default LeaderboardPage;`,
    'src/pages/Admin/AdminDashboard.jsx': `import React from 'react';
const AdminDashboard = () => { return (<div><h2>Admin Dashboard</h2><p>Welcome, Admin!</p></div>); }; export default AdminDashboard;`,
    'src/pages/Admin/UserManagementPage.jsx': `import React from 'react';
const UserManagementPage = () => { return (<div><h2>User Management</h2><p>Manage user accounts.</p></div>); }; export default UserManagementPage;`,
    'src/pages/Admin/PaymentVerificationPage.jsx': `import React from 'react';
const PaymentVerificationPage = () => { return (<div><h2>Payment Verification</h2><p>Review and verify user payments.</p></div>); }; export default PaymentVerificationPage;`,
    'src/pages/Admin/ContentManagementPage.jsx': `import React from 'react';
const ContentManagementPage = () => { return (<div><h2>Content Management</h2><p>Manage learning content.</p></div>); }; export default ContentManagementPage;`,

    // functions/ files
    'functions/index.js': `/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Example HTTP function for testing
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Example: Function to verify payment and update user status
exports.verifyPayment = onRequest(async (req, res) => {
    // This is a placeholder. Real implementation would involve:
    // 1. Authentication/Authorization check for admin users
    // 2. Receiving payment_id and user_id from frontend
    // 3. Updating Firestore user document (e.g., set isPaid: true)
    // 4. Triggering welcome email (e.g., by updating a user field that MailerLite watches, or directly via MailerLite API)

    logger.info("Payment verification request received.", req.body);

    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { userId, paymentStatus, reason } = req.body; // e.g., 'approved', 'rejected'

    if (!userId || !paymentStatus) {
        return res.status(400).send('Missing userId or paymentStatus');
    }

    try {
        const userRef = db.collection('users').doc(userId);
        if (paymentStatus === 'approved') {
            await userRef.update({
                isPaid: true,
                paymentVerifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                // Add expiryDate logic here
            });
            logger.info(\`User \${userId} payment approved.\`);
            // Trigger welcome email (e.g., call another function or service)
        } else if (paymentStatus === 'rejected') {
            await userRef.update({
                isPaid: false, // Ensure false if it was pending
                paymentVerifiedAt: admin.firestore.FieldValue.serverTimestamp(),
                paymentRejectionReason: reason || 'Payment could not be verified.',
            });
            logger.info(\`User \${userId} payment rejected.\`);
            // Trigger rejection email
        } else {
            return res.status(400).send('Invalid paymentStatus');
        }

        res.status(200).send(\`Payment for user \${userId} processed as \${paymentStatus}\`);

    } catch (error) {
        logger.error("Error processing payment verification:", error);
        res.status(500).send("Internal Server Error");
    }
});
`,
    'functions/package.json': JSON.stringify({
        name: 'functions',
        description: 'Cloud Functions for Firebase',
        scripts: {
            lint: 'eslint .',
            serve: 'firebase emulators:start --only functions',
            shell: 'firebase functions:shell',
            start: 'npm run shell',
            deploy: 'firebase deploy --only functions',
            logs: 'firebase functions:log'
        },
        engines: {
            node: '20' // Ensure this matches your firebase.json runtime
        },
        main: 'index.js',
        dependencies: {
            'firebase-admin': '^12.3.0',
            'firebase-functions': '^5.0.0',
            // Add other function dependencies like 'axios' for external APIs (e.g., OpenAI, MailerLite)
            'axios': '^1.7.2'
        },
        devDependencies: {
            'eslint': '^8.15.0',
            'eslint-config-google': '^0.14.0',
            'firebase-functions-test': '^3.1.0'
        },
        private: true
    }, null, 2)
};

function createDirectoriesRecursively(basePath, structure) {
    for (const key in structure) {
        const itemPath = path.join(basePath, key);

        if (Array.isArray(structure[key])) { // It's a folder with no defined sub-folders yet
            console.log(`Creating directory: ${itemPath}`);
            fs.mkdirSync(itemPath, { recursive: true });
        } else if (typeof structure[key] === 'object') { // It's a folder with sub-folders
            console.log(`Creating directory: ${itemPath}`);
            fs.mkdirSync(itemPath, { recursive: true });
            createDirectoriesRecursively(itemPath, structure[key]); // Recurse for sub-folders
        }
    }
}

function createFilesWithContent(fileDefinitions) {
    for (const filePath in fileDefinitions) {
        const fullPath = path.join(process.cwd(), filePath); // Use current working directory
        const content = fileDefinitions[filePath];
        const dir = path.dirname(fullPath);

        // Ensure directory exists before writing file
        fs.mkdirSync(dir, { recursive: true });

        console.log(`Creating file: ${fullPath}`);
        fs.writeFileSync(fullPath, content);
    }
}

// Main execution logic
try {
    console.log(`\nStarting project setup from current directory (${process.cwd()})...`);
    console.log("Assuming Vite has already initialized your React project.");

    // Create additional folders within src/
    console.log('\nCreating additional directories within src/:');
    createDirectoriesRecursively(path.join(projectRoot, 'src'), srcFolders);

    // Create top-level additional folders
    console.log('\nCreating top-level directories (e.g., functions/):');
    createDirectoriesRecursively(projectRoot, rootFolders);

    // Create all specified files
    console.log('\nCreating essential files:');
    createFilesWithContent(files);

    console.log('\nProject structure and initial files created successfully!');
    console.log('\nIMPORTANT NEXT STEPS:');
    console.log('1. **Manual Merge for React Files:**');
    console.log('   - The script provided `src/App.jsx`, `src/main.jsx`, and `src/styles/global.css`.');
    console.log('   - These are designed to be a complete starting point for your app structure.');
    console.log('   - If Vite generated content in its `App.jsx`, `main.jsx`, or `index.css`/`App.css` that you wish to keep (e.g., Vite logo imports, initial styles), you will need to **manually merge** those parts into the newly created files.');
    console.log('   - For `global.css`, you can either replace Vite\'s `index.css`/`App.css` or import `global.css` from `index.css`/`App.css`.');
    console.log('   - **Crucially, for `src/package.json`**, ensure you add the following dependencies if they are not already there (Vite handles React and ReactDOM, but you will need `react-router-dom`  `firebase`):');
    console.log('     ```json');
    console.log('     "dependencies": {');
    console.log('       "react": "^18.3.1",');
    console.log('       "react-dom": "^18.3.1",');
    console.log('       "react-router-dom": "^6.24.1",');
    console.log('       "firebase": "^10.12.3",');
    console.log('       "bootstrap": "^5.3.3"');
    console.log('       // Keep any other dependencies Vite added');
    console.log('     },');
    console.log('     "devDependencies": {');
    console.log('       "@vitejs/plugin-react": "^4.6.0", // Ensure this is the correct, existing version');
    console.log('       // Keep any other devDependencies Vite added');
    console.log('     }');
    console.log('     ```');
    console.log('   - After modifying `src/package.json`, run `npm install` again within the `src` directory to install these new dependencies.');
    console.log('2. **Install Firebase Functions Dependencies:**');
    console.log('   - Navigate into the `functions/` directory: `cd functions`');
    console.log('   - Run: `npm install` (or `yarn install`)');
    console.log('3. **Firebase Project Initialization:**');
    console.log('   - Run `firebase login` to authenticate with Firebase.');
    console.log('   - Run `firebase init` in the root of your project to set up Firebase hosting, functions, Firestore rules, etc. Choose to use existing project and select your project.');
    console.log('   - Ensure your `.env` file (at the root of your project) is updated with your actual Firebase configuration details and OpenAI API key.');
    console.log('4. **Start your React Development Server:**');
    console.log('   - Navigate back to your main React app directory (where your frontend `package.json` is): `cd src` (if you are not already there).');
    console.log('   - Run: `npm run dev` to start the frontend.');

} catch (error) {
    console.error('Error creating project structure:', error);
}