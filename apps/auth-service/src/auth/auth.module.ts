import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { GithubStrategy } from './strategies/github.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'default-secret-for-development',
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || '7d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    // Only provide OAuth strategies if credentials are configured
    {
      provide: 'OAUTH_STRATEGIES',
      useFactory: (configService: ConfigService) => {
        const strategies = []

        // Only add Google strategy if configured
        if (configService.get('GOOGLE_CLIENT_ID')) {
          strategies.push(GoogleStrategy)
        }

        // Only add GitHub strategy if configured
        if (configService.get('GITHUB_CLIENT_ID')) {
          strategies.push(GithubStrategy)
        }

        return strategies
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
