export class UIResponse {
    status: boolean;
    result: any;
    message: string;
    constructor( status: boolean, result: any, message: string){
        this.status = status;
        this.result = result;
        this.message = message;
    }
}
