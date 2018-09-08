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