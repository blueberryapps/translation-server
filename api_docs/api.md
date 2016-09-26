# GET /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "b5ea6c1ef7432d3964548449cb98e823"

    + Body

            {
              "releases": [
                {
                  "locale": "cs",
                  "version": "cs_v001",
                  "created_at": "2016-09-26T07:59:27.381Z"
                },
                {
                  "locale": "cs",
                  "version": "cs_v002",
                  "created_at": "2016-09-26T07:59:27.399Z"
                },
                {
                  "locale": "en",
                  "version": "en_v001",
                  "created_at": "2016-09-26T07:59:27.406Z"
                },
                {
                  "locale": "en",
                  "version": "en_v002",
                  "created_at": "2016-09-26T07:59:27.416Z"
                }
              ]
            }

# GET /api/v1/releases/:version.json latest release for locale

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"en_latest"}

+ Response 200 (application/json)

    + Headers

            Etag: "b5ea6c1ef7432d3964548449cb98e823"

    + Body

            {
              "en": {
                "foo": {
                  "bar": "Latest release"
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

            Etag: "b5ea6c1ef7432d3964548449cb98e823"

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

# GET /api/v1/releases/:version.json version 2

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002"}

+ Response 200 (application/json)

    + Headers

            Etag: "b5ea6c1ef7432d3964548449cb98e823"

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

# GET /api/v1/releases/:version.json dirrefent locales in one release

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002,en_v001"}

+ Response 200 (application/json)

    + Headers

            Etag: "75601424c748ea674ff2a0c8d7cdfaaf"

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

# HEAD /api/v1/releases

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

+ Response 200 (application/json)

    + Headers

            Etag: "b5ea6c1ef7432d3964548449cb98e823"

# GET /api/v1/releases/:version.yaml version 1

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v001"}

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "23c083d162e249161eef9bd70b76f173"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v001
            # RELEASED: 2016-09-26 07:59:28 UTC

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

            Etag: "23c083d162e249161eef9bd70b76f173"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2016-09-26 07:59:28 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2



# GET /api/v1/releases/:version.yaml dirrefent locales in one release

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v002,en_v001"}

+ Response 200 (application/x-yaml)

    + Headers

            Etag: "0cf1f634ae7b1431628daf41ec38d10d"

    + Body

            # LOCALE:   cs
            # VERSION:  cs_v002
            # RELEASED: 2016-09-26 07:59:28 UTC

            cs:
              bar:
                foo: Translation
              foo:
                bar: Released2

            # LOCALE:   en
            # VERSION:  en_v001
            # RELEASED: 2016-09-26 07:59:28 UTC

            en:
              foo:
                bar: Translated



# HEAD /api/v1/releases/:version

+ Request (application/x-www-form-urlencoded)

    + Headers

            Authorization: Token token=XYZZYX

    + Params

            {"id"=>"cs_v001"}

+ Response 200 (application/json)

    + Headers

            Etag: "23c083d162e249161eef9bd70b76f173"

