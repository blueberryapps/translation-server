# GET /api/v1/translations.yaml

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "a3e202678ef60aeff3a9205a19a72ca2"

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

    + Params

            {"location"=>"/register", "locale"=>"cs", "translations"=>[{"key"=>"cs.foo.bar", "text"=>"transalted text"}, {"key"=>"cs.foo.foo", "text"=>"super text"}, {"key"=>"cs.bar", "text"=>"foo text"}], "translation"=>{}}

+ Response 200 (application/json)

    + Headers

            Etag: W/"a34d3a2fe079b0e00ed475774c35b2f4"

    + Body

            {
              "message": "Imported 3 translations",
              "errors": [

              ]
            }

# HEAD /api/v1/translations

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "6666cd76f96956469e7be39d750cc7d9"

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

            Etag: "c784084d7f7055fcd934a69d5be5acaa"

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

# GET /api/v1/changes

+ Request (application/x-www-form-urlencoded)

        {"token"=>"XYZZYX"}

+ Response 200 (text/event-stream)

# HEAD /api/v1/releases/:version

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v001"}

+ Response 200 (application/json)

    + Headers

            Etag: "ce987757b7031b1ed31a1b0e2573b770"

# HEAD /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "ce987757b7031b1ed31a1b0e2573b770"

# GET /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "ce987757b7031b1ed31a1b0e2573b770"

    + Body

            {
              "releases": [
                {
                  "locale": "cs",
                  "version": "cs_v001",
                  "created_at": "2016-07-08T11:22:57.866Z"
                },
                {
                  "locale": "cs",
                  "version": "cs_v002",
                  "created_at": "2016-07-08T11:22:57.882Z"
                },
                {
                  "locale": "en",
                  "version": "en_v001",
                  "created_at": "2016-07-08T11:22:57.888Z"
                }
              ]
            }

# GET /api/v1/releases/:version.yaml dirrefent locales in one release

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002,en_v001"}

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "29b83ff81d569b81f27b59cc0a15b35b"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2016-07-08 11:22:57 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2

            # LOCALE:   en
            # VERSION:  en_v001
            # RELEASED: 2016-07-08 11:22:57 UTC

            en:
              foo:
                bar: Translated



# GET /api/v1/releases/:version.yaml version 1

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v001"}

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "ae143d907e36f568d692f1b314c30d58"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v001
            # RELEASED: 2016-07-08 11:22:58 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Super



# GET /api/v1/releases/:version.yaml version 2

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002"}

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "ae143d907e36f568d692f1b314c30d58"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2016-07-08 11:22:58 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2



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

    + Params

            {"location"=>"/foo/bar", "locale"=>"cs", "images"=>[{"image"=>"XYZ", "name"=>"/foo/bar#modal"}], "highlights"=>[{"image_name"=>"/foo/bar#modal", "key"=>"cs.foo.bar", "x"=>10, "y"=>20, "width"=>30, "height"=>40}], "image"=>{}}

+ Response 200 (application/json)

    + Headers

            Etag: W/"49033dcf71a16ec23c41ac1974726b24"

    + Body

            {
              "message": "Imported 1 images and 1 highlights"
            }

