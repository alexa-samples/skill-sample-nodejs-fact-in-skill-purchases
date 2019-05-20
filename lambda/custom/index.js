/* eslint-disable no-console */
/* eslint no-use-before-define: ["error", {"functions": false}] */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */

const Alexa = require('ask-sdk');

/*
    Static list of facts across 3 categories that serve as
    the free and premium content served by the Skill
*/
const ALL_FACTS = [
  { type: 'free', fact: '1年は365日です。' },
  { type: 'free', fact: 'いち日は24時間です。' },
  { type: 'science', fact: '人間の目は平均で１年に420万回のまばたきをします。' },
  { type: 'history', fact: 'レオナルド・ダ・ヴィンチは500年前に初めてのヘリコプターや潜水艦をデザインしました。' },
  { type: 'history', fact: '古代エジプトでは、ファラオからハエを遠ざけるため、奴隷にハチミツを塗っていました。' },
  { type: 'space', fact: '太陽は太陽系の全質量のうち99.86%を占めています。' },
];

const skillName = 'プレミアムトリビア';

/*
    Function to demonstrate how to filter inSkillProduct list to get list of
    all entitled products to render Skill CX accordingly
*/
function getAllEntitledProducts(inSkillProductList) {
  const entitledProductList = inSkillProductList.filter(record => record.entitled === 'ENTITLED');
  console.log(`Currently entitled products: ${JSON.stringify(entitledProductList)}`);
  return entitledProductList;
}

function getRandomFact(facts) {
  const factIndex = Math.floor(Math.random() * facts.length);
  return facts[factIndex].fact;
}

function getRandomYesNoQuestion() {
  const questions = ['他のトリビアを聞きますか？'];
  return questions[Math.floor(Math.random() * questions.length)];
}

function getRandomGoodbye() {
  const goodbyes = ['さようなら！', 'また使ってね！', ''];
  return goodbyes[Math.floor(Math.random() * goodbyes.length)];
}

function getFilteredFacts(factsToFilter, handlerInput) {
  // lookup entitled products, and filter accordingly
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  const entitledProducts = sessionAttributes.entitledProducts;
  let factTypesToInclude;
  if (entitledProducts) {
    factTypesToInclude = entitledProducts.map(item => item.referenceName.toLowerCase().replace('_pack', ''));
    factTypesToInclude.push('free');
  } else {
    // no entitled products, so just give free ones
    factTypesToInclude = ['free'];
  }
  console.log(`types to include: ${factTypesToInclude}`);
  if (factTypesToInclude.indexOf('all_access') >= 0) {
    return factsToFilter;
  }
  const filteredFacts = factsToFilter
    .filter(record => factTypesToInclude.indexOf(record.type) >= 0);

  return filteredFacts;
}

/*
    Helper function that returns a speakable list of product names from a list of
    entitled products.
*/
function getSpeakableListOfProducts(entitleProductsList) {
  const productNameList = entitleProductsList.map(item => item.name);
  let productListSpeech = productNameList.join('と、'); // Generate a single string with comma separated product names
  // productListSpeech = productListSpeech.replace(/_([^_]*)$/, 'and $1'); // Replace last comma with an 'and '
  return productListSpeech;
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log('IN LAUNCHREQUEST');

    // entitled products are obtained by request interceptor and stored in the session attributes
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const entitledProducts = sessionAttributes.entitledProducts;

    if (entitledProducts && entitledProducts.length > 0) {
      // Customer owns one or more products
      return handlerInput.responseBuilder
        .speak(`${skillName}へようこそ。現在、${getSpeakableListOfProducts(entitledProducts)}をお持ちです。` +
          'トリビアを聞くには、「トリビアを教えて」もしくは「歴史のトリビアを教えて」のように言ってみてください。' +
          '「何を買える？」と聞くとプレミアムコンテンツについて説明します。どうしますか？')
        .reprompt('どうしますか？')
        .getResponse();
    }

    // Not entitled to anything yet.
    console.log('No entitledProducts');
    return handlerInput.responseBuilder
      .speak(`${skillName}へようこそ。` +
        'トリビアを聞くには、「トリビアを教えて」もしくは「歴史のトリビアを教えて」のように言ってみてください。' +
        '「何を買える？」と聞くとプレミアムコンテンツについて説明します。どうしますか？')
      .reprompt('どうしますか？')
      .getResponse();
  },
}; // End LaunchRequestHandler

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

