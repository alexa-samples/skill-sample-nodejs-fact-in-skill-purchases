// Alexa SDK ライブラリのロード
const Alexa = require('ask-sdk');

// トリビアの連想配列データ
// 無償(free)のトリビアに加え、science, history, spaceの３種類のプレミアムコンテンツを用意している。
const ALL_FACTS = [
  { type: 'free', fact: '1年は365日です。' },
  { type: 'free', fact: 'いち日は24時間です。' },
  { type: 'science', fact: '人間の目は平均で１年に420万回のまばたきをします。' },
  { type: 'history', fact: 'レオナルド・ダ・ヴィンチは500年前に初めてのヘリコプターや潜水艦をデザインしました。' },
  { type: 'history', fact: '古代エジプトでは、ファラオからハエを遠ざけるため、奴隷にハチミツを塗っていました。' },
  { type: 'space', fact: '太陽は太陽系の全質量のうち99.86%を占めています。' },
];

const skillName = 'プレミアムトリビア';

//  スキルに登録されている商品リスト（inSkillProductList）から、購入された商品を抽出する関数
function getAllEntitledProducts(inSkillProductList) {
  const entitledProductList = inSkillProductList.filter(record => record.entitled === 'ENTITLED');
  console.log(`Currently entitled products: ${JSON.stringify(entitledProductList)}`);
  return entitledProductList;
}

// 入力したトリビアの連想配列からランダムに一つを選択して返す関数
function getRandomFact(facts) {
  const factIndex = Math.floor(Math.random() * facts.length);
  return facts[factIndex].fact;
}


// 全てのトリビア連想配列から、購入した商品のトリビアだけを抽出して配列で返す関数
function getFilteredFacts(factsToFilter, handlerInput) {
  // 購入した商品をルックアップして、必要に応じてフィルター
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  const entitledProducts = sessionAttributes.entitledProducts;
  let factTypesToInclude;
  if (entitledProducts) {
    factTypesToInclude = entitledProducts.map(item => item.referenceName);
    factTypesToInclude.push('free');
  } else {
    // 購入した商品がないので、無償のトリビアだけをセット
    factTypesToInclude = ['free'];
  }
  console.log(`types to include: ${factTypesToInclude}`);
  if (factTypesToInclude.indexOf('complete') >= 0) {
    return factsToFilter;
  }
  const filteredFacts = factsToFilter
    .filter(record => factTypesToInclude.indexOf(record.type) >= 0);

  return filteredFacts;
}

// 購入した商品名リストの説明文を作る関数
// 出力例: 「歴史パック と 科学パック と ・・・パック」
function getSpeakableListOfProducts(entitleProductsList) {
  const productNameList = entitleProductsList.map(item => item.name);
  let productListSpeech = productNameList.join('と、');
  return productListSpeech;
}

// スキルが起動した時に呼ばれるハンドラー
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log('IN LAUNCHREQUEST');

    // 購入済みの商品リストは Request Intercepter で既に取得し、セッションアトリビュートに格納されているはず
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const entitledProducts = sessionAttributes.entitledProducts;

    if (entitledProducts && entitledProducts.length > 0) {
      // ユーザーは１つ以上の商品を購入している場合
      return handlerInput.responseBuilder
        .speak(`${skillName}へようこそ。現在、${getSpeakableListOfProducts(entitledProducts)}を、お持ちです。` +
          'トリビアを聞くには、「トリビアを教えて」もしくは「歴史のトリビアを教えて」のように言ってみてください。' +
          '「何を買える？」と聞くとプレミアムコンテンツについて説明します。どうしますか？')
        .reprompt('どうしますか？')
        .getResponse();
    }

    // ユーザーがまだ何も購入していない場合
    console.log('No entitledProducts');
    return handlerInput.responseBuilder
      .speak(`${skillName}へようこそ。` +
        'トリビアを聞くには、「トリビアを教えて」もしくは「歴史のトリビアを教えて」のように言ってみてください。' +
        '「何を買える？」と聞くとプレミアムコンテンツについて説明します。どうしますか？')
      .reprompt('どうしますか？')
      .getResponse();
  },
};

//　ユーザーが「ヘルプ」と言った時に呼ばれるハンドラー
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('トリビアを聞くには、「トリビアを教えて」もしくは「歴史のトリビアを教えて」のように言ってみてください。' +
        '「何を買える？」と聞くとプレミアムコンテンツについて説明します。どうしますか？')
      .reprompt('どうしますか？')
      .getResponse();
  },
};

