# Plop Generators

This project uses [Plop.js](https://plopjs.com/) to generate boilerplate code for Next.js API routes, Mongoose models, datatypes, and pages.

## Installation

After adding plop to your project, install dependencies:

```bash
pnpm install
```

## Usage

Run the generator:

```bash
pnpm generate
```

Or directly:

```bash
npx plop
```

## Available Generators

### 1. `resource` - Full Resource Generator (Recommended)

Generates a complete resource with:
- Mongoose model (`src/database/models/`)
- TypeScript datatype (`src/database/datatypes/`)
- API routes (list and detail) (`src/app/api/`)
- Optional: Page component (`src/app/`)

**Example:**
```bash
pnpm generate
# Select: resource
# Resource name: product
# Generate page component? Yes
```

This creates:
- `src/database/models/Product.ts`
- `src/database/datatypes/Product.ts`
- `src/app/api/products/route.ts`
- `src/app/api/products/[id]/route.ts`
- `src/app/products/page.tsx`

### 2. `api` - API Routes Only

Generates REST API route handlers (GET, POST, PUT, DELETE).

**Example:**
```bash
pnpm generate
# Select: api
# Resource name: order
# Generate detail route? Yes
```

### 3. `model` - Mongoose Model Only

Generates a Mongoose model with TypeScript interfaces.

**Example:**
```bash
pnpm generate
# Select: model
# Model name: user
```

### 4. `datatype` - TypeScript Datatype Only

Generates a TypeScript datatype definition.

**Example:**
```bash
pnpm generate
# Select: datatype
# Datatype name: category
```

### 5. `page` - Page Component Only

Generates a Next.js page component with CRUD operations.

**Example:**
```bash
pnpm generate
# Select: page
# Page name: users (plural)
# Model name: user (singular)
```

## Customization

After generation, you'll need to:

1. **Update the model schema** - Add your fields to the Mongoose schema in `src/database/models/`
2. **Update the datatype** - Add corresponding TypeScript types in `src/database/datatypes/`
3. **Customize API routes** - Add filtering, validation, or business logic
4. **Create components** - Build form and list components for the page
5. **Update the page** - Replace TODO comments with your actual components

## Template Files

Templates are located in `plop-templates/`:
- `api-route-list.hbs` - List API route (GET all, POST)
- `api-route-detail.hbs` - Detail API route (GET, PUT, DELETE by ID)
- `model.hbs` - Mongoose model template
- `datatype.hbs` - TypeScript datatype template
- `page.hbs` - Next.js page component template

