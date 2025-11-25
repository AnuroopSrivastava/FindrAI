🚀 FindrAI — AI Tools Catalog

A modern, fast, and fully responsive directory of AI tools built with Next.js 14, TailwindCSS, and TypeScript.
Find AI tools by category, explore tool details, and manage admin replies with secure login — all optimized for mobile and deployed on Vercel.

## ✅ Key Features
🧭 Frontend
- ⚡ Built with Next.js App Router
- 🎨 Modern UI powered by TailwindCSS
- 📱 100% Mobile Responsive
- 🔎 Search + Category Filtering
- 🖼️ Dynamic tool cards with icons, images & tags
- 🌙 Dark mode friendly design

🛠️ Admin Panel
- 🔐 Secure admin login (bcrypt + JWT)
- 📨 View + Reply to contact form messages
- ✔ Works perfectly after deployment on Vercel
- 📁 Uses API Routes inside /app/api/...

📩 Contact Form
- Sends mail using Nodemailer
- Supports Gmail SMTP or Custom SMTP
- Success modal + Loading state

🚀 Deployment
- Fully optimized for Vercel : findr-ai-sepia.vercel.app
- Works seamlessly with Edge/Node runtimes
- No environment conflicts

---

## 🏗️ Tech Stack

 Frontend
  - Next.js 14 (App Router)
  - React 18
  - TailwindCSS
  - Lucide Icons

 Backend
  - Next.js API Routes
  - Nodemailer
  - Bcrypt
  - JWT Authentication

 Other
  - TypeScript
  - Vercel Deployment

---

## 📁 Project Structure
ai-tools-website/
├── app/

│   ├── api/

│   │   ├── contact/route.ts

│   │   ├── admin/

│   │   │   ├── login/route.ts

│   │   │   └── reply/route.ts

│   ├── components/

│   ├── (pages...)

│   └── layout.tsx

├── public/

│   ├── logos/

│   ├── favicon.ico

├── lib/

│   ├── getTools.ts

│   ├── auth.ts



---


## 🛠️ Setup & Installation

  1️⃣ Install dependencies
    npm install

  2️⃣ Run development server
    npm run dev

  3️⃣ Build for production
    npm run build
    npm start

App runs at:
```
http://localhost:3000
```

---

## 🙌 Contributing
- Pull requests and feature suggestions are welcome!
- Feel free to fork the repo and submit improvements.

---

## 📜 License
MIT License — Free for personal and commercial use.

## ⭐ Support the Project
If you like FindrAI, consider giving a ⭐ on GitHub!