// Alexaが「他のトリビアを聞きますか？」と尋ねたあと、ユーザーが「はい」と言ったら、他のトリビアを言う。
const YesHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'GetRandomFactIntent');
  },
  handle(handlerInput) {
    console.log('In YesHandler');

    // 購入したトリビアだけを抽出する
    const filteredFacts = getFilteredFacts(ALL_FACTS, handlerInput);

    const speakOutput = `トリビアをどうぞ。${getRandomFact(filteredFacts)} 他のトリビアも聞きますか？`;
    const repromptOutput = `他のトリビアも聞きますか？`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

// Alexaが「他のトリビアを聞きますか？」と尋ねたあと、ユーザーが「いいえ」と言ったら、スキルを終了する。
const NoHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    console.log('IN NOHANDLER');

    const speakOutput = `さようなら。また使ってね。`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

// ユーザーが「{factCategory}のトリビアを教えて」と言った時に呼ばれるハンドラー
const GetCategoryFactHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'GetCategoryFactIntent';
  },
  handle(handlerInput) {
    console.log('In GetCategoryFactHandler');

    const factCategory = Alexa.getSlot(handlerInput.requestEnvelope, 'factCategory')
      .resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const factCategoryValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'factCategory');
    console.log(`FACT CATEGORY = XX ${factCategory} XX`);
    let categoryFacts = ALL_FACTS;

    // エンティティ解決がなかったらスロットの値をそのまま採用する
    if (factCategory === undefined) {
      const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'factCategory');
      let speakPrefix = '';
      if (slotValue !== undefined) speakPrefix = `${slotValue}ですね。`;
      const speakOutput = `${speakPrefix}そのカテゴリのトリビアはありません。科学、宇宙、歴史のどれにしますか？`;
      const repromptOutput = '科学、宇宙、歴史のどれにしますか？';

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptOutput)
        .getResponse();
    }

    // 以下の switch文のどこかで使われている変数
    let speakOutput;
    let repromptOutput;
    let filteredFacts;
    let upsellMessage;
    let locale;
    let ms;
    let subscription;
    let categoryProduct;

    switch (factCategory) {
      case 'free':
        // 'free'カテゴリの場合は無料なので、そのまま無料のトリビアを提供する
        categoryFacts = ALL_FACTS.filter(record => record.type === factCategory);
        speakOutput = `トリビアをどうぞ。${getRandomFact(categoryFacts)} 他のトリビアも聞きますか？`;
        repromptOutput = `他のトリビアも聞きますか？`;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      case 'random':
      case 'complete':
        // complete(サブスクリプション)を購入している場合は、全てのトリビアからランダムに選んで提供する
        filteredFacts = getFilteredFacts(ALL_FACTS, handlerInput);
        speakOutput = `トリビアをどうぞ。${getRandomFact(filteredFacts)} 他のトリビアも聞きますか？ `;
        repromptOutput = `他のトリビアも聞きますか？`;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      default:
        // スロットにエンティティ解決にマッチするものがあった場合
        categoryFacts = ALL_FACTS.filter(record => record.type === factCategory);
        locale = handlerInput.requestEnvelope.request.locale;
        ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

        return ms.getInSkillProducts(locale).then(function checkForProductAccess(result) {
          subscription = result.inSkillProducts.filter(record => record.referenceName === 'complete');
          categoryProduct = result.inSkillProducts.filter(record => record.referenceName === factCategory);

          // ユーザーが指定された商品を購入している場合は、そのトリビアを話して、続けるかどうか尋ねる
          if (isEntitled(subscription) || isEntitled(categoryProduct)) {
            speakOutput = `トリビアをどうぞ。${getRandomFact(categoryFacts)} 他のトリビアも聞きますか？`;
            repromptOutput = `他のトリビアも聞きますか？`;

            return handlerInput.responseBuilder
              .speak(speakOutput)
              .reprompt(repromptOutput)
              .getResponse();
          }
          // **** ユーザーが指定された商品をまだ購入していなかった場合、Upsellディレクティブに送信し、アップセルのフローに進む ***
          upsellMessage = `${factCategoryValue} パックはまだ購入していません。 ${categoryProduct[0].summary} 詳細を聞きますか？`;

          return handlerInput.responseBuilder
            .addDirective({
              type: 'Connections.SendRequest',
              name: 'Upsell',
              payload: {
                InSkillProduct: {
                  productId: categoryProduct[0].productId,
                },
                upsellMessage,
              },
              token: 'correlationToken',
            })
            .getResponse();
        });
    }
  },
};

