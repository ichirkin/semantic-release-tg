import verifyConditions from './verifyConditions';
import Telegram from './telegram';
import { getVariables } from './utils';

export default async function fail(
    pluginConfig,
    { logger, errors, nextRelease, options, branch }
) {
    if (!this.verified) await verifyConditions.call(this, ...arguments);
    const { chats, botToken, templates } = this.verified;
    const telegram = new Telegram(botToken, chats);
    const variables = getVariables({
        verified : this.verified,
        error    : errors[0],
        nextRelease,
        options,
        branch
    });

    await telegram.send(templates.fail, variables);

    logger.log('Notifications has sent successfully');
}
