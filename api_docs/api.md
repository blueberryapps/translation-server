# GET /api/v1/translations.yaml

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "83878088749cbe739dabc98693f0478a"

    + Body

            ---
            cs:
              foo:
                bar: cs translated text
            en:
              bar:
              - A
              - B
              foo:
                bar: en translated text



# GET /api/v1/translations.json

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "83878088749cbe739dabc98693f0478a"

    + Body

            {
              "cs": {
                "foo": {
                  "bar": "cs translated text"
                }
              },
              "en": {
                "bar": [
                  "A",
                  "B"
                ],
                "foo": {
                  "bar": "en translated text"
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

    + Params

            {"location"=>"/register", "locale"=>"cs", "translations"=>[{"key"=>"cs.foo.bar", "text"=>"transalted text"}, {"key"=>"cs.foo.foo", "text"=>"super text"}, {"key"=>"cs.bar", "text"=>"foo text"}], "translation"=>{}}

+ Response 200 (application/json)

    + Headers

            Etag: W/"c51f8dbf79b64ff6b654896db0089041"

    + Body

            {
              "message": "Created 3 translations",
              "new_translations": [
                {
                  "locale": "cs",
                  "key": "foo.bar",
                  "text": "transalted text"
                },
                {
                  "locale": "cs",
                  "key": "foo.foo",
                  "text": "super text"
                },
                {
                  "locale": "cs",
                  "key": "bar",
                  "text": "foo text"
                }
              ],
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

# GET /api/v1/changes

+ Request (application/x-www-form-urlencoded)

        {"token"=>"XYZZYX"}

+ Response 200 (text/event-stream)

# GET /api/v1/releases/:version.yaml dirrefent locales in one release

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002,en_v001"}

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "7268a226089a632e01dc983d497003e6"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2017-03-28 10:25:10 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2

            # LOCALE:   en
            # VERSION:  en_v001
            # RELEASED: 2017-03-28 10:25:10 UTC

            en:
              foo:
                bar: Translated



# GET /api/v1/releases/:version.yaml version 2

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002"}

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "74938dd1e997a52a6e1b76169fad24cd"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2017-03-28 10:25:11 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2



# GET /api/v1/releases/:version.yaml version 1

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v001"}

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "74938dd1e997a52a6e1b76169fad24cd"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v001
            # RELEASED: 2017-03-28 10:25:11 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Super



# GET /api/v1/releases/:version.json dirrefent locales in one release

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002,en_v001"}

+ Response 200 (application/json)

    + Headers

            Etag: "f396e0cc2ed1a3859c5b46f30e3e4cad"

    + Body

            {
              "cs": {
                "bar": {
                  "foo": "Translation"
                },
                "foo": {
                  "bar": "Released2"
                }
              },
              "en": {
                "foo": {
                  "bar": "Translated"
                }
              }
            }

# GET /api/v1/releases/:version.json version 2

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002"}

+ Response 200 (application/json)

    + Headers

            Etag: "74938dd1e997a52a6e1b76169fad24cd"

    + Body

            {
              "cs": {
                "bar": {
                  "foo": "Translation"
                },
                "foo": {
                  "bar": "Released2"
                }
              }
            }

# GET /api/v1/releases/:version.json version 1

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v001"}

+ Response 200 (application/json)

    + Headers

            Etag: "74938dd1e997a52a6e1b76169fad24cd"

    + Body

            {
              "cs": {
                "bar": {
                  "foo": "Translation"
                },
                "foo": {
                  "bar": "Super"
                }
              }
            }

# GET /api/v1/releases/:version.json latest release for locale

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"en_latest"}

+ Response 200 (application/json)

    + Headers

            Etag: "74938dd1e997a52a6e1b76169fad24cd"

    + Body

            {
              "en": {
                "foo": {
                  "bar": "Latest release"
                }
              }
            }

# GET /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "74938dd1e997a52a6e1b76169fad24cd"

    + Body

            {
              "releases": [
                {
                  "locale": "cs",
                  "version": "cs_v001",
                  "created_at": "2017-03-28T10:25:11.891Z"
                },
                {
                  "locale": "cs",
                  "version": "cs_v002",
                  "created_at": "2017-03-28T10:25:11.901Z"
                },
                {
                  "locale": "en",
                  "version": "en_v001",
                  "created_at": "2017-03-28T10:25:11.908Z"
                },
                {
                  "locale": "en",
                  "version": "en_v002",
                  "created_at": "2017-03-28T10:25:11.918Z"
                }
              ]
            }

# HEAD /api/v1/releases/:version

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v001"}

+ Response 200 (application/json)

    + Headers

            Etag: "74938dd1e997a52a6e1b76169fad24cd"

# HEAD /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "e630f3ccecbe279e0d93874ba1da90e0"

