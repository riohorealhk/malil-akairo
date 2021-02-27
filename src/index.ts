import { token } from './lib/config'
import { ShardingManager } from 'discord.js';
const manager = new ShardingManager('./dist/lib/bot.js', { token: token, totalShards: 'auto' });
import { logger, third, sec, main } from './lib/Utils'

manager.on('shardCreate', shard => {
    if (shard.id == 0) return logger.info(sec("[ PREPARING TO START]") + main(" [ SHARD 1 ]"))
    logger.info(`[ SHARD ] ` + third(shard.id + 1))

});

manager.spawn();

