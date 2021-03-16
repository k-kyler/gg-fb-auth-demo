const { OAuth2Client } = require("google-auth-library");
const clientId = process.env.CLIENT_ID;
const client = new OAuth2Client(clientId);

module.exports.signIn = (req, res) => {
    res.render("signin");
};

module.exports.postSignIn = (req, res) => {
    // Get Google token
    let googleIdToken = req.body.googleIdToken;

    // Get Facebook sign in id
    let facebookId = req.body.id;

    // Google authentication processing
    if (googleIdToken) {
        // User data
        let userData;

        // Google sign in handler
        googleVerifyHandler = async () => {
            const ticket = await client.verifyIdToken({
                idToken: googleIdToken,
                audience: clientId,
            });
            const payload = ticket.getPayload();

            // Add user data
            userData = {
                username: payload.name,
                profilePic: payload.picture,
            };
        };
        googleVerifyHandler()
            .then(() => {
                // If sign in success then generating user's cookie
                res.cookie("googleIdToken", googleIdToken, {
                    signed: true,
                });

                res.cookie("userData", userData, {
                    signed: true,
                });

                // Send request to Front-end to redirect to weather page
                res.send("Sign in successful with Google");
            })
            .catch((error) => {
                res.redirect("/signin");
            });
    } else if (facebookId) {
        let name = req.body.name;
        let profilePic = req.body.profilePic;
        let userData = {
            username: name,
            profilePic,
        };

        // If sign in success then generating user's cookie
        res.cookie("userData", userData, {
            signed: true,
        });

        // Send request to Front-end to redirect to weather page
        res.json({
            code: 1,
            message: "Sign in successful with Facebook",
        });
    }
};
