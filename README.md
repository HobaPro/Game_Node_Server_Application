
# API Documentation

**Server IP : [16.171.169.226](http://16.171.169.226)**

### Registeration

**Register :**
  * **Send Your Data to Register in Our Game as a Following :**

<table>
 <tr>
     <th><i>Endpoint</i></th>
     <td>POST https://data-consumer-app.azurewebsites.net/splunk/api/post/dacLogins</td>
 </tr>
 <tr>
     <th><i>Description</th>
     <td>Webhook to post data </td>
 </tr>
 <tr>
    <th><i>Request Payload</th>
    <td>
    
 ```json
 {
   "sid": "scheduler__admin__search__LoginTimelineB4980_1832_897",
   "search_name": "LoginTimelineByDC",
   "app": "search",
   "owner": "admin",
   "results_link": "http://v1host:8000/app/search/@go?sid=scheduler__admin__search__LoByDC_at_1630474980_1832",
   "result": {
     "LoginDate": "2021-08-18",
     "DataCenter": "DC401",
     "Company": "GARBLES00073",
     "LoginCount": "11"
   }
 }
 ``` 
 </td>
 </tr>
 <tr>
    <th>Response Code</th>
    <td>Created :201, ErrorCode(s) : Error: 500, InvalidData : 400 </td>
 </tr>
 </table>
 
| Endpoint   | Request Method   |
|:----------:|:----------:|
| `/gameserver.online/api/register` | `POST` |

<table>
    <tr>
        <th><i>Endpoint</i></th>
        <td><i>Request Method</i></td>
    </tr>
    <tr>
        <td><code>/gameserver.online/api/register</code></td>
        <td><code>POST</code></td>
    </tr>
</table>

**Form Data :**
| Key   | Value   |
|:----------:|:----------:|
| Username | Your Username |
| Email | Your Email |
| Password | Your Password |

Content-Type : `application/x-www-form-urlencoded`

---

### Authorizations

**Generate Access Token :**
  * **You should Generate Access Token and Save it in Headers to have Authorization to Get Your Profile Data, Show Leaderboard, and Delete Your Account.**

| Endpoint   | Request Method   |
|:----------:|:----------:|
| `/gameserver.online/api/generate-access-token` | `POST` |

**Form Data :**

| Key   | Value   |
|:----------:|:----------:|
| Email | Your Email |
| Password | Your Password |

Content-Type : `application/x-www-form-urlencoded`

---

**Get Your Data :**

| Endpoint   | Request Method   |
|:----------:|:----------:|
| `/gameserver.online/api/getmydata` | `GET` |

**Headers :**
  * Save Generated Token in Headers to have Authorization to Get Your Profile Data as Following :

| Key   | Value   |
|:----------:|:----------:|
| authorization | Bearer {{GENERATED_KEY}} |

Content-Type : `application/x-www-form-urlencoded`

---

**Delete Your Account :**

| Endpoint   | Request Method   |
|:----------:|:----------:|
| `/gameserver.online/api/deleteme` | `GET` |

**Headers :**
  * Save Generated Token in Headers to have Authorization to can Delete Your Account as Following :

| Key   | Value   |
|:----------:|:----------:|
| authorization | Bearer {{GENERATED_KEY}} |

Content-Type : `application/x-www-form-urlencoded`

---
