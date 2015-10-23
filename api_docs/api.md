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

# GET /api/v1/translations.yaml

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "f9b13d33047589aa80f414e0ea08c1f5"

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

# GET /api/v1/translations.json

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "f9b13d33047589aa80f414e0ea08c1f5"

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

# HEAD /api/v1/translations

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "6666cd76f96956469e7be39d750cc7d9"

# GET /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "86bc307ffa7f0e568ac26c1eb85e5d1b"

    + Body

            {
              "releases": [
                {
                  "locale": "cs",
                  "version": "cs_v001",
                  "created_at": "2015-10-23T08:04:20.708Z"
                },
                {
                  "locale": "cs",
                  "version": "cs_v002",
                  "created_at": "2015-10-23T08:04:20.720Z"
                },
                {
                  "locale": "en",
                  "version": "en_v001",
                  "created_at": "2015-10-23T08:04:20.727Z"
                }
              ]
            }

# HEAD /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "86bc307ffa7f0e568ac26c1eb85e5d1b"

# GET /api/v1/releases/:version.yaml version 1

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "86bc307ffa7f0e568ac26c1eb85e5d1b"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v001
            # RELEASED: 2015-10-23 08:04:20 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Super



# GET /api/v1/releases/:version.yaml dirrefent locales in one release

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "2faea48ce656a03e394ba434f443546f"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2015-10-23 08:04:21 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2

            # LOCALE:   en
            # VERSION:  en_v001
            # RELEASED: 2015-10-23 08:04:21 UTC

            en:
              foo:
                bar: Translated



# GET /api/v1/releases/:version.yaml version 2

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "2a648b08e1532439c599ed4f5686baa1"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2015-10-23 08:04:21 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2



# HEAD /api/v1/releases/:version

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "2a648b08e1532439c599ed4f5686baa1"

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

