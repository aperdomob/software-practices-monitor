import { Controller, Get, Post, Query, Param } from '@nestjs/common';
import { RepositoryService } from 'src/github/service/repository/repository.service';

@Controller('repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) { }

  @Get()
  public getAllRepositories() {
    return [{
      name: 'test',
      diagnostic: {
        total: 19,
        ok: 14,
        warning: 0,
        fail: 5
      }
    }, {
      name: 'my-repo',
      diagnostic: {
        total: 13,
        ok: 4,
        warning: 4,
        fail: 5
      }
    }]
  }

  @Post('/scan')
  public scanRepositorioes() {
    // scan all repositoriies from organization
  }

  @Get((':repositoryName'))
  public getRepositoryDetail(@Param() params) {
    return {
      name: params.repositoryName,
      diagnostic: {
        rules: [{
          "name": "security-alerts",
          "result": "OK"
        },
        {
          "name": "allow-commits",
          "result": "OK"
        },
        {
          "name": "disabled-squash",
          "result": "FAILED",
          "error": {
            "message": "the squash buttons is enable: expected true to be false",
            "actual": true,
            "expected": false
          }
        },
        {
          "name": "disabled-rebase",
          "result": "FAILED",
          "error": {
            "message": "the rebase buttons is enable: expected true to be false",
            "actual": true,
            "expected": false
          }
        }],
        total: 19,
        ok: 14,
        fail: 5
      }
    }
  };
}
