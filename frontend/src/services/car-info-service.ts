import { AxiosResponse } from "axios";
import { WebApiService } from "./web-api-service"
import { CarInfoVM, CarInfoApi } from "../api";

export class CarInfoService extends WebApiService {
    carInfoApi: CarInfoApi;
  
    constructor() {
      super();
      this.carInfoApi = new CarInfoApi();
    }
      /*Get CarInfo By Id*/
    public async makeGetCarInfoRequest(id : string): Promise<AxiosResponse<CarInfoVM,any>>{

        return await this.carInfoApi.apiCarInfoIdGet(id, this.generateHeader())
    }

    public async makePutCarInfoRequest(id: string, brand?: string, model?: string, yearOfManufacture?: string, description?: string, kilometers?: string, color?: string, price?: string, engine?: string, status?: string):Promise<AxiosResponse<CarInfoVM,any>>{
        return await this.carInfoApi.apiCarInfoIdPutForm(id, brand, model, yearOfManufacture, description, kilometers, color, price, engine, status, undefined, this.generateHeader());
    }
      
      
    public async makePutCarInfoRequestWithFile(id: string, brand?: string, model?: string, yearOfManufacture?: string, description?: string, kilometers?: string, color?: string, price?: string, engine?: string, status?: string, carImage?: Blob):Promise<AxiosResponse<CarInfoVM,any>>{
      return await this.carInfoApi.apiCarInfoIdPutForm(id, brand, model, yearOfManufacture, description, kilometers, color, price, engine, status, carImage || undefined, this.generateHeader());
    }
    
   
    
  }
  const carInfoService = new CarInfoService();
  export default carInfoService;