export class AuthInfo
{
    access_token:String;
    token_type:String;
    refresh_token:String;
    scope:number;
    jiti:String;

    getLoginToken()
    {
        return 'Authorization:'+ this.token_type+' '+this.access_token;
    }
}