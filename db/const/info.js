module.exports = {
  userInfo:
   `
  WITH firstthreetables AS (   
    WITH companiesjoinlistings AS (
       WITH userstable AS  (
       SELECT u.id,u.name,u.created_at 
       AS createdAt 
       FROM users u WHERE u.id = $1
       ), 
 
       companiestable AS (
         WITH table1 AS (
           SELECT c.id,c.created_at,c.name,t.contact_user 
           AS isContact,t.user_id 
           FROM companies c 
           LEFT JOIN teams t 
           ON t.company_id = c.id 
           WHERE t.user_id= $1 LIMIT 5
           ) 
         SELECT array_agg(json_build_object('id',t1.id,'createdAt',t1.created_at,'name',t1.name,'isContact',t1.isContact)) 
         AS companies,t1.user_id 
         FROM table1 t1 
         GROUP BY t1.user_id
       ) 
       SELECT ut.id,ut.name,ut.createdAt,ct.companies 
       FROM userstable ut 
       LEFT JOIN companiestable ct 
       ON ut.id = ct.user_id), 
 
       listingstable AS (
         WITH table2 AS (
         SELECT l.id,l.created_at 
         AS createdAt,l.name,l.description,l.created_by 
         FROM listings l 
         WHERE l.created_by = $1 LIMIT 5
        ) 
        SELECT array_agg(json_build_object('id',t2.id,'createdAt',t2.createdAt,'name',t2.name,'description',t2.description)) 
        AS createdListings,t2.created_by 
        FROM table2 t2 
        GROUP BY t2.created_by
       ) 
     SELECT cjl.*,lst.createdListings 
     FROM companiesjoinlistings cjl 
     LEFT JOIN listingstable lst 
     ON cjl.id = lst.created_by),
 
       applicationstable AS (
         WITH table4 AS (
         SELECT a.id,a.created_at,json_build_object('id',l.id,'name',l.name,'description',l.description) 
         AS listing,a.cover_letter,a.user_id 
         FROM applications a FULL JOIN listings l 
         ON l.id = a.listing_id 
         WHERE a.user_id = $1 limit 5
        ) 
        SELECT array_agg(json_build_object('id',t4.id,'createdAt',t4.created_at,'listing',t4.listing,'cover_letter',t4.cover_letter)) 
        AS applications,t4.user_id 
        FROM table4 t4 
        GROUP BY t4.user_id
       )
 SELECT f3.*,apt.applications 
 FROM firstthreetables f3 
 LEFT JOIN applicationstable apt 
 ON f3.id = apt.user_id;
   `,
};
