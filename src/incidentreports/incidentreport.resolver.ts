import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import { UserType } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { IncidentReportType } from './dto/incidentreport.dto';

@Resolver(of => IncidentReportType)
export class IncidentReportResolver {
    constructor(private readonly userService : UsersService) {};

    @ResolveField(returns => UserType)
    async user(@Parent() incidentReport : IncidentReportType) : Promise<UserType> {
        return await this.userService.findOne(incidentReport.user_id.toString());
    }

}
