# プレミアムトリビア - スキル内課金を使ったスキルの作成
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />

## ASK CLI のセットアップ

ここでは ASK CLI を使った手順を説明します。 Alexa 開発者コンソールを利用した方法については [こちら](./voice-user-interface.md) を参照してください。 もし ASK CLI を初めてご利用になる場合は、以下のリソースを参照して ASK CLI のインストールを行ってください。

* [Alexaスキル開発トレーニングシリーズ第5回: 本格的なスキル開発に向けて](https://developer.amazon.com/ja/blogs/alexa/post/a35ad62f-dafa-4f4b-9648-a77913129871/alexatraining-advanceddevelopment)
* [クイックスタート： Alexa Skills Kitコマンドラインインターフェース（ASK CLI）](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
* [lexa Skills Kitコマンドラインインターフェース（ASK CLI）リファレンス](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html)

> ノート: AWS Cloud9 (クラウドベースの統合開発環境) をご利用になる場合は、[こちら(英語)](https://alexa.design/cli-on-cloud9) に、ステップバイステップの説明があります。

これまで ASK CLI をご利用になったことがある方は、**最新版** の ASK CLI であることを **確認** してください。 次のコマンドで最新版の入手が可能です。

```bash
npm update -g ask-cli
```


### インストール

> ノート: もし git をインストールされているようでしたら、[このレポジトリ](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/tree/ja-JP) を clone することで、このセクションをスキップできます(13のステップだけ必要です)。

> ノート: git をインストールされていない場合でも、[こちら](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/archive/ja-JP.zip) から zip としてレポジトリをダウンロードすることで、このセクションをスキップすることもできます(13のステップだけ必要です)。

1. CLI を使って新しいスキルを **作成** します。

	```bash
	ask new
	```

2. スキルの **名前** を "Premium_Facts_Sample" とします。

	```bash
	? Please type in your new skill name:
 	Premium_Facts_Sample
	```

3. プロジェクトのフォルダに **移動**してください。

	```bash
	cd Premium_Facts_Sample
	```

4. プロジェクトの構成を **確認** してください.  次のように lambda、models フォルダと skill.json ファイルがあるはずです。

	```bash
	ls
	lambda		models		skill.json
	```

5. models フォルダを **開いて** ください。

	```bash
	cd models
	```

6. 対話モデルファイル en-US.json を ja-JP.json に変更して、**開いて** ください.

	```bash
	mv en-US.json ja-JP.json
	open ja-JP.json
	```

7. *ja-JP.json* の内容を、[この JSON ファイル](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/blob/ja-JP/models/ja-JP.json) の内容で **置き換え** て、保存してください。

8. プロジェクトのルートフォルダに **戻って** ください。

	```bash
	cd ..
	```

9. lambda フォルダの下の custom フォルダに **移動** してください。

	```bash
	cd lambda/custom
	```

10. AWS Lambda 関数のコードファイル index.js を **開いて** ください。

	```bash
	open index.js
	```

11. *index.js* の内容を、[この JS ファイル](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/blob/ja-JP/lambda/custom/index.js) の内容で **置き換え** て、保存してください。

12. *package.json* の内容を、[この JSON ファイル](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/blob/ja-JP/lambda/custom/package.json) の内容で **置き換え** て、保存してください。

13. lambda/custom フォルダにいる状態で、`npm update`　を実行して、ASK SDK とその他の npm 依存関係を **更新** してください。

	```bash
	npm update
	```
1. プロジェクトのルートディレクトリに **移動** してください。 skill.json というファイルがありますおで、[こちらの内容](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/tree/ja-JP/skill.json) に置き換えてください。

	```bash
	cd ../..
	open skill.json
	```

### スキル内商品の作成

スキル内課金のための ASK CLI コマンドが用意されています。 このガイドでは、3つの買い切り型商品と1つのサブスクリプション型商品の作成手順を紹介します。 サンプルのコードは以下手順を想定して作成されていますので、ご注意ください。

1. プロジェクトのルートディレクトリにいることを確認してください。

2. 最初のスキル内商品を **作成** します。

	```bash
	ask add isp
	```

3. Entitlement (買い切り型) を **選択** してください。

	```bash
	? List of in-skill product types you can choose (Use arrow keys)
	❯ Entitlement
  	Subscription
	```

4. Entitlement_Template を **選択** してください。

	```bash
	? List of in-skill product templates you can choose (Use arrow keys)
	❯ Entitlement_Template
	```

5. スキル内商品の **名前** を *science_pack* と入力してください。

	```bash
	? Please type in your new in-skill product name:
 	(Entitlement_Template) science_pack
	```

6. ステップ #2 から #5 を繰り返して、*history_pack* と *space_pack* という名前で、残り2つの買い切り型商品を作成してください。

	```bash
	? Please type in your new in-skill product name:
 	(Entitlement_Template) history_pack
	...
	? Please type in your new in-skill product name:
 	(Entitlement_Template) space_pack
	```

7. *all_access* という名前のサブスクリプション型の商品を同様の手順で **作成** します。

	```bash
	ask add isp

	? List of in-skill product types you can choose (Use arrow keys)
	  Entitlement
	❯ Subscription

	? List of in-skill product templates you can choose (Use arrow keys)
	❯ Subscription_Template

	? Please type in your new in-skill product name:
 	(Subscription_Template) all_access

8. 新しく作成された ISPs ディレクトリに **移動** すると、*entitlement* と *subscriptiopn* という ２つのフォルダが作成されています。これらのフォルダの中に、それぞれのスキル内商品を定義して JSON ファイルがあり	ます。

	```bash
	cd isps
	ls
	```

9. *entitlement* フォルダに **移動** します。 先ほどのステップで作成した3つのスキル内商品のファイルが作成されているはずです。

	```bash
	cd entitlement
	ls
	```

10. history_pack.json を **開いて** ください。

	[ISP Entitlements](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/tree/ja-JP/isps.samples/entitlement) にあるファイルの内容を、そのままコピー・ペーストしても結構です。

	*history_pack.json* を更新したら、残りの *science_pack.json* と *space_pack.json* も同様に更新します。 

	> **重要: *referenceName* は変更しないでください。この名前はサンプルコードの中で参照していますので、変更すると動作しなくなります。**

11. サブスクリプション型のファイルを **レビューと編集** してください。

	サブスクリプション型商品も同様に、[All Access ISP subscription sample](https://raw.githubusercontent.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/ja-JP/isps.samples/subscription/all_access.json) の内容を、*all_access.json* にコピー・ペーストしてください。

	```bash
	cd ../subscription
	open all_access.json
	```

	以上で、スキル内商品のファイルが整いました。ASK CLI でスキルをデプロイして、テストを開始することができます。

### デプロイメント

1. プロジェクトのルートディレクトリに **移動** してください。'skill.json' という名前のファイルがあるはずです。

	```bash
	cd ../..
	```

2. 次のコマンドで、スキルと lambda 関数を1ステップで一度に *デプロイ* します。

	```bash
	ask deploy
	```

**以上で、スキル作成の手順終了です。開発者コンソールでテストすることができます**


[![次](./next.png)](./testing.md)

**ノート: スキルに紐づいた開発者アカウントはスキル内商品で変更されません。** スキル内商品を使ったスキルのテストに関する詳細は [スキル内課金のテストガイド](https://developer.amazon.com/docs/in-skill-purchase/isp-test-guide.html) を参照してください。