import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export const AuthInterceptorService: HttpInterceptorFn = (req, next) => {
    console.log('da vao roi')
    const modifiedRequest = req.clone({
        headers: req.headers.append('Auth', 'xyz')
    });

    return next(modifiedRequest);
}