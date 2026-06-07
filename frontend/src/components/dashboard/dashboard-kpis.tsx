import { ArrowUpRight, CheckCircle2, Clock3, FolderKanban } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const kpis = [
  { label: 'Active projects', value: '12', delta: '+8%', icon: FolderKanban },
  { label: 'Done this week', value: '48', delta: '+18%', icon: CheckCircle2 },
  { label: 'Pending tasks', value: '126', delta: '-6%', icon: Clock3 },
  { label: 'Velocity', value: '31 pts', delta: '+12%', icon: ArrowUpRight },
];

export function DashboardKpis() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{kpi.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">{kpi.delta} from last sprint</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
