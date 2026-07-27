import React from 'react';
import { ItemAttribute, ITEM_ATTRIBUTES } from '../types';

interface SummarySectionProps {
    totalPoints: number;
    collectedCount: number;
    targetItemsCount: number;
    progressPercentage: number;
    progressAttribute: ItemAttribute | 'ALL';
    highValueThreshold: number;
    onProgressAttributeChange: (attr: ItemAttribute | 'ALL') => void;
    onThresholdChange: (threshold: number) => void;
    onResetCounts: () => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
    totalPoints,
    collectedCount,
    targetItemsCount,
    progressPercentage,
    progressAttribute,
    highValueThreshold,
    onProgressAttributeChange,
    onThresholdChange,
    onResetCounts,
}) => {
    return (
        <div
            style={{
                background: '#f0f4f8',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}
            >
                <div>
                    {/* 合計ポイント表示 */}
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c' }}>
                        合計: {totalPoints.toLocaleString()} <span style={{ fontSize: '1rem' }}>pt</span>
                    </div>

                    {/* 達成率表示 ＆ カテゴリ選択ドロップダウン */}
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: 'bold' }}>
                            埋まり状況:
                        </span>

                        <select
                            value={progressAttribute}
                            onChange={(e) => onProgressAttributeChange(e.target.value as ItemAttribute | 'ALL')}
                            style={{
                                padding: '4px 8px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e0',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                background: '#fff',
                                color: '#007bff',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="ALL">全アイテム（全体）</option>
                            {ITEM_ATTRIBUTES.map((attr) => (
                                <option key={attr} value={attr}>
                                    【{attr}】のみ
                                </option>
                            ))}
                        </select>

                        <span style={{ fontSize: '1rem', color: '#1a202c', fontWeight: 'bold' }}>
                            {collectedCount} / {targetItemsCount} 種類
                        </span>
                        <span
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                color: progressPercentage === 100 ? '#28a745' : '#718096',
                            }}
                        >
                            （進捗率: {progressPercentage}%）
                        </span>
                    </div>
                </div>

                <button
                    onClick={onResetCounts}
                    style={{
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                    }}
                >
                    集計カウントをリセット
                </button>
            </div>

            {/* 基準ポイント設定 */}
            <div
                style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid #d0d7de',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                }}
            >
                <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                    リスナー名を記録する基準ポイント:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                        type="number"
                        min="0"
                        step="100"
                        value={highValueThreshold}
                        onChange={(e) => onThresholdChange(Math.max(0, Number(e.target.value)))}
                        style={{
                            width: '100px',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            textAlign: 'right',
                        }}
                    />
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>pt 以上</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    （※設定値以上のアイテムをクリックすると入力モーダルが開きます）
                </span>
            </div>
        </div>
    );
};