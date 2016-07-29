# Translation server

Stores translations with location and screenshot.
Enable users to easily edit translations and then any rails application can
use them.

## Architecture of service

![Data Model](./readme/data_model.png)

Data model of Translation server

![Catcher](./readme/catcher.png)

Catcher is middleware in rails APP which catches all used translations in page
and then it sends them into Translation Server.

![Screenshots](./readme/screenshots.png)

Screenshots middleware takes highlights and images which sends into Translation
Server.

# Developer

Use the following guides for getting things done, programming well, and
programming in style.

* [Protocol](http://github.com/thoughtbot/guides/blob/master/protocol)
* [Best Practices](http://github.com/thoughtbot/guides/blob/master/best-practices)
* [Style](http://github.com/thoughtbot/guides/blob/master/style)

# Clear database (without users)

`rake clear_database`
