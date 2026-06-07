import { Activity, CalendarDays } from 'lucide-react';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { DashboardKpis } from '@/components/dashboard/dashboard-kpis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkeletonLoader } from '@/components/feedback/skeleton-loader';

export default function DashboardPage() {
  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Portfolio health, workload and recent delivery activity.</p>
        </div>
        <DashboardKpis />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Delivery trend</CardTitle>
              <CardDescription>Placeholder chart until analytics endpoints are available.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-72 items-end gap-3">
                {[38, 52, 45, 64, 58, 72, 80, 76].map((height, index) => (
                  <div key={index} className="flex flex-1 items-end rounded-md bg-muted">
                    <div className="w-full rounded-md bg-primary/80" style={{ height: `${height}%` }} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>Recent workspace events.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['RBAC review completed', 'Sprint board updated', 'New user invited', 'Task priority changed'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item}</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Pending tasks</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {['Implement mobile drawer', 'Audit permission labels', 'Validate token refresh'].map((task) => (
                <div key={task} className="flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm font-medium">{task}</span>
                  <Badge variant="secondary">Open</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Upcoming</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 rounded-md border p-3">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Sprint planning · May 14</span>
              </div>
              <SkeletonLoader className="h-12" />
              <SkeletonLoader className="h-12" />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
