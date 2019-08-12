# プレミアムトリビア - スキル内課金を使ったスキルの作成
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />

スキル内課金を利用したプレミアムコンテンツの提供は、スキルで収益化を目指す方法の1つです。 このサンプルスキルは、 Factスキルのサンプルをベースに、プレミアムコンテンツとして新しいカテゴリーを追加しています。 プレミアムコンテンツは、買い切り型、またはサブスクリプションで購入できます。 このガイドでは、スキル内商品の作成から、サンプルスキルを動かす手順までをステップバイステップで説明します。

## スキルのアーキテクチャー

スキルは、フロントエンドとバックエンドの2つの基本的なパーツで構成されています。

1. フロントエンドは音声インターフェイス、つまりVUIです。音声インターフェースは、音声対話モデルによって構成されます。 
2. バックエンドは、スキルのロジックが置かれる場所です。

## スキルをセットアップする３つの方法

Alexa Hosted、AWS Hosted、ASK CLIなど、スキル開発の経験と使用可能なツールに応じて、スキルをセットアップする方法が多数あります。このプレミアムトリビアスキルでは、Alexa Hostedを使用します。
AWS HostedまたはASK CLIメソッドを使用する場合は、サンプルのFactスキルに関するこちらの手順をご覧ください。- [AWS Hosted Instructions](https://github.com/alexa/skill-sample-nodejs-fact/blob/master/instructions/setup-vui-aws-hosted.md) | [ASK CLI instructions](https://github.com/alexa/skill-sample-nodejs-fact/blob/master/instructions/cli.md)

## Alexa Hosted

Alexa-Hostedスキルサービスを使用すると、開発者コンソールから離れることなく、スキルのビルド、編集、公開ができます。 スキルには、スキルのバックエンドコードを管理しデプロイするためのコードエディターが含まれます。 Alexa-Hostedスキルサービスが提供する機能の詳細について知りたい場合は、このページとは別に新しいタブを開いてください。

Alexa 開発者コンソールを使って **開始** するには次のボタンをクリックしてください。

[![始めましょう!](./getting-started.png)](./instructions/1-setup-vui-alexa-hosted.md)

## 追加情報

### 開発者サイト
* [Alexa Skills Kit 開発者サイト](https://developer.amazon.com/ja/alexa-skills-kit/learn)

### コミュニティ
* [Amazon Developer Forums](https://forums.developer.amazon.com/spaces/293/index.html) - 会話に参加してみましょう。
* [Hackster.io](https://www.hackster.io/amazon-alexa) - 他の人がどんなスキルを作成しているか参考になります。

### チュートリアルとガイド
* [音声デザインガイド](https://developer.amazon.com/designing-for-voice/) - 対話と音声インターフェイスに関して学べます。

### ドキュメント
* [Alexa Skills Kit SDK for Node.js ドキュメント](https://ask-sdk-for-nodejs.readthedocs.io/en/latest/)
*  [Alexa Skills Kit 技術文書](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html)

### ライセンス

This sample code is made available under a modified MIT license. See the LICENSE file.