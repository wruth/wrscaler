# WRScaler

A jQuery plugin that applies a CSS3 scale transform to an element to resize it when below a specified window breakpoint width. Useful for scaling composite elements or components. Wrapped elements will have a scale transform dynamically applied on window resize when the window width falls below a designated threshold value. The scale value will be in direct proportion of the window width to the threshold width and the base unscaled width of the element.

Note that when applying a transform to an element this does not in itself cause the document to reflow since the element continues to occupy the space it would have otherwise. By default WRScaler will update the height of the parent element to follow the height change of the scaled element. Also a callback function can be provided to the plugin invocation which will be called with a change object that includes a scale parameter if other modifications need to be made at this breakpoint. I'd recommend adjusting the transform-origin CSS property on your element so that the origin point of the scale is the top left corner (e.g., `transform-origin: top left;`) — otherwise the element will scale from it's center.

There's a [project page][page] for this plugin which demonstrates the plugin in action :smiley_cat:.

[page]: //wruth.github.io/wrscaler/


## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/wruth/wrscaler/master/dist/wrscaler.min.js
[max]: https://raw.github.com/wruth/wrscaler/master/dist/wrscaler.js

An example of JavaScript in your web page:

```html
<script src="jquery.js"></script>
<script src="dist/wrscaler.min.js"></script>
<script>
  $(document).ready(function () {
    $('#example').wrscaler({ threshold: 660 });
  });
</script>
```
Example markup:

```html
<body>
  <section class="content">
    <div id="example-wrapper">
      <div id="example">
        <div class="upper-left corner"></div>
        <div class="upper-right corner"></div>
        <div class="lower-left corner"></div>
        <div class="lower-right corner"></div>
        <div class="center"></div>
      </div>
    </div>
  </section>
</body>
```
And some CSS:

```css
.content {
	max-width: 640px;
	padding: 0 10px;
	margin: 0 auto;
}

#example-wrapper {
    padding: 20px;
    background-color: #ddd;
}

#example {
    position: relative;
    width: 600px;
    height: 600px;
    background-color: #cc9;
    transform-origin: top left;
}

.corner {
    position: absolute;
    width: 240px;
    height: 240px;
}

.center {
    position: absolute;
    width: 320px;
    height: 320px;
    left: 50%;
    top: 50%;
    margin-top: -160px;
    margin-left: -160px;
    background-color: #902;
}

.upper-left {
    background-color: #ff9;
}

.upper-right {
    right: 0;
    background-color: #9f9;
}

.lower-right {
    right: 0;
    bottom: 0;
    background-color: #99f;
}

.lower-left {
    bottom: 0;
    background-color: #f9f;
}
```

## Documentation
### Assumptions
1. The element at least has a designated width.
2. Any extra width in the window below the breakpoint is invariant.
3. Ideally the element is wrapped inside another element whose height can be modified to follow the scaling.

### Configuration
An options argument Object can be provided when invoking wrscaler. There is one required and two optional properties:

* `threshold`: **Required.** A numeric value representing essentially the breakpoint below which scaling should be applied. Similar to a value that could be used in a CSS breakpoint, but it's important to note that it can be subtly different as it is understood to always correspond to `$(window).width()`, and internally is itself dynamically adjusted based on whether there is a vertical scrollbar to create a `MediaQueryList` object and corresponding listener. Therefore any breakpoint related changes that are necessary are probably best handled in response to the `changeCallback` (detailed below) as opposed to a CSS media query breakpoint.
* `isVScaleParent`: A Boolean value indicating whether WRScaler should automatically adjust the height of the element's parent element to follow the scaled height. Default is `true`.
* `changeCallback`: A callback function which will be invoked when the window width falls below the threshold value, whenever the window resizes below the threshold value, and when the window width exceeds the threshold value. A parameter Object is provided as the sole argument of the callback.
 
### Change Callback
As noted the `changeCallback` will be invoked in three different conditions. A parameter object is always supplied as the sole argument to the callback, and has a `type` property reflecting the condition under which it is being invoked. These conditions (and the correspondng `type` value) are:
 
 1. `transform-will-start`: Invoked just before a scale transform is applied to the element, and if the threshold condition has been satisfied immediately, before the element is measured by the scaler. This gives client code a chance to adjust the properties of the scaled element if necessary before it is measured and scaled. For instance you might want to change the positioning of the element to `absolute`.
 2. `transform-change`: Invoked whenever the scale transform is in scope in response to a window resize event, and immediately after a `transform-will-start` notification. This form of the callback adds some additional properties to the parameter object:
 	* `scale`: A scale value, something less than one and greater than zero.
 	* `resizedTargetWidth`: The pixel width the element is being scaled to fit.
 	* `windowWidth`: For convenience, this is the same value as `$(window).width()`.
 3. `transform-end`: Invoked when the window width exceeds the threshold value.
 	
## Dependencies
* jQuery >=1.8.0
* `window.matchMedia`, `MediaQueryList`

## Installation
* Manually installed from the distribution files here.
* Via bower: `bower install wrscaler`

## License
Copyright (c) 2014 Ward Ruth

Licensed under the MIT License