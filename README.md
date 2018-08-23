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
| axis                 | 'both'/'x'/'                     | draggable axis
| cursor               | 'move'                           | the cursor style of selector
```javascript
    const drag = new Draggable({
        selector: '#drag',
        axis: 'both',
        cursor: 'move',
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