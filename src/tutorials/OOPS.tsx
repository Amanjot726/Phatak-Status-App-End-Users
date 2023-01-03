class OneWayFlight{
    fromLocation: string;
    toLocation: string;
    departureDate: string;
    numOfTravellers: number;
    travelClass: string;

    constructor(){
        this.fromLocation = "New Delhi";
        this.toLocation = "Goa";
        this.departureDate = "15 August, 2022";
        this.numOfTravellers = 2;
        this.travelClass = "Economy";
    }

    // setData(fromLocation:any, toLocation:any, departureDate:any, numOfTravellers:any,travelClass: any){
    setData(fromLocation:string, toLocation:string, departureDate:string, numOfTravellers:number,travelClass: string){
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.departureDate = departureDate;
        this.numOfTravellers = numOfTravellers;
        this.travelClass = travelClass;

    }
    
}

let Flight1 = new OneWayFlight;
Flight1.setData("New Delhi", "Chennai", "25 August, 2022", 3, "Economy");