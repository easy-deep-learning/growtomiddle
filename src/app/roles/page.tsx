import { getAll } from '@/controllers/RoleController';

export default async function RolesPage() {
  const roles = await getAll({ limit: 0 });

  console.log('>>> roles', roles);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Roles</h1>
      <ul>
        {roles.map((role) => (
          <li key={role._id.toString()}>{role.name}</li>
        ))}
      </ul>
    </div>
  );
}
