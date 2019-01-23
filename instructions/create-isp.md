# Build An Alexa Skill with In-Skill Purchases - Premium Fact
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](./testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

# Create In-Skill Products

On [page #1](./voice-user-interface.md) of this guide, we created a voice user interface for the intents and utterances we expect from our users.  On [page #2](./lambda-function.md), we created a Lambda function that contains all of our logic for the skill.  On [page #3](./connect-vui-to-code.md), we connected those two pieces together.  Now we will create the in-skill products that customers can purchase.

This sample uses four in-skill products -- 3 one-time purchases (sometimes referred to as entitlements) and 1 subscription.  To get the full experience from this sample, you will need to create all of the products, however it will work with fewer -- just remember what you create and link to the skill!

1. Navigate to the Monetization Tool by clicking on the **In-Skill Products** section while on the **Build** tab of the Developer Console. 
    > If you cannot see the correct section in the left nav, click on the **Permissions** section, then click on **In-Skill Products**.
1. Click **Create in-skill product**.
1. Enter a Reference name.  This is code-friendly name you want to assign to your in-skill product.  For this sample, the code is expecting the reference name `all_access`.
    > Be sure to enter all the reference names exactly as provided.  They are used in the sample code and it won't work properly if the name does not match exactly.
1. Choose **Subscription**.
1. Click **Create in-skill product**.
1. On the **Distribution** sub-section, enter the following details for the subscription:

    Field|Description|Value for Sample
    -----|-----------|------------------
    **Display Name**|The display name of the product.  Customers will see and hear this.  | All Access
    **One sentence description**| Summary description of the product. Customers will hear this. | All Access is a great addition because you will hear facts about history, science and space, plus any future categories added.
    **Detailed Description**|A full description explaining the product's functionality and any prerequisites to using it. Customers will see this.| All Access expands the set of facts shared with you to include facts about history, science and space.
    **Example Phrases**| Example phrases customers can use to access your in-skill products. You should populate all three examples; for this sample, we'll just do one. | Buy All Access
    **Small Icon**| Small icon used with product when displayed in the skill store or Alexa app.  You can use this placeholder icon if you don't have an image you would like to use. | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_108.png
    **Large Icon**| Large icon used with product when displayed in the skill store or Alexa app. You can use this placeholder icon if you don't have an image you would like to use. | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_512.png
    **Keywords** | Keywords that will be used with search. | All Access
    **Purchase prompt description**| The description of the product a customer hears when making a purchase or when they cancel a subscription.| The All Access pass adds over 30 history, science and space facts into the set of facts randomly chosen to be shared with you.
    **Purchase confirmation description**|A description of the product that displays on the skill card in the Alexa app. Customers will see this. | Thanks for purchasing the All Access pass!  You now have access to history, science and space facts!
    **Privacy Policy URL**|A URL to the privacy policy for this locale. For this sample, we'll use a placeholder value. |https://localhost/privacy.html

    > Need help creating icons for your ISP or skill? Check out the [Alexa Skill Icon Builder](https://developer.amazon.com/docs/tools/icon-builder.html)

1. Click **Save and continue**.
1. On the **Pricing** sub-section, the default values (amazon.com, $0.99 USD, Monthly billing, 7 day trial, releasing "today") are fine for the sample, however you can change the values if you like.
1. Set the **Tax Category** to 'Information Services'.  This is suitable for this sample, however you should consult your tax professional for guidance on what to choose for this value.  The available options are listed [here](https://developer.amazon.com/docs/in-skill-purchase/create-isp-dev-console.html#tax-category)
1. Click **Save and continue**.
1. Normally you would provide testing instructions to help the certification team find and test your in-skill product.  (These testing instructions are specific to this in-skill product, and are in addition to the skill testing instructions you will provide on the **Certification** tab.)  We're going to leave them blank for now.
1. Click **Save and finish**.
1. If you've provided all the necessary information, you will be able to click **Link to skill** which will link this in-skill product with your skill.  If that's not an option, click **Continue** and then go back and fill in any missing information.
1. Nice!  You now have a subscription addd to your skill.
1. Repeat this process for the three one-time purchases using the data in the following table:

    Field|Value for History Pack|Value for Science Pack|Value for Space Pack
    -----|---|----|----
    **Reference Name**| `history_pack` | `science_pack` |  `space_pack`
    **In-Skill Product Type** | One-Time Purchase | One-Time Purchase | One-Time Purchase
    **Display name**| History Pack | Science Pack | Space Pack
    **One sentence description** | The history pack is a great addition because you will hear facts about history. | The science pack is a great addition because you will hear facts about science. | The space pack is a great addition because you will hear facts about space.
    **Detailed Description**| The history pack expands the set of facts shared with you to include facts about history. | The science pack expands the set of facts shared with you to include facts about science. | The space pack expands the set of facts shared with you to include facts about space.
    **Example Phrases**| buy history pack | buy science pack | buy space pack
    **Small Icon** (Placeholder)| https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_108.png | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_108.png | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_108.png 
    **Large Icon** (Placeholder) | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_512.png | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_512.png | https://s3.amazonaws.com/ask-samples-resources/icons/moneyicon_512.png
    **Keywords**| history | science | space
    **Purchase prompt description**| The history pack adds over 10 history facts into the set of facts randomly chosen to be shared with you. | The science pack adds over 10 science facts into the set of facts randomly chosen to be shared with you. | The space pack adds over 10 space facts into the set of facts randomly chosen to be shared with you.
    **Purchase confirmation description**| Thanks for purchasing the history pack.  You now have access to history facts! | Thanks for purchasing the science pack.  You now have access to science facts! | Thanks for purchasing the space pack.  You now have access to space facts!
    **Privacy Policy URL** (Placeholder)| https://localhost/privacy.html | https://localhost/privacy.html | https://localhost/privacy.html
    **Tax Category** (Placeholder) | Information Services | Information Services | Information Services

    > These above placeholder values are suitable to be used in the sample, however you should expect to use your own icons and urls when creating your in-skill products.  Failure to do so will prevent your skill from being certified.

Congrats!  You have added In-Skill Products to your skill.  Now you are ready to test!

> Before leaving the In-skill Products page, take a note of the links which say **Reset test purchases**.  During testing if you want to 'un-buy' one of your products so you can re-buy it, click on these links.

[![Next](./next.png)](./testing.md)