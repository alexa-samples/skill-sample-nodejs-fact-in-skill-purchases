# Build An Alexa Skill with In-Skill Purchases - Premium Fact
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-on._TTH_.png)](./testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./publication.md)

## Testing Your Alexa Skill

So far, we have [created a Voice User Interface](./voice-user-interface.md), [a Lambda function](./lambda-function.md), [connected the two together](./connect-vui-to-code.md), and [created the in-skill products](./create-isp.md).  Your skill is now ready to test.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=premium-fact-nodejs-V2_GUI-4&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_premium-fact-nodejs-V2_GUI-4_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

1. Access the **Alexa Simulator**, by selecting the **Test** link from the top navigation menu.

1. Enable Testing by selecting **Development** from the drop down found directly below the top navigation menu.  Once enabled, the label should read **Skill testing is enabled in:** `Development`.

1. To validate that your skill is working as expected, invoke your skill from the **Alexa Simulator**. You can either type or click and hold the mic from the input box to use your voice.
	1. **Type** "Open" followed by the invocation name you gave your skill in [Step 1](./voice-user-interface.md). For example, "Open premium facts sample".
	2. **Use your voice** by clicking and holding the mic on the side panel and saying "Open" followed by the invocation name you gave your skill.
	3. **If you've forgotten the invocation name** for your skill, revisit the **Build** panel on the top navigation menu and select **Invocation** from the sidebar to review it.
1. Test phrases like:
        * tell me a random fact
        * give me a history fact
        * what can I buy
        * buy history pack
        > Note: if you have enabled a voice code to prevent accidental purchases via voice, you will be required to provide it before you can make an in-skill purchase.  If you type that code, be sure to spell the numbers out, e.g. "one two three four" instead of "1234", otherwise the simulator will not recognize your code.

> **Note: The developer account associated with the skill is never charged for in-skill products.**  For more details about testing skills with in-skill products, please refer to the [In-Skill Purchase Testing Guide](https://developer.amazon.com/docs/in-skill-purchase/isp-test-guide.html)

> If you need to reset a test purchase, you can return to the In-Skill Products page in the Alexa Developer Console.  (That's on the **Build** tab, and click on **In-Skill Products** in the left nav.  If you don't see it there, click on the In-Skill Products item in the Skill Builder Checklist.)  Then click on the **Reset test purchases** link to reset your purchases for that product.  This will work regardless of how you setup the in-skill product (console or CLI).

> **Pro Tip**: type or say `exit` in the simulator to reset the session before each test pass.  The simulator holds a session open longer than on a device to assist in your testing and it's easy to forget a session is still open.

1. Ensure your skill works the way that you designed it to.
	* After you interact with the Alexa Simulator, you should see the Skill I/O **JSON Input** and **JSON Output** boxes get populated with JSON data. You can also view the **Device Log** to trace your steps.
	* If it's not working as expected, you can dig into the JSON to see exactly what Alexa is sending and receiving from the endpoint. If something is broken, AWS Lambda offers an additional testing tool to help you troubleshoot your skill.

1.  **Configure a test event in AWS Lambda.** Now that you are familiar with the **request** and **response** boxes in the Service Simulator, it's important for you to know that you can use your **requests** to directly test your Lambda function every time you update it.  To do this:
    1.  Enter an utterance in the service simulator, and copy the generated Lambda Request (JSON Input) for the next step.

    2.  **Open your Lambda function in AWS, open the Actions menu, and select "Configure test events."**![Configure Test events drop down](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-2-configure-test-event._TTH_.png)

    3.  **Select "Create new test event". Choose "Alexa Start Session" as the Event Template from the dropdown list.** You can choose any test event in the list, as they are just templated event requests, but using "Alexa Start Session" is an easy one to remember.  
![Alexa Start Session](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-3-alexa-start-session._TTH_.png)

    4.  Type in an Event Name into the **Event Name** field.  Delete the contents of the code editor, and paste the Lambda request you copied above into the code editor. The Event Name is only visible to you. Name your test event something descriptive and memorable. For our example, we entered an event name as "startSession". Additionally, by copying and pasting your Lambda Request from the service simulator, you can test different utterances and skill events beyond the pre-populated templates in Lambda.

    5.  **Click the "Create" button.** This will save your test event and bring you back to the main configuration for your lambda function.

    6.  **Click the "Test" button to execute the "startSession" test event.**
![Test with event](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-save-and-test._TTH_.png)

        This gives you visibility into four things:

        *  **Your response, listed in the "Execution Result."**
![execution result](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/4-5-5-1-execution-result._TTH_.png)

        *  **A Summary of the statistics for your request.** This includes things like duration, resources, and memory used.
![Summary](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-2-summary._TTH_.png)

        *  **Log output.**  By effectively using console.log() statements in your Lambda code, you can track what is happening inside your function, and help to figure out what is happening when something goes wrong.  You will find the log to be incredibly valuable as you move into more advanced skills.
![CloudWatch Logs](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/4-5-5-3-log-output._TTH_.png)

        *  **A link to your [CloudWatch](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:) logs for this function.**  This will show you **all** of the responses and log statements from every user interaction.  This is very useful, especially when you are testing your skill from a device with your voice.  (It is the "[Click here](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)" link in the Log Output description.)

7.  **Other testing methods to consider:**
    *  Testing on your Alexa enabled devices and applications - any devices registered using the same account as your Alexa developer account will have your skill enabled on them when testing is enabled in development mode.  You should always test your skill on an actual device rather than relying solely on the simulator.  Keep in mind that in-skill products may not be purchased on all devices, but already purchased products will be available for use on all devices.
    *  [Echosim.io](https://echosim.io) - a browser-based Alexa skill testing tool that makes it easy to test your skills without carrying a physical device everywhere you go.
    *  [Unit Testing with Alexa](https://alexa.design/postman-guide) - a modern approach to unit testing your Alexa skills with [Postman](http://getpostman.com) and [Amazon API Gateway](http://aws.amazon.com/apigateway).

> Note: While in-skill products are only currently available in the English (US) locale, any developer account (regardless of home locale), can be used to create skills with in-skill products.  When testing, you must use an account which defaults to the amazon.com marketplace.  (You may recall see that marketplace mentioned on the in-skill products' pricing page.)  If your developer account does not default to that marketplace, or your billing address is outside the United States, then you will need to create a new account for testing purposes.  Create this account using https://www.amazon.com and set an address for somewhere in the United States.

8.  **If your sample skill is working properly, you can now customize your skill.**

[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_customization._TTH_.png)](./customization.md)
