// 1. オブジェクトとして定義（補完用キー: 表示用文字列）
export const ItemAttribute = {
    OMOCHA: 'おもちゃ',
    NETA: 'ネタ',
    WARA: '笑',
    TEIBAN: '定番',
    ERAI: 'えらい',
    AISATSU: '挨拶',
    STAGE: 'ステージ',
    LOVE: 'LOVE'
} as const;

// 2. 型の抽出 ('定番' | 'プチ' | '演出' | '背景' | 'イベント')
export type ItemAttribute = (typeof ItemAttribute)[keyof typeof ItemAttribute];

// 3. UIのタブ等で一括でループしたい時用の配列
export const ITEM_ATTRIBUTES = Object.values(ItemAttribute);

// 2. ポイント（固定値）の定義
export const ITEM_POINTS = [
    1, 5, 10, 44, 99, 100, 200, 300, 398, 500, 700, 800, 1000, 2000, 3000, 5000, 7000, 10000, 30000
] as const;

// ポイントの型（1 | 5 | 10 | 44 | 99 | 100 | 200 | 300 | 398 | 500 | 700 | 800 | 1000 | 2000 | 3000 | 5000 | 7000 | 10000 | 30000）
export type ItemPoint = (typeof ITEM_POINTS)[number];

// 3. アイテムの型
export interface Item {
    id: string;
    name: string;
    point: ItemPoint;         // 💡 型セーフ（定義した数値以外はエラー）
    attributes: ItemAttribute[];
    imageFileName: string;    // 画像ファイル名（例: 'heart.png'）
}

// 4. 表示フィルタのモード
export type FilterMode = 'attribute' | 'point';

// 5. 集計用の型
export interface ItemCountState {
    count: number;
    senders: Record<string, number>;
}