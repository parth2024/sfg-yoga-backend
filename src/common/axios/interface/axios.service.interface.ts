export interface AxiosServiceInterface {
  post(
    url: string,
    headers: any,
    data: any,
    vendor: string,
    leadId: string,
  ): Promise<any>;
}
