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

### Output

The output of `density` is something like this:  
```json
[
    {
        "word": "world",
        "count": 1
    },
    {
        "word": "hello",
        "count": 2
    }
]
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

###setOption(option, value)

Set a single option to density

**Available since**: v0.1.0

**Parameters:**
 - option : String
   Option key name.

 - value : String/Number
   Value of the option.

**Returns:**
 - density object

###setOptions(options)

Set options to the density object.

**Available since**: v0.1.0

**Parameters:**
 - options : Object
   Object that contains option keys with values.

**Returns:**
 - density object

**Example:**
```javascript
density("Hello World").setOptions({ minKeywordLength: 5 });
````

## Author
**Afshin Mehrabani**

- [Twitter](https://twitter.com/afshinmeh)
- [Github](https://github.com/afshinm)
- [Personal page](http://afshinm.name/)  

## License
> Copyright (C) 2012 Afshin Mehrabani (afshin.meh@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
