CREATE TABLE IF NOT EXISTS users (
	id integer PRIMARY KEY,
	created_at timestamp with time zone DEFAULT now(),
	name character varying(64)
);

CREATE TABLE IF NOT EXISTS companies (
	id integer PRIMARY KEY,
	created_at timestamp with time zone DEFAULT now(),
	name character varying(64)
);

CREATE TABLE IF NOT EXISTS listings (
	id integer PRIMARY KEY,
	created_at timestamp with time zone DEFAULT now(),
	created_by integer references users (id),
	name character varying(64),
	description text
);

CREATE TABLE IF NOT EXISTS teams (
	company_id integer references companies (id),
	user_id integer references users (id),
	contact_user boolean DEFAULT false,
	PRIMARY KEY(company_id, user_id)
);

CREATE TABLE IF NOT EXISTS applications (
	id integer PRIMARY KEY,
	created_at timestamp with time zone DEFAULT now(),
	user_id integer references users (id),
	listing_id integer references listings (id),
	cover_letter text
);

CREATE INDEX index_users_id ON users USING btree (id);
CREATE INDEX index_listings_id ON listings USING btree (id);
CREATE INDEX index_applications_id ON applications USING btree (id);
CREATE INDEX index_applications_user_id ON applications USING btree (user_id);
CREATE INDEX index_applications_listing_id ON applications USING btree (listing_id);
CREATE INDEX index_applications_created_at ON applications USING btree (created_at);