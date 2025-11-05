import { Injectable, Optional } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(@Optional() private configService: ConfigService) {
    // Only initialize if GitHub credentials are provided
    const clientID = configService?.get('GITHUB_CLIENT_ID')
    const clientSecret = configService?.get('GITHUB_CLIENT_SECRET')

    if (!clientID || !clientSecret) {
      // Skip strategy initialization if credentials are missing
      super({
        clientID: 'dummy',
        clientSecret: 'dummy',
        callbackURL: 'http://localhost:4001/auth/github/callback',
      })
      return
    }

    super({
      clientID,
      clientSecret,
      callbackURL: configService.get('GITHUB_CALLBACK_URL') || 'http://localhost:4001/auth/github/callback',
      scope: ['user:email'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ): Promise<any> {
    const { emails, displayName, photos, username } = profile

    const user = {
      email: emails[0].value,
      name: displayName || username,
      avatar_url: photos[0]?.value,
      username: username,
      provider: 'github',
    }

    done(null, user)
  }
}
