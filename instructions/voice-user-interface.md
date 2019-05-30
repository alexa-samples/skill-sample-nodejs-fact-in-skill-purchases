# プレミアムトリビア - スキル内課金を使ったスキルの作成
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-on._TTH_.png)](./voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png)](./lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](./connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](./testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

1.  まず [Amazon開発者ポータル](https://developer.amazon.com/ja/alexa) を開き、右上にある **サインイン** ボタンをクリックします。もし、まだアカウントを持っていない場合でも、無料で新規アカウントを作成することができます。

1.  サインイン後、画面上部にある **あなたのAlexaダッシュボード** にマウスカーソルをあてて、**Skills**をクリックします。

1.  **alxea developer console** のページが開いたら、**スキルの作成** ボタンをクリックします。

1.  **スキル名**　を入力します。これはAlexaスキルストアでユーザーに表示される名前です。またデフォルトの言語を **日本語（日本）** に設定してください。 

1.  **カスタム** モデルを選択してください。 

1. スキルのバックエンドリソースをホスティングする方法を選択で、**独自のプロビジョン** を選んでください。(**Alexaがホスト** を選ぶこともできますが、このチュートリアルでは **独自のプロビジョン** で説明しています。)

1. 右上の **スキルを作成** ボタンをクリックします。

1. **テンプレートの選択** 画面が表示されたら、**最初から開始** を選んで **選択** をクリックしてください。

1.  **対話モデルの構築**
    1. 画面左側のナビゲーションパネルの **対話モデル** から **JSONエディター** を選択してください。右側JSONエディターの内容を、[models/ja-JP.json](../models/ja-JP.json) の中のもので置き換えてください。(選択したスキルの言語と同じモデルであることをご確認ください) 置き換えたら **モデルを保存** をクリックします
    1. **対話モデル** から **呼び出し名** を選択してください。ここで指定する呼び出し名をユーザーが発話すると、スキルが起動します。ここでは "プレミアムトリビア" が設定されています。完了したら **モデルを保存** をクリックします。 
    1. **モデルをビルド** ボタンをクリックします。 **正常にビルドされました** というメッセージがでるまで、しばらくお待ちください。

    **ノート:**  画面左側のナビゲーションパネルの **対話モデル** にある **インテント** と **スロットタイプ** は、先のJSONエディターによる対話モデルの入力により自動的に構築されます。よろしければそれぞれ確認して、ユーザーが発話しそうなパターンを考慮して対話モデルを膨らませてみてください。**インテント** と **スロットタイプ**、**発話サンプル** に関しては[技術資料](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=fact-nodejs-V2_GUI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_fact-nodejs-V2_GUI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)を参照してください。

1.  **オプショナル**  画面左側のナビゲーションパネルの **インテント** を展開して、インテントを1つ選択してください。 いくつかサンプル発話が定義されていますが、自由にサンプル発話を追加してください。 ユーザーはいろいろな方法でインテントを発生させようとします。 これらを変更した場合は、**モデルを保存** と **モデルをビルド** を都度行うことをお忘れなく。

1.  対話モデルのビルドが成功した場合、次のステップに進んでください。ビルドがうまくいかなかった場合、エラーが表示されますので解決を試みてください。このガイドの次のステップでは、AWS 開発者コンソールから Lambda 関数を作成します。このブラウザのタブは開いたままにしておいてください。[3ページ: VUIとコードを繋げる](./connect-vui-to-code.md)で再びこの画面に戻ってきます。
    
     もし、対話モデルでエラーが発生するようであれば、下記を確認してください。

     *  **コードを正しく適切なボックスにコピー&ペーストしましたか？**
     *  **対話モデルもしくはサンプル発話に誤った文字を入力していませんか？**

[![次](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_lambda_function._TTH_.png)](./lambda-function.md)
