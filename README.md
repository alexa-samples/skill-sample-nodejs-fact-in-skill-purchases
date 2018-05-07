# Build An Alexa Skill with In-Skill Purchases
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/header._TTH_.png" />

## Setup the ASK CLI
There are several aspects of developing an Alexa skill with in-skill purchases that require the use of the Alexa Skills Kit Command Line Interface (ASK CLI), so this entire walkthrough will require you to have installed and configured the ASK CLI.  If you haven't done this before, here are the resources you need to get the ASK CLI installed on your machine:

* [Quick Start Guide for Installing the ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
* [ASK CLI Command Reference](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html)

If you have used the ASK CLI previously, you will also need to make sure that you have the most recent version of the ASK CLI.  You can make sure you have the latest version by running the command:

	```bash
	$ npm update -g ask-cli
	```

### Installation
1. **Create** a new skill using the CLI.

	```bash
	$ ask new
	```

2. **Name** the skill "Premium_Facts_Live".

	```bash
	? Please type in your new skill name:
 	Premium_Facts_Live
	```


3. **Navigate** to your project folder.

	```bash
	$ cd Premium_Facts_Live
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

8. **Go back** to the projects root folder.

	```bash
	$ cd ..
	```

9. **Replace** the contents of *package.json*  with the contents of [this JSON file](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/blob/master/lambda/custom/package.json), and save it.

10. **Navigate** to the lambda folder.

	```bash
	$ cd ../lambda/custom
	```

11. **Open** the AWS Lambda file, index.js.

	```bash
	$ open index.js
	```

12. **Replace** the contents of *index.js* with the contents of [this JS file](https://github.com/alexa/skill-sample-nodejs-fact-in-skill-purchases/blob/master/lambda/custom/index.js), and save it.

13. **Update** the Alexa SDK and the other npm dependencies.

	```bash
	$ npm update
	```

### Creating In-Skill Products

There are ASK CLI commands for creating your in-skill purchases.  This guide will walk you through creating three different one-time purchases (entitlements), as well as a subscription.  Our sample code is expecting these to be created as described, so make sure to follow along carefully.

1. **Navigate** back to the root project directory.

	```bash
	$ cd ../..
	```

2. **Create** your first in-skill product.

	```bash
	$ ask add isp
	```

3. **Choose** Entitlement.

	```bash
	? List of in-skill product types you can choose (Use arrow keys)
	❯ Entitlement
  	Subscription
	```

4. **Choose** Entitlement_Base as your template.

	```bash
	? List of in-skill product templates you can choose (Use arrow keys)
	❯ Entitlement_Template
	```

5. **Name** your in-skill product *science_pack*.

	```bash
	? Please type in your new in-skill product name:
 	(Entitlement_Template) science_pack
	```

6. **Repeat** steps #1 - #5 to create two more entitlements: *history_pack* and *space_pack*.

	```bash
	? Please type in your new in-skill product name:
 	(Entitlement_Template) science_pack
	```

7. **Create** a subscription product using a similar process.

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

	```bash
	$ cd entitlement
	$ ls
	```

	This JSON file contains all of the details necessary to sell your in-skill product.  Because we used the *Entitlement_Base* template, you should notice that this file already contains all of the information you need for a new pack of history facts.

	The other two files, *science_pack.json* and *space_pack.json* will look identical.  You will need to update these with content about your [science]() and [space]() products.  We have provided you with sample files you can use to replace the contents of those two files.

	**IMPORTANT: Don't change the *referenceName* in your files, as our codebase is relying on those to be consistent.**

	Once you are happy with your pricing, descriptions, and the other metadata for your three entitlements, you can also go back and review the content for your subscription.

11. **Review and edit** the subscription file.

	```bash
	$ cd ../subscription
	$ open all_access.json
	```

	Now that you have customized your in-skill products, you can deploy your skill using the ASK CLI, and start testing it.

### Deployment

1. **Navigate** to the project's root directory. You should see a file named 'skill.json' there.

	```bash
	$ cd ../..
	```

2. **Deploy** the skill and the lambda function in one step by running the following command:

	```bash
	$ ask deploy
	```
	Assuming that you followed all of the setup instructions for the ASK CLI, your entire skill and Lambda function should be created on their respective portals.


### Testing

1. To test, you need to login to [Alexa Developer Console](http://developer.amazon.com), and **enable the "Test" switch on your skill from the "Test" Tab**.

2. Your skill can now be tested on devices associated with your developer account, as well as the Test tab in the Developer Portal. To start using your skill, just type or say:

	```text
	Alexa, open premium facts live
	```



## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.
