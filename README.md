# Portfolio — Next.js CMS

A full-stack developer portfolio with a built-in content management system (CMS). Manage your projects, skills, and about section through a secure admin dashboard — no code changes needed.

## ✨ Features

- **Public Portfolio** — Hero, Skills, Projects, and Contact sections
- **Admin Dashboard** — Secure CMS to manage all portfolio content
- **Authentication** — Credentials-based login with NextAuth.js and bcrypt
- **Project Management** — Add, edit, archive, and feature projects
- **Skills Management** — Organize skills by category with icon and level support
- **About Section** — Editable bio, social links, avatar, and resume
- **Image Uploads** — Powered by Supabase Storage
- **Dark Mode** — Built-in theme switching with `next-themes`
- **Responsive Design** — Mobile-first layout

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | [Prisma 7](https://www.prisma.io/) |
| Auth | [NextAuth.js v4](https://next-auth.js.org/) |
| Storage | [Supabase](https://supabase.com/) |
| UI | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Styling | Tailwind CSS |
| Icons | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |

## 📁 Project Structure

```
├── app/
│   ├── (routes)/          # Public portfolio pages
│   ├── admin/
│   │   ├── (admin_routes)/
│   │   │   ├── dashboard/ # Overview, Projects, Skills, About tabs
│   │   │   ├── projects/  # Add / Edit projects
│   │   │   ├── skills/    # Add / Edit skills
│   │   │   └── about/     # Edit about section
│   │   └── login/         # Admin login page
│   └── api/               # API route handlers
├── components/            # Shared UI components
├── prisma/
│   └── schema.prisma      # Database schema
├── seed/                  # Database seed scripts
└── lib/                   # Utilities and helpers
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- Supabase project (for image storage)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd portfolio_next
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of the project:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/portfolio?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 3. Set Up the Database

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

### 4. Seed the Database

Update the seed scripts in `/seed` with your own information, then run:

```bash
# Seed admin credentials
npx ts-node seed/seedAdmin.ts

# Seed about section
npx ts-node seed/seedAbout.ts

# Seed initial projects
npx ts-node seed/seedProjects.ts

# Seed initial skills
npx ts-node seed/seedSkills.ts
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.
Access the admin panel at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🗄 Database Models

| Model | Description |
|---|---|
| `Admin` | Admin user for authentication |
| `Project` | Portfolio projects with title, description, image, demo/GitHub links, and technologies |
| `Skill` | Skills grouped by category with icon and proficiency level |
| `About` | Personal info, bio, social links, avatar, and resume |

## 🔒 Admin Routes

All `/admin/*` routes are protected by middleware. Only authenticated admins can access the dashboard.

- `/admin/login` — Login page
- `/admin/dashboard` — Overview with tabs for Projects, Skills, and About
- `/admin/projects/add` — Add a new project
- `/admin/projects/[id]/edit` — Edit an existing project
- `/admin/skills/add` — Add a new skill
- `/admin/skills/[id]/edit` — Edit an existing skill

## 📄 License

MIT
