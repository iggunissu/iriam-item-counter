import { type Item, ItemAttribute } from '../types';

// src/assets/items/ 内の全画像を自動一括読み込み
const images = import.meta.glob<{ default: string }>(
    '../assets/items/*.{png,jpg,jpeg,webp}',
    { eager: true }
);

// ファイル名からViteが処理した画像URLを取得するヘルパー関数
export const getImageUrl = (filename: string): string => {
    const path = `../assets/items/${filename}`;
    return images[path]?.default || '';
};

// アイテム一覧（型安全：間違った属性やポイントを書くと赤波線でエラーになります）
export const ITEMS: Item[] = [
    {
        id: '1',
        name: 'いいね',
        point: 1,           // ItemPoint 以外の数値を入れるとエラー
        attributes: [ItemAttribute.AISATSU],   // ItemAttribute 以外の文字を入れるとエラー
        imageFileName: 'heart.png',
    },
    {
        id: '2',
        name: '拍手',
        point: 10,
        attributes: [ItemAttribute.NETA],
        imageFileName: 'clap_01.png',
    },
    {
        id: '3',
        name: 'スペシャル城',
        point: 1000,
        attributes: [ItemAttribute.STAGE],
        imageFileName: 'castle_special.png',
    },
    // ... 426個のデータを定義
];