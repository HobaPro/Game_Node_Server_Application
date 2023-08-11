# Game Node.js Server Application

The Multiplayer Game Server Application is a Node.js-based server designed to manage and facilitate the multiplayer aspects of an online game. This application allows players to register, authenticate, view leaderboards, and participate in multiplayer matches. It features a dedicated server to handle real-time gameplay and progression updates.

## Features

* **Player Registration:** Players can create accounts by registering with a unique username and password.
* **Authorization:** Authenticated players can access their account data securely.
* **Leaderboards:** Players can view and compete on the leaderboards to showcase their performance.
* **Account Deletion:** Authenticated players can delete their accounts if needed.
* **Multiplayer Management:** The dedicated server manages real-time multiplayer matches, ensuring fair gameplay.
* **Progression Updates:** Winning and losing teams' data is communicated to the Node.js server for player progression updates.

## Getting Started

**Server IP : [16.171.169.226](http://16.171.169.226)**
To send Web Request to it.

## API Endpoints

* `/gameserver.online/api/register`: Register a new player account.
* `/gameserver.online/api/generate-access-token`: Authenticate a player and receive an access token.
* `/gameserver.online/api/getmydata`: Player can get him account data if he have authorization.
* `/gameserver.online/api/deleteme`: Player can delete him account if he have authorization.
* `/gameserver.online/api/leaderboard`: Retrieve the current leaderboard data.
* `/gameserver.online/api/game/finish-rated`: Receive match results from the dedicated server, and handle players progression in rated mode.
* `/gameserver.online/api/game/finish-rated`: Receive match results from the dedicated server, and handle players progression in unrated mode.

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

**JSON Data :**

```json
  {
    "WinnerTeam": {
       "players": ["Player 1", "Player 2", ...etc]
    },
    "LoserTeam": {
       "players": ["Player 1", "Player 2", ...etc]
    },
  }
```

Content-Type : `application/json`

### Finish Game UnRated Mode :

| Endpoint | Request Method |
|:---------- |:---------- |
| `/gameserver.online/api/game/finish-unrated` | `POST` |

**JSON Data :**

```json
  {
    "WinnerTeam": {
       "players": ["Player 1", "Player 2", ...etc]
    },
    "LoserTeam": {
       "players": ["Player 1", "Player 2", ...etc]
    },
  }
```

Content-Type : `application/json`
