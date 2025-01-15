import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosServiceInterface } from '../interface/axios.service.interface';

@Injectable()
export class AxiosService implements AxiosServiceInterface {
  constructor(
  ) {}
  async post(
    url: string,
    headers: any,
    data: any,
    vendor?: string,
    leadId?: string,
  ) {
    let res = null;
    let logResponse = null;
    // const timestamp = Date.now();
    // const startTime = new Date();
    await axios
      .post(url, data, { headers })
      .then((response: AxiosResponse) => {
        res = response.data;
        // logResponse = response.data;
      })
      .catch((error: AxiosError) => {
        console.log('error', error);
        // logResponse = this.handleError(error);
      });
    // const endTime = new Date();
    // const responseTime = Date.now() - timestamp;
    // this.createLog(
    //   url,
    //   headers,
    //   data,
    //   vendor,
    //   res,
    //   logResponse,
    //   responseTime,
    //   startTime,
    //   endTime,
    //   leadId,
    // );
    return res;
  }

  private handleError(error: AxiosError) {
    let logResponse = null;
    if (error.response && error.response.data && error.response.data !== '') {
      logResponse = error.response.data;
    } else if (error.request) {
      logResponse = error.message;
    } else {
      logResponse = error;
    }
    return logResponse;
  }

  // private createLog(
  //   url: string,
  //   headers: any,
  //   data: any,
  //   vendor: string,
  //   isSuccess: boolean,
  //   logResponse: any,
  //   responseTime: number,
  //   startTime: Date,
  //   endTime: Date,
  //   leadId: string,
  // ) {
  //   const apiLog = new APILogDTO();
  //   apiLog.responseTime = responseTime;
  //   apiLog.startTime = startTime;
  //   apiLog.endTime = endTime;
  //   apiLog.leadId = leadId;
  //   if (!vendor.startsWith('internal')) {
  //     apiLog.requestUrl = data.url;
  //     apiLog.request = { headers: data.headers, data: data.data };
  //   } else {
  //     apiLog.requestUrl = url;
  //     apiLog.request = { headers, data };
  //   }
  //   apiLog.response = logResponse;
  //   apiLog.status = isSuccess ? 'success' : 'failure';
  //   apiLog.vendor = vendor;
  //   this.apiLogService.createLog(apiLog);
  // }
}
