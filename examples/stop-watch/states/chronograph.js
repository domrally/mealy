import { State } from '../../../src/state.js';
export class Chronograph extends State {
    // 
    constructor(times) {
        super();
        this.times = times;
    }
    async *totaller() {
        return this.times.totaller();
    }
    async *lapper() {
        return this.times.lapper();
    }
}
