import { Controller, Post } from '@nestjs/common';
import { OrganizationService } from 'src/github/service/organization/organization.service';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('/scanner')
  public async scanner() {
    return this.organizationService.scanner();
  }
}
