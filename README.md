# React full-screen morph button

In this repo, I demonstrate a react component that expands to the full screen
when clicked. The idea is heavily adopted from [ButtonComponentMorph](https://github.com/codrops/ButtonComponentMorph/)
with a companion article
[Morphing Buttons Concept](https://tympanus.net/codrops/2014/05/12/morphing-buttons-concept/)
by Codrops.

## Usage

```
<FullScreenMorph
  openButtonText="More info"
  closeButtonText="Close"
  width="300"
  height="200"
>
  <h2>
    Some title
  </h2>

  <img src="http://placehold.jp/7b81c3/ffffff/300x200.png" alt="placeholder" />

  <p>Some paragraph</p>
</FullScreenMorph>
```

## Things I learned

- [Prevent body scrolling but allow overlay scrolling](http://stackoverflow.com/a/9280412/3837223)
- [http://youmightnotneedjquery.com/](http://youmightnotneedjquery.com/)
- [The ref Callback Attribute](https://facebook.github.io/react/docs/refs-and-the-dom.html)
