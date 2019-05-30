# プレミアムトリビア - スキル内課金を使ったスキルの作成
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![音声ユーザーインターフェース](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./voice-user-interface.md)[![Lambda 関数](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./lambda-function.md)[![VUIとコードを接続する](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./connect-vui-to-code.md)[![テスト](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](./testing.md)[![カスタマイズ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png)](./customization.md)[![スキルの公開](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

## カスタマイズ / 次のステップ

ここまでの手順で、動作するスキルのコピーが用意できました。 このままではサンプルスキルのままですので、実際に公開するには、あなた独自のコンテンツや機能を持った、オリジナルのスキルにカスタマイズする必要があります。

### 豆知識の更新

index.js の先頭には、スキルによって販売される豆知識が記述されています。 新しいカテゴリーや豆知識で、このリストを書き換えてください(ことわざや格言など、いろいろアイデアを膨らませてください)。 この時、後ほど対話モデルとスキル内商品に反映しますので、作ったカテゴリーをメモしておいてください。 できれば「コンピュータ」のように、一言で言い表せるカテゴリーのほうが良いです。 ただしこれは、サンプルコードに依存する性質ですので、必要でしたら自由に変更してください。 また、対話モデルで同義語として定義することで、別の言い回しをシンプルなカテゴリー名にマッピングすることも可能です。('all_access' がどのように動作するか参照してください)

## 対話モデルの更新

開発者コンソールで、**ビルド** タブに移動して、factType スロットタイプを選択してください。factType スロットタイプを、カスタマイズしたカテゴリーに合うように編集してください。 「科学」「歴史」「宇宙」などデフォルトで入っている不要なカテゴリーは削除してください。 「モデルを保存」と「モデルをビルド」をすることをお忘れなく。

## スキル内商品の更新/作成

開発者コンソールで、**ビルド** タブ内のサブセクション **スキル内商品** を選択してください。 ここでスキルに合うように、スキル内商品のリンク解除・削除・修正、あるいは、新しいスキル内商品の追加を行ってください。 参照名がコードと整合するように気を付けてください。 

### スキル内商品のテスト方法

ここまでサンプルのスキル内商品テストする方法を提供していませんでした。 スキル内商品を更新するとき、これらのテスト方法を含めるようにしてください。 複雑なものである必要はありません。 最低限、スキルの呼び出し方法と、スキル内商品のリクエストで大丈夫です。

また、プライバシーポリシー、アイコン、その他の記入事項の内容も更新してください。 これらが正しく記述されていることが審査を通過するためには必須となります。

## テスト

修正が一通り終わったら、徹底的にテストをしましょう。 ベータテスト機能を使って友人や同僚にもテストを依頼するとよいでしょう。

## スキルの公開

スキルのカスタマイズが完了したら、審査・公開のステップに進みましょう。

[![次](./next.png)](./publication.md)
