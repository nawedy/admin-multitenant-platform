import { Field } from 'payload/types';

export const publishedField = (): Field => ({
  name: 'published',
  type: 'checkbox',
  defaultValue: false,
  admin: {
    position: 'sidebar',
    description: 'Set to published when ready to go live',
  },
});