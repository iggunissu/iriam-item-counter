import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/iriam-item-counter/', // GitHubのリポジトリ名に変更してください
});