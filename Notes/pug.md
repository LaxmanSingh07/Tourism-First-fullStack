## What is Pug?

Pug is a high performance template engine heavily influenced by [Haml](http://haml.info/) and implemented with JavaScript for [Node.js](http://nodejs.org/) and browsers. For bug reports, feature requests and questions, [open an issue]


## Installation

    npm install pug


## Syntax


### What is interpolation in pug?

Interpolation is a way of incorporating JavaScript variables into your template. Interpolation is done via `#{}` syntax. For example:

```pug

- var name = 'tobi';
p #{name}
```