// IF THE USER SAYS YES, THEY WANT ANOTHER FACT.
const YesHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent' ||
       handlerInput.requestEnvelope.request.intent.name === 'GetRandomFactIntent');
  },
  handle(handlerInput) {
    console.log('In YesHandler');

    // reduce fact list to those purchased
    const filteredFacts = getFilteredFacts(ALL_FACTS, handlerInput);

    const speakOutput = `トリビアをどうぞ。${getRandomFact(filteredFacts)} ${getRandomYesNoQuestion()}`;
    const repromptOutput = getRandomYesNoQuestion();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

// IF THE USER SAYS NO, THEY DON'T WANT ANOTHER FACT.  EXIT THE SKILL.
const NoHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    console.log('IN NOHANDLER');

    const speakOutput = getRandomGoodbye();
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const GetCategoryFactHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'GetCategoryFactIntent';
  },
  handle(handlerInput) {
    console.log('In GetCategoryFactHandler');

    const factCategory = getResolvedValue(handlerInput.requestEnvelope, 'factCategory');
    const factCategoryValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'factCategory');
    console.log(`FACT CATEGORY = XX ${factCategory} XX`);
    let categoryFacts = ALL_FACTS;

    // IF THERE WAS NOT AN ENTITY RESOLUTION MATCH FOR THIS SLOT VALUE
    if (factCategory === undefined) {
      const slotValue = getSpokenValue(handlerInput.requestEnvelope, 'factCategory');
      let speakPrefix = '';
      if (slotValue !== undefined) speakPrefix = `${slotValue}ですね。`;
      const speakOutput = `${speakPrefix}そのカテゴリのトリビアはありません。科学、宇宙、歴史のどれにしますか？`;
      const repromptOutput = '科学、宇宙、歴史のどれにしますか？';

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptOutput)
        .getResponse();
    }

    // these are all used somewhere in the switch statement
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
        // don't need to buy 'free' category, so give what was asked
        categoryFacts = ALL_FACTS.filter(record => record.type === factCategory);
        speakOutput = `トリビアをどうぞ。${getRandomFact(categoryFacts)} ${getRandomYesNoQuestion()}`;
        repromptOutput = getRandomYesNoQuestion();
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      case 'random':
      case 'all_access':
        // choose from the available facts based on entitlements
        filteredFacts = getFilteredFacts(ALL_FACTS, handlerInput);
        speakOutput = `トリビアをどうぞ。${getRandomFact(filteredFacts)} ${getRandomYesNoQuestion()}`;
        repromptOutput = getRandomYesNoQuestion();
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      default:
        // IF THERE WAS AN ENTITY RESOLUTION MATCH FOR THIS SLOT VALUE
        categoryFacts = ALL_FACTS.filter(record => record.type === factCategory);
        locale = handlerInput.requestEnvelope.request.locale;
        ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

        return ms.getInSkillProducts(locale).then(function checkForProductAccess(result) {
          subscription = result.inSkillProducts.filter(record => record.referenceName === 'all_access');
          categoryProduct = result.inSkillProducts.filter(record => record.referenceName === `${factCategory}_pack`);

          // IF USER HAS ACCESS TO THIS PRODUCT
          if (isEntitled(subscription) || isEntitled(categoryProduct)) {
            speakOutput = `トリビアをどうぞ。${getRandomFact(categoryFacts)} ${getRandomYesNoQuestion()}`;
            repromptOutput = getRandomYesNoQuestion();

            return handlerInput.responseBuilder
              .speak(speakOutput)
              .reprompt(repromptOutput)
              .getResponse();
          }

          upsellMessage = `${factCategoryValue}パックはまだ購入していません。 ${categoryProduct[0].summary}詳細を聞きますか？`;

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


// Following handler demonstrates how skills can hanlde user requests to discover what
// products are available for purchase in-skill.
// Use says: Alexa, ask Premium facts what can i buy
const WhatCanIBuyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'WhatCanIBuyIntent';
  },
  handle(handlerInput) {
    console.log('In WhatCanIBuy Handler');

    // Inform the user about what products are available for purchase

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function fetchPurchasableProducts(result) {
      const purchasableProducts = result.inSkillProducts.filter(record => record.entitled === 'NOT_ENTITLED' && record.purchasable === 'PURCHASABLE');

      return handlerInput.responseBuilder
        .speak(`現在購入できる商品は、${getSpeakableListOfProducts(purchasableProducts)}です。` +
          '詳しく知りたい場合には、歴史パックについて教えて、のように言ってみてください。' +
          'また購入する場合には、宇宙パックを購入、のように言ってください。どうしますか？')
        .reprompt('どうしますか？')
        .getResponse();
    });
  },
};

