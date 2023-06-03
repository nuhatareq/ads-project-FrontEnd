import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpServicesService {
    baseUrl = environment.base_url;
    baseImageUrl: string = environment.image_url;

    constructor(private http: HttpClient) {}

    /**
     * Function name : GetMethod
     * Function purpose : Get All added elements in the database
     * Needed Parameters :-
     * 1- end point name for the called api
     * 2- pramas parameter which is will be optional parameter
     */
    GetMethod(Api_Name: any, params?: any): Observable<any> | Observable<[]> {
        let headers = new HttpHeaders();
        if (!params) {
            return this.http.get<any>(this.baseUrl + Api_Name).pipe(
                map((data: any) => {
                    return data;
                }),
                catchError((error): any => {
                    return this.MyThrowError(error);
                })
            );
        }
        //here is the condition needed if the called get method api has to get specific data with a selected row
        else {
            return this.http
                .get<[]>(this.baseUrl + Api_Name + '/' + params)
                .pipe(
                    map((data: any) => {
                        return data;
                    }),
                    catchError((error): any => {
                        return this.MyThrowError(error);
                    })
                );
        }
    }

    BasicGetMethod(Api_Name: string) {
        return this.http.get<any>(this.baseUrl + Api_Name);
    }

    GetMethodWithPipe(Api_Name: any, params?: any, queryPrams?: any) {
        if (!params) {
            return this.http.get(this.baseUrl + Api_Name).pipe(
                map((data: any) => {
                    return data.data.length > 0 ? data.data : [];
                }),
                catchError((error): any => {
                    return this.MyThrowError(error);
                })
            );
        }

        //here is the condition needed if the called get method api has to get specific data with a selected row
        else {
            if (!queryPrams) {
                return this.http
                    .get(this.baseUrl + Api_Name + '/' + params)
                    .pipe(
                        map((data: any) => {
                            return data.data.length > 0 ? data.data : [];
                        }),
                        catchError((error): any => {
                            return this.MyThrowError(error);
                        })
                    );
            } else {
                return this.http
                    .get(this.baseUrl + Api_Name + '?id=' + queryPrams)
                    .pipe(
                        map((data: any) => {
                            return data.data.length > 0 ? data.data : [];
                        }),
                        catchError((error): any => {
                            return this.MyThrowError(error);
                        })
                    );
            }
        }
    }

    // Get All with Query Params

    getAllWithQueryParams(ApiUrl: string, queryPrams: {}) {
        return this.http
            .get<any>(this.baseUrl + ApiUrl, {
                params: queryPrams,
            })
            .pipe(
                map((data: any) => {
                    return data;
                }),
                catchError((error): any => {
                    for (const key in error.error) {
                        for (let i of error.error[key]) {
                            return throwError(i);
                        }
                    }
                })
            );
    }
    /**
     * Function name : PostMethod
     * Needed Parameters :-
     * 1- Api_name : end point name for the called api
     * 2- body :  parameter which is the designed model to affect row in the database
     */
    PostMethod(Api_name: any, body: any) {
        return this.http.post(this.baseUrl + Api_name, body).pipe(
            catchError((error): any => {
                return this.MyThrowError(error);
            })
        );
    }
    PostMethodToDownload(Api_name: any, body: any) {
        return this.http.post(this.baseUrl + Api_name, body, {
            responseType: 'blob' as 'blob',
        });
    }
    PostMethodWithPipe(Api_name: any, body: any) {
        return this.http.post(this.baseUrl + Api_name, body).pipe(
            catchError((error): any => {
                return this.MyThrowError(error);
            })
        );
    }
    postImage(url: string, body?: {}) {
        return this.http.post(`${this.baseImageUrl}${url}`, body).pipe(
            catchError((error): any => {
                return this.MyThrowError(error);
            })
        );
    }

    /**
     * Function purpose : Delete a selected row form the database
     * Function name : DeleteMethod
     * Needed Parameters :-
     * 1- Api_name : end point name for the called api
     * 2- params :  parameter which is will be needed to select the needed id of the selected row needed for delete
     */
    DeleteMethod(Api_name: string, body: any) {
        return this.http.delete(this.baseUrl + Api_name, { body: body });
    }
    DeleteMethodWithPipe(Api_name: any, params: any) {
        return this.http.delete(this.baseUrl + Api_name + '/' + params).pipe(
            catchError((error): any => {
                return this.MyThrowError(error);
            })
        );
    }

    DeleteMethodWithPipeWithoutId(Api_name: any) {
        return this.http.delete(this.baseUrl + Api_name).pipe(
            catchError((error): any => {
                return this.MyThrowError(error);
            })
        );
    }

    /**
     * Function name : UpdateMethod
     * Function purpose : Update a selected row form the database
     * Needed Parameters :-
     * 1- Api_name : end point name for the called api
     * 2- params :  parameter which is will be needed to select the needed id of the selected row needed for delete
     * 3- body : parameter needed to show the affected values to be updated in the database
     */
    UpdateMethod(Api_name: any, params?: any, body?: any) {
        return this.http.put(this.baseUrl + Api_name + '/' + params, body).pipe(
            catchError((error): any => {
                return this.MyThrowError(error);
            })
        );
    }
    UpdateMethodWithPipe(Api_name: any, body: any, params?: any) {
        if (params) {
            return this.http
                .put(this.baseUrl + Api_name + '/' + params, body)
                .pipe(
                    catchError((error): any => {
                        return this.MyThrowError(error);
                    })
                );
        } else {
            return this.http.put(this.baseUrl + Api_name, body).pipe(
                catchError((error): any => {
                    return this.MyThrowError(error);
                })
            );
        }
    }

    MyThrowError(error: any): any {
        if (error.status == 400) {
            // for (const key in error.error) {
            //   console.log(typeof error.error[key] == 'string');
            //   for (let i of error.error[key]) {
            //     if (i == 'Unable to log in with provided credentials.') {
            //       return throwError('خطأ في كلمة المستخدم أو كلمة المرور');
            //     }
            //     return throwError(i);
            //   }
            // }

            return throwError('حدث خطأ بالإدخال برجاء المحاولة مرة أخرى');
        } else if (error.status == 500) {
            return throwError('خطأ في الاتصال بالسيرفر');
        } else if (error.status == 404) {
            return throwError('لم يتم العثور على بيانات');
        } else if (error.status == 405) {
            return throwError('غير مسموح');
        } else if (error.status == 0) {
            return throwError('خطأ في الاتصال بالإنترنت ');
        } else if (error.status == 401) {
            localStorage.removeItem('token');
            //redirect to login implementation goes here
            return throwError('يرجى إعادة تسجيل الدخول');
        } else {
            return throwError(error.statusText);
        }
    }
}
