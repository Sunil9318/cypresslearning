# Screen Objects for use in e2e tests

Screen objects are an implementation of the PageObject pattern, but named to
match this being a mobile app.

Create a screen object for each logical screen(top level view) in the app, and
keep the selectors in it. Then, multiple test flows can re-use the page object,
and the test can focus on the business logic instead of implementation details.

We also have a sub-folder called components, to contain objects to abstract
things like our bottom nav.

## Original description:

> When you write tests against a web page, you need to refer to elements within
> that web page in order to click links and determine what's displayed. However,
> if you write tests that manipulate the HTML elements directly your tests will
> be brittle to changes in the UI. A page object wraps an HTML page, or
> fragment, with an application-specific API, allowing you to manipulate page
> elements without digging around in the HTML.

[PageObject Pattern (Martin Fowler)](https://www.martinfowler.com/bliki/PageObject.html)
