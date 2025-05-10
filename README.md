# GEOSEO Landing Page

A modern, responsive waitlist landing page built with Next.js and Tailwind CSS.

## Features

- Clean, modern design with smooth animations
- Responsive layout (mobile-first)
- Waitlist form with local storage
- Social proof section
- Contact information and social links

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd geoseo-landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── waitlist/
│   │   │       └── route.ts
│   │   └── page.tsx
│   └── components/
│       ├── Footer.tsx
│       ├── Hero.tsx
│       ├── Testimonials.tsx
│       └── WaitlistForm.tsx
├── public/
│   ├── logo-placeholder.svg
│   └── company*.svg
└── data/
    └── submissions.json
```

## Form Submissions

Form submissions are stored locally in `data/submissions.json`. To integrate with external services:

1. Mailchimp: Use the Mailchimp API or Zapier integration
2. Airtable: Use the Airtable API or Zapier integration
3. Notion: Use the Notion API or Zapier integration

## Customization

- Update the logo in `public/logo-placeholder.svg`
- Modify company logos in `public/company*.svg`
- Edit content in the component files
- Customize styles in the Tailwind classes

## Deployment

The project can be deployed to any platform that supports Next.js applications:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Custom server

## License

MIT 