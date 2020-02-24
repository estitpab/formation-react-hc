# Formation React (Nov. 2019)

Copycast: http://192.168.1.48:42000

Formateur : Nicolas Chambrier <nicolas@chambrier.fr> @naholyr

- Vérifier ordre des imports
  → c'est Babel qui est laxiste (cf. https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import "Dans de tels cas, l'import par défaut devra être déclaré en premier")
- use-case du callback de setState
  → cas du startStop du chronometer, on veut lancer le premier tick dès le prochain render (ça aurait pu être fait dans un componentDidUpdate qui teste la différence de state, mais c'est plus simple à cet endroit)
- creuser forceUpdate (quand par rapport au render "normal")
  → cas du chronometer, on pouvait *ne pas* stocker la valeur de "time" dans le state, utiliser systématiquement Date.now() - start directement dans le render, et au lieu de faire des setState lancer forceUpdate() pour rafraîchir l'affichage
- exo illustrant "If you want to re-compute some data only when a prop changes, use a memoization helper instead."
  → très bonne illustration ici : https://fr.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
- ref=function (bonne pratique ?)
  → pas de dépréciation, mais les docs ne la mentionnent qu'en note (cf. https://fr.reactjs.org/docs/refs-and-the-dom.html), on peut en déduire une tendance pour le futur mais tout semble OK


### Liens utiles

- Diagramme du cycle de vie des composants : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
- Ulimit & watch : https://www.imakewebsites.ca/posts/2018/03/06/node.js-too-many-open-files-and-ulimit/
- Qui est this ? https://github.com/byteclubfr/site/blob/readable-in-github/src/blog/this.md
- Features ES6 : http://es6-features.org/#ObjectMatchingShorthandNotation
- React : https://reactjs.org/docs/react-component.html
- Babel (transpilation) : https://babeljs.io/repl
- Rechercher un module : https://www.npmjs.com/search
- Vérifier le poids d'une dépendance : https://bundlephobia.com/
- Intégration d'ESLint dans l'IDE : https://facebook.github.io/create-react-app/docs/setting-up-your-editor
- Organiser les routes à un seul endroit : https://github.com/reacttraining/react-router/tree/master/packages/react-router-config
- Animations
  - React Transition Group : https://reactjs.org/docs/animation.html
  - React Router Transitions : https://reacttraining.com/react-router/web/example/animated-transitions
- Tests :
  - Tests fonctionnels E2E : Cypress
  - “Write tests. Not too many. Mostly integration” : https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c
  - Tester son routing (hors shallow rendering) : https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/testing.md
  - Tester ses hooks "custom" : https://github.com/mpeyper/react-hooks-testing-library (ou de manière générale, on écrit un composant qui utilise ce hook dans différentes situations et on le teste)
  - Mise en place des tests avec Jest/Enzyme : https://facebook.github.io/create-react-app/docs/running-tests
  - “Why I never use Shallow Rendering” : https://kentcdodds.com/blog/why-i-never-use-shallow-rendering
- « Challenges in Server Side Rendering React Apps” : https://vijayt.com/post/challenges-in-server-side-rendering-react-apps-ssr/
- “Hot reloading with create-react-app without ejecting” : https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
- “Portable console emulator for Windows” : https://cmder.net/
- “Execution in the kindom of nouns” : https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html
- “React Lifecycle Methods Diagram” : http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
- “Understanding Redux Middleware And Writing Custom Ones” : https://designingforscale.com/understanding-redux-middleware-and-writing-custom-ones/
- “Searchable collection of React hooks”: https://nikgraf.github.io/react-hooks/

## Protips / bons réflexes

|                                                               Situation | Penser à…                                                                                   |
|------------------------------------------------------------------------:|---------------------------------------------------------------------------------------------|
|                                      Action au démarrage d'un composant | `componentDidMount` si besoin de `setState`, `componentWillMount` sinon                     |
|                                       Réagir aux modifications de props | `componentDidUpdate`                                                                        |
|                        `setState` dont la valeur dépend de `this.state` | utiliser un *functional updater* : `setState(oldState => newState)`                         |
| Abonnement à un événement ou action asynchrone dans `componentDidMount` | penser à annuler dans `componentWillUnmount` (si pas possible, gérer tout le flux ailleurs) |
|                                                            React Router | penser à installer `react-router-dom@next` afin d'éviter le problème _"update blocking"_    |

## ES6: Spreading operator

Rest parameters:

```js
const foo = (a, b, c, ...rest) {
  rest // [4, 5, 6]
}

foo(1, 2, 3, 4, 5, 6)
```

Spread arguments:

```js
const array = [1, 2, 3, 4, 5, 6]
foo(...array)
```

Spread operator (array, object)

```js
const a1 = [1, 2, 3]
const a2 = [4, 5, 6]
const a = [0, ...a1, ...a2, 7]

const o1 = { x: 1, y: 1 }
const o2 = { x: 2, z: 2 }
const o = { ...o1, ...o2, w: 3 }
// {x: 1, y: 1, x: 2, z: 2, w: 3}
// {x: 2, y: 1, z: 2, w: 3}
```

Attention: shallow copy

```js
const data = { users: [{ name: 'Bob' }, { name: 'John' }] }

const users2 = [...data.users, { name: 'Jesus' }]
users2[0].name = 'Toto'

data.users[0].name // 'Toto'
```

## Immutable.js

```js
import { fromJS } from 'immutable'

const data = fromJS({ users: [{ name: 'Bob' }, { name: 'John' }] })

data.get('users')
data.getIn(['users', 0, 'name'])

// data.users.push({ name: 'Jesus' }) (sauf qu'on ne modifie pas data → nouvelle instance)
data.set('users', data.get('users').push(fromJS({ name: 'Jesus' })))
```

## Async setState: snippet intéressant

https://twitter.com/dan_abramov/status/1018945865745084416

## Environnement de développement

- create-react-app
- customisation:
  - react-app-rewired
  - react-app-rewire-eslint
  - react-app-rewire-scss

### Typing

**Use TypeScript**

[Follow the guide](https://levelup.gitconnected.com/typescript-and-react-using-create-react-app-a-step-by-step-guide-to-setting-up-your-first-app-6deda70843a4)

```sh
create-react-app my-app --scripts-version=react-scripts-ts
# Use .tsx extensions
# Change imports:
#   import React, { Component } from 'react' + class extends Component
#   import React from 'react' + class extends React.Component
# Into:
#   import * as React from 'react' + class extends React.Component
```

**Use Flow**

[Follow the guide (VS Code)](https://stephenmann.io/post/how-to-setup-flow-with-create-react-app-and-visual-studio-code/)

```sh
# For VS code:
npm add -g flow-bin
```

```ini
# Fix errors on import 'file.css'
[libs]
./src/types.js
[options]
module.name_mapper='.*\(\.s?css\)' -> 'AnyModule'
module.system=haste
```

```js
// src/types.js
declare module AnyModule {
  declare var exports: { [key: string]: string }
}
```

### No sourcemap for prod

`GENERATE_SOURCEMAP=false npm run build`

### Editorconfig

https://editorconfig.org/

### ESLint

`.eslintrc.json` (ou `package.json`) :

```json
{
  "extends": "react-app"
}
```

- configurer son éditeur pour l'utiliser (VSCode : plugin "ESLint")


#### AutoFix & VS COde

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Prettier

https://github.com/prettier/prettier

```sh
npm add -D prettier
```

- configurer son éditeur pour l'utiliser (VSCode : plugin "Prettier - Code formatter" + `"editor.formatOnSave": true`)

Activation en hook pre-commit:

```sh
npm add -D pretty-quick husky
```

```js
// package.json
{
  "scripts": {
    "precommit": "pretty-quick --staged"
  }
}
```
