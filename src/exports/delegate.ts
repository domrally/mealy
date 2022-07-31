import { error } from 'console'
import { Action, Forward } from './exports'

/**
 * ### Description
 *
 * Delegates actions to a weak set of listeners
 *
 * _example_
 *
 * ```ts
 * import { Delegate, Forward } from 'peekeasy'
 *
 * const { log } = console,
 * 	forward = new Forward(),
 * 	delegate = new Delegate(forward)
 *
 * delegate.then(() => log('Hello, world!'))
 *
 * // Hello, world!
 * forward()
 * ```
 *
 */
export class Delegate<params extends any[] = []>
	implements
		WeakSet<Action<params>>,
		AsyncIterable<params>,
		PromiseLike<params>
{
	/**
	 *
	 */
	private forwards!: Forward<params>[]

	/**
	 *
	 * @param forward default sender
	 * @param forwards event senders
	 *
	 */
	constructor(
		protected forward: Forward<params> = new Forward(),
		...forwards: Forward<params>[]
	) {
		try {
			//
			forwards ??= []

			//
			forwards.push(forward)

			//
			this.forwards = [...new Set(forwards)]
		} catch (message) {
			error(`Problem constructing Delegate:\n${message}`)
		}
	}

	add(listener: Action<params>) {
		try {
			this.forwards.forEach(d => d?.add?.(listener))
		} catch (message) {
			error(`Problem adding listener to Delegate:\n${message}`)
		}

		return this
	}

	delete(listener: Action<params>) {
		try {
			this.forwards.forEach(d => d?.delete?.(listener))
		} catch (message) {
			error(`Problem deleting listener from Delegate:\n${message}`)
		}

		return true
	}

	has(listener: Action<params>) {
		try {
			return this.forwards.some(d => d?.has?.(listener))
		} catch (message) {
			error(`Problem checking if Delegate has listener:\n${message}`)

			return false
		}
	}

	async then<U = params, V = never>(
		onfulfilled?: (args: params) => PromiseLike<U>,
		onrejected?: (reason: unknown) => PromiseLike<V>
	): Promise<any> {
		try {
			const iterator = this[Symbol.asyncIterator](),
				{ value } = await iterator.next()

			return onfulfilled?.(value as params)
		} catch (message) {
			return onrejected?.(
				`Problem with callback function awaiting then on Delegate:\n${message}`
			)
		}
	}

	async *[Symbol.asyncIterator]() {
		while (true) {
			try {
				yield new Promise<params>(resolve => {
					const resolution = (...args: params) => {
						resolve(args)

						this.forwards.forEach(d => d?.delete?.(resolution))
					}

					this.forwards.forEach(d => d?.add?.(resolution))
				})
			} catch (message) {
				error(`Problem awaiting for Delegate:\n${message}`)
			}
		}
	}

	get [Symbol.toStringTag]() {
		try {
			return JSON.stringify(this)
		} catch (message) {
			error(`Problem converting Delegate to string:\n${message}`)

			return Delegate.name
		}
	}
}
