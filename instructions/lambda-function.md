# プレミアムトリビア - スキル内課金を使ったスキルの作成
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-on._TTH_.png)](./lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](./connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](./testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

## Lambda 関数をセットアップする

このガイドの [最初のステップ](./voice-user-interface.md) で、Alexa スキル用の音声ユーザーインターフェース (VUI) を作成しました。このページでは、[Amazon Web Services](http://aws.amazon.com/jp) を使って Lambda 関数を作っていきます。詳細は [AWS Lambda](http://aws.amazon.com/jp/lambda) に記載されていますが、今回のスキルを作る上で知っておくべきことは、私たちのコードは AWS Lambda で実行されるということだけです。ユーザーが Alexa でスキルを呼び出したとき、適切な応答を返して会話を成立させるのが Lambda 関数です。

1. このアプリケーションは、Lambda 関数の作成、Alexa Skills Kit から呼び出されるアクセス権の取得、IAM ロールのセットアップ、およびスキルに必要な AWS リソースをセットアップする "script" です。関数作成時に、サンプルの GitHub からコードを取得し、必要な依存関係を自動で用意します。

    > Note: http://aws.amazon.com にサインインしてコンソールを開きます。まだアカウントを持っていない場合は、アカウントを作成する必要があります。[新規AWSアカウントの作成手順](https://aws.amazon.com/jp/register-flow/) を参考にしてください。

1. このサンプルは AWS Serverless Application Repository にプリロードされます。 [ここ](https://console.aws.amazon.com/lambda/home?region=us-east-1#/create/app?applicationId=arn:aws:serverlessrepo:us-east-1:173334852312:applications/alexa-skills-kit-nodejs-premium-facts-skill) をクリックして、関数の作成プロセスを開始してください。

1. 必要なら **アプリケーションの設定** セクションの事項を変更してください。（そのままでも大丈夫です)
    * アプリケーション名
    * SkillDescription
    * SkillFunctionName
    > もし以前にこのサンプルを作成したことがある場合は、アプリケーション名を変更してください。同じアプリケーション名のものが既に存在する場合、エラーになります。

1. ページ下部の **デプロイ** をクリックします。

1. リソースセクションの全てのリソースのステータスが、**CREATE_COMPLETE** になるまで待ちます。

1. リソースリストのうちの、**SkillFunctionResource** をクリックして、Lambda コンソールで新しく作成された Lambda 関数を開きます。

1. (オプショナルですが推奨) Lambda 関数のセキュリティを向上させるために、[こちら](https://alexa.design/secure-lambda-function) のインストラクションに従います。

1. **関数コード** というセクションが現れるまで、ページをスクロールダウンします。

    > ノート: もし **関数コード** というセクションが見当たらない場合、Designer セクションの中の Lambda 関数名が表示されているボタンをクリックしてください。

1. Lambda 関数の内容を [こちら](../lambda/custom/index.js) のものと入れ替えます。完了したら、ページ右上の **保存** ボタンをクリックしてください。 

1. ページ右上のコーナーに ARN (Amazon Resource Name) という、この Lambda 関数の固有識別子が表示されています。 識別子の右側にあるコピーボタンをクリックして **Lambda 関数の ARN 値をコピー** してください。 この値は次のセクションで利用します。

1. ARN をコピーしたら、スキルと Lambda 関数を結合するための次のステップに進みましょう。

[![次](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_connect_vui_to_code._TTH_.png)](./connect-vui-to-code.md)
