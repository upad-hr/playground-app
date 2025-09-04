import MySelectable from '@/components/MySelectable';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Just for sample (duplicate from MySelectable.tsx)
interface Item {
    id: number;
    name: string;
}

export default function Dashboard() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="absolute inset-0 size-full stroke-neutral-900/20 p-4 dark:stroke-neutral-100/20">
                            Create new Component with a single drop down. Items should be fetched from the server via following API:{' '}
                            <code>GET /api/items</code> You can use simple fetch request to get the data. <br />
                            Use shacdn{' '}
                            <a className="text-blue-500" href="https://ui.shadcn.com/docs/components/select" target="_blank" rel="noreferrer">
                                Select component.
                            </a>
                            <br />
                            Place component in the container right to this. Selecting an item from drop down should display result in the bottom
                            container.
                            <br />
                            Center results vertically and horizontally.
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20">
                            <MySelectable onSelectChange={setSelectedItem} />
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20">
                        {selectedItem ? (
                            <div className="flex h-full w-full items-center justify-center">
                                <h2 className="rounded-xl bg-blue-700 p-10 text-lg">{selectedItem.name}</h2>
                            </div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <p className="text-lg">No item selected</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
