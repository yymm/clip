# Learn Remix

Let's play tutorial! > https://remix.run/docs/en/main/start/tutorial

# 何を学ぶことができたか？

- root.tsxがベースであること
- linksによるcssとのリンク
- routesについて
  - ファイル名がパスになる
  - $でパラメータ使える
- Outletsでroutesをrenderできる
- Linkを使えばClient Side Routing(サーバーに問い合わせしないでURL遷移)できる
- loaderはページに必要なデータを取得するために使う
  - 基本非同期でサーバーサイドから取得することが多い
  - TypeScriptセーフな感じで良い
- invariant便利そう(Remix関係ない)
- 末尾に_をつけるの謎、Routingをもう少し学ぶ必要がある
- actionを使うとformの送信をフックすることができる(addEventListenerをhookしているのかな)
- useNavigaitionを使うとClient Side Routingのページ遷移の状態(state)を取ってloadingを実装できる
