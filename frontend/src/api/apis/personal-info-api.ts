/* tslint:disable */
/* eslint-disable */
/**
 * Resume Car Builder API
 * An API for Resume Car Builder
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { PersonalInfoVM } from '../models';
import { ResumeVM } from '../models';
/**
 * PersonalInfoApi - axios parameter creator
 * @export
 */
export const PersonalInfoApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Endpoint for getting a specific personal info by its id.
         * @param {string} id Id of the personal info to retrieve.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPersonalInfoIdGet: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiPersonalInfoIdGet.');
            }
            const localVarPath = `/api/PersonalInfo/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a personal info by its id.
         * @param {string} id Id of the personal info to update.
         * @param {string} [fullName] 
         * @param {string} [address] 
         * @param {string} [phoneNumber] 
         * @param {string} [email] 
         * @param {Blob} [personImage] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiPersonalInfoIdPutForm: async (id: string, fullName?: string, address?: string, phoneNumber?: string, email?: string, personImage?: Blob, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling apiPersonalInfoIdPutForm.');
            }
            const localVarPath = `/api/PersonalInfo/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new FormData();

            // authentication Bearer required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


            if (fullName !== undefined) { 
                localVarFormParams.append('FullName', fullName as any);
            }

            if (address !== undefined) { 
                localVarFormParams.append('Address', address as any);
            }

            if (phoneNumber !== undefined) { 
                localVarFormParams.append('PhoneNumber', phoneNumber as any);
            }

            if (email !== undefined) { 
                localVarFormParams.append('Email', email as any);
            }

            if (personImage !== undefined) { 
                localVarFormParams.append('PersonImage', personImage as any);
            }

            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PersonalInfoApi - functional programming interface
 * @export
 */
export const PersonalInfoApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Endpoint for getting a specific personal info by its id.
         * @param {string} id Id of the personal info to retrieve.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPersonalInfoIdGet(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<PersonalInfoVM>>> {
            const localVarAxiosArgs = await PersonalInfoApiAxiosParamCreator(configuration).apiPersonalInfoIdGet(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Update a personal info by its id.
         * @param {string} id Id of the personal info to update.
         * @param {string} [fullName] 
         * @param {string} [address] 
         * @param {string} [phoneNumber] 
         * @param {string} [email] 
         * @param {Blob} [personImage] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPersonalInfoIdPutForm(id: string, fullName?: string, address?: string, phoneNumber?: string, email?: string, personImage?: Blob, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ResumeVM>>> {
            const localVarAxiosArgs = await PersonalInfoApiAxiosParamCreator(configuration).apiPersonalInfoIdPutForm(id, fullName, address, phoneNumber, email, personImage, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PersonalInfoApi - factory interface
 * @export
 */
export const PersonalInfoApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary Endpoint for getting a specific personal info by its id.
         * @param {string} id Id of the personal info to retrieve.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPersonalInfoIdGet(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<PersonalInfoVM>> {
            return PersonalInfoApiFp(configuration).apiPersonalInfoIdGet(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a personal info by its id.
         * @param {string} id Id of the personal info to update.
         * @param {string} [fullName] 
         * @param {string} [address] 
         * @param {string} [phoneNumber] 
         * @param {string} [email] 
         * @param {Blob} [personImage] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiPersonalInfoIdPutForm(id: string, fullName?: string, address?: string, phoneNumber?: string, email?: string, personImage?: Blob, options?: AxiosRequestConfig): Promise<AxiosResponse<ResumeVM>> {
            return PersonalInfoApiFp(configuration).apiPersonalInfoIdPutForm(id, fullName, address, phoneNumber, email, personImage, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PersonalInfoApi - object-oriented interface
 * @export
 * @class PersonalInfoApi
 * @extends {BaseAPI}
 */
export class PersonalInfoApi extends BaseAPI {
    /**
     * 
     * @summary Endpoint for getting a specific personal info by its id.
     * @param {string} id Id of the personal info to retrieve.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonalInfoApi
     */
    public async apiPersonalInfoIdGet(id: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<PersonalInfoVM>> {
        return PersonalInfoApiFp(this.configuration).apiPersonalInfoIdGet(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary Update a personal info by its id.
     * @param {string} id Id of the personal info to update.
     * @param {string} [fullName] 
     * @param {string} [address] 
     * @param {string} [phoneNumber] 
     * @param {string} [email] 
     * @param {Blob} [personImage] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonalInfoApi
     */
    public async apiPersonalInfoIdPutForm(id: string, fullName?: string, address?: string, phoneNumber?: string, email?: string, personImage?: Blob, options?: AxiosRequestConfig) : Promise<AxiosResponse<ResumeVM>> {
        return PersonalInfoApiFp(this.configuration).apiPersonalInfoIdPutForm(id, fullName, address, phoneNumber, email, personImage, options).then((request) => request(this.axios, this.basePath));
    }
}
