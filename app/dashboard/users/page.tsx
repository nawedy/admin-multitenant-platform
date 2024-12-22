import { UsersList } from '@/components/dashboard/users/users-list';

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      <UsersList />
    </div>
  );
}