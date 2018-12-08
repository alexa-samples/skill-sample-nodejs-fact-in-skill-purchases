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
  { type: 'free', fact: 'There are 365 days in a year, except leap years, which have 366 days.' },
  { type: 'free', fact: 'What goes up, must come down.  Except when it doesn\'t.' },
  { type: 'free', fact: 'Two wrongs don\'t make a right, but three lefts do.' },
  { type: 'free', fact: 'There are 24 hours in a day.' },
  { type: 'science', fact: 'There is enough DNA in an average person\'s body to stretch from the sun to Pluto and back — 17 times.' },
  { type: 'science', fact: 'The average human body carries ten times more bacterial cells than human cells.' },
  { type: 'science', fact: 'It can take a photon 40,000 years to travel from the core of the sun to its surface, but only 8 minutes to travel the rest of the way to Earth.' },
  { type: 'science', fact: 'At over 2000 kilometers long, The Great Barrier Reef is the largest living structure on Earth.' },
  { type: 'science', fact: 'There are 8 times as many atoms in a teaspoonful of water as there are teaspoonfuls of water in the Atlantic ocean.' },
  { type: 'science', fact: 'The average person walks the equivalent of five times around the world in a lifetime.' },
  { type: 'science', fact: 'When Helium is cooled to absolute zero it flows against gravity and will start running up and over the lip of a glass container!' },
  { type: 'science', fact: 'An individual blood cell takes about 60 seconds to make a complete circuit of the body.' },
  { type: 'science', fact: 'The longest cells in the human body are the motor neurons. They can be up to 4.5 feet (1.37 meters) long and run from the lower spinal cord to the big toe.' },
  { type: 'science', fact: 'The human eye blinks an average of 4,200,000 times a year.' },
  { type: 'history', fact: 'The Hundred Years War actually lasted 116 years from thirteen thirty seven to fourteen fifty three.' },
  { type: 'history', fact: 'There are ninety two known cases of nuclear bombs lost at sea.' },
  { type: 'history', fact: 'Despite popular belief, Napoleon Bonaparte stood 5 feet 6 inch tall. Average height for men at the time.' },
  { type: 'history', fact: 'Leonardo Da Vinci designed the first helicopter, tank, submarine, parachute and ammunition igniter... Five hundred years ago.' },
  { type: 'history', fact: 'The shortest war on record was fought between Zanzibar and England in eighteen ninety six. Zanzibar surrendered after 38 minutes.' },
  { type: 'history', fact: 'X-rays of the Mona Lisa show that there are 3 different versions under the present one.' },
  { type: 'history', fact: 'At Andrew Jackson\'s funeral in 1845, his pet parrot had to be removed because it was swearing too much.' },
  { type: 'history', fact: 'English was once a language for “commoners,” while the British elites spoke French.' },
  { type: 'history', fact: 'In ancient Egypt, servants were smeared with honey in order to attract flies away from the pharaoh.' },
  { type: 'history', fact: 'Ronald Reagan was a lifeguard during high school and saved 77 people’s lives.' },
  { type: 'space', fact: 'A year on Mercury is just 88 days long.' },
  { type: 'space', fact: 'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.' },
  { type: 'space', fact: 'Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.' },
  { type: 'space', fact: 'On Mars, the Sun appears about half the size as it does on Earth.' },
  { type: 'space', fact: 'Earth is the only planet not named after a god.' },
  { type: 'space', fact: 'Jupiter has the shortest day of all the planets.' },
  { type: 'space', fact: 'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.' },
  { type: 'space', fact: 'The Sun contains 99.86% of the mass in the Solar System.' },
  { type: 'space', fact: 'The Sun is an almost perfect sphere.' },
  { type: 'space', fact: 'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.' },
];

const skillName = 'Premium Facts Sample';

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
  const questions = ['Would you like another fact?', 'Can I tell you another fact?', 'Do you want to hear another fact?'];
  return questions[Math.floor(Math.random() * questions.length)];
}

function getRandomGoodbye() {
  const goodbyes = ['OK.  Goodbye!', 'Have a great day!', 'Come back again soon!'];
  return goodbyes[Math.floor(Math.random() * goodbyes.length)];
}

