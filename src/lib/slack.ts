import axios from 'axios';

interface slackArgs {
    review: {
        id: string;
        userName: string; 
        userUrl: string; 
        version: string; 
        score: string; 
        title: string;
        text: string; 
    }; 

    url: string; 
}

export default async({review, url}: slackArgs) => {
    let message: any = {
        attachments: [], 
    }

    message.attachments.push({
        pretext: `has a new iOS review`,

        fields: [
            {
                title: '👤 Username',
                value: '*'+review.userName+'*',
                short: true
            }, 
            {
                title: '⭐️ Score',
                value: review.score, 
                short: true
            },
            {
                title: '🚀 Version',
                value: review.version,
                short: true
            },
            {
                title: '🌎 Country',
                value: ":"+review.userUrl.split('/')[3]+":",
                short: true
            }, 
            {
                type: 'mrkdwn',
                title: '',
                value: "*"+review.title+"*"
            },
            {
                type:'mrkdwn',
                title: '',
                value: "*"+review.text+"*"
            }
        ],

        footer: 'Github - appstore-review-bot',
        footer_icon: 'https://github.githubassets.com/favicons/favicon-dark.png'
    });
    
    await axios.post(url, message);
};