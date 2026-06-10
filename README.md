# 🇲🇱 Minnesota Community Membership Database & Registration Portal (HTML, CSS & JS)

An elegant, fully-featured digital registration and administration database platform built specifically for the **Minnesota Community of Brewerville City, Montserrado County, Republic of Liberia**.

This application is built using **pure HTML, Tailwind CSS, and vanilla JavaScript** on the frontend, with lightweight **Node.js Serverless Functions** on Vercel connecting to a **MongoDB Atlas** database! It has zero complex build steps, loads instantly, and runs with incredible performance.

---

## 📁 Project Directory Structure

```text
├── index.html          # Public Home Page (Registration Form & Status Tracker)
├── admin.html          # Admin Dashboard & Paper Form Print Layout
├── vercel.json         # Vercel Router & Redirect Config
├── package.json        # Dependencies (Mongoose Database Driver)
├── .env.example        # Environment variable checklist
└── api/
    ├── db.js           # Serverless MongoDB Connection Pooler
    ├── register.js     # Serverless Form Submission Endpoint
    ├── check-status.js # Serverless Card Status Tracking Lookup
    └── members.js      # Serverless Administrative CRUD Operations
```

---

## ✨ Core Features

1. **Double-Logo Header & Official Seal:** Beautiful SVG-rendered seals that perfectly match the branding of the Minnesota Community, styled with the national colors of Liberia (Red, White, Blue, Gold, Green).
2. **Interactive Form:**
   - **Section A (Personal):** Age automatically calculated on selecting Date of Birth; fields match the official form fields.
   - **Section B (Livelihood):** Selectable employment statuses with optional custom text for "Other" choices; Liberian Dollar (LD$) income tiers.
   - **Section C (Household):** Dynamically editable Dependents table (add/remove rows on the fly), automatically updating totals.
   - **Section D (Community):** Residency durations, voter checks, and multiple-choice Areas of Interest (including custom specification text).
   - **Section E (Emergency):** Crucial emergency contact mapping.
   - **Section F (Declaration):** Electronic signature/thumbprint confirmation.
3. **Tracking & Status Checker:** Users immediately receive a unique tracking reference (e.g. `MC-2026-4819`) on submission, which they can search at any time to monitor review progress (Pending, Approved, or Rejected).
4. **Comprehensive Admin Dashboard (`/admin`):**
   - **Metrics Overview:** See total, pending, approved, and rejected submissions at a glance.
   - **Search & Filter:** Search instantly by name, mobile number, origin county, or tracking reference. Filter by status or gender.
   - **Administrative Vetting (Section G):** Admins can open any registration to log review dates, receiver names, positions, remarks, and change the membership status.
   - **Membership ID Generation:** Clicking Approve automatically generates a formatted, unique official Membership ID (e.g. `MC-MEM-2026-5829`).
   - **Print-Friendly Form (Exact Replication):** A custom print stylesheet renders a clean, pixel-perfect printable layout that matches the physical scanned paper form exactly! Admins can print this to physical paper or save it as a PDF for local archives.

---

## 🛠️ Step-by-Step Deployment Guide

### 1. MongoDB Database Setup
1. Sign up for a free database at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Shared Cluster (Free Tier).
3. In **Database Access**, create a user with read/write privileges and a strong password.
4. In **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Vercel serverless functions can connect.
5. Click **Connect**, choose **Drivers**, select **Node.js**, and copy your connection string. It will look like this:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/minnesota_db?retryWrites=true&w=majority`

---

### 2. Push to GitHub
1. Initialize a git repository locally:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Minnesota Community Form App using HTML, CSS and JS"
   ```
2. Create a new repository on your [GitHub account](https://github.com).
3. Connect your local folder to GitHub and push your code:
   ```bash
   git remote add origin https://github.com/yourusername/your-repository-name.git
   git branch -M main
   git push -u origin main
   ```

---

### 3. Deploy to Vercel (vercel.com)
1. Go to [Vercel](https://vercel.com) and sign in using your GitHub account.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository (`your-repository-name`).
4. Expand **Environment Variables** and add the following:
   - **Key:** `MONGODB_URI`
   - **Value:** *Your actual MongoDB connection string from step 1 (make sure to replace `<password>` with your real password!)*
5. Click **Deploy**. Vercel will host your static files and map the API folder seamlessly.

---

## 💻 Local Development Setup

To run this project on your computer:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Link your local project directory and login:
   ```bash
   vercel login
   vercel link
   ```
3. Run Vercel's local dev command (which handles serverless api routing locally):
   ```bash
   vercel dev
   ```
4. Open your web browser to `http://localhost:3000` to register, and `http://localhost:3000/admin` to manage applications.

---

## 📜 Motto
> **"Unity, Peace, and Sustainable Development for All"**
