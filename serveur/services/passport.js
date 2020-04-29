const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const keys = require('../config/keys');

passport.use(
    new DiscordStrategy({
        clientID: keys.discordClientID,
        clientSecret: keys.discordClientSecret,
        callbackURL: '/auth/discord/callback',
        scope: keys.scopes,
        proxy: true
}));