# mealtime
[![](https://badgen.net/packagephobia/install/mealtime?icon=npm&label&color=black&scale=1.3)](https://www.npmjs.com/package/mealtime) [![](https://badgen.net/npm/types/tslib?icon=typescript&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.d.ts) [![](https://badgen.net/github/status/domrally/mealtime?icon=github&label&color=black&scale=1.3)](https://github.com/domrally/mealtime/actions) [![](https://badgen.net/badge/license/Fair?color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/LICENSE) [![](https://badgen.net/codeclimate/loc/domrally/mealtime?label=lines&color=grey&scale=1.3)](https://github.com/domrally/mealtime/blob/main/code/context.ts) [![](https://badgen.net/github/tag/domrally/mealtime?icon=git&label&color=grey&scale=1.3)](https://github.com/domrally/mealtime/releases)

proxy–state pattern made in typescript

## how to use
```js
const a = {
  word: 'hello'
}
const b = {
  word: 'world'
}

const context = new Context() // new Context<{ word: string }>()
const { target } = context

context.target = a
console.log(target.word) //> hello

context.target = b
console.log(target.word) //> world

target.word = 'meal'
console.log(target.word) //> meal

const observe = async function () {
  for await (const { value } of context) {
    console.log(value)
  }
}()
target.word = 'time' //> time
```
## how to install & import
### javascript or deno
```js
import { Context } from 'https://esm.sh/mealtime'
```
### node
```
npm i mealtime
```
```js
import { Context } from 'mealtime'
```
### html
```html
<script type="module">
    import { Context } from 'https://esm.sh/mealtime'	
</script>
```

## software design patterns
the Proxy class in javascript—a uniquely exotic language feature—builds in an implemention of the [proxy pattern](https://en.wikipedia.org/wiki/Proxy_pattern)
> a proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes. Use of the proxy can simply be forwarding to the real object or can provide additional logic.

typescript keeps the Proxy class and adds the static typing we need to implement a classic [state pattern](https://en.wikipedia.org/wiki/state_pattern)
> allows an object to alter its behavior when its internal state changes. This pattern is close to the concept of finite-state machines

## mealtime?
using mealtime resembles making a [mealy machine](https://en.wikipedia.org/wiki/Mealy_machine)
> in the theory of computation, a Mealy machine is a finite-state machine whose output values are determined both by its current state and the current inputs
