import React, { useState, useMemo } from 'react';
import { ITEMS } from './data/items';
import { type Item, ItemAttribute, type ItemPoint, type ItemCountState } from './types';
import { SummarySection } from './components/SummarySection';
import { FilterSection } from './components/FilterSection';
import { ItemCard } from './components/ItemCard';
import { SenderStatsList } from './components/SenderStatsList';
import { ItemModal } from './components/ItemModal';

export const App: React.FC = () => {
    // 設定 ＆ フィルタState
    const [highValueThreshold, setHighValueThreshold] = useState<number>(500);
    const [selectedAttribute, setSelectedAttribute] = useState<ItemAttribute | 'ALL'>('ALL');
    const [selectedPoint, setSelectedPoint] = useState<ItemPoint | 'ALL'>('ALL');
    const [progressAttribute, setProgressAttribute] = useState<ItemAttribute | 'ALL'>('ALL');

    // 集計カウントState
    const [itemStats, setItemStats] = useState<Record<string, ItemCountState>>({});

    // モーダル用State
    const [selectedItemForModal, setSelectedItemForModal] = useState<Item | null>(null);
    const [inputSenderName, setInputSenderName] = useState('');
    const [inputQuantity, setInputQuantity] = useState<number>(1);

    // 属性フィルター選択ハンドラー
    const handleAttributeFilterChange = (attr: ItemAttribute | 'ALL') => {
        setSelectedAttribute(attr);
        setProgressAttribute(attr);
    };

    // フィルターリセット
    const handleResetFilters = () => {
        setSelectedAttribute('ALL');
        setSelectedPoint('ALL');
        setProgressAttribute('ALL');
    };

    // 集計リセット
    const handleResetCounts = () => {
        if (window.confirm('集計されたカウントをすべてリセットしますか？')) {
            setItemStats({});
        }
    };

    // カウント加算処理
    const incrementCount = (itemId: string, quantity: number, senderName?: string) => {
        const addAmount = Math.max(1, quantity);

        setItemStats((prev) => {
            const current = prev[itemId] || { count: 0, senders: {} };
            const newSenders = { ...current.senders };

            if (senderName && senderName.trim() !== '') {
                const trimmed = senderName.trim();
                newSenders[trimmed] = (newSenders[trimmed] || 0) + addAmount;
            }

            return {
                ...prev,
                [itemId]: {
                    count: current.count + addAmount,
                    senders: newSenders,
                },
            };
        });
    };

    // アイテムクリック時
    const handleItemClick = (item: Item) => {
        if (item.point >= highValueThreshold) {
            setSelectedItemForModal(item);
            setInputQuantity(1);
            setInputSenderName('');
        } else {
            incrementCount(item.id, 1);
        }
    };

    // モーダル送信時
    const handleModalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItemForModal) {
            incrementCount(selectedItemForModal.id, inputQuantity, inputSenderName);
            setSelectedItemForModal(null);
            setInputSenderName('');
            setInputQuantity(1);
        }
    };

    // フィルタリングされたアイテム一覧
    const filteredItems = useMemo(() => {
        return ITEMS.filter((item) => {
            const matchAttribute =
                selectedAttribute === 'ALL' || item.attributes.includes(selectedAttribute);
            const matchPoint =
                selectedPoint === 'ALL' || item.point === selectedPoint;

            return matchAttribute && matchPoint;
        });
    }, [selectedAttribute, selectedPoint]);

    // 達成率計算用アイテムリスト
    const progressTargetItems = useMemo(() => {
        if (progressAttribute === 'ALL') return ITEMS;
        return ITEMS.filter((item) => item.attributes.includes(progressAttribute));
    }, [progressAttribute]);

    // 達成率計算
    const collectedItemTypesCount = useMemo(() => {
        return progressTargetItems.filter((item) => (itemStats[item.id]?.count || 0) > 0).length;
    }, [progressTargetItems, itemStats]);

    const progressPercentage = useMemo(() => {
        if (progressTargetItems.length === 0) return 0;
        return Math.round((collectedItemTypesCount / progressTargetItems.length) * 100);
    }, [collectedItemTypesCount, progressTargetItems]);

    // 合計ポイント計算
    const totalPoints = useMemo(() => {
        return ITEMS.reduce((sum, item) => {
            const count = itemStats[item.id]?.count || 0;
            return sum + item.point * count;
        }, 0);
    }, [itemStats]);

    return (
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
            <h1>配信アイテム集計</h1>

            {/* サマリー・進捗・設定エリア */}
            <SummarySection
                totalPoints={totalPoints}
                collectedCount={collectedItemTypesCount}
                targetItemsCount={progressTargetItems.length}
                progressPercentage={progressPercentage}
                progressAttribute={progressAttribute}
                highValueThreshold={highValueThreshold}
                onProgressAttributeChange={setProgressAttribute}
                onThresholdChange={setHighValueThreshold}
                onResetCounts={handleResetCounts}
            />

            {/* 絞り込みフィルター */}
            <FilterSection
                selectedAttribute={selectedAttribute}
                selectedPoint={selectedPoint}
                onAttributeChange={handleAttributeFilterChange}
                onPointChange={setSelectedPoint}
                onResetFilters={handleResetFilters}
            />

            {/* 表示件数 */}
            <div style={{ marginBottom: '12px', fontSize: '0.9rem', color: '#666' }}>
                表示中アイテム: <strong>{filteredItems.length}</strong> 件
            </div>

            {/* アイテムカードグリッド */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                {filteredItems.map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        count={itemStats[item.id]?.count || 0}
                        isHighValue={item.point >= highValueThreshold}
                        onClick={handleItemClick}
                    />
                ))}
            </div>

            {/* リスナー別集計リスト */}
            <SenderStatsList
                itemStats={itemStats}
                items={ITEMS}
                highValueThreshold={highValueThreshold}
            />

            {/* 個数・リスナー名入力モーダル */}
            <ItemModal
                item={selectedItemForModal}
                quantity={inputQuantity}
                senderName={inputSenderName}
                onQuantityChange={setInputQuantity}
                onSenderNameChange={setInputSenderName}
                onSubmit={handleModalSubmit}
                onClose={() => setSelectedItemForModal(null)}
            />
        </div>
    );
};

export default App;