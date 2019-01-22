# Build An Alexa Skill with In-Skill Purchases - Premium Fact
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](./testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png)](./customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

## Customization / Next Steps

At this point, you should have a working copy of your skill. This is a clone of a sample skill, so if you want to publish the skill, you will first need to customize it so it offers content/functionality not currently available via the Alexa Skill Store.

### Update Facts

At the top of the index.js file you will find the facts which are vended by the skill.  Update the list of facts with new categories and facts (or quotes, sayings or other content).  Make a note of the categories you use, as we'll need to update the voice model and in-skill products.  You'll have the best results if you use a single word category (e.g. computers) rather than a category with more than one word.  This is due to how the code is optimized, so it's not required to be like that, just you will just need to test thoroughly to ensure your changes work completely.  (You should do that regardless. :) )  You can use a multi-word synonym in the voice model to map to the single word category (see how 'all_access' works).

## Update Voice Model

In the developer console, switch to the **Build** tab and locate the fact_type slot type.
Update the factType slot type with the categories you are using.  Remove the default fact types of science, history and space.  Be sure to save and build your model.

## Update/Create In-Skill Products

In the developer console, switch to the **In-Skill Products** sub-section of the **Build** tab.  Unlink/delete/modify products you don't intend to keep in your skill.  Repeat the process we used to add new in-skill products which match your categories.

As you may recall, the reference name had to match our code in order for it to work.  The 'matching' is the category name plus '_pack'.  So if you added a 'computer' category, the reference name will need to be 'computer_pack'.

### In-Skill Product Testing Instructions and Other Placeholders

You may recall we didn't provide testing instructions for our sample in-skill products.  When you are updating your in-skill products, be sure to include those testing instructions.  It does not have to be complex.  At a minimum, provide a simple scenario for how to invoke your skill and request your in-skill product.

Also update the privacy policy, icons and other placeholder values used as part of the sample.  As previously mentioned, your skill won't pass certification with placeholder values.

## Test, Test, Test

After making the above changes, be sure to test thoroughly.  After you're done testing, have a friend or colleague test as well.

## Publication

Once you've customized your skill, proceed to the certification / publication step.

[![Next](./next.png)](./publication.md)
