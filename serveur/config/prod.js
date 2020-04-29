module.exports = {
    discordClientID: process.env.DISCORD_CLIENT_ID,
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
    scopes: ['identify', 'email', 'guilds', 'guilds.join']
};