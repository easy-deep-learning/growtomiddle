# AGENTS.md — AI Agent Guidelines for growtomiddle

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript 5.9+ (strict mode)
- **Database**: MongoDB with Mongoose 8+
- **UI**: Ant Design 6+
- **Forms**: React Hook Form + Zod validation
- **Auth**: NextAuth 5 (beta)
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/               # API route handlers
│   │   └── [resource]s/   # REST endpoints (plural)
│   └── [page]/            # Page components
├── components/            # React components (grouped by feature)
├── controllers/           # Business logic layer
├── database/
│   ├── models/           # Mongoose models
│   ├── datatypes/        # TypeScript type definitions
│   ├── mongooseConnect.ts
│   └── mongodbConnect.ts
├── utils/                # Utility functions
└── auth.ts               # NextAuth configuration

dev-tools/
├── plop-templates/       # Code generation templates
├── mocks-data/          # Mock data generators
└── scripts/             # Dev/seed scripts
```

## Code Generation

Use Plop for scaffolding. Run `pnpm generate` to create:

- `resource` — Full CRUD (model, datatype, API routes, page)
- `model` — Mongoose model + datatype
- `controller` — Controller with CRUD operations
- `api` — API route handlers
- `page` — Next.js page component

## Mongoose Model Pattern

Models use `InferSchemaType` to derive types from the schema:

```typescript
import mongoose, { HydratedDocument, InferSchemaType, Model, Schema } from 'mongoose';

const ExampleSchema = new Schema(
  {
    name: { type: String, required: true },
    // For enums, use Object.values():
    status: { type: String, enum: Object.values(StatusEnum) },
  },
  { timestamps: true }
);

// 1. Pure data type (POJO) — use in frontend/props
export type Example = InferSchemaType<typeof ExampleSchema>;

// 2. Document type — use in backend with Mongoose methods
export type ExampleDocument = HydratedDocument<Example>;

// 3. Model — cast for Next.js hot-reload compatibility
const ExampleModel =
  (mongoose.models?.Example as Model<ExampleDocument>) ||
  mongoose.model<ExampleDocument>('Example', ExampleSchema);

export default ExampleModel;
```

## Controller Pattern

Controllers handle business logic, always call `mongooseConnect()`:

```typescript
import { mongoDocToFrontend } from '@/utils/mongo-doc-to-frontend';
import ExampleModel from '@/database/models/Example';
import mongooseConnect from '@/database/mongooseConnect';

export const getAll = async (params: { page: number; limit: number }) => {
  await mongooseConnect();
  const docs = await ExampleModel.find()
    .sort({ createdAt: -1 })
    .skip((params.page - 1) * params.limit)
    .limit(params.limit)
    .lean();
  return docs.map(mongoDocToFrontend);
};

export const getById = async (id: string) => {
  await mongooseConnect();
  const doc = await ExampleModel.findById(id).lean();
  return doc ? mongoDocToFrontend(doc) : null;
};

export const create = async (data: Omit<Example, 'id' | 'createdAt' | 'updatedAt'>) => {
  await mongooseConnect();
  const doc = await ExampleModel.create(data);
  return mongoDocToFrontend(doc);
};
```

## API Route Pattern

API routes are in `src/app/api/[resource]s/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

import mongooseConnect from '@/database/mongooseConnect';
import { create, getAll } from '@/controllers/ExampleController';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const items = await getAll({ page, limit });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();
    const body = await request.json();
    const item = await create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

## Document Transformation

Use `mongoDocToFrontend` to convert Mongoose docs to frontend format:

- Converts `_id` (ObjectId) → `id` (string)
- Converts `createdAt`/`updatedAt` (Date) → ISO strings

```typescript
import { mongoDocToFrontend } from '@/utils/mongo-doc-to-frontend';

const doc = await Model.findById(id).lean();
return mongoDocToFrontend(doc); // { id: "...", createdAt: "2024-...", ... }
```

## Component Patterns

### Client Components

Use `'use client'` directive for interactive components:

```typescript
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
});

export const ExampleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  // ...
};
```

### Server Components

Default for pages, can fetch data directly:

```typescript
import ExampleModel from '@/database/models/Example';
import mongooseConnect from '@/database/mongooseConnect';

export default async function ExamplePage() {
  await mongooseConnect();
  const items = await ExampleModel.find().lean();
  return <ExampleList items={items} />;
}
```

## Import Aliases

Use `@/` prefix for src imports:

```typescript
import { mongoDocToFrontend } from '@/utils/mongo-doc-to-frontend';
import ExampleModel from '@/database/models/Example';
import mongooseConnect from '@/database/mongooseConnect';
import { auth } from '@/auth';
```

## Key Conventions

1. **Minimal diffs** — Change only what's necessary
2. **Ask before refactors** — Large changes need approval
3. **Search first** — Look in-repo before guessing patterns
4. **Preserve formatting** — Don't change unrelated code style
5. **Use enums** — Define enums for string literals, use `Object.values()` in schemas
6. **Always `.lean()`** — Use `.lean()` for read queries (returns POJOs)
7. **Transform docs** — Use `mongoDocToFrontend` when returning to client
8. **Zod for forms** — Use Zod schemas with React Hook Form

## Scripts

```bash
pnpm dev              # Start dev server
pnpm dev:on-host      # Dev with local MongoDB
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm format           # Run Prettier
pnpm generate         # Run Plop generators
pnpm storybook        # Start Storybook
pnpm seed:vacancies   # Seed vacancy data
```
