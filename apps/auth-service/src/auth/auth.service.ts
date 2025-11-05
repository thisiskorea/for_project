import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(userData: {
    email: string
    username: string
    password: string
    fullName?: string
  }): Promise<{ user: any; access_token: string }> {
    const user = await this.usersService.create({
      email: userData.email,
      username: userData.username,
      password_hash: userData.password,
      full_name: userData.fullName,
    })

    const { password_hash, ...userWithoutPassword } = user
    const access_token = this.generateToken(user)

    return {
      user: userWithoutPassword,
      access_token,
    }
  }

  async login(credentials: {
    email: string
    password: string
  }): Promise<{ user: any; access_token: string }> {
    const user = await this.usersService.findByEmail(credentials.email)

    if (!user || !user.password_hash) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await user.validatePassword(credentials.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    await this.usersService.updateLastLogin(user.id)

    const { password_hash, ...userWithoutPassword } = user
    const access_token = this.generateToken(user)

    return {
      user: userWithoutPassword,
      access_token,
    }
  }

  async validateUser(userId: string): Promise<User> {
    return this.usersService.findById(userId)
  }

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    }

    return this.jwtService.sign(payload)
  }

  async handleOAuthLogin(profile: any, provider: string): Promise<{ access_token: string }> {
    let user = await this.usersService.findByEmail(profile.email)

    if (!user) {
      // Create new user from OAuth profile
      user = await this.usersService.create({
        email: profile.email,
        username: profile.username || profile.email.split('@')[0],
        full_name: profile.name,
        avatar_url: profile.picture || profile.avatar_url,
        email_verified: true,
      })
    }

    await this.usersService.updateLastLogin(user.id)

    return {
      access_token: this.generateToken(user),
    }
  }
}
