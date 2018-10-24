const Auth0Strategy = require("passport-auth0");

module.exports = new Auth0Strategy({
    domain:process.env.DOMAIN,
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"/login",
    scope:"openid email profile"
    },
    function(accessToken,refreshToken,extraParams,profile,done){

        return done(null,profile)
    }   

)