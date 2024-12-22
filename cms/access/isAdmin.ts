import { Access } from 'payload/config';
import { User } from 'payload/generated-types';

export const isAdmin: Access = async ({ req }) => {
  const user = req.user as User;
  
  if (!user) return false;

  const { data: roles } = await req.payload.find({
    collection: 'site_users',
    where: {
      user_id: { equals: user.id },
      role: { equals: 'admin' },
    },
  });

  return roles.length > 0;
};