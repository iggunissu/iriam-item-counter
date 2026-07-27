import React from 'react';
import { type Item, type ItemCountState } from '../types';

interface SenderStatsListProps {
    itemStats: Record<string, ItemCountState>;
    items: Item[];
    highValueThreshold: number;
}

export const SenderStatsList: React.FC<SenderStatsListProps> = ({
    itemStats,
    items,
    highValueThreshold,
}) => {
    const hasRecords = Object.values(itemStats).some((s) => Object.keys(s.senders).length > 0);

    if (!hasRecords) return null;

    return (
        <div
            style={{
                marginTop: '32px',
                background: '#fff',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #eee',
            }}
        >
            <h3>高額アイテムのリスナー別集計（{highValueThreshold}pt 以上）</h3>
            {Object.entries(itemStats).map(([itemId, stat]) => {
                const item = items.find((i) => i.id === itemId);
                if (!item || item.point < highValueThreshold || Object.keys(stat.senders).length === 0) {
                    return null;
                }

                return (
                    <div key={itemId} style={{ marginBottom: '12px' }}>
                        <strong>{item.name}</strong> ({item.point} pt)
                        <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                            {Object.entries(stat.senders).map(([name, count]) => (
                                <li key={name}>
                                    {name}: {count} 個 ({count * item.point} pt)
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};