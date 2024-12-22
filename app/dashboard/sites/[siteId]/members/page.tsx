import { SiteMembersList } from '@/components/dashboard/sites/members/site-members-list';
import { InviteMemberButton } from '@/components/dashboard/sites/members/invite-member-button';

export default function SiteMembersPage({ params }: { params: { siteId: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Team Members</h2>
        <InviteMemberButton siteId={params.siteId} />
      </div>
      <SiteMembersList siteId={params.siteId} />
    </div>
  );
}