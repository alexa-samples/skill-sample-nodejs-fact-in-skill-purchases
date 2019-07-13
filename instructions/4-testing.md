# Build An Alexa Skill with In-Skill Purchases - Premium Fact
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

## Testing Your Alexa Skill

So far, we have [created a Voice User Interface](./voice-user-interface.md), [a Lambda function](./lambda-function.md), [connected the two together](./connect-vui-to-code.md), and [created the in-skill products](./3-create-isp.md).  Your skill is now ready to test.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=premium-fact-nodejs-V2_GUI-4&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_premium-fact-nodejs-V2_GUI-4_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2. Access the **Alexa Simulator**, by selecting the **Test** link from the top navigation menu.

3. Enable Testing by selecting **Development** from the drop down found directly below the top navigation menu.  Once enabled, the label should read **Skill testing is enabled in:** `Development`.

4. To validate that your skill is working as expected, invoke your skill from the **Alexa Simulator**. You can either type or click and hold the mic from the input box to use your voice.
	1. **Type** "Open" followed by the invocation name you gave your skill in [Step 1](./voice-user-interface.md). For example, "Open Premium Facts Sample".
	2. **Use your voice** by clicking and holding the mic on the side panel and saying "Open" followed by the invocation name you gave your skill.
	3. **If you've forgotten the invocation name** for your skill, revisit the **Build** panel on the top navigation menu and select **Invocation** from the sidebar to review it.
5. Test phrases like:
			* tell me a random fact
			* give me a history fact
			* what can I buy
			* buy history pack
    		> Note: if you have enabled a voice code to prevent accidental purchases via voice, you will be required to provide it before you can make an in-skill purchase.  If you type that code, be sure to spell the numbers out, e.g. "one two three four" instead of "1234", otherwise the simulator will not recognize your code.

6. Ensure your skill works the way that you designed it to.
        * After you interact with the Alexa Simulator, you should see the Skill I/O **JSON Input** and **JSON Output** boxes get populated with JSON data. You can also view the **Device Log** to trace your steps.
        * If it's not working as expected, you can dig into the JSON to see exactly what Alexa is sending and receiving from the endpoint. If something is broken, AWS Lambda offers an additional testing tool to help you troubleshoot your skill.



> **Note: The developer account associated with the skill is never charged for in-skill products.**  For more details about testing skills with in-skill products, please refer to the [In-Skill Purchase Testing Guide](https://developer.amazon.com/docs/in-skill-purchase/isp-test-guide.html)

> If you need to reset a test purchase, you can return to the In-Skill Products page in the Alexa Developer Console.  (That's on the **Build** tab, and click on **In-Skill Products** in the left nav.  If you don't see it there, click on the In-Skill Products item in the Skill Builder Checklist.)  Then click on the **Reset test purchases** link to reset your purchases for that product.  This will work regardless of how you setup the in-skill product (console or CLI).

> **Pro Tip**: type or say `exit` in the simulator to reset the session before each test pass.  The simulator holds a session open longer than on a device to assist in your testing and it's easy to forget a session is still open.


## **Other testing methods to consider:**
* Testing on your Alexa enabled devices and applications - any devices registered using the same account as your Alexa developer account will have your skill enabled on them when testing is enabled in development mode.  You should always test your skill on an actual device rather than relying solely on the simulator.  Keep in mind that in-skill products may not be purchased on all devices, but already purchased products will be available for use on all devices.
* [Echosim.io](https://echosim.io) - a browser-based Alexa skill testing tool that makes it easy to test your skills without carrying a physical device everywhere you go.
* [Unit Testing with Alexa](https://alexa.design/postman-guide) - a modern approach to unit testing your Alexa skills with [Postman](http://getpostman.com) and [Amazon API Gateway](http://aws.amazon.com/apigateway).

> Note: While in-skill products are only currently available in the English (US) locale, any developer account (regardless of home locale), can be used to create skills with in-skill products.  When testing, you must use an account which defaults to the amazon.com marketplace.  (You may recall see that marketplace mentioned on the in-skill products' pricing page.)  If your developer account does not default to that marketplace, or your billing address is outside the United States, then you will need to create a new account for testing purposes.  Create this account using https://www.amazon.com and set an address for somewhere in the United States.

If your sample skill is working properly, you can now **customize** your skill.

[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_customization._TTH_.png)](./5-customization.md)
