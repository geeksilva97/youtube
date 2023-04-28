# Marker icon rotation - Google Maps API JavaScript

## Approaches

### 1 Using SVG paths

The first approach tried in this demo. I just wanted to use the `rotation` property of the [Symbol interface](https://developers.google.com/maps/documentation/javascript/reference?hl=en#Symbol).

#### whys

1. we do not need a backend support neither any http call for rotating icons;
2. hence it's faster.

#### challenges

1. the challenge here is to define SVG paths that are suitable to your purposes;
2. complex SVG can be hard to combine into a single path.

#### results

The harder part here seems to be manipulating the SVG in order to get a path. Once you have this, you're fine. It's
really easy to work with symbol path and rotation.

The implementation in this repository used a base Symbolpath provided by Google Maps for the sake of my mental health
:').

### 2 Using a regular PNG image and rotating on a backend

#### whys

1. easier to define a complex image (e.g. a car icon, your company logo, etc).

#### challenges

1. making a request (HTTP or anything else) for each rotation change (it can be cached but it still sucks);
2. have to set up a backend for rotating image based on the degree;
3. have to prepara an image that can rotate without leaving holes in some angles.

#### results

This implementation was inspired by Google Maps team example where they had an icon being generated on the backend and
we could pass a color as query param. Such a backend used to return the image in that given color.

It works and depending on the case the server calls might not be a problem. You have to analyze your situation.

## References

- https://developers.google.com/maps/documentation/javascript/reference?hl=en#Symbol
- https://stackoverflow.com/questions/5892113/extend-google-maps-marker-to-animate-smoothly-on-update
