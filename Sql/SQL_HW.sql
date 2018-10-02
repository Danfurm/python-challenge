USE sakila;

SELECT first_name, last_name FROM actor;

SELECT CONCAT(first_name, " ", last_name) AS 'Actor Name' 
FROM actor;

SELECT actor_id, first_name, last_name FROM actor 
WHERE first_name = 'joe';

SELECT * FROM actor 
WHERE last_name LIKE '%GEN%';

SELECT * FROM actor 
WHERE last_name LIKE '%LI%' 
ORDER BY last_name, first_name;

SELECT country_id, country FROM country 
WHERE country IN ('Afghanistan', 'Bangladesh', 'China');

ALTER TABLE actor 
ADD description BLOB;

ALTER TABLE actor 
DROP COLUMN description;

SELECT COUNT(first_name), last_name FROM actor 
GROUP by last_name;

SELECT COUNT(first_name), last_name FROM actor 
GROUP by last_name
HAVING COUNT(first_name)>1;

UPDATE actor
SET first_name = 'Harpo'
WHERE first_name = 'Groucho' AND last_name = 'Williams';

UPDATE actor
SET first_name = 'Groucho'
WHERE first_name = 'Harpo' AND last_name = 'Williams';

SHOW CREATE TABLE address;

SELECT staff.first_name, staff.last_name, address.address
FROM staff
INNER JOIN address on staff.address_id = address.address_id;

SELECT staff.first_name, staff.last_name, SUM(payment.amount) AS Rung
FROM staff
INNER JOIN payment on staff.staff_id = payment.staff_id
GROUP BY first_name, last_name;

SELECT film.title, count(film_actor.film_id) AS Number_Actors
FROM film
INNER JOIN film_actor on film_actor.film_id = film.film_id
Group by title;

SELECT COUNT(film_id) AS Total_count FROM inventory
WHERE film_id IN(SELECT film_id from film 
WHERE title = 'Hunchback Impossible');

SELECT SUM(payment.amount) as Amount_paid, customer.first_name, customer.last_name
from payment
INNER JOIN customer on payment.customer_id = customer.customer_id
GROUP BY first_name, last_name
ORDER BY last_name;

SELECT title from film
where title like 'q%'
or title like 'k%' 
and language_id in(
SELECT language_id FROM language
where name = 'english');

SELECT first_name, last_name from actor
where actor_id in(
SELECT actor_id from film_actor
where film_id in(
SELECT film_id from film
where title = 'alone trip'));

SELECT first_name, last_name, email FROM customer 
where address_id in(
SELECT address_id FROM address
INNER JOIN city on address.city_id = city.city_id
WHERE address.city_id in(
SELECT city_id from city 
INNER JOIN country on country.country_id = city.country_id
WHERE country.country = 'canada'));

SELECT title from film 
where film_id in(
SELECT film_id from film_category
where category_id in(
SELECT category_id from category
where name = 'family'));

CREATE VIEW inventory_counts as 
SELECT count(rental_id) as counts, inventory_id from rental
GROUP BY inventory_id;
CREATE VIEW film_counts as
SELECT inventory.film_id, sum(inventory_counts.counts) as counts
FROM inventory
INNER JOIN inventory_counts on inventory.inventory_id = inventory_counts.inventory_id
GROUP BY film_id;
SELECT film.title, film_counts.counts as rental_count
from film
inner join film_counts on film.film_id = film_counts.film_id
ORDER BY rental_count DESC;

CREATE VIEW staff_sales as
SELECT sum(amount) as sales_$, staff_id FROM payment
GROUP BY staff_id;
SELECT staff.store_id, staff_sales.sales_$
from staff
inner join staff_sales on staff_sales.staff_id = staff.staff_id;

CREATE VIEW store_address as
SELECT store.store_id, store.address_id, address.city_id
from store
inner join address on store.address_id = address.address_id;
CREATE VIEW almost as
SELECT store_address.store_id, city.city, city.country_id from store_address
inner join city on store_address.city_id = city.city_id;
SELECT almost.store_id, almost.city, country.country from almost
inner join country on almost.country_id = country.country_id;

CREATE VIEW top_5_genres as
SELECT SUM(payment.amount) as revenue, category.name from payment
inner join rental on payment.rental_id = rental.rental_id
inner join inventory on inventory.inventory_id = rental.inventory_id
inner join film_category on film_category.film_id = inventory.film_id
inner join category on category.category_id = film_category.category_id
group by category.name
order by revenue desc
limit 5;

SELECT * FROM top_5_genres;

DROP VIEW top_5_genres;