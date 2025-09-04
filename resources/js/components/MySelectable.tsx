import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Item {
    id: number;
    name: string;
}

export default function MySelectable({ onSelectChange }: { onSelectChange?: (item: Item | null) => void }) {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    useEffect(() => {
        fetch('/api/items')
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, []);

    useEffect(() => {
        onSelectChange?.(selectedItem);
    }, [selectedItem, onSelectChange]);

    const handleValueChange = (value: string) => {
        const item = items.find((i) => i.name === value) || null;
        setSelectedItem(item);
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Select value={selectedItem?.name ?? ''} onValueChange={handleValueChange}>
                <SelectTrigger className="w-[280px] cursor-pointer text-lg">
                    <SelectValue placeholder="Select an item" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {items.map((item) => (
                            <SelectItem key={item.id} value={item.name} className="text-lg">
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
