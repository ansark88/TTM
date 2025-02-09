# TTM

- supabase
- react router v7
- drizzle orm

## supabaseの操作

```bash
subabase init
subabase start
```

## DB migration

```bash
# schema.tsを更新したら以下を実行しマイグレーションファイルを作成
pnpm run db:generate

# マイグレーションを削除
pnpm run db:drop

# マイグレーションを適用
supabase migration up

# マイグレーションをリセット
supabase db reset

# マイグレーションをデプロイ
supabase login
supabase link
supabase db push
```


