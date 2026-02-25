# Pulse Credit Portal

Advanced credit repair and management platform for B2B industries, specializing in Net-15 / Net-30 specialist credit lines.

## Features

- **Dashboard**: Real-time credit line utilization tracking.
- **Prequalification**: Instant scoring and risk assessment.
- **Payments**: Secure payment processing via Stripe.
- **CRM Integration**: Lead and customer management synced with HubSpot.
- **Authentication**: Secure user sessions handled by Supabase.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS / Lucide Icons
- **Backend/Auth**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **CRM**: [HubSpot](https://www.hubspot.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- NPM / PNPM / Bun

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd pulse-credit-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in your credentials.
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3003](http://localhost:3003) (or your configured port) to see the result.

## Database Schema

The initial Supabase schema can be found in `supabase/schema.sql`. Run this in your Supabase SQL Editor to set up the necessary tables (customers, invoices) and RLS policies.

## Deployment

The project is ready to be deployed on **Vercel**. Ensure all environment variables from `.env.local` are added to your Vercel project settings.

---

© 2026 Pulse Agency LLC. All rights reserved.
