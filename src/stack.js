//
export class Stack {
    constructor(_state) {
        //
        this._updateNext = async () => {
            const next = await this.state.promiseNext;
            this._stack.unshift(next);
        };
        this._updateOutput = async () => {
            const output = await this.state.promiseOutput;
            if (!output && this._stack.length > 1) {
                const old = this._stack.shift();
                await Promise.allSettled([old.promiseNext, old.transition(this.state)]);
            }
        };
        this._raceWhile = async () => {
            while (true) {
                await Promise.race([this._updateNext(), this._updateOutput()]);
            }
        };
        this._stack = [_state];
        this._raceWhile();
    }
    get state() {
        return this._stack[0];
    }
}
