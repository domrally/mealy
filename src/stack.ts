import { Machine } from './interfaces/machine.js'
import { State } from './interfaces/state.js'
//
export class Stack<S extends State<S>> implements Machine<S> {
    // 
    private readonly _stack: S[]
    //
    private readonly _updateNext = async () => {
        const next = await this.state.promiseNext
        this._stack.unshift(next)
    }
    private readonly _updateOutput = async () => {
        const output = await this.state.promiseOutput
        if (!output && this._stack.length > 1) {
            const old = this._stack.shift() as S
            await Promise.allSettled([old.promiseNext, old.transition(this.state)])
        }
    }
    private readonly _raceWhile = async () => {
        while (true) {
            await Promise.race([this._updateNext(), this._updateOutput()])
        }
    }
    constructor(_state: S) {
        this._stack = [_state]
        this._raceWhile()
    }
    get state(): Readonly<S> {
        return this._stack[0]
    }
}
