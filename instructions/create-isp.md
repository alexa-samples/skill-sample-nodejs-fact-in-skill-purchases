# プレミアムトリビア - スキル内課金を使ったスキルの作成
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](./testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

# スキル内商品の作成

このガイドの [1ページ目](./voice-user-interface.md) では、音声ユーザーインターフェイスの対話モデルを作成しました。 [2ページ目](./lambda-function.md) では、スキルのロジックを定義する Lambda 関数を作成しました。 そして [3ページ目](./connect-vui-to-code.md) ではそれら2つを接続することを行いました。 今回は、ユーザーが購入できるスキル内商品を作成します。

このサンプルでは、4つのスキル内商品を使います -- そのうちの3つは買い切り型の商品で、残りの1つはサブスクリプション型の商品です。 このサンプルの体験をフルに経験するには、4つすべてのスキル内商品を作成するのがよいですが、一部だけの商品を作成しても大丈夫です。 作成した商品とスキルがリンクするように留意してください。

1. 開発者コンソールの **ビルド** タブで、左側の **スキル内商品** セクションをクリックして、マネタイゼーションツールを開いてください。
1. **スキル内商品を作成** をクリックしてください。
1. スキル内商品の参照名を入力してください。これはコードからスキル内商品を参照するための識別子ですので、スペースや特殊記号のない英語の名前を推奨します。このサンプルのコードでは、`all_access` という参照名を想定しています。
    > 全ての参照名を指定どおり正確に入力するように注意してください。これらの名前はサンプルコードから利用していますので、一致しないとサンプルが動作しません。
1. **サブスクリプション型** を選択してください。
1. **スキル内商品を作成** をクリックしてください。
1. **公開** サブセクションで、サブスクリプションに対して次を入力してください。
   
1. **公開** サブセクションで、サブスクリプションに対して次を入力してください。

    項目|説明|サンプル値
    ---|----|--------
    **表示名**|この商品の表示名。 ユーザーはこの名前を見聞きします。| オールアクセス|
    **説明**| 商品のサマリー説明。 ユーザーはこの説明を聞きます。| オールアクセスでは、歴史・科学・宇宙に加えて、今後追加されるジャンルのトリビアも聞くことができます。|
    **詳細な説明**| 商品の機能や使用要件など詳細な説明。 ユーザーはこの説明を見ます。| オールアクセスでは、歴史・科学・宇宙に加えて、今後追加されるジャンルのトリビアも聞くことができます。|
    **サンプルフレーズ**| ユーザーがこのスキル内商品にアクセスするためのフレーズ例。 ここでは1例だけですが、３つすべてのフレーズ紹介しても結構です。| オールアクセスを購入|
    **小さいアイコン**| スキルストアや Alexa アプリで商品表示に利用する小さいアイコン。  もしお持ちでなければ、このプレースフォルダーアイコンを利用することもできます。| https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_108.png|
    **大きいアイコン**| スキルストアや Alexa アプリで商品表示に利用する大きいアイコン。 もしお持ちでなければ、この代用アイコンを利用することもできます。| https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_512.png|
    **キーワード** | 検索で利用されるキーワード | オールアクセス|
    **購入プロンプトの説明**| 商品を購入したりサブスクリプションをキャンセルするときにユーザーが聞く商品の説明。| オールアクセスでは、歴史・科学・宇宙に加えて、今後追加されるジャンルのトリビアも聞くことができます。|
    **購入確認の説明**| Alexa アプリのスキルカードで表示される商品の説明。ユーザーはこれを目にします。| オールアクセスを購入いただきありがとうございました。あらゆるトリビアをお楽しみください！|
    **プライバシーポリシーのURL**|当該地区向けのプライバシーポリシーへのUR. このサンプルでは、代用値を使います。 |https://localhost/privacy.html|

    > ISPやスキルのアイコン作成にお困りなら、[Alexa Skill Icon Builder](https://developer.amazon.com/docs/tools/icon-builder.html) を参照してください。

1. **保存して続行** をクリックしてください。

    > ISPやスキルのアイコン作成にお困りなら、[Alexa Skill Icon Builder](https://developer.amazon.com/docs/tools/icon-builder.html) を参照してください。

1. **保存して続行** をクリックしてください。
1. **価格** サブセクションで、このサンプルでは、amazon.co.jp、JPY、99円, 毎月, 7日間トライアル, リリース日 "本日" で大丈夫ですが、必要に応じて変更することもできます。
1.  **税金カテゴリー** を設定してください。 サンプルではなんでも大丈夫ですが、実際の商品にはどの選択を使うべきか、税務の専門家に相談してください。 利用できるオプションは [ここ](https://developer.amazon.com/docs/in-skill-purchase/create-isp-dev-console.html#tax-category) にリストされています。
1. **保存して続行** をクリックしてください。
1. 通常、審査チームがスキル内商品を見つけたりテストするために、テスト手順を提供します。(この説明は、**認定** タブで指定する一般的なスキルのテスト手順とは別に、このスキル内商品に特化したテスト手順になります。) ここでは、とりあえずブランクのままとします。
1. **保存して終了する** をクリックしてください。
1. 必要な情報がすべて満たせた場合、スキルにスキル内商品をリンクさせるための **スキルへのリンク** がクリックできるはずです。 そうでない場合、**継続** をクリックして不足している情報を補ってください。
1. お疲れ様でした! 以上で、スキルにサブスクリプションの追加が完了です。
1. このプロセスを、次の表を使って、3つの買い切り型商品にも繰り返します。参照名をお間違いなく。

    項目|歴史パック用の値|科学パック用の値|宇宙パック用の値
    -----|---|----|----
    **参照名**| `history_pack` | `science_pack` |  `space_pack`
    **スキル内商品タイプ** | 買い切り型 | 買い切り型 | 買い切り型
    **表示名**| 歴史パック | 科学パック | 宇宙パック
    **説明** | 歴史パックでは歴史に関するトリビアを聞くことができます。| 科学パックでは科学に関するトリビアを聞くことができます。| 宇宙パックでは宇宙に関するトリビアを聞くことができます。
    **詳細な説明**| 歴史パックでは歴史に関するトリビアを聞くことができます。 | 科学パックでは科学に関するトリビアを聞くことができます。 | 宇宙パックでは宇宙に関するトリビアを聞くことができます。
    **サンプルフレーズ**| 歴史パックを購入 | 科学パックを購入 | 宇宙パックを購入
    **小さいアイコン** (Placeholder)| https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_108.png | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_108.png | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_108.png 
    **大きいアイコン** (Placeholder) | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_512.png | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_512.png | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_512.png
    **キーワード**| 歴史 | 科学 | 宇宙
    **購入プロンプトの説明**| 歴史パックでは歴史に関するトリビアを聞くことができます。 | 科学パックでは科学に関するトリビアを聞くことができます。 | 宇宙パックでは宇宙に関するトリビアを聞くことができます。
    **購入確認の説明**| 歴史パックを購入いただきありがとうございました。歴史トリビアをお楽しみください！ | 科学パックを購入いただきありがとうございました。科学トリビアをお楽しみください！ | 宇宙パックを購入いただきありがとうございました。宇宙トリビアをお楽しみください！
    **プライバシーポリシーのURL** (Placeholder)| https://localhost/privacy.html | https://localhost/privacy.html | https://localhost/privacy.html
    **タックスカテゴリー** (Placeholder) | Information Services | Information Services | Information Services

    > ここではサンプルでこの値のままで大丈夫ですが、実際のスキル内商品を作成するときには、独自のアイコンやURLを用意してください。 このままだと審査通過の妨げとなります。

お疲れ様でした!  以上でサンプル用のスキル内商品の追加が完了です。早速テストしてみましょう。

> スキル内商品のページから移る前に、**テスト購入のリセット** というリンクがあることを覚えておいてください。 テストで購入した商品をリセットするとき、これらのリンクを使います。

[![次](./next.png)](./testing.md)