// Following handler demonstrates how skills can hanlde user requests to discover what
// products are available for purchase in-skill.
// Use says: Alexa, ask Premium facts what can i buy
const ProductDetailHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ProductDetailIntent';
  },
  handle(handlerInput) {
    console.log('IN PRODUCT DETAIL HANDLER');

    // Describe the requested product to the user using localized information
    // from the entitlements API

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function fetchProductDetails(result) {
      let productCategory = getResolvedValue(handlerInput.requestEnvelope, 'productCategory');
      const spokenCategory = getSpokenValue(handlerInput.requestEnvelope, 'productCategory');

      // nothing spoken for the slot value
      if (spokenCategory === undefined) {
        return handlerInput.responseBuilder
          .addDelegateDirective()
          .getResponse();
      }

      // NO ENTITY RESOLUTION MATCH
      if (productCategory === undefined) {
        return handlerInput.responseBuilder
          .speak('すみません、分かりませんでした。もう一度お願いできますか？')
          .reprompt('もう一度お願いできますか？')
          .getResponse();
      }

      if (productCategory !== 'all_access') productCategory += '_pack';

      const product = result.inSkillProducts
        .filter(record => record.referenceName === productCategory);

      if (isProduct(product)) {
        const speakOutput = `${product[0].summary}購入するには、${product[0].name}を購入、と言ってください。`;
        const repromptOutput = `購入するには、${product[0].name}を購入、と言ってください。 `;
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

// Following handler demonstrates how Skills would recieve Buy requests from customers
// and then trigger a Purchase flow request to Alexa
const BuyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
  },
  handle(handlerInput) {
    console.log('IN BUYINTENTHANDLER');

    // Inform the user about what products are available for purchase

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function initiatePurchase(result) {
      let productCategory = getResolvedValue(handlerInput.requestEnvelope, 'productCategory');

      // NO ENTITY RESOLUTION MATCH
      if (productCategory === undefined) {
        productCategory = 'all_access';
      } else if (productCategory !== 'all_access') {
        productCategory += '_pack';
      }

      const product = result.inSkillProducts
        .filter(record => record.referenceName === productCategory);

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

// Following handler demonstrates how Skills would receive Cancel requests from customers
// and then trigger a cancel request to Alexa
// User says: Alexa, ask <skill name> to cancel <product name>
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
      let productCategory = getResolvedValue(handlerInput.requestEnvelope, 'productCategory');

      if (productCategory === undefined) {
        productCategory = 'all_access';
      } else {
        productCategory += '_pack';
      }

      const product = result.inSkillProducts
        .filter(record => record.referenceName === productCategory);

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

// THIS HANDLES THE CONNECTIONS.RESPONSE EVENT AFTER A BUY or UPSELL OCCURS.
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
      console.log(`PRODUCT = ${JSON.stringify(product)}`);
      if (handlerInput.requestEnvelope.request.status.code === '200') {
        let speakOutput;
        let repromptOutput;
        let filteredFacts;
        let categoryFacts = ALL_FACTS;
        switch (handlerInput.requestEnvelope.request.payload.purchaseResult) {
          case 'ACCEPTED':
            if (product[0].referenceName !== 'all_access') categoryFacts = ALL_FACTS.filter(record => record.type === product[0].referenceName.replace('_pack', ''));

            speakOutput = `${product[0].name}を聞けるようになりました。${product[0].referenceName.replace('_pack', '').replace('all_access', '')}トリビアをどうぞ。${getRandomFact(categoryFacts)} ${getRandomYesNoQuestion()}`;
            repromptOutput = getRandomYesNoQuestion();
            break;
          case 'DECLINED':
            if (handlerInput.requestEnvelope.request.name === 'Buy') {
              // response when declined buy request
              speakOutput = `またチェックしてくださいね。他のトリビアを聞きますか？`;
              repromptOutput = '他のトリビアを聞きますか？';
              break;
            }
            // response when declined upsell request
            filteredFacts = getFilteredFacts(ALL_FACTS, handlerInput);
            speakOutput = `トリビアをどうぞ。${getRandomFact(filteredFacts)}他のトリビアも聞きますか？`;
            repromptOutput = '他のトリビアも聞きますか？';
            break;
          case 'ALREADY_PURCHASED':
            // may have access to more than what was asked for, but give them a random
            // fact from the product they asked to buy
            if (product[0].referenceName !== 'all_access') categoryFacts = ALL_FACTS.filter(record => record.type === product[0].referenceName.replace('_pack', ''));

            speakOutput = `${product[0].referenceName.replace('_pack', '').replace('all_access', '')}のトリビアをどうぞ。${getRandomFact(categoryFacts)} ${getRandomYesNoQuestion()}`;
            repromptOutput = getRandomYesNoQuestion();
            break;
          default:
            console.log(`unhandled purchaseResult: ${handlerInput.requestEnvelope.payload.purchaseResult}`);
            speakOutput = `購入できませんでした。音声ショッピングの設定やお支払い方法をご確認ください。他のトリビアを聞きますか？`;
            repromptOutput = '他のトリビアを聞きますか？';
            break;
        }
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      }
      // Something failed.
      console.log(`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message}`);

      return handlerInput.responseBuilder
        .speak('購入処理でエラーが発生しました。もう一度試すか、カスタマーサービスにご連絡ください。')
        .getResponse();
    });
  },
};

