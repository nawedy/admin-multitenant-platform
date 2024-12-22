import { buildConfig } from 'payload/config';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { slateEditor } from '@payloadcms/richtext-slate';
import { Pages } from './cms/collections/Pages';
import { Posts } from './cms/collections/Posts';
import { Media } from './cms/collections/Media';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Pages, Posts, Media],
  editor: slateEditor({}),
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: 'local',
          prefix: 'media',
        },
      },
    }),
  ],
  typescript: {
    outputFile: 'cms/payload-types.ts',
  },
});