function getFilteredFacts(factsToFilter, handlerInput) {
  // lookup entitled products, and filter accordingly
  const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
  const entitledProducts = sessionAttributes.entitledProducts;
  let factTypesToInclude;
  if (entitledProducts) {
    factTypesToInclude = entitledProducts.map(item => item.name.toLowerCase().replace(' pack', ''));
    factTypesToInclude.push('free');
  } else {
    // no entitled products, so just give free ones
    factTypesToInclude = ['free'];
  }
  console.log(`types to include: ${factTypesToInclude}`);
  if (factTypesToInclude.indexOf('all access') >= 0) {
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
  let productListSpeech = productNameList.join(', '); // Generate a single string with comma separated product names
  productListSpeech = productListSpeech.replace(/_([^_]*)$/, 'and $1'); // Replace last comma with an 'and '
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
        .speak(`Welcome to ${skillName}. You currently own ${getSpeakableListOfProducts(entitledProducts)}` +
          ' products. To hear a random fact, you could say, \'Tell me a fact\' or you can ask' +
          ' for a specific category you have purchased, for example, say \'Tell me a science fact\'. ' +
          ' To know what else you can buy, say, \'What can i buy?\'. So, what can I help you' +
          ' with?')
        .reprompt('I didn\'t catch that. What can I help you with?')
        .getResponse();
    }

    // Not entitled to anything yet.
    console.log('No entitledProducts');
    return handlerInput.responseBuilder
      .speak(`Welcome to ${skillName}. To hear a random fact you can say 'Tell me a fact',` +
        ' or to hear about the premium categories for purchase, say \'What can I buy\'. ' +
        ' For help, say , \'Help me\'... So, What can I help you with?')
      .reprompt('I didn\'t catch that. What can I help you with?')
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
      .speak('To hear a random fact, you could say, \'Tell me a fact\' or you can ask' +
      ' for a specific category you have purchased, for example, say \'Tell me a science fact\'. ' +
      ' To know what else you can buy, say, \'What can i buy?\'. So, what can I help you' +
      ' with?')
      .reprompt('I didn\'t catch that. What can I help you with?')
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

    const speakOutput = `Here's your random fact: ${getRandomFact(filteredFacts)} ${getRandomYesNoQuestion()}`;
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
    console.log(`FACT CATEGORY = XX ${factCategory} XX`);
    let categoryFacts = ALL_FACTS;

    // IF THERE WAS NOT AN ENTITY RESOLUTION MATCH FOR THIS SLOT VALUE
    if (factCategory === undefined) {
      const slotValue = getSpokenValue(handlerInput.requestEnvelope, 'factCategory');
      let speakPrefix = '';
      if (slotValue !== undefined) speakPrefix = `I heard you say ${slotValue}. `;
      const speakOutput = `${speakPrefix} I don't have facts for that category.  You can ask for science, space, or history facts.  Which one would you like?`;
      const repromptOutput = 'Which fact category would you like?  I have science, space, or history.';

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
        speakOutput = `Here's your ${factCategory} fact: ${getRandomFact(categoryFacts)} ${getRandomYesNoQuestion()}`;
        repromptOutput = getRandomYesNoQuestion();
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      case 'random':
      case 'all_access':
        // choose from the available facts based on entitlements
        filteredFacts = getFilteredFacts(ALL_FACTS, handlerInput);
        speakOutput = `Here's your random fact: ${getRandomFact(filteredFacts)} ${getRandomYesNoQuestion()}`;
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
            speakOutput = `Here's your ${factCategory} fact: ${getRandomFact(categoryFacts)} ${getRandomYesNoQuestion()}`;
            repromptOutput = getRandomYesNoQuestion();

            return handlerInput.responseBuilder
              .speak(speakOutput)
              .reprompt(repromptOutput)
              .getResponse();
          }
          upsellMessage = `You don't currently own the ${factCategory} pack. ${categoryProduct[0].summary} Want to learn more?`;

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
const ShoppingHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ShoppingIntent';
  },
  handle(handlerInput) {
    console.log('In Shopping Handler');

    // Inform the user about what products are available for purchase

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function fetchPurchasableProducts(result) {
      const purchasableProducts = result.inSkillProducts.filter(record => record.entitled === 'NOT_ENTITLED' && record.purchasable === 'PURCHASABLE');

      return handlerInput.responseBuilder
        .speak(`Products available for purchase at this time are ${getSpeakableListOfProducts(purchasableProducts)}` +
          '. To learn more about a product, say \'Tell me more about\' followed by the product name. ' +
          ' If you are ready to buy say \'Buy\' followed by the product name. So what can I help you with?')
        .reprompt('I didn\'t catch that. What can I help you with?')
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
          .speak('I don\'t think we have a product by that name.  Can you try again?')
          .reprompt('I didn\'t catch that. Can you try again?')
          .getResponse();
      }

      if (productCategory !== 'all_access') productCategory += '_pack';

      const product = result.inSkillProducts
        .filter(record => record.referenceName === productCategory);

      if (isProduct(product)) {
        const speakOutput = `${product[0].summary}. To buy it, say Buy ${product[0].name}. `;
        const repromptOutput = `I didn't catch that. To buy ${product[0].name}, say Buy ${product[0].name}. `;
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(repromptOutput)
          .getResponse();
      }
      return handlerInput.responseBuilder
        .speak('I don\'t think we have a product by that name.  Can you try again?')
        .reprompt('I didn\'t catch that. Can you try again?')
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

            speakOutput = `You have unlocked the ${product[0].name}.  Here is your ${product[0].referenceName.replace('_pack', '').replace('all_access', '')} fact: ${getRandomFact(categoryFacts)} ${getRandomYesNoQuestion()}`;
            repromptOutput = getRandomYesNoQuestion();
            break;
          case 'DECLINED':
            if (handlerInput.requestEnvelope.request.name === 'Buy') {
              // response when declined buy request
              speakOutput = `Thanks for your interest in the ${product[0].name}.  Would you like another random fact?`;
              repromptOutput = 'Would you like another random fact?';
              break;
            }
            // response when declined upsell request
            filteredFacts = getFilteredFacts(ALL_FACTS, handlerInput);
            speakOutput = `OK.  Here's a random fact: ${getRandomFact(filteredFacts)} Would you like another random fact?`;
            repromptOutput = 'Would you like another random fact?';
            break;
          case 'ALREADY_PURCHASED':
            // may have access to more than what was asked for, but give them a random
            // fact from the product they asked to buy
            if (product[0].referenceName !== 'all_access') categoryFacts = ALL_FACTS.filter(record => record.type === product[0].referenceName.replace('_pack', ''));

            speakOutput = `Here is your ${product[0].referenceName.replace('_pack', '').replace('all_access', '')} fact: ${getRandomFact(categoryFacts)} ${getRandomYesNoQuestion()}`;
            repromptOutput = getRandomYesNoQuestion();
            break;
          default:
            console.log(`unhandled purchaseResult: ${handlerInput.requestEnvelope.payload.purchaseResult}`);
            speakOutput = `Something unexpected happened, but thanks for your interest in the ${product[0].name}.  Would you like another random fact?`;
            repromptOutput = 'Would you like another random fact?';
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
        .speak('There was an error handling your purchase request. Please try again or contact us for help.')
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
          const speakOutput = `You have successfully cancelled your subscription. ${getRandomYesNoQuestion()}`;
          const repromptOutput = getRandomYesNoQuestion();
          return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
        }
        if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'NOT_ENTITLED') {
          const speakOutput = `You don't currently have a subscription to cancel. ${getRandomYesNoQuestion()}`;
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
        .speak('There was an error handling your purchase request. Please try again or contact us for help.')
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
      .speak('Sorry, I didn\'t understand what you meant. Please try again.')
      .reprompt('Sorry, I didn\'t understand what you meant. Please try again.')
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
      .speak('Sorry, I didn\'t understand what you meant. Please try again.')
      .reprompt('Sorry, I didn\'t understand what you meant. Please try again.')
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
      .resolutionsPerAuthority[0].values[0].value.name;
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
    ShoppingHandler,
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
