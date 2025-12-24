export default function (plop) {
  // Helper to convert kebab-case to PascalCase
  plop.setHelper('pascalCase', (text) => {
    return text
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  });

  // Helper to convert kebab-case to camelCase
  plop.setHelper('camelCase', (text) => {
    const pascal = plop.getHelper('pascalCase')(text);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  });

  // Helper to convert kebab-case to lowercase
  plop.setHelper('lowercase', (text) => {
    return text.toLowerCase();
  });

  // Generator: Full Resource (Model + Datatype + API Routes + Page)
  plop.setGenerator('resource', {
    description: 'Generate a complete resource (model, datatype, API routes, and page)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Resource name (singular, e.g., user, product, order):',
        validate: (value) => {
          if (!value || value.length === 0) {
            return 'Resource name is required';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'generatePage',
        message: 'Generate page component?',
        default: true,
      },
    ],
    actions: (data) => {
      // Set modelName for page template (singular, same as name)
      data.modelName = data.name;

      const actions = [
        {
          type: 'add',
          path: 'dev-tools/src/database/models/{{pascalCase name}}.ts',
          templateFile: 'plop-templates/model.hbs',
        },
        {
          type: 'add',
          path: 'dev-tools/src/database/datatypes/{{pascalCase name}}.ts',
          templateFile: 'plop-templates/datatype.hbs',
        },
        {
          type: 'add',
          path: 'dev-tools/src/app/api/{{lowercase name}}s/route.ts',
          templateFile: 'plop-templates/api-route-list.hbs',
        },
        {
          type: 'add',
          path: 'dev-tools/src/app/api/{{lowercase name}}s/[id]/route.ts',
          templateFile: 'plop-templates/api-route-detail.hbs',
        },
      ];

      if (data.generatePage) {
        actions.push({
          type: 'add',
          path: 'dev-tools/src/app/{{lowercase name}}s/page.tsx',
          templateFile: 'plop-templates/page.hbs',
        });
      }

      return actions;
    },
  });

  // Generator: API Route (List)
  plop.setGenerator('api', {
    description: 'Generate API route handlers',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Resource name (singular, e.g., user, product):',
        validate: (value) => {
          if (!value || value.length === 0) {
            return 'Resource name is required';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'generateDetail',
        message: 'Generate detail route ([id])?',
        default: true,
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: 'dev-tools/src/app/api/{{lowercase name}}s/route.ts',
          templateFile: 'plop-templates/api-route-list.hbs',
        },
      ];

      if (data.generateDetail) {
        actions.push({
          type: 'add',
          path: 'dev-tools/src/app/api/{{lowercase name}}s/[id]/route.ts',
          templateFile: 'plop-templates/api-route-detail.hbs',
        });
      }

      return actions;
    },
  });

  // Generator: Mongoose Model
  plop.setGenerator('model', {
    description: 'Generate a Mongoose model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Model name (singular, e.g., user, product):',
        validate: (value) => {
          if (!value || value.length === 0) {
            return 'Model name is required';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'dev-tools/src/database/models/{{pascalCase name}}.ts',
        templateFile: 'plop-templates/model.hbs',
      },
    ],
  });

  // Generator: Datatype
  plop.setGenerator('datatype', {
    description: 'Generate a TypeScript datatype',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Datatype name (singular, e.g., user, product):',
        validate: (value) => {
          if (!value || value.length === 0) {
            return 'Datatype name is required';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'dev-tools/src/database/datatypes/{{pascalCase name}}.ts',
        templateFile: 'plop-templates/datatype.hbs',
      },
    ],
  });

  // Generator: Page
  plop.setGenerator('page', {
    description: 'Generate a Next.js page component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name (plural, e.g., users, products):',
        validate: (value) => {
          if (!value || value.length === 0) {
            return 'Page name is required';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'Model name (singular, e.g., user, product):',
        validate: (value) => {
          if (!value || value.length === 0) {
            return 'Model name is required';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'dev-tools/src/app/{{lowercase name}}/page.tsx',
        templateFile: 'plop-templates/page.hbs',
      },
    ],
  });

  // Generator: Mock Data
  plop.setGenerator('mock-data', {
    description: 'Generate mock data functions using Faker.js',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Model name (singular, e.g., user, product):',
        validate: (value) => {
          if (!value || value.length === 0) {
            return 'Model name is required';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'dev-tools/src/utils/mockData/{{pascalCase name}}.ts',
        templateFile: 'plop-templates/mock-data.hbs',
      },
    ],
  });
}

