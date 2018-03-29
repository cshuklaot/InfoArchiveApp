import { RestService } from "../rest.service";
import { find } from "rxjs/operators";

export class restObject
{
    id:String;
    name:string;
    map=new Map();
    
    constructor(restObj:any)
    {
        this.id=restObj.id;
        this.name=restObj.name;
        let links=Object.keys(restObj._links);
        for(let i=0;i<links.length;i++)
        {
          this.map.set(links[i],restObj._links[links[i]].href)
        }
    }

    getLink(key:string)
    {
      //  return this._links.find(link => link.key===key);
    }
}