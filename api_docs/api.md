# GET /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "8eff69458398e3a85c83339daee02145"

    + Body

            {
              "releases": [
                {
                  "locale": "cs",
                  "version": "cs_v001",
                  "created_at": "2015-03-09T11:19:04.158Z"
                },
                {
                  "locale": "cs",
                  "version": "cs_v002",
                  "created_at": "2015-03-09T11:19:04.174Z"
                },
                {
                  "locale": "en",
                  "version": "en_v001",
                  "created_at": "2015-03-09T11:19:04.183Z"
                }
              ]
            }

# GET /api/v1/releases/:version.yaml version 1

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "8eff69458398e3a85c83339daee02145"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v001
            # RELEASED: 2015-03-09 11:19:04 UTC

            ---
            cs:
              foo:
                bar: Super
              bar:
                foo: Translation



# GET /api/v1/releases/:version.yaml version 2

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "8eff69458398e3a85c83339daee02145"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2015-03-09 11:19:04 UTC

            ---
            cs:
              foo:
                bar: Released2
              bar:
                foo: Translation



# HEAD /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "8eff69458398e3a85c83339daee02145"

# HEAD /api/v1/releases/:version

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "8eff69458398e3a85c83339daee02145"

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

# HEAD /api/v1/translations

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "6666cd76f96956469e7be39d750cc7d9"

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

            Etag: W/"f7b013f7251520663e1223c6f2a12c5b"

    + Body

            {
              "message": "Imported 3 translations"
            }

# GET /api/v1/translations.json

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "297326d760e803bbe877d699ba80c86f"

    + Body

            {
              "cs": {
                "foo": {
                  "bar": "cs translated text"
                }
              },
              "en": {
                "foo": {
                  "bar": "en translated text"
                },
                "bar": [
                  "A",
                  "B"
                ]
              }
            }

# GET /api/v1/translations.yaml

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "68c63731aabac2d2712ab0394bb51506"

    + Body

            ---
            cs:
              foo:
                bar: cs translated text
            en:
              foo:
                bar: en translated text
              bar:
              - A
              - B


