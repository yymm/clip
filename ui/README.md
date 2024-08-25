# Welcome to Remix + Cloudflare!

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)

## Development

Run the dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

> [!WARNING]  
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

# ui architecture

## router

`_app` はアプリケーションの階層を指しています。 現状 `_app` 以外の階層はないので特に意味はないです。

```
.
├── README.md
├── _app                           # レイアウト、共通コンポーネント、共通フック、コモンのようなもの
│   ├── components                 # 共通コンポーネント
│   ├── hooks                      # 共通フック
│   └── route.tsx                  # レイアウト
├── _app.$userId                   # ユーザーごとのトップページ
│   ├── components
│   ├── hooks
│   └── route.tsx
├── _app.$userId.item.$itemId      # ユーザーごとのアイテムページ
│   ├── components
│   ├── hooks
│   └── route.tsx
├── _app.$userId.item.$itemId.edit # ユーザーごとのアイテム編集ページ
│   ├── components
│   ├── hooks
│   └── route.tsx
└── _app._index                    # 共通のトップページ、ログインさせる？
    ├── components
    ├── hooks
    └── route.tsx
```
