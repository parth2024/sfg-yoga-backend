export interface CronServiceInterface {
  sendWhatsappMessage(): Promise<void>;
}