// このスキルで、どんな商品を購入できるのかを説明する
// ユーザーが「何が買える？」と言った場合のハンドラー
const WhatCanIBuyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'WhatCanIBuyIntent';
  },
  handle(handlerInput) {
    console.log('In WhatCanIBuy Handler');

    // ユーザーにどんな商品を購入できるかを説明する。
    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function fetchPurchasableProducts(result) {
      const purchasableProducts = result.inSkillProducts.filter(record => record.entitled === 'NOT_ENTITLED' && record.purchasable === 'PURCHASABLE');

      return handlerInput.responseBuilder
        .speak(`現在購入できる商品は、${getSpeakableListOfProducts(purchasableProducts)} です。` +
          '詳しく知りたい場合は、歴史パックについて教えて、のように言ってみてください。' +
          '購入する場合は、宇宙パックを購入、のように言ってください。どうしますか？')
        .reprompt('どうしますか？')
        .getResponse();
    });
  },
};

// ユーザーにスキル内課金商品の詳細について説明する
// ユーザーが「{productCategory}パックについて教えて」と言った場合のハンドラー
const ProductDetailHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ProductDetailIntent';
  },
  handle(handlerInput) {
    console.log('IN PRODUCT DETAIL HANDLER');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function fetchProductDetails(result) {
      let productCategory = Alexa.getSlot(handlerInput.requestEnvelope, 'productCategory')
        .resolutions.resolutionsPerAuthority[0].values[0].value.id;
      const spokenCategory = Alexa.getSlotValue(handlerInput.requestEnvelope, 'productCategory');

      // ユーザーがカテゴリーを言わなかった場合、Dialogに差し戻す。Alexaが自動でユーザーに聞き直してくれる。
      if (spokenCategory === undefined) {
        return handlerInput.responseBuilder
          .addDelegateDirective()
          .getResponse();
      }

      // エンティティ解決でもユーザーが要求したカテゴリーがなかった場合、もう一度聞きなおす。
      if (productCategory === undefined) {
        return handlerInput.responseBuilder
          .speak('すみません、分かりませんでした。もう一度お願いできますか？')
          .reprompt('もう一度お願いできますか？')
          .getResponse();
      }

      const product = result.inSkillProducts
        .filter(record => record.referenceName === productCategory);

      if (isProduct(product)) {
        const speakOutput = `${product[0].summary} 購入するには、${product[0].name} を購入、と言ってください。`;
        const repromptOutput = `購入するには、${product[0].name} を購入、と言ってください。 `;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      }
      return handlerInput.responseBuilder
        .speak('すみません、分かりませんでした。もう一度お願いできますか？')
        .reprompt('もう一度お願いできますか？')
        .getResponse();
    });
  },
};

// ユーザーが「{productCategory}を購入する」と明示的に言った時のハンドラー
// Alexaの購入フローをトリガーする
const BuyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
  },
  handle(handlerInput) {
    console.log('IN BUYINTENTHANDLER');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function initiatePurchase(result) {
      let productCategory = Alexa.getSlot(handlerInput.requestEnvelope, 'productCategory')
        .resolutions.resolutionsPerAuthority[0].values[0].value.id;

      // 購入する商品データを抽出
      const product = result.inSkillProducts.filter(record => record.referenceName === productCategory);

      // ** Buyディレクティブに送信し購入フローに進む ** 
      return handlerInput.responseBuilder
        .addDirective({
          type: 'Connections.SendRequest',
          name: 'Buy',
          payload: {
            InSkillProduct: {
              productId: product[0].productId,
            },
          },
          token: 'correlationToken',
        })
        .getResponse();
    });
  },
};

