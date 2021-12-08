import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserType } from './dto/user.dto';
import { UsersService } from './users.service';

@Resolver(of => UserType)
export class UsersResolver {
    constructor(private readonly userService : UsersService,) {};
    
    @Query(returns => [UserType])
    async users(): Promise<UserType[]> {
        return this.userService.findAll();
    }

    @Query(returns => UserType, {name: 'user'})
    async getUser(@Args('id', { type: () => String }) id: string) {
      return this.userService.findOne(id);
    }
}
