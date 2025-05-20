This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# University Hostel Complaint System

## Database Setup

This project uses PostgreSQL with Prisma ORM. Follow these steps to set up your database:

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Database Connection

Create a `.env` file in the root directory with your PostgreSQL connection string:

\`\`\`
DATABASE_URL="postgresql://username:password@localhost:5432/hostel_complaints?schema=public"
\`\`\`

Replace `username`, `password`, and other values with your PostgreSQL credentials.

### 3. Create and Migrate the Database

\`\`\`bash
# Generate Prisma client
npm run prisma:generate

# Create database tables
npm run prisma:migrate
\`\`\`

### 4. Seed the Database with Initial Data

\`\`\`bash
npm run db:seed
\`\`\`

This will create default users:
- Admin: admin@university.edu / admin123
- Staff: staff@university.edu / staff123
- Student: student@university.edu / student123

### 5. Explore the Database (Optional)

\`\`\`bash
npm run prisma:studio
\`\`\`

This opens Prisma Studio, a visual editor for your database at http://localhost:5555

## Development

\`\`\`bash
npm run dev
\`\`\`

## Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Database Schema

The database schema includes the following models:

- **User**: Students, staff, and administrators
- **Complaint**: Complaints submitted by students
- **ComplaintUpdate**: Updates and comments on complaints
- **NotificationPreference**: User notification settings

See `prisma/schema.prisma` for the complete schema definition.

