# Card component

This project has been created with vue nuxt cli tool,
use `npm run dev` to launch it.

## Comments

- Vue, after React, feels weird; the "magic" attributes are more like Angular... I find it hard to believe
  that such a beautiful thing as React came from Facebook.
- I wonder how much fun can debugging computed observables be.
  Probably it goes [like this](https://media.giphy.com/media/xUNd9YJwF6ifDUnqNi/giphy.gif).
- Using inline (vue) js expressions makes the code look like spaghetti, but moving all of them
  to computeds will make me scroll up and down all the time, plus it spreads render/style
  logic throughout the component. I don't know which one's better (or worse).
- Skeletons are hard. This one... I don't believe in code that knows the future (or FTL drives).
  If the data of the card is being loaded, then we probably won't know it's internal schema
  and whether it has a footer, a body, two titles or none, etc. So _I think_
  in "real life" I would've created one static SkeletonCard component and that's it.
- Picking colors above the f5f5f5 range is painful.
- Vue nuxt's hot reloader is rather buggy. Style reloading is totally useless, but even then,
  sometimes it just forgot to reload the page or it rendered a huge grey server error.
- I expected Webstorm to understand basic Vue/Nuxt structures, but compared to typescript projects
  it's a pain in the back (for the SkeletonHelper it gave me zero code completion, probably
  not knowing anything about Nuxt component auto-importer).

## [Original spec](https://www.notion.so/Card-component-206dfb9d6ba34e56b98853f4e0387701)

In this task you will be required to implement a configurable `card` component based on the given design.
You can find the option details in the design, but think of it as a real life project and make your component flexible:
implement it in a way that new features or design changes can be easily added / removed later on.
You can break the component into smaller ones too.

### Design

[https://www.figma.com/file/7nSuhkrcrSKtzuAlOSAeRf/Card-component?node-id=0%3A1](https://www.figma.com/file/7nSuhkrcrSKtzuAlOSAeRf/Card-component?node-id=0%3A1)

### Requirements

- Implement the design
- Use semantic HTML
- Consider accessibility
- Support latest Chrome, Safari, Firefox, Edge browsers and IE 11+
- Mobile friendly
- Don't use any other component library / framework

### End goal

In the end we would like to see 4 different card variations below or next to each other on a page:

- one card must display every option, the rest is up to you, but make sure they're all different
- make sure we can see the loading state on them
- make sure to implement different click actions on the cards: clicking on one of them should alert or log a message, clicking on another should take you to another page / site, and clicking on another one doesn't do anything
- make sure this page is responsive (but you decide how you display the cards on it, you don't need to place them in a grid system)

### Technical details

For the project use Vue/Nuxt.js as your framework. Upload your finished project to the GitLab repo we created for you, and let us know when you're finished.
