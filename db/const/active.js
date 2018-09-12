module.exports = {
  topActiveUsers:
  `
  WITH users_array AS (
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
  listings_array AS (
    SELECT array_agg(l.name ORDER BY a.created_at desc) 
    AS all_applied_listings, a.user_id 
    FROM applications a FULL JOIN listings l 
    ON a.listing_id = l.id 
    GROUP BY a.user_id
  ) 
  SELECT ua.id,ua.name,ua.created_at,ua.count,la.all_applied_listings 
  AS listings 
  FROM users_array ua FULL JOIN listings_array la 
  ON ua.id = la.user_id 
  ORDER BY la.user_id LIMIT $1;
  `,
};
