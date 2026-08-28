import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    context?: string;
  }
  export interface InternalAxiosRequestConfig {
    context?: string;
  }
}
