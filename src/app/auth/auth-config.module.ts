import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-i24chzizswyt72nc.us.auth0.com',
            redirectUrl: 'http://localhost:4200',
            clientId: '0mVNDR4FhziJICkav2kOCNdr4tlwTzkb',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes: ['http://localhost:8092/'],
      		customParamsAuthRequest: {
        		audience: 'http://localhost:8092'
      		}
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
