import { Injectable, Optional } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Optional() private configService: ConfigService) {
    // Only initialize if Google credentials are provided
    const clientID = configService?.get('GOOGLE_CLIENT_ID')
    const clientSecret = configService?.get('GOOGLE_CLIENT_SECRET')

    if (!clientID || !clientSecret) {
      // Skip strategy initialization if credentials are missing
      super({
        clientID: 'dummy',
        clientSecret: 'dummy',
        callbackURL: 'http://localhost:4001/auth/google/callback',
      })
      return
    }

    super({
      clientID,
      clientSecret,
      callbackURL: configService.get('GOOGLE_CALLBACK_URL') || 'http://localhost:4001/auth/google/callback',
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { emails, displayName, photos } = profile

    const user = {
      email: emails[0].value,
      name: displayName,
      picture: photos[0]?.value,
      provider: 'google',
    }

    done(null, user)
  }
}
