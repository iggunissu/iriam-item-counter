import React, { useState } from 'react';
import type { Item, ItemCountState } from './types';

// サンプルデータ
const SAMPLE_ITEMS: Item[] = [
    { id: '1', name: 'いいね', point: 1, category: '1〜99pt', imageUrl: 'https://placehold.co/80?text=Heart' },
    { id: '2', name: '拍手', point: 10, category: '1〜99pt', imageUrl: 'https://placehold.co/80?text=Clap' },
    { id: '3', name: '花束', point: 500, category: '100〜999pt', imageUrl: 'https://placehold.co/80?text=Flower' },
    { id: '4', name: '城', point: 1000, category: '1000pt〜', imageUrl: 'https://placehold.co/80?text=Castle' },
    { id: '5', name: '竜', point: 5000, category: '1000pt〜', imageUrl: 'https://placehold.co/80?text=Dragon' },
];

// リスナー名を記録する閾値ポイント
const HIGH_VALUE_THRESHOLD = 500;

export const App: React.FC = () => {
    // タブ管理
    const categories = Array.from(new Set(SAMPLE_ITEMS.map((item) => item.category)));
    const [activeTab, setActiveTab] = useState<string>(categories[0] || '');

    // 各アイテムのカウント・リスナー状態 { [itemId]: { count: 5, senders: { "Aさん": 2 } } }
    const [itemStats, setItemStats] = useState<Record<string, ItemCountState>>({});

    // モーダル管理（高額アイテムクリック時）
    const [selectedItemForModal, setSelectedItemForModal] = useState<Item | null>(null);
    const [inputSenderName, setInputSenderName] = useState('');

    // カウントアップ処理
    const handleItemClick = (item: Item) => {
        if (item.point >= HIGH_VALUE_THRESHOLD) {
            // 閾値以上の場合は名前入力モーダルを開く
            setSelectedItemForModal(item);
        } else {
            // 通常アイテムはそのまま+1
            incrementCount(item.id);
        }
    };

    const incrementCount = (itemId: string, senderName?: string) => {
        setItemStats((prev) => {
            const current = prev[itemId] || { count: 0, senders: {} };
            const newSenders = { ...current.senders };

            if (senderName && senderName.trim() !== '') {
                const trimmed = senderName.trim();
                newSenders[trimmed] = (newSenders[trimmed] || 0) + 1;
            }

            return {
                ...prev,
                [itemId]: {
                    count: current.count + 1,
                    senders: newSenders,
                },
            };
        });
    };

    // モーダル送信処理
    const handleModalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItemForModal) {
            incrementCount(selectedItemForModal.id, inputSenderName);
            setSelectedItemForModal(null);
            setInputSenderName('');
        }
    };

    // 合計ポイント計算
    const totalPoints = SAMPLE_ITEMS.reduce((sum, item) => {
        const count = itemStats[item.id]?.count || 0;
        return sum + item.point * count;
    }, 0);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
            <h1>配信アイテム集計</h1>

            {/* 合計表示 */}
            <div style={{ background: '#f0f4f8', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
                <h2>合計: {totalPoints.toLocaleString()} pt</h2>
            </div>

            {/* タブ切り替え */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: activeTab === cat ? '#007bff' : '#e0e0e0',
                            color: activeTab === cat ? '#fff' : '#333',
                            fontWeight: 'bold',
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* アイテムグリッド一覧 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                {SAMPLE_ITEMS.filter((item) => item.category === activeTab).map((item) => {
                    const currentCount = itemStats[item.id]?.count || 0;
                    const isHighValue = item.point >= HIGH_VALUE_THRESHOLD;

                    return (
                        <div
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            style={{
                                border: isHighValue ? '2px solid #ff9800' : '1px solid #ccc',
                                borderRadius: '12px',
                                padding: '12px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                userSelect: 'none',
                                position: 'relative',
                                background: '#fff',
                            }}
                        >
                            <img src={item.imageUrl} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                            <div style={{ fontWeight: 'bold', marginTop: '8px' }}>{item.name}</div>
                            <div style={{ color: '#666', fontSize: '0.85rem' }}>{item.point} pt</div>
                            <div
                                style={{
                                    marginTop: '8px',
                                    background: '#28a745',
                                    color: '#fff',
                                    borderRadius: '12px',
                                    padding: '2px 8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {currentCount} 個
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 高額アイテム・リスナー別集計一覧 */}
            <div style={{ marginTop: '32px' }}>
                <h3>投げた人の集計（{HIGH_VALUE_THRESHOLD}pt 以上のアイテム）</h3>
                {Object.entries(itemStats).map(([itemId, stat]) => {
                    const item = SAMPLE_ITEMS.find((i) => i.id === itemId);
                    if (!item || item.point < HIGH_VALUE_THRESHOLD || Object.keys(stat.senders).length === 0) return null;

                    return (
                        <div key={itemId} style={{ marginBottom: '12px', padding: '12px', border: '1px solid #eee', borderRadius: '8px' }}>
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

            {/* リナー名入力用モーダル */}
            {selectedItemForModal && (
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
                    }}
                >
                    <form
                        onSubmit={handleModalSubmit}
                        style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '300px' }}
                    >
                        <h3>{selectedItemForModal.name} (+1)</h3>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>投げたリスナーの名前を入力してください（空欄も可）</p>
                        <input
                            type="text"
                            value={inputSenderName}
                            onChange={(e) => setInputSenderName(e.target.value)}
                            placeholder="リスナー名"
                            autoFocus
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '16px' }}
                        />
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setSelectedItemForModal(null)}>
                                キャンセル
                            </button>
                            <button type="submit" style={{ background: '#007bff', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>
                                カウント追加
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default App;