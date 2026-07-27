import React from 'react';
import { ItemAttribute, type ItemPoint, ITEM_ATTRIBUTES, ITEM_POINTS } from '../types';

interface FilterSectionProps {
    selectedAttribute: ItemAttribute | 'ALL';
    selectedPoint: ItemPoint | 'ALL';
    onAttributeChange: (attr: ItemAttribute | 'ALL') => void;
    onPointChange: (pt: ItemPoint | 'ALL') => void;
    onResetFilters: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
    selectedAttribute,
    selectedPoint,
    onAttributeChange,
    onPointChange,
    onResetFilters,
}) => {
    const isFiltered = selectedAttribute !== 'ALL' || selectedPoint !== 'ALL';

    return (
        <div
            style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '20px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>アイテムの絞り込み</span>
                {isFiltered && (
                    <button
                        onClick={onResetFilters}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#007bff',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            textDecoration: 'underline',
                        }}
                    >
                        絞り込み解除（全表示）
                    </button>
                )}
            </div>

            {/* 属性フィルター */}
            <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '6px' }}>属性:</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => onAttributeChange('ALL')}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: selectedAttribute === 'ALL' ? '#333' : '#e0e0e0',
                            color: selectedAttribute === 'ALL' ? '#fff' : '#333',
                            fontSize: '0.85rem',
                        }}
                    >
                        すべて
                    </button>
                    {ITEM_ATTRIBUTES.map((attr) => (
                        <button
                            key={attr}
                            onClick={() => onAttributeChange(attr)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '16px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: selectedAttribute === attr ? '#007bff' : '#e0e0e0',
                                color: selectedAttribute === attr ? '#fff' : '#333',
                                fontSize: '0.85rem',
                            }}
                        >
                            {attr}
                        </button>
                    ))}
                </div>
            </div>

            {/* ポイントフィルター */}
            <div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '6px' }}>ポイント:</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => onPointChange('ALL')}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: selectedPoint === 'ALL' ? '#333' : '#e0e0e0',
                            color: selectedPoint === 'ALL' ? '#fff' : '#333',
                            fontSize: '0.85rem',
                        }}
                    >
                        すべて
                    </button>
                    {ITEM_POINTS.map((pt) => (
                        <button
                            key={pt}
                            onClick={() => onPointChange(pt)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '16px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: selectedPoint === pt ? '#28a745' : '#e0e0e0',
                                color: selectedPoint === pt ? '#fff' : '#333',
                                fontSize: '0.85rem',
                            }}
                        >
                            {pt} pt
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};