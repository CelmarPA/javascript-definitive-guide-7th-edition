/**
 * The Flow type to describe an object looks a lot like an object 
 * literal, except that property values are replaced by property types. 
 * Here, for example, is a function that expects an object with numeric x 
 * and y properties:
 */

// @flow
// Given an object with numeric x and y properties, return the
// distance from the origin to the point (x,y) as a number.
export default function distance(point: {x:number, y:number}): number {
    return Math.hypot(point.x, point.y);
}

/**
 * JavaScript’s objects are sometimes used as dictionaries or string-tovalue
maps. When used like this, the property names are not known in
advance and cannot be declared in a Flow type. If you use objects this
way, you can still use Flow to describe the data structure. Suppose that
you have an object where the properties are the names of the world’s
major cities and the values of those properties are objects that specify
the geographical location of those cities. You might declare this data
structure like this:
 */

// @flow
const cityLocations: {[string]: {longitude:number, latitute:number}} = {
    "Seattle": { longitude: 47.6020, latitute: -122.3321 },
    // TODO: if there are any other important cities, add them here.
};
export default cityLocations;