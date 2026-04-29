import passport from 'passport'
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20'
import saveOrUpdateUser from '../src/models/userModel'
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user: Express.User, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback'
}, async (accessToken: string, refreshToken: string, profile: Profile, done) => {
  try {
    const user: Express.User = await saveOrUpdateUser(
      profile.id,
      profile.emails?.[0].value ?? '',
      profile.displayName,
      profile.photos?.[0].value ?? ''
    )
    done(null, user)
  } catch (error) {
    done(error)
  }
}))
export default module.exports = passport