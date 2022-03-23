-- View: public.vw_rental_films_by_dollars_earned

CREATE OR REPLACE VIEW public.vw_rental_films_by_dollars_earned
 AS
 SELECT f.title,
    i.store_id,
    sum(p.amount) AS monies
   FROM film f
     JOIN inventory i ON f.film_id = i.film_id
     JOIN rental r ON i.inventory_id = r.inventory_id
     JOIN payment p ON p.rental_id = r.rental_id
  GROUP BY f.title, i.store_id
  ORDER BY (sum(p.amount)) DESC;

ALTER TABLE public.vw_rental_films_by_dollars_earned
    OWNER TO postgres;