// THIS HANDLES THE CONNECTIONS.RESPONSE EVENT AFTER A CANCEL OCCURS.
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
      console.log(`PRODUCT = ${JSON.stringify(product)}`);
      if (handlerInput.requestEnvelope.request.status.code === '200') {
        if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'ACCEPTED') {
          const speakOutput = `${getRandomYesNoQuestion()}`;
          const repromptOutput = getRandomYesNoQuestion();
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
        } else if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'NOT_ENTITLED') {
          const speakOutput = `キャンセルできるサブスクリプションはありません。${getRandomYesNoQuestion()}`;
          const repromptOutput = getRandomYesNoQuestion();
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
        } else if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'DECLINED') {
          const speakOutput = `分かりました。${getRandomYesNoQuestion()}`;
          const repromptOutput = getRandomYesNoQuestion();
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
        }
      }
      // Something failed.
      console.log(`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message}`);

      return handlerInput.responseBuilder
        .speak('キャンセル処理でエラーが発生しました。もう一度試すか、カスタマーサービスにご連絡ください。')
        .getResponse();
    });
  },
};

const SessionEndedHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest' ||
      (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent') ||
      (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
  },
  handle(handlerInput) {
    console.log('IN SESSIONENDEDHANDLER');
    return handlerInput.responseBuilder
      .speak(getRandomGoodbye())
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    console.log('IN FallbackHandler');
    return handlerInput.responseBuilder
      .speak('すみません、分かりませんでした。もう一度言ってください。')
      .reprompt('もう一度言ってください。')
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${JSON.stringify(error.message)}`);
    console.log(`handlerInput: ${JSON.stringify(handlerInput)}`);
    return handlerInput.responseBuilder
      .speak('すみません、分かりませんでした。もう一度言ってください。')
      .reprompt('もう一度言ってください。')
      .getResponse();
  },
};

function getResolvedValue(requestEnvelope, slotName) {
  if (requestEnvelope &&
    requestEnvelope.request &&
    requestEnvelope.request.intent &&
    requestEnvelope.request.intent.slots &&
    requestEnvelope.request.intent.slots[slotName] &&
    requestEnvelope.request.intent.slots[slotName].resolutions &&
    requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority &&
    requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0] &&
    requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values &&
    requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0]
      .values[0] &&
    requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values[0]
      .value &&
    requestEnvelope.request.intent.slots[slotName].resolutions.resolutionsPerAuthority[0].values[0]
      .value.name) {
    return requestEnvelope.request.intent.slots[slotName].resolutions
      .resolutionsPerAuthority[0].values[0].value.id;
  }
  return undefined;
}

function getSpokenValue(requestEnvelope, slotName) {
  if (requestEnvelope &&
    requestEnvelope.request &&
    requestEnvelope.request.intent &&
    requestEnvelope.request.intent.slots &&
    requestEnvelope.request.intent.slots[slotName] &&
    requestEnvelope.request.intent.slots[slotName].value) {
    return requestEnvelope.request.intent.slots[slotName].value;
  }
  return undefined;
}

function isProduct(product) {
  return product &&
    product.length > 0;
}

function isEntitled(product) {
  return isProduct(product) &&
    product[0].entitled === 'ENTITLED';
}

/*
function getProductByProductId(productId) {
  var product_record = res.inSkillProducts.filter(record => record.referenceName == productRef);
}
*/

const RequestLog = {
  process(handlerInput) {
    console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
  },
};

const EntitledProductsCheck = {
  async process(handlerInput) {
    if (handlerInput.requestEnvelope.session.new === true) {
      // new session, check to see what products are already owned.
      try {
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const result = await ms.getInSkillProducts(locale);
        const entitledProducts = getAllEntitledProducts(result.inSkillProducts);
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.entitledProducts = entitledProducts;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      } catch (error) {
        console.log(`Error calling InSkillProducts API: ${error}`);
      }
    }
  },
};

const ResponseLog = {
  process(handlerInput) {
    console.log(`RESPONSE BUILDER = ${JSON.stringify(handlerInput)}`);
    console.log(`RESPONSE = ${JSON.stringify(handlerInput.responseBuilder.getResponse())}`);
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
    HelpHandler,
    FallbackHandler,
  )
  .addRequestInterceptors(
    RequestLog,
    EntitledProductsCheck,
  )
  .addResponseInterceptors(ResponseLog)
  .addErrorHandlers(ErrorHandler)
  .lambda();