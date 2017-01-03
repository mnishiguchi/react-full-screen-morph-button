# React full-screen morph button

In this repo, I demonstrate a react component that expands to the full screen
when clicked. The idea is mostly adopted from [ButtonComponentMorph](https://github.com/codrops/ButtonComponentMorph/)
with a companion article
[Morphing Buttons Concept](https://tympanus.net/codrops/2014/05/12/morphing-buttons-concept/)
by Codrops.

---

## Usage

```js
<FullScreenMorph
  openButtonText="More info"
  closeButtonText="Close"
  width={300}
  height={80}
>
  <h2>
    Some title
  </h2>

  <img src="http://placehold.jp/7b81c3/ffffff/300x200.png" alt="placeholder" />

  <p>Some paragraph</p>
</FullScreenMorph>
```

#### props

```
width            : T.number,
height           : T.number,
openButtonText   : T.string,
closeButtonText  : T.string,
wrapperStyle     : T.object,
openButtonStyle  : T.object,
closeButtonStyle : T.object,
contentStyle     : T.object,
```

---

## Starting this demo app locally

```
git clone git@github.com:mnishiguchi/react-full-screen-morph-button.git
cd react-full-screen-morph-button
npm install
npm start
```

---

## Some techniques I used

- [Prevent body scrolling but allow overlay scrolling](http://stackoverflow.com/a/9280412/3837223)
- [http://youmightnotneedjquery.com/](http://youmightnotneedjquery.com/)
- [The ref Callback Attribute](https://facebook.github.io/react/docs/refs-and-the-dom.html)
