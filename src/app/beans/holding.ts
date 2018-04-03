
import { restObject } from "./restObject";

export class holding extends restObject
{
    schema:string;
    constructor(restObj:any)
    {
        console.log(' 11            '+ JSON.stringify(restObj.pdiConfigs[0].schema));
        super(restObj); 
        this.schema=restObj.pdiConfigs[0].schema;

    }

}