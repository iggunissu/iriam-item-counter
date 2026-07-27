// アイテムの型
export interface Item {
    id: string;
    name: string;
    imageUrl: string;
    point: number;
    category: string; // タブ切り替え用のカテゴリ（例: "1~100pt", "1000pt~" や "ギフト", "スタンプ" など）
}

// 投げた人の記録
export interface SenderLog {
    senderName: string;
    count: number;
}

// アイテムごとの集計状態
export interface ItemCountState {
    count: number;
    senders: Record<string, number>; // { "リスナーA": 3, "リスナーB": 1 }
}