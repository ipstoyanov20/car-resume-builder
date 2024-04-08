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
/**
 * 
 * @export
 * @interface CarInfoIdBody
 */
export interface CarInfoIdBody {
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    brand: string;
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    model: string;
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    yearOfManufacture: string;
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    distance?: string;
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    color?: string;
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    price: string;
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    engine: string;
    /**
     * 
     * @type {string}
     * @memberof CarInfoIdBody
     */
    status?: string;
    /**
     * 
     * @type {Blob}
     * @memberof CarInfoIdBody
     */
    carImage?: Blob;
}