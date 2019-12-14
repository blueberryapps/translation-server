# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_14_163720) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "highlights", id: :serial, force: :cascade do |t|
    t.integer "image_id"
    t.integer "key_id"
    t.integer "x"
    t.integer "y"
    t.integer "width"
    t.integer "height"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "locale_id"
    t.integer "location_id"
    t.index ["image_id"], name: "index_highlights_on_image_id"
    t.index ["key_id"], name: "index_highlights_on_key_id"
    t.index ["locale_id"], name: "index_highlights_on_locale_id"
    t.index ["location_id"], name: "index_highlights_on_location_id"
  end

  create_table "images", id: :serial, force: :cascade do |t|
    t.integer "location_id"
    t.string "name"
    t.string "variant"
    t.text "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_images_on_location_id"
    t.index ["name"], name: "index_images_on_name"
  end

  create_table "keys", id: :serial, force: :cascade do |t|
    t.string "key"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "data_type", default: "string"
    t.integer "project_id"
    t.index ["key", "id"], name: "index_keys_on_key_and_id"
    t.index ["key", "project_id"], name: "index_keys_on_key_and_project_id", unique: true
    t.index ["key"], name: "index_keys_on_key"
  end

  create_table "locales", id: :serial, force: :cascade do |t|
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "project_id"
    t.index ["code"], name: "index_locales_on_code"
  end

  create_table "locations", id: :serial, force: :cascade do |t|
    t.string "path"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "project_id"
    t.index ["path"], name: "index_locations_on_path"
  end

  create_table "projects", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "default_locale_id"
    t.string "api_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "screenshots", default: false
    t.index ["api_token"], name: "index_projects_on_api_token"
    t.index ["default_locale_id"], name: "index_projects_on_default_locale_id"
  end

  create_table "projects_users", id: :serial, force: :cascade do |t|
    t.integer "project_id"
    t.integer "user_id"
    t.index ["project_id"], name: "index_projects_users_on_project_id"
    t.index ["user_id"], name: "index_projects_users_on_user_id"
  end

  create_table "releases", id: :serial, force: :cascade do |t|
    t.integer "locale_id"
    t.string "version"
    t.text "yaml"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["locale_id"], name: "index_releases_on_locale_id"
  end

  create_table "restricted_ips", id: :serial, force: :cascade do |t|
    t.inet "ip"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_restricted_ips_on_user_id"
  end

  create_table "translation_caches", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.text "cache_yaml"
    t.text "cache_json"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_translation_caches_on_project_id"
  end

  create_table "translations", id: :serial, force: :cascade do |t|
    t.integer "key_id"
    t.integer "locale_id"
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "edited", default: false
    t.index ["key_id", "locale_id"], name: "index_translations_on_key_id_and_locale_id"
    t.index ["key_id"], name: "index_translations_on_key_id"
    t.index ["locale_id"], name: "index_translations_on_locale_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "api_key"
    t.string "role"
    t.string "available_locales", array: true
    t.index ["api_key"], name: "index_users_on_api_key"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "highlights", "images"
  add_foreign_key "highlights", "keys"
  add_foreign_key "images", "locations"
  add_foreign_key "releases", "locales"
  add_foreign_key "restricted_ips", "users"
  add_foreign_key "translation_caches", "projects"
  add_foreign_key "translations", "keys"
  add_foreign_key "translations", "locales"
end
