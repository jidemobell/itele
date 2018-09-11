module.exports = {
  topActiveUsers:
  `WITH table1 AS 
      (WITH applications_table AS 
        (WITH users_counts AS 
          (WITH counts AS 
            (SELECT count(*),user_id from applications 
            WHERE created_at > now() -'1 week'::interval group by user_id) 
          SELECT users.id,users.name,users.created_at,counts.count FROM counts 
          RIGHT JOIN users on counts.user_id = users.id) 
        SELECT usc.*,a.created_at AS applied_at,a.listing_id FROM users_counts usc 
        FULL JOIN applications a ON a.user_id = usc.id) 
      SELECT aps.* FROM applications_table aps 
      LEFT JOIN applications_table apts ON aps.id = apts.id AND aps.applied_at < apts.applied_at 
      WHERE apts.id IS NULL ORDER BY applied_at DESC NULLS LAST), 
  table2 AS 
      (SELECT array_agg(l.name order by a.created_at desc) AS all_applied_listings, a.user_id 
      FROM applications a FULL JOIN listings l ON a.listing_id = l.id GROUP BY a.user_id) 
      SELECT t1.id,t1.name,t1.created_at,t1.count,t2.all_applied_listings AS listings 
      FROM table1 t1 FULL JOIN table2 t2 ON t1.id = t2.user_id LIMIT $1;`,
  userInfo:
   `WITH first_three AS (WITH first_two AS (WITH tusers AS (SELECT u.id,u.name,u.created_at AS createdAt FROM users u WHERE u.id =$1), tcompanies AS (WITH
    table2 AS (SELECT c.id,c.created_at,c.name,t.contact_user AS isContact,t.user_id FROM companies c LEFT JOIN teams t ON t.company_id = c.id 
    WHERE t.user_id= $1 LIMIT 5) SELECT array_agg(json_build_object('id',t2.id,'createdAt',t2.created_at,'name',t2.name,'isContact',t2.isContact)) AS companies,t2.user_id 
   FROM table2 t2 GROUP BY t2.user_id) SELECT tu.id,tu.name,tu.createdAt,tc.companies FROM tusers tu LEFT JOIN tcompanies tc ON tu.id = tc.user_id) , 
   tlistings AS (WITH table3 AS (SELECT l.id,l.created_at AS createdAt,l.name,l.description,l.created_by FROM listings l WHERE l.created_by = $1 LIMIT 5) 
   SELECT array_agg(json_build_object('id',t3.id,'createdAt',t3.createdAt,'name',t3.name,'description',t3.description)) AS createdListings,t3.created_by 
   FROM table3 t3 GROUP BY t3.created_by) SELECT fst.*,tl.createdListings FROM first_two fst LEFT JOIN tlistings tl ON fst.id = tl.created_by),
   tapplications AS (WITH table4 AS (SELECT a.id,a.created_at,json_build_object('id',l.id,'name',l.name,'description',l.description) AS listing,a.cover_letter,a.user_id 
   FROM applications a FULL JOIN listings l ON l.id = a.listing_id WHERE a.user_id = $1 limit 5) SELECT array_agg(json_build_object('id',t4.id,'createdAt',t4.created_at,'listing',t4.listing,'cover_letter',t4.cover_letter)) 
   AS applications,t4.user_id FROM table4 t4 group by t4.user_id)
    SELECT f3.*,ta.applications FROM first_three f3 LEFT JOIN tapplications ta ON f3.id = ta.user_id;`,
};
