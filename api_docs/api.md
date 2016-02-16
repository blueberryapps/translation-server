# HEAD /api/v1/translations

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "6666cd76f96956469e7be39d750cc7d9"

# GET /api/v1/translations.yaml

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "5c75206a4eb840e5e6774bf04921bc2d"

    + Body

            ---
            en:
              bar:
              - A
              - B
              foo:
                bar: en translated text
            cs:
              foo:
                bar: cs translated text



# GET /api/v1/translations.json

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "867ccb89d5c916ef2dabc4eee65e5c7d"

    + Body

            {
              "en": {
                "bar": [
                  "A",
                  "B"
                ],
                "foo": {
                  "bar": "en translated text"
                }
              },
              "cs": {
                "foo": {
                  "bar": "cs translated text"
                }
              }
            }

# not authorized GET /api/v1/translations

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=UNKNOWN_TOKEN

+ Response 401 (application/json)

        {
          "errors": {
            "token": "Bad credentials"
          }
        }

# POST /api/v1/translations

+ Request (application/json)

    + Headers

            Authorization: Token token=XYZZYX

    + Body

            {
              "location": "/register",
              "locale": "cs",
              "translations": [
                {
                  "key": "cs.foo.bar",
                  "text": "transalted text"
                },
                {
                  "key": "cs.foo.foo",
                  "text": "super text"
                },
                {
                  "key": "cs.bar",
                  "text": "foo text"
                }
              ]
            }

+ Response 200 (application/json)

    + Headers

            Etag: W/"a34d3a2fe079b0e00ed475774c35b2f4"

    + Body

            {
              "message": "Imported 3 translations",
              "errors": [

              ]
            }

# HEAD /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "ffa570dce4e946564c4cd1c9fa95bab9"

# GET /api/v1/releases/:version.yaml version 2

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "ffa570dce4e946564c4cd1c9fa95bab9"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2016-02-16 20:51:18 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2



# GET /api/v1/releases/:version.yaml dirrefent locales in one release

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "4f5b11d517429f6cc3e34e906b4d5adf"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2016-02-16 20:51:18 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2

            # LOCALE:   en
            # VERSION:  en_v001
            # RELEASED: 2016-02-16 20:51:18 UTC

            en:
              foo:
                bar: Translated



# GET /api/v1/releases/:version.yaml version 1

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "ffa570dce4e946564c4cd1c9fa95bab9"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v001
            # RELEASED: 2016-02-16 20:51:18 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Super



# HEAD /api/v1/releases/:version

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "ffa570dce4e946564c4cd1c9fa95bab9"

# GET /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "775cd3cf1d38a1b15e1fa7e44c2bf46d"

    + Body

            {
              "releases": [
                {
                  "locale": "cs",
                  "version": "cs_v001",
                  "created_at": "2016-02-16T20:51:18.990Z"
                },
                {
                  "locale": "cs",
                  "version": "cs_v002",
                  "created_at": "2016-02-16T20:51:18.998Z"
                },
                {
                  "locale": "en",
                  "version": "en_v001",
                  "created_at": "2016-02-16T20:51:19.004Z"
                }
              ]
            }

# POST /api/v1/images

+ Request (application/json)

    + Headers

            Authorization: Token token=XYZZYX

    + Body

            {
              "location": "/foo/bar",
              "locale": "cs",
              "images": [
                {
                  "image": "XYZ",
                  "name": "/foo/bar#modal"
                }
              ],
              "highlights": [
                {
                  "image_name": "/foo/bar#modal",
                  "key": "cs.foo.bar",
                  "x": 10,
                  "y": 20,
                  "width": 30,
                  "height": 40
                }
              ]
            }

+ Response 200 (application/json)

    + Headers

            Etag: W/"49033dcf71a16ec23c41ac1974726b24"

    + Body

            {
              "message": "Imported 1 images and 1 highlights"
            }

