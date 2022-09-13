import { Injectable } from '@angular/core';
import { CustomToastrService,ToastrMessageType, ToastrPosition  } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClientServices: HttpClientService,
    private toastrService: CustomToastrService
  ) { }


  async login(userNameOrEmail:string,password:string, callBackFunction?: () => void): Promise<any >{
    const observable: Observable<any | TokenResponse> = this.httpClientServices.post<any | TokenResponse>({
      controller:"auth",
      action:"login"
    },{
      userNameOrEmail,password
    });
    const tokenResponse: TokenResponse =await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
      //localStorage.setItem("expiration",tokenResponse.token.expiration.toString());
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.","Giriş Başarılı",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      });
    }
    callBackFunction();
  }

  async refreshTokenLogin(refreshToken:string, callBackFunction?: (state) => void): Promise<any>{
    const observable: Observable<any | TokenResponse> = this.httpClientServices.post({
      action: "refreshtokenlogin",
      controller: "auth"
    },{ refreshToken: refreshToken });

    try {
      const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

      if (tokenResponse) {
        localStorage.setItem("accessToken",tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
      }
      callBackFunction(tokenResponse ? true : false);
    } catch (error) {
      callBackFunction(false);
    }
  }

  async gooleLogin(user: SocialUser, callBackFunction? : () =>void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientServices.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "auth"
    },user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("Google üzerinden giriş işlemi başarıyla sağlanmıştır.","Giriş Başarılı",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      });
    }

    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction? : () => void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientServices.post<SocialUser | TokenResponse>({
      action: "facebook-login",
      controller: "auth"
    },user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("Facebook üzerinden giriş işlemi başarıyla sağlanmıştır.","Giriş Başarılı",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.BottomRight
      });
    }

    callBackFunction();
  }
}