// ユーザーが「{productCategory}をキャンセル」と言った時のハンドラー
// Alexaのキャンセルフローをトリガーする
const CancelSubscriptionHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'CancelSubscriptionIntent';
  },
  handle(handlerInput) {
    console.log('IN CANCELINTENTHANDLER');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function initiateCancel(result) {
      let productCategory = Alexa.getSlot(handlerInput.requestEnvelope, 'productCategory')
        .resolutions.resolutionsPerAuthority[0].values[0].value.id;

      // 購入する商品データを抽出
      const product = result.inSkillProducts.filter(record => record.referenceName === productCategory);

      // Cancelディレクティブを送信
      return handlerInput.responseBuilder
        .addDirective({
          type: 'Connections.SendRequest',
          name: 'Cancel',
          payload: {
            InSkillProduct: {
              productId: product[0].productId,
            },
          },
          token: 'correlationToken',
        })
        .getResponse();
    });
  },
};

// Buy または Upsell フローが終わったあと、スキルのセッションが再開した時のハンドラー
// スキルはAlexaから Connections.Response イベントを受け取る。
const BuyResponseHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      (handlerInput.requestEnvelope.request.name === 'Buy' ||
        handlerInput.requestEnvelope.request.name === 'Upsell');
  },
  handle(handlerInput) {
    console.log('IN BUYRESPONSEHANDLER');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    const productId = handlerInput.requestEnvelope.request.payload.productId;

    return ms.getInSkillProducts(locale).then(function handlePurchaseResponse(result) {
      const product = result.inSkillProducts.filter(record => record.productId === productId);

      if (handlerInput.requestEnvelope.request.status.code === '200') {
        let speakOutput;
        let repromptOutput;
        let filteredFacts;
        let categoryFacts = ALL_FACTS;
        switch (handlerInput.requestEnvelope.request.payload.purchaseResult) {
          case 'ACCEPTED':
            // 購入した
            if (product[0].referenceName !== 'complete')
              categoryFacts = ALL_FACTS.filter(record => record.type === product[0].referenceName);

            speakOutput = `${product[0].name}のトリビアをどうぞ。${getRandomFact(categoryFacts)} 他のトリビアも聞きますか？ `;
            repromptOutput = `他のトリビアも聞きますか？`;
            break;
          case 'DECLINED':
            // 購入しなかった
            if (handlerInput.requestEnvelope.request.name === 'Buy') {
              // Buy リクエストでNOと言った場合
              speakOutput = `またチェックしてくださいね。他のトリビアを聞きますか？`;
              repromptOutput = '他のトリビアを聞きますか？';
              break;
            }
            // Upsell リクエストでNOと言った場合
            filteredFacts = getFilteredFacts(ALL_FACTS, handlerInput);
            speakOutput = `トリビアをどうぞ。${getRandomFact(filteredFacts)} 他のトリビアも聞きますか？`;
            repromptOutput = '他のトリビアも聞きますか？';
            break;
          case 'ALREADY_PURCHASED':
            // 既にその商品を購入している場合は、リクエストされたカテゴリーのトリビアを言う。
            if (product[0].referenceName !== 'complete')
              categoryFacts = ALL_FACTS.filter(record => record.type === product[0].referenceName);

            speakOutput = `${product[0].name} のトリビアをどうぞ。${getRandomFact(categoryFacts)} 他のトリビアも聞きますか？`;
            repromptOutput = `他のトリビアも聞きますか？`;
            break;
          default:
            // 何らかの理由で購入に失敗した場合。
            console.log(`unhandled purchaseResult: ${handlerInput.requestEnvelope.payload.purchaseResult} `);
            speakOutput = `購入できませんでした。音声ショッピングの設定やお支払い方法をご確認ください。他のトリビアを聞きますか？`;
            repromptOutput = '他のトリビアを聞きますか？';
            break;
        }
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      }
      // 処理中にエラーが発生した場合
      console.log(`Connections.Response indicated failure.error: ${handlerInput.requestEnvelope.request.status.message} `);

      return handlerInput.responseBuilder
        .speak('購入処理でエラーが発生しました。もう一度試すか、カスタマーサービスにご連絡ください。')
        .getResponse();
    });
  },
};

