import passport from 'passport'
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20'

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
}, (accessToken: string, refreshToken: string, profile: Profile, done) => {

  const user: Express.User = {
    id: profile.id,
    name: profile.displayName,
    email: profile.emails?.[0].value ?? '',
    avatar: profile.photos?.[0].value ?? ''
  }

  return done(null, user)
}))

export default passport