# rc-if-else

React conditional rendering

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-if-else.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-if-else
[travis-image]: https://img.shields.io/travis/qinyuanbin/rc-if-else.svg?style=flat-square
[travis-url]: https://travis-ci.org/qinyuanbin/rc-if-else
[codecov-image]: https://img.shields.io/codecov/c/github/qinyuanbin/rc-if-else/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/qinyuanbin/rc-if-else/branch/master
[gemnasium-image]: http://img.shields.io/gemnasium/qinyuanbin/rc-if-else.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/qinyuanbin/rc-if-else
[download-image]: https://img.shields.io/npm/dm/rc-if-else.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-if-else

## install

[![rc-if-else](https://nodei.co/npm/rc-if-else.png)](https://npmjs.org/package/rc-if-else)

## Usage

```js
import { If, Elif, Else } from 'rc-if-else';
...

render(){
  ...
    // if `condition` is `true`, show `Title`, else show nothing.
    <If condition={condition} >
        <h1>Title</h1>
    </If>

    // if `condition` is `true`, show `Title1`, else show `Title2`.
    <If condition={condition} >
        <h1>Title1</h1>
        <Else><h1>Title2</h1></Else>
    </If>

    // if `condition1` is `true`, show `Title1`
    // else if `condition2` is `true`, show `Title2`
    // if all condition failed. show `Title3`
    <If condition={condition1} >
        <h1>Title1</h1>
        <ElIf condition={condition2}><h1>Title2</h1></ElIf>
        <Else><h1>Title3</h1></Else>
    </If>
}

```

## License

rc-if-else is released under the MIT license.
