import Link from 'next/link';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">Project workspace</h1>
            <p className="text-sm text-muted-foreground">Project ID: {projectId}</p>
          </div>
          <Button asChild><Link href={`/projects/${projectId}/boards/main`}>Open board</Link></Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {['Roadmap', 'Board', 'Members'].map((item) => (
            <Card key={item}>
              <CardHeader><CardTitle>{item}</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Operational placeholder ready for backend Project endpoints.</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
