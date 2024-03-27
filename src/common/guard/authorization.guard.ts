import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class AuthorizationGuard implements CanActivate {
    private allowedRoleTypes: string[]; // Array to store allowed token types
    private protectRoleType: string | null; // protector role type
    private paramsName: string | null;
  
    constructor(
      allowedRoleTypes: string[],
      protectRoleType: string | null,
      paramsName: string | null,
    ) {
      this.allowedRoleTypes = allowedRoleTypes;
      this.protectRoleType = protectRoleType;
      this.paramsName = paramsName;
    }
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      try {
        const request = context.switchToHttp().getRequest();
        if (this.allowedRoleTypes.includes(request.body.token.role)) {
          return true;
        } else if (
          this.protectRoleType == request.body.token.role &&
          request.body.token.user_id == request.params[this.paramsName]
        ) {
          return true;
        } else {
          throw new ForbiddenException();
        }
      } catch (err) {
        throw new ForbiddenException();
      }
    }
  }
  