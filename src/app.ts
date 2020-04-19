import * as core from '@actions/core'; 
import parser from './parser';
import slack from './lib/slack';

(async () => {
    const WEBHOOKS = process.env.WEBHOOKS;
    if(null == WEBHOOKS) throw new Error("⚠️ Can't find webhook lists. check your github secrets.");

    const webhookList = WEBHOOKS.split(",");
    const parsed = await parser(); 

    webhookList.map(async url => {

        // Slack webhook
        if(url.includes('hooks.slack.com')) {
           const review = parsed.reviews[0];
           await slack({
               review: review,
               url,
           })
        }
    });

    console.log("✅ Successfully reporting your slack channel.");
})().catch(e => {
    console.log(e);
    core.setFailed(e);
});