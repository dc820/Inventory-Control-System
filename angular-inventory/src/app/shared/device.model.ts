export class Device {
    constructor(
        public device: string,
        public model: string,
        public manufacturer: string,
        public serial: string,
        public start: number,
        public recieved: number,
        public shipped: number,
        public onhand: number,
        public minimum: number
    ) {}
}
