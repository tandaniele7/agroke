<div align="center">
  <img src="public/agroke_logo_with_text.png" alt="Agroke Logo" width="400">
  <h1>Agroke - Digital Field Diary Platform</h1>
</div>

<p align="center">
  Digital Field Management solution compliant with 2026 regulatory requirements
</p>

<p align="center">
  <a href="#key-features"><strong>Key Features</strong></a> ·
  <a href="#field-diary"><strong>Field Diary</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a>
</p>

<br/>

## Overview

Agroke is a digital field diary platform designed to help farmers comply with the mandatory electronic reporting requirements starting January 2026. The platform provides an easy-to-use interface for recording all field operations while ensuring regulatory compliance.

## Key Features

- **Digital Field Diary**
  - Complete field operation tracking
  - Regulatory compliant record keeping
  - Treatment and fertilization logging
  - Crop rotation planning

## Field Diary

### Compliant Record Keeping
- Digital documentation of all field operations
- Automatic regulatory compliance checks
- Secure data storage and backup
- Official reporting generation

### Operation Tracking
- Treatment records
- Fertilization logs
- Harvest documentation
- Activity timestamps

### Data Management
- Secure cloud storage
- Export capabilities
- Historical data access
- Compliance reports

## Tech Stack

### Frontend
- **Next.js 13** with App Router for efficient server-side rendering
- **Tailwind CSS** for modern, responsive styling

### Backend
- **Supabase** for database and authentication
- **Secure API endpoints** for data management

### Development
- **TypeScript** for type-safe code
- **ESLint** and **Prettier** for code quality
- **Git** for version control
- **Vercel** for seamless deployment

## Getting Started

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally). (Sign-up and Sign-in page are not linked to the main page since we just want to keep them hidden from public (but accessible for those who know 👀))

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/agroke.git
   cd agroke
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a Supabase project:**
   - Visit [Supabase Dashboard](https://app.supabase.com)
   - Create a new project
   - Copy your project URL and anon key

4. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

6. **Optional: Configure UI theme**
   - Customize the theme in `components.json`
   - Edit Tailwind configuration in `tailwind.config.ts`


## Support

For support, bug reports and feature requests, please use the GitHub Issues section.

## License

Copyright © 2024 Agroke. All rights reserved.

---

<p align="center">Made with ❤️ for agriculture</p>
