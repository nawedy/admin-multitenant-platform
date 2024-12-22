'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { MoreVertical, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getSiteMembers, updateMemberRole, removeMember } from '@/lib/supabase/members';

export function SiteMembersList({ siteId }: { siteId: string }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMembers();
  }, [siteId]);

  const loadMembers = async () => {
    try {
      const data = await getSiteMembers(siteId);
      setMembers(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load members',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await updateMemberRole(siteId, userId, role);
      toast({ title: 'Role updated' });
      loadMembers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update role',
        variant: 'destructive',
      });
    }
  };

  const handleRemove = async (userId: string) => {
    try {
      await removeMember(siteId, userId);
      toast({ title: 'Member removed' });
      loadMembers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove member',
        variant: 'destructive',
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {members.map(({ users: user, role }) => (
            <div key={user.id} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>{user.name?.[0] ?? user.email[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name || user.email}</p>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'admin')}>
                    Make Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'member')}>
                    Make Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleRemove(user.id)}
                  >
                    <UserX className="mr-2 h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}