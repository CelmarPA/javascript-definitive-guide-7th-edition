/**
 * SVG (scalable vector graphics) is an image format. The word “vector” 
 * in its name indicates that it is fundamentally different from raster 
 * image formats, such as GIF, JPEG, and PNG, that specify a matrix 
 * ofpixel values. Instead, an SVG “image” is a precise, 
 * resolution independent (hence “scalable”) description of the steps 
 * necessary to draw the desired graphic. SVG images are described by 
 * text files using the XML markup language, which is quite similar to 
 * HTML.
 * 
 * There are three ways you can use SVG in web browsers:
 * 
 * 1 - You can use .svg image files with regular HTML <img> tags, just as 
 * you would use a .png or .jpeg image.
 * 
 * 2 - Because the XML-based SVG format is so similar to HTML, you can 
 * actually embed SVG tags directly into your HTML documents. If you do 
 * this, the browser’s HTML parser allows you to omit XML namespaces and 
 * treat SVG tags as if they were HTML tags.
 * 
 * 3 - You can use the DOM API to dynamically create SVG elements to 
 * generate images on demand.
 */

// SVG in HTML

/**
 * SVG images can, of course, be displayed using HTML <img> tags. But you 
 * can also embed SVG directly in HTML. And if you do this, you can even 
 * use CSS stylesheets to specify things like fonts, colors, and line 
 * widths. Here, for example, is an HTML file that uses SVG to display an 
 * analog clock face: File clock-face.hmtl
 * 
 * You’ll notice that the descendants of the <svg> tag are not normal 
 * HTML tags. <circle>, <line>, and <text> tags have obvious purposes, 
 * though, and it should be clear how this SVG graphic works. There are 
 * many other SVG tags, however, and you’ll need to consult an SVG 
 * reference to learn more. You may also notice that the stylesheet is 
 * odd. Styles like fill, stroke-width, and textanchor are not normal CSS 
 * style properties. In this case, CSS is essentially being used to set 
 * attributes of SVG tags that appear in the document. Note also that the 
 * CSS font shorthand property does not work for SVG tags, and you must 
 * explicitly set font-family, font-size, and font-weight as separate 
 * style properties.
 */

// Scripting SVG

/**
 * One reason to embed SVG directly into your HTML files (instead of just 
 * using static <img> tags) is that if you do this, then you can use the 
 * DOM API to manipulate the SVG image. Suppose you use SVG to display 
 * icons in your web application. You could embed SVG within a <template> 
 * tag (§15.6.2) and then clone the template content whenever you need to 
 * insert a copy of that icon into your UI. And if you want the icon to 
 * respond to user activity—by changing color when the user hovers the 
 * pointer over it, for example—you can often achieve this with CSS.
 * 
 * It is also possible to dynamically manipulate SVG graphics that are 
 * directly embedded in HTML. The clock face example in the previous 
 * section displays a static clock with hour and minute hands facing 
 * straight up displaying the time noon or midnight. But you may have 
 * noticed that the HTML file includes a <script> tag. That script runs a 
 * function periodically to check the time and transform the hour and 
 * minute hands by rotating them the appropriate number of degrees so 
 * that the clock actually displays the current time.
 * 
 * The code to manipulate the clock is straightforward. It determines the 
 * proper angle of the hour and minute hands based on the current time, 
 * then uses querySelector() to look up the SVG elements that display 
 * those hands, then sets a transform attribute on them to rotate them 
 * around the center of the clock face. The function uses setTimeout() to 
 * ensure that it runs once a minute:
 */

// Code in file clock.js in scripts