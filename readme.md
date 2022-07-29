## All Routes

- [`/login` - Login User](#/login)
- [`/profile` - Login User using Token](#/profile)
- [`/register` - Sign Up User](#/signup)

<div id='/login'></div>

### `/login` – Login in User

**Local Link**

- ` http://localhost:3000/login`

#### Method

| URI     | HTTP Method | Authentication | Headers |
| ------- | ----------- | -------------- | ------- |
| `login` | POST        | None           | None    |

#### Request Parameters

| Parameter    | Type   | Description           | Required? |
| ------------ | ------ | --------------------- | --------- |
| **email**    | String | Email Adress of User. | Yes       |
| **password** | String | User's Password.      | Yes       |

**Example Request Code:**

```javascript
let loginOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
};

fetch("http://localhost:3000/login", loginOptions);
```

**Example Response:**

```JSON
{
    "_id": "62e4099919855406aacf9009",
    "name": "Mustafa",
    "email": "mustafa@binalhag.dev",
    "hobbies": [
        "Playing games Ark/Valorant/Apex",
        "Lifting big cirlces",
        "Watching Anime"
    ],
    "__v": 0
}
```

#

### `/register` – Login User using Token

**Local Link**

- `http://localhost:3000/register`

#### Method

| URI        | HTTP Method | Authentication | Headers |
| ---------- | ----------- | -------------- | ------- |
| `register` | POST        | N/A            | N/A     |

#### Request Parameters

| Parameter    | Type     | Description           | Default | Required? |
| ------------ | -------- | --------------------- | ------- | --------- |
| **name**     | String   | Name for User         | N/A     | Yes       |
| **password** | String   | User's Password       | N/A     | Yes       |
| **email**    | String   | User's Email          | N/A     | Yes       |
| **hobbies**  | [String] | Array of hobbies Name | N/A     | No        |

**Example Request Code:**

```javascript
let registerOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
};

fetch("http://localhost:3000/register", registerOptions);
```

**Example Response:**

```JSON
{
    "_id": "62e4099919855406aacf9009",
    "name": "Mustafa",
    "email": "mustafa@binalhag.dev",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTQwOTk5MTk4NTU0MDZhYWNmOTAwOSIsImlhdCI6MTY1OTExMTgzNCwiZXhwIjoxNjYwMzIxNDM0fQ.Obtnn5918MCxQT_ZPaKGz1KXtSJIKsI1KGn7boayPu4"
}
```
