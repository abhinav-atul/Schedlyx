
<p align="center">
  

  <h3 align="center">Schedlyx</h3>

  <p align="center">
    Open-source scheduling and event coordination platform  
    <br />
    <a href="https://schedlyx.vercel.app"><strong>Live Demo</strong></a>
    ·
    <a href="https://github.com/fyiclub-vitb/Schedlyx/issues">Issues</a>
    ·
    <a href="https://github.com/fyiclub-vitb/Schedlyx/discussions">Discussions</a>
    ·
    <a href="https://github.com/fyiclub-vitb/Schedlyx/projects">Roadmap</a>
  </p>
</p>

---

## About Schedlyx

Schedlyx is an open-source platform for scheduling people, managing events, and handling registrations — all in one place.

It combines:
- Personal booking pages
- Event registration systems
- Smart scheduling and conflict resolution
- Group session coordination

Schedlyx is designed for:
- Mentors and students  
- Hackathons and workshops  
- Interviews and recruiting  
- Classes and office hours  
- Communities and meetups  

Instead of juggling multiple tools, Schedlyx lets you manage time, people, and events from a single dashboard.

---

## Core Features

### Personal Scheduling
- Public booking pages for individuals
- Working hours, buffers, and availability rules
- Custom booking questions
- Automatic time zone detection
- Google Calendar synchronization

### Event Management
- Create public events (workshops, hackathons, interviews, webinars)
- Set capacity and registration limits
- Create multiple sessions inside an event
- Add speakers, mentors, and hosts

### Registration System
- Public registration pages
- Custom form fields
- Waitlists and capacity control
- Confirmation emails
- Exportable attendee lists

### Smart Scheduling Engine
- Prevents double booking
- Finds overlapping availability
- Assigns participants to sessions
- Balances session loads automatically

### Live Event Tools
- QR-code based check-in
- Attendance tracking
- Session status dashboard
- Real-time participant view

### Public Pages
Each event and user gets a public page such as:

```

schedlyx.app/john
schedlyx.app/event/hackathon2025

````

These pages include schedules, booking links, registration, and event information.

---

## Tech Stack

**Frontend**
- React 18  
- Vite  
- TypeScript  
- Tailwind CSS  
- Headless UI  

**Backend**
- Supabase (PostgreSQL, Authentication, Storage, Realtime)

**Integrations**
- Google Calendar API

**State & Forms**
- Zustand  
- React Hook Form  
- Zod  

**Deployment**
- Vercel  

---

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Google Cloud project for Calendar API

### Installation


```bash
git clone https://github.com/fyiclub-vitb/Schedlyx.git
cd Schedlyx
npm install
````

### Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Fill in:

* Supabase URL
* Supabase anon key
* Google OAuth credentials

### Run locally

```bash
npm run dev
```

Open `http://localhost:5173`

---

## Database Setup

1. Create a Supabase project
2. Run SQL from `supabase/migrations`
3. Enable Row Level Security
4. Enable Email authentication

---

## Contributing

Schedlyx is built for the community.

To contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Run tests and lint
5. Open a Pull Request

See `CONTRIBUTING.md` for full guidelines.

---

## Roadmap

* Team workspaces
* Advanced analytics
* Webhooks and API access
* Organization accounts
* White-label deployments

---

## License

Schedlyx is licensed under the MIT License.
You are free to use, modify, and distribute it.

---

## Community

If you like this project:

* Star the repository
* Join Discussions
* Suggest features
* Help improve documentation

Schedlyx is built in public and for everyone.

