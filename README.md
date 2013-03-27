Density
=======

NodeJs module for calculating keyword density in a text/html

## Install

    npm install density

## How to use

```javascript
density("Hello World").getDensity(); //plain text
density("<b>Hello</b> <i>World</i> hello all").getDensity(); //HTML
````

## API

###density(inputStr)

Creating an density object.

**Available since**: v0.1.0

**Parameters:**
 - inputStr : String
   Given input to parse/calculate.

**Returns:**
 - density object.

**Example:**
```javascript
density("Hello World")
````

###getDensity()

Calculate the density of keywords.

**Available since**: v0.1.0

**Returns:**
 - An object that contains the density of keywords.

**Example:**
```javascript
density("Hello World").getDensity()
````

## Author
**Afshin Mehrabani**

- [Twitter](https://twitter.com/afshinmeh)
- [Github](https://github.com/afshinm)
- [Personal page](http://afshinm.name/)  
