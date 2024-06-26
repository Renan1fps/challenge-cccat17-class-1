drop schema if exists cccat17 cascade;

create schema if not exists cccat17;

create table if not exists cccat17.account (
	account_id uuid primary key,
	name text not null,
	email text not null,
	cpf text not null,
	car_plate text null,
	is_passenger boolean not null default false,
	is_driver boolean not null default false
);
