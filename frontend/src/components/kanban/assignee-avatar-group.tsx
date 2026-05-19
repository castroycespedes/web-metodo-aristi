import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function AssigneeAvatarGroup({ assignees }: { assignees: string[] }) {
  return (
    <div className="flex -space-x-2">
      {assignees.map((assignee) => (
        <Avatar key={assignee} className="h-7 w-7 border-2 border-card">
          <AvatarFallback>{assignee}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
