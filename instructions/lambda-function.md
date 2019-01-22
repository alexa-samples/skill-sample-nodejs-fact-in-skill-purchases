# Build An Alexa Skill with In-Skill Purchases - Premium Fact
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-on._TTH_.png)](./lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](./connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](./testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

## Setting Up A Lambda Function Using Amazon Web Services

In the [first step of this guide](./voice-user-interface.md), we built the Voice User Interface (VUI) for our Alexa skill.  On this page, we will be creating an AWS Lambda function using [Amazon Web Services](http://aws.amazon.com).  You can [read more about what a Lambda function is](http://aws.amazon.com/lambda), but for the purposes of this guide, what you need to know is that AWS Lambda is where the code lives.  When a user asks Alexa to use the skill, it is the AWS Lambda function that interprets the appropriate interaction, and provides the conversation back to the user.

1. This application is a "script" will create the Lambda function, grant the Alexa Skills Kit permission to invoke it, and set up an IAM role for you, as well as set up additional AWS resources required for the skill. When it creates the function, it will include the code found in this sample's GitHub repo and include the required dependencies so that you don't have to upload them yourself.

> Note: Go to http://aws.amazon.com and sign in to the console. If you don't already have an account, you will need to create one.  [If you don't have an AWS account, check out this quick walkthrough for setting it up](https://alexa.design/create-aws-account).

1. This sample is pre-loaded into the Serverless Application Repository.  Start the function creation process by clicking [here](https://console.aws.amazon.com/lambda/home?region=us-east-1#/create/app?applicationId=arn:aws:serverlessrepo:us-east-1:173334852312:applications/alexa-skills-kit-nodejs-premium-facts-skill)).
1. In the **Application Settings** section, modify the following (if desired):
    * Application name
    * SkillDescription
    * SkillFunctionName
    > If this is not your first time creating this sample in this account, you will need to change the Application Name.  If it already exists, you may see an error like 'Could not create StackChangeSet'.
1. **Click the deploy button** at the bottom of the page.
1. Wait for the status of all resources to change to **CREATE_COMPLETE**
1. Click the **Test App** button to go to the Lambda console.
1. **Open** the function that was **just created** by clicking on it.
1. (Optional, but recommended) To **secure this Lambda function** follow the instructions found [here](https://alexa.design/secure-lambda-function)
1. Scroll down the page until you see a section called **Function code**.

> Note: if you don't see the section called **function code**, click on the button in the designer with the lambda function name.

1. The Lambda function is the same as found [here](../lambda/custom/index.js).  You can modify the code directly within this code editor.  When you later want to customize the skill, this is one tool you can use to do that.  Remember to click Save if you make any changes.

1. You should see the Amazon Resource Name (ARN) a unique identifier for this function in the top right corner of the page. **Copy the ARN value for this Lambda function** by clicking the copy button.  You will need this in the next section of the guide.

1. Once you have the ARN copied, proceed to the next step so you can point your skill to this function.
[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_connect_vui_to_code._TTH_.png)](./connect-vui-to-code.md)
