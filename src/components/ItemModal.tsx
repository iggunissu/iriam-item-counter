import React from 'react';
import type { Item } from '../types';

interface ItemModalProps {
    item: Item | null;
    quantity: number;
    senderName: string;
    onQuantityChange: (q: number) => void;
    onSenderNameChange: (name: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({
    item,
    quantity,
    senderName,
    onQuantityChange,
    onSenderNameChange,
    onSubmit,
    onClose,
}) => {
    if (!item) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
        >
            <form
                onSubmit={onSubmit}
                style={{
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '12px',
                    width: '320px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
            >
                <h3 style={{ marginTop: 0, marginBottom: '16px' }}>{item.name} の追加</h3>

                <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>
                        個数
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => onQuantityChange(Math.max(1, Number(e.target.value)))}
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '4px' }}>
                        リスナー名 <span style={{ fontWeight: 'normal', color: '#666' }}>（任意）</span>
                    </label>
                    <input
                        type="text"
                        value={senderName}
                        onChange={(e) => onSenderNameChange(e.target.value)}
                        placeholder="リスナー名"
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '0.95rem',
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            background: '#f8f9fa',
                            cursor: 'pointer',
                        }}
                    >
                        キャンセル
                    </button>
                    <button
                        type="submit"
                        style={{
                            background: '#007bff',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        追加
                    </button>
                </div>
            </form>
        </div>
    );
};