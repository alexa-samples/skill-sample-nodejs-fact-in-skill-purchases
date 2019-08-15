# プレミアムトリビア - スキル内課金を使ったスキルの作成
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />


## スキルコードのデプロイ

[前のステップ](./1-setup-vui-alexa-hosted.md)で、Alexaスキルの音声インターフェイス  (VUI)をビルドしました。
このページでは、Alexa-Hostedのコードエディターを使用して、コードをデプロイします。

 * Alexa-Hostedスキルが提供するサービスについての詳細は[こちら](https://developer.amazon.com/docs/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html) を参照してください。

1.  開発者コンソールで自分のスキルのページが表示されていることを確認し、上部のメニューから**コード**タブをクリックします。

左側のパネルにフォルダーやファイルが並んでいます。そこから **index.js**というファイルを探してください。この index.jsファイルがスキルのメインコードとなります。さらに、**package.json**というファイルも探してください。これからこの二つのファイルを編集します。

2. index.jsファイルをクリックして開き、表示された全てのコードを選択して削除します。

3. GitHubのプロジェクトフォルダーから、同じ名前のファイル [/lambda/custom/index.js](../lambda/custom/index.js)を探して開きます。

4. コードの右上にある「RAW」ボタンをクリックし、コードの全てを選択しコピーします。Alexaのコードエディターに戻り、先ほど削除したindex.jsのコードにペーストします。

5. 同様の手順で、 **package.json** ファイルも[/lambda/custom/package.json](../lambda/custom/package.json) からコピーして内容を置き換えます。

6. **保存**ボタンをクリックしたあと、**デプロイ**ボタンをクリックします。これでコードがLambda関数の中にデプロイされ、Alexa-Hostedサービスによって自動的に管理されるようになります。

7. ページの下方左側に **Logs: Amazon CloudWatch**というメニューがあります。  CloudWatch はロギングサービスです。s

[![Next](./next.png)](./3-create-isp.md)