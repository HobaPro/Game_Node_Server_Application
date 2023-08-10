
# API Documentation

**Server IP : [16.171.169.226](http://16.171.169.226)**

## Registeration

### Register :
  * **Send Your Data to Register in Our Game as a Following :**
 
| Endpoint | Request Method |
|:---------- |:---------- |
| `/gameserver.online/api/register` | `POST` |

**Form Data :**
| Key | Value |
|:---------- |:---------- |
| Username | Your Username |
| Email | Your Email |
| Password | Your Password |

Content-Type : `application/x-www-form-urlencoded`

---

## Authorizations

### Generate Access Token :
  * **You should Generate Access Token and Save it in Headers to have Authorization to Get Your Profile Data, Show Leaderboard, and Delete Your Account.**

| Endpoint | Request Method |
|:---------- |:---------- |
| `/gameserver.online/api/generate-access-token` | `POST` |

**Form Data :**

| Key | Value |
|:---------- |:---------- |
| Email | Your Email |
| Password | Your Password |

Content-Type : `application/x-www-form-urlencoded`

---

### Get Your Data :

| Endpoint | Request Method |
|:---------- |:---------- |
| `/gameserver.online/api/getmydata` | `GET` |

**Headers :**
  * Save Generated Token in Headers to have Authorization to Get Your Profile Data as Following :

| Key | Value |
|:---------- |:---------- |
| authorization | Bearer {{GENERATED_KEY}} |

Content-Type : `application/x-www-form-urlencoded`

---

### Delete Your Account :

| Endpoint | Request Method |
|:---------- |:---------- |
| `/gameserver.online/api/deleteme` | `GET` |

**Headers :**
  * Save Generated Token in Headers to have Authorization to can Delete Your Account as Following :

| Key | Value |
|:---------- |:---------- |
| authorization | Bearer {{GENERATED_KEY}} |

Content-Type : `application/x-www-form-urlencoded`

---

## Multiplayer Dedicated Server

## Summary :

Multiplayer Dedicated Server is Manage Multiplayer System in Game as Create, and Manage Sessions, Syncronize Players States etc.., and It a Separated From This Node.js Application, But It Connect with Node.js Application to Update Players Progression During Playing, as Player XP, Level, and Diamonds.

### Finish Game Rated Mode :

| Endpoint | Request Method |
|:---------- |:---------- |
| `/gameserver.online/api/game/finish-rated` | `POST` |

 ```json
  {
    "name": "John",
    "age": 30,
    "city": "New York"
  }
  ```

**JSON Data :**
<pre>
 <code>
  ```json
  {
    "name": "John",
    "age": 30,
    "city": "New York"
  }
  ```
 </code>
</pre>