// Alexaのキャンセルプロセスで「キャンセルしますか？」の確認メッセージに対してユーザーが応答した時の処理
// スキルはAlexaから Connections.Response イベントを受け取る。
const CancelResponseHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      handlerInput.requestEnvelope.request.name === 'Cancel';
  },
  handle(handlerInput) {
    console.log('IN CANCELRESPONSEHANDLER');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    const productId = handlerInput.requestEnvelope.request.payload.productId;

    return ms.getInSkillProducts(locale).then(function handleCancelResponse(result) {
      const product = result.inSkillProducts.filter(record => record.productId === productId);

      console.log(`PRODUCT = ${JSON.stringify(product)} `);

      if (handlerInput.requestEnvelope.request.status.code === '200') {
        // ユーザーが「はい」(キャンセルする)と言った場合は、ACCEPTED
        // ユーザーが「いいえ」（キャンセルしない）と言った場合は、DECLINED
        // キャンセルできる商品がなかった場合は、NOT_ENTITLED
        if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'ACCEPTED') {
          const speakOutput = `他のトリビアも聞きますか？`;
          const repromptOutput = `他のトリビアも聞きますか？`;
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
        } else if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'NOT_ENTITLED') {
          const speakOutput = `キャンセルできるサブスクリプションはありません。他のトリビアを聞きますか？`;
          const repromptOutput = `他のトリビアを聞きますか？`;
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
        } else if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'DECLINED') {
          const speakOutput = `分かりました。他のトリビアを聞きますか？`;
          const repromptOutput = `他のトリビアも聞きますか？`;
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
        }
      }
      // 何らかのエラーが発生した場合
      console.log(`Connections.Response indicated failure.error: ${handlerInput.requestEnvelope.request.status.message} `);

      return handlerInput.responseBuilder
        .speak('キャンセル処理でエラーが発生しました。もう一度試すか、カスタマーサービスにご連絡ください。')
        .getResponse();
    });
  },
};

// セッション終了時のハンドラー
const SessionEndedHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest' ||
      (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent') ||
      (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
  },
  handle(handlerInput) {
    console.log('IN SESSIONENDEDHANDLER');
    return handlerInput.responseBuilder
      .speak(`さようなら。`)
      .getResponse();
  },
};

// エラーハンドラー
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${JSON.stringify(error.message)} `);
    console.log(`handlerInput: ${JSON.stringify(handlerInput)} `);
    return handlerInput.responseBuilder
      .speak('すみません、分かりませんでした。もう一度言ってください。')
      .reprompt('もう一度言ってください。')
      .getResponse();
  },
};


// その商品が存在するかどうかをチェックするヘルパー関数
function isProduct(product) {
  return product &&
    product.length > 0;
}

// その商品が購入済みかどうかをチェックするヘルパー関数
function isEntitled(product) {
  return isProduct(product) &&
    product[0].entitled === 'ENTITLED';
}


// Alexaサービスからスキルに入力されるRequestデータ(JSON)の内容をログにダンプ出力する(デバッグ用)
// Response Intercepter により、全てのレスポンスが送信される直前に処理される。ß
const RequestLog = {
  process(handlerInput) {
    console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)} `);
  },
};

// セッション開始時に、どの商品を既に購入しているかどうかを確認し、セッションアトリビュートに格納しておく
// Request Intercepter により、全てのリクエストハンドラーが呼ばれる直前に処理される。
const EntitledProductsCheck = {
  async process(handlerInput) {
    if (handlerInput.requestEnvelope.session.new === true) {
      try {
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const result = await ms.getInSkillProducts(locale);
        const entitledProducts = getAllEntitledProducts(result.inSkillProducts);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.entitledProducts = entitledProducts;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      } catch (error) {
        console.log(`Error calling InSkillProducts API: ${error} `);
      }
    }
  },
};

//  ハンドラーに入力されるhanderInputの内容と、ハンドラーから出力されるレスポンスの内容をログにダンプ出力する(デバッグ用)
//  Response Intercepter により、全てのレスポンスが送信される直前に処理される。
const ResponseLog = {
  process(handlerInput) {
    console.log(`RESPONSE BUILDER = ${JSON.stringify(handlerInput)} `);
    console.log(`RESPONSE = ${JSON.stringify(handlerInput.responseBuilder.getResponse())} `);
  },
};

exports.handler = Alexa.SkillBuilders.standard()
  .addRequestHandlers(
    LaunchRequestHandler,
    YesHandler,
    NoHandler,
    GetCategoryFactHandler,
    BuyResponseHandler,
    CancelResponseHandler,
    WhatCanIBuyHandler,
    ProductDetailHandler,
    BuyHandler,
    CancelSubscriptionHandler,
    SessionEndedHandler,
    HelpHandler
  )
  .addRequestInterceptors(
    RequestLog,
    EntitledProductsCheck,
  )
  .addResponseInterceptors(ResponseLog)
  .addErrorHandlers(ErrorHandler)
  .lambda();