module.exports = {
  topActiveUsers:
  `
  WITH table1 AS (
    WITH applications_table AS (
      WITH users_counts AS (
        WITH counts AS (
          SELECT count(*),user_id 
          FROM applications 
          WHERE created_at > now() -'1 week'::interval 
          GROUP BY user_id
        ) 
        SELECT users.id,users.name,users.created_at,counts.count 
        FROM counts 
        RIGHT JOIN users 
        ON counts.user_id = users.id
      ) 
      SELECT usc.*,a.created_at 
      AS applied_at,a.listing_id 
      FROM users_counts usc 
      FULL JOIN applications a 
      ON a.user_id = usc.id
    ) 
    SELECT aps.* 
    FROM applications_table aps 
    LEFT JOIN applications_table apts 
    ON aps.id = apts.id AND aps.applied_at < apts.applied_at 
    WHERE apts.id 
    IS NULL 
    ORDER BY applied_at DESC NULLS LAST), 
  table2 AS (
    SELECT array_agg(l.name ORDER BY a.created_at desc) 
    AS all_applied_listings, a.user_id 
    FROM applications a FULL JOIN listings l 
    ON a.listing_id = l.id 
    GROUP BY a.user_id
  ) 
  SELECT t1.id,t1.name,t1.created_at,t1.count,t2.all_applied_listings 
  AS listings 
  FROM table1 t1 FULL JOIN table2 t2 
  ON t1.id = t2.user_id LIMIT $1;
  `,
};
