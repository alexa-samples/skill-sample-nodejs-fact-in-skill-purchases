# プレミアムトリビア - スキル内課金を使ったスキルの作成
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-on._TTH_.png)](./testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

## Alexa スキルのテスト

ここまでで、[音声ユーザーインターフェース](./voice-user-interface.md)と [Lambda 関数](./lambda-function.md)を作成し、[それらを連携](./connect-vui-to-code.md)、 [スキル内商品の作成](./create-isp.md)を行いました。 これであなたのスキルをテストする準備が整いました。

1. [Amazon開発者ポータル](https://developer.amazon.com/edw/home.html#/skills/list)に戻り、あなたが作ったスキルを選択します。

1. トップナビゲーションメニューから **テスト** タブを選択し **Alexaシミュレータ**を表示します。ブラウザによってはマイクへのアクセス許可を要求する場合があります。マイクを有効にすることを推奨しますが、テキスト入力によるテストも可能です。

1. 上部のナビゲーションメニューのすぐ下にあるドロップダウンから、**開発中** を選択して、テストを有効化してください。 選択すると、スキルテストが有効になっているステージが、`開発中` になります。

1. **Alexaシミュレータ** で、あなたのスキルが期待どおりに動作するか検証します。テキストボックスに文字を入力するか、マイクアイコンを押した状態でマイクに話しかけてみてください。
	1. **文字入力** [Step 1](./1-voice-user-interface.md)で指定したスキルの **呼び出し名** に続き "を開いて" とタイプしてください。(例："宇宙の豆知識を開く")
	2. **音声** テキストボックス横のマイクアイコンを押下した状態で、スキルの **呼び出し名** に続き "を開いて" と発話してください。
	3. スキルの **呼び出し名** を忘れた場合、トップナビゲーションメニューから **ビルド** タブを選択して、左側パネルの **呼び出し名** で確認してください。

1. 次のようなフレーズをテストしてみてください
        
      * トリビア
      * 歴史のトリビア
      * 何が買える?
      * 歴史パックを買う

      > ノート: もし音声による意図しない購入を防ぐために、ボイスコードを有効にしている場合、スキル内課金をする前にそれを提供するよう要求されます。 Alexaシミュレーターでこれをタイプ入力する場合、"1234" でなく "一 二 三 四" `と入力してください。

      > ノート: スキルに紐づいている開発者アカウントはスキル内課金では変更されません。 スキル内課金のテストに関する詳細は、[スキル内課金のテストガイド](https://developer.amazon.com/docs/in-skill-purchase/isp-test-guide.html) を参照してください。

      > Alexa デベロッパーコンソールのスキル内商品のページから、テスト購入をリセットすることができます。(**スキル内商品** のサブメニューは、**ビルド** タブの左側にあります。見当たらない場合は、スキルビルダーのチェックリストから、スキル内商品をクリックしてください。) 商品の **テスト購入をリセット** をクリックするとリセットすることができます。 これは、スキル内商品がデベロッパーコンソールから設定されたか ASK CLI で設定されたかによらず有効です。

      > **プロTip:** シミュレータで、`終了` とタイプか発話することにより、それぞれのテストパスの前にセッションをリセットすることができます。 シミュレータは、テストを容易にするために、通常のデバイスよりも長い時間セッションを開き続けますが、これにより簡単にセッションを閉じることができます。

1. あなたのスキルが期待どおりに動作するか検証します。
	* Alexaシミュレータで検証をしたら、スキルI/O パネルの **JSON入力** と **JSON出力** ボックスを参照ください。また上部にある **デバイスのログ** を有効にすると、動作ステップも参照できます。
	* もし期待する動作をしない場合は、上記のスキルI/Oパネルが実際に Lambda 関数とやり取りしている入出力となりますので、問題解析のヒントにしてください。もちろん AWS Lambda も問題解決のための追加ツールを用意しています。

1.  **AWS Lambda のテストイベント設定** サービスシミュレーターの **リクエスト（JSON入力)** と **レスポンス（JSON出力)** について説明しました。この **リクエスト** の値を利用することで、Lambda 関数を直接テストすることができます。 次のような手順で行います。

    1.  **Alexaシミュレーター** でテキストか音声で発話をして、発生したリクエスト(JSON入力)の内容を次のステップのためにコピーしておいてください。

    2.  **AWS マネジメントコンソール** に移動して Lambda 関数を開き、**アクション** メニューの右側のドロップダウンリストから **テストイベントの設定** を選択します。

        ![テストイベントの設定](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/fact/4-5-2-configure-test-event.png)

    3.  **新しいテストイベントの作成** を選択して、イベントテンプレートのドロップダウンリストから **Alexa Start Session** を選択します。 実際はどのイベントテンプレートを選んでも良いのですが、覚えやすいのでここでは **Alexa Start Session** を利用します。
    
        ![Alexa Start Session](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/fact/4-5-3-alexa-start-session.png)

    4.  **イベント名** フィールドにイベント名を適当に入力します。 イベント名は、テストの内容を連想しやすければ、特に何でもかまいません。例えば、"startSession"でも結構です。 コードエディターの内容を削除して、先にコピーした Lambda リクエスト(JSON入力)をペーストします。 AlexaシミュレータからLambdaリクエストをコピー・ペーストすることで、さまざまな発話にたいするテストイベントを作成することができます。      

    5.  **作成** ボタンをクリックします。これによりテストイベントが保存され、Lambda関数のメインページで **テスト** ボタンの左に指定したテストイベント名が現れます。

    6. 作成したテストイベント(例 startSession)を選択して **「テスト」** ボタンをクリックします。これにより Lambda 関数に対して設定したテストの内容が実行されます。
    
        ![テストイベント](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/fact/4-5-5-save-and-test.png)
        
        テストにより4つのことが確認できます。

      *  **レスポンス(JSON出力)** 「実行結果」内に表示されます。

           ![実行結果](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/fact/4-5-5-1-execution-result.png)


      *  **実行結果の統計値の概要** ここには所用時間や課金時間、設定済みリソース、使用メモリなどが表示されます。

           ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-2-summary._TTH_.png)

      *  **ログ出力**  Lambda 関数のコード内で console.log() を適切に使うことで、 関数内で何が起こっているかトラッキングすることができます。何か問題が起きた時に原因を特定する場合に役に立つでしょう。より高度なスキルを作るようになった時、ログの有用性に気づくはずです。
        モニタリングタグにある、**CloudWatchのログを表示** をクリックしてください。 CloudWatch についての詳細については [こちら](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)" を参照してください。

           ![CloudWatchログ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/jp/tutorials/fact/4-5-5-2-summary.png)
        
7.  **その他のテスト方法:**
    *  Alexa 搭載デバイスやアプリケーションでのテスト - あなたの Alexa 開発者アカウントで登録されているデバイスは、開発中のスキルが有効化されており、開発モードでテストすることができます。 シミュレータだけでなく、必ず実際のデバイスでもテストするようにしてください。 スキル内商品は全てのデバイスで購入できないかもしれませんが、購入済みの商品はすべてのデバイスで有効になります。
    *  [Echosim.io](https://echosim.io) はブラウザベースのAlexaスキルのテストツールです。実機デバイスがなくてもテストできるので便利です。
    *  [Unit Testing with Alexa](https://github.com/alexa/alexa-cookbook/tree/master/testing/postman/README.md) は [Postman](http://getpostman.com) と [Amazon API Gateway](http://aws.amazon.com/apigateway) を使用したモダンなユニットテストのアプローチです。

        > ノート: スキル内商品は、スキルの設定と同一の地域でのみ購入することができます。日本では amazon.co.jp のアカウントで登録されたデバイスから使うことができます。また、請求先住所も同じように国内で設定されている必要があります。

8.  **サンプルスキルが正常に動作することを確認できたら、このスキルをカスタマイズしましょう。**

[![次](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_customization._TTH_.png)](./customization.md)
