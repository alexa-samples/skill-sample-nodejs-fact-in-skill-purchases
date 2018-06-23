# Build An Alexa Skill with In-Skill Purchases
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />

## Setup the ASK CLI
There are several aspects of developing an Alexa skill with in-skill purchases that require the use of the Alexa Skills Kit Command Line Interface (ASK CLI), so this entire walkthrough will require you to have installed and configured the ASK CLI.  If you haven't done this before, here are the resources you need to get the ASK CLI installed on your machine:

* [Quick Start Guide for Installing the ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
* [ASK CLI Command Reference](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html)

If you have used the ASK CLI previously, you will also need to **make sure** that you have the **most recent version** of the ASK CLI.  You can make sure you have the latest version by running the command:

```bash
$ npm update -g ask-cli
```

### Installation

> _Note: if you have git installed, you can clone this repo and skip this section._

> _Note: if you don't have git installed and want to skip this section, download the repo as a zip from [here](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/archive/master.zip)._

1. **Create** a new skill using the CLI.

	```bash
	$ ask new
	```

2. **Name** the skill "Premium_Facts_Sample".

	```bash
	? Please type in your new skill name:
 	Premium_Facts_Sample
	```


3. **Navigate** to your project folder.

	```bash
	$ cd Premium_Facts_Sample
	```

4. **Explore** the project structure.  You should see folders for lambda and models, and skill.json file.

	```bash
	$ ls
	lambda		models		skill.json
	```

5. **Open** the models folder.

	```bash
	$ cd models
	```

6. **Open** the interaction model file, en-US.json.

	```bash
	$ open en-US.json
	```

7. **Replace** the contents of *en-US.json* with the contents of [this JSON file](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/blob/master/models/en-US.json), and save it.

8. **Go back** to the project's root folder.

	```bash
	$ cd ..
	```

9. **Navigate** to the custom folder under the lambda folder.

	```bash
	$ cd lambda/custom
	```

10. **Open** the AWS Lambda function code file, index.js.

	```bash
	$ open index.js
	```

11. **Replace** the contents of *index.js* with the contents of [this JS file](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/blob/master/lambda/custom/index.js), and save it.

12. **Replace** the contents of *package.json*  with the contents of [this JSON file](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/blob/master/lambda/custom/package.json), and save it.

13. While still in the lambda/custom folder, **update** the ASK SDK and the other npm dependencies by running `npm update`.

	```bash
	$ npm update
	```
1. **Navigate** back to the root project directory.

	```bash
	$ cd ../..
	```

### Creating In-Skill Products

There are ASK CLI commands for creating your in-skill purchases.  This guide will walk you through creating three different one-time purchases (entitlements), as well as a subscription.  Our sample code is expecting these to be created as described, so make sure to follow along carefully.

1. **Create** your first in-skill product.  You should be in the project's root directory.

	```bash
	$ ask add isp
	```

3. **Choose** Entitlement.

	```bash
	? List of in-skill product types you can choose (Use arrow keys)
	❯ Entitlement
  	Subscription
	```

4. **Choose** Entitlement_Template as your template.

	```bash
	? List of in-skill product templates you can choose (Use arrow keys)
	❯ Entitlement_Template
	```

5. **Name** your in-skill product *science_pack*.

	```bash
	? Please type in your new in-skill product name:
 	(Entitlement_Template) science_pack
	```

6. **Repeat** steps #2 - #5 to create two more entitlements: *history_pack* and *space_pack*.

	```bash
	? Please type in your new in-skill product name:
 	(Entitlement_Template) history_pack
	...
	? Please type in your new in-skill product name:
 	(Entitlement_Template) space_pack
	```

7. **Create** a subscription product named *all_access* using a similar process.

	```bash
	$ ask add isp

	? List of in-skill product types you can choose (Use arrow keys)
	  Entitlement
	❯ Subscription

	? List of in-skill product templates you can choose (Use arrow keys)
	❯ Subscription_Template

	? Please type in your new in-skill product name:
 	(Subscription_Template) all_access

8. **Navigate** to the new ISPs directory, and note the two folders, *entitlement* and *subscription*.  This is where the JSON files for each of your in-skill products reside.

	```bash
	$ cd isps
	$ ls
	```

9. **Navigate** to the *entitlement* folder.  You should see three files in this directory, one for each of the entitlements you created in our previous steps.

	```bash
	$ cd entitlement
	$ ls
	```

10. **Open** history_pack.json

	This JSON file contains all of the necessary fields for your in-skill product, but you'll need to add the details to get them ready to sell. Because we used the Entitlement_Template template, we have provided a small explanation for each field, make sure you replace all of them. Take a look at [the sample in our docs](https://developer.amazon.com/docs/smapi/isp-schemas.html#entitlement-schema) for an additional reference.  For this sample, at a minimum, you will need to update the name (not referenceName!), smallIconUri, largeIconUri, summary, description, purchasePromptDescription, boughtCardDescription, releaseDate and privacyPolicyUrl.  Alternatively you can copy and paste the contents of the files found here: [ISP Entitlements](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/tree/master/isps.samples/entitlement).

	After updating *history.pack.json*, Fill out the details for the *science_pack.json* and *space_pack.json* files.  You will need to update with content about your science and space products including icons for each.

	> **IMPORTANT: Don't change the *referenceName* in your files, as our codebase is relying on those to be consistent.**

	Once you are happy with your pricing, descriptions, and the other metadata for your three entitlements, you should update the same fields plus the subscriptionPaymentFrequency for your subscription.  Alternatively you can copy and paste the contents of [All Access ISP subscription sample](https://raw.githubusercontent.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/master/isps.samples/subscription/all_access.json) into your *all_access.json* file.

11. **Review and edit** the subscription file.

	```bash
	$ cd ../subscription
	$ open all_access.json
	```

	Now that you have customized your in-skill products, you can deploy your skill using the ASK CLI, and start testing it.

	> _Note: be sure to review the output to confirm there were no errors._

### Deployment

1. **Navigate** to the project's root directory. You should see a file named 'skill.json' there.

	```bash
	$ cd ../..
	```

2. **Deploy** the skill and the Lambda function in one step by running the following command:

	```bash
	$ ask deploy
	```
	Assuming that you followed all of the setup instructions for the ASK CLI, your entire skill and Lambda function should be created on their respective portals.


### Testing

1. To test, login to [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask), click on the **Premium Facts Sample** entry in your skill list, and click on the "Test" tab.  The "Test" switch on your skill should have been automatically enabled.  If it was not, enable it now.

2. Your skill can now be tested on devices associated with your developer account, as well as the Test tab in the Developer Portal. To start using your skill, just type or say:

	```text
	Alexa, open premium facts sample
	```

**Note: The developer account associated with the skill is never charged for in-skill products.**  For more details about testing skills with in-skill products, please refer to the [In-Skill Purchase Testing Guide](https://developer.amazon.com/docs/in-skill-purchase/isp-test-guide.html)



## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.
