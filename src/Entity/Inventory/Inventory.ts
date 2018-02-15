import { Article } from '../Article/Article';


export class Inventory{

  constructor(
    public id_inventory:string="",
    public start_date:string="",
    public end_date:string="",
    public location:string="",
    public status:number=0,
    public listArticle:Article[]=[]
          ) { }




}
