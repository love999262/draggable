### A simple plugin make your html element draggable!

[repertory](https://github.com/love999262/draggable)

[Demo](https://love999262.github.io/draggable/demo/index.html)

- Install

NPM
```
$npm install kaguya-draggable
```
or
```
<script src="./../dist/draggable.js"></script>
```

- API

| key                  | value                            | description  |
| -------------------- |:--------------------------------:| ------------:|
| selector             | '.drag'                          | the root node
| axis                 | 'both'/'x'/'y'                   | draggable axis
| cursor               | 'move'                           | the cursor style of selector
| userSelect           | boolean                          | userSelect of element
| callback             | function                         | get the coordinate
```javascript
    const drag = new Draggable({
        selector: '#drag',
        axis: 'both',
        userSelect: false,
        cursor: 'move',
        callback: (data) => {
            console.log(data);
        },
    });
```
or you can register nodelist by pass class or element selector

```javascript
    const drag = new Draggable({
        selector: '.drag',
        axis: 'both',
        cursor: 'move',
    });
```

### contribute is welcome, if you want to contribute code view [CONTRIBUTING](/doc/CONTRIBUTING.md)