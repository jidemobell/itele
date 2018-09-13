## Itele

This is a job application API. you can use this API to get users activities
and retireve information about a user.

### List Users

List top users by activaty within the week and latest applied listings


```endpoint
GET /topActiveUsers?page={pageNumber}
```

#### Example request

```http
http://localhost:4000/topActiveUsers?page={pageNumber}
```

#### Example request body


Property | Description
---|---
`page` | a page number 
#### Example response

```json
[
	{
		"id": 2,
		"name": "Bob",
		"created_at": "2018-04-10T19:22:14.865Z",
		"count": "2",
		"listings": [
			"Join the new world!",
			"Join the new world!",
			"Join us conquering the world!"
		]
	},
	{
		"id": 5,
		"name": "Evan",
		"created_at": "2018-06-14T20:22:14.865Z",
		"count": null,
		"listings": [
			"Join us conquering the world!"
		]
	}
]
```

### Get User

Takes user id and returns:
  user info;
  connected companies;
  listings created by the user;
  applications the user has made with the info of the listing the application is made to.

```endpoint
GET /users?id={user.id}
```

#### Example request

```http
http://localhost:4000/users?id={user.id}

```

#### Example request body


Property | Description
---|---
`id` | a user id


#### Example response

```json
[
	{
		"id": 5,
		"name": "Evan",
		"createdat": "2018-06-14T20:22:14.865Z",
		"companies": null,
		"createdlistings": [
			{
				"id": 2,
				"createdAt": "2018-03-26T18:09:10.25825+00:00",
				"name": "Join the world!",
				"description": "best chance..."
			}
		],
		"applications": [
			{
				"id": 2,
				"createdAt": "2018-04-01T02:22:15.540777+00:00",
				"listing": {
					"id": 1,
					"name": "Join us conquering the world!",
					"description": "This is your best chance to be on the right side of the equation..."
				},
				"cover_letter": "Hello, I am Evan"
			}
		]
	}
]
```