import React from 'react';
import type { Item } from '../types';
import { getImageUrl } from '../data/items';

interface ItemCardProps {
    item: Item;
    count: number;
    isHighValue: boolean;
    onClick: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, count, isHighValue, onClick }) => {
    return (
        <div
            onClick={() => onClick(item)}
            style={{
                border: isHighValue ? '2px solid #ff9800' : '1px solid #ccc',
                borderRadius: '12px',
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                background: '#fff',
            }}
        >
            <img
                src={getImageUrl(item.imageFileName)}
                alt={item.name}
                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
            />
            <div style={{ fontWeight: 'bold', marginTop: '4px', fontSize: '0.85rem' }}>{item.name}</div>
            <div style={{ color: '#666', fontSize: '0.8rem' }}>{item.point} pt</div>

            <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4px' }}>
                {item.attributes.map((attr) => (
                    <span
                        key={attr}
                        style={{
                            background: '#f0f0f0',
                            color: '#555',
                            fontSize: '0.65rem',
                            padding: '1px 4px',
                            borderRadius: '3px',
                        }}
                    >
                        {attr}
                    </span>
                ))}
            </div>

            <div
                style={{
                    marginTop: '6px',
                    background: count > 0 ? '#28a745' : '#6c757d',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                }}
            >
                {count} 個
            </div>
        </div>
    );
};