import { HttpHeaders } from "@angular/common/http"

const setHeaders = (token?: string) => {
    let headToken: HttpHeaders;

    headToken = new HttpHeaders()
        .append('accept', 'application/json')
        .append('Access-Control-Allow-Origin', '*')
        .append('content-type', 'application/json')
        .append('authorization', 'Bearer '+ token);

    return headToken;
}

export const getHeader = () => {
    const authorizationToken = sessionStorage.getItem('ads_help_desk') || '';
    return setHeaders(authorizationToken);
}
