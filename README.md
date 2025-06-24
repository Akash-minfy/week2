**VIBE-CHECK OUTPUTS**<br><br>
**Assignment 1: The Public Feed (Easy)** <br><br>

**2. Server is Running:** <br>
**-->Running node server.js in your terminal starts the server without errors and logs a message like 🚀 Server blasting off on port 5000** <br>

![Screenshot (67)](https://github.com/user-attachments/assets/19d378ef-fcb2-4be3-91b1-d4b708379a0f) <br> <br><br> <br>

**3. Root Endpoint:** <br>
**-->Making a GET request to http://localhost:5000/ returns a 200 OK status and an HTML/text welcome message.** <br>
![Screenshot (68)](https://github.com/user-attachments/assets/6884f129-e6bb-4808-b283-816627b187d7) <br><br> <br><br>

**4.Get All Vibes Endpoint:** <br>
**-->Making a GET request to http://localhost:5000/api/v1/vibes** <br>
![Screenshot (69)](https://github.com/user-attachments/assets/72953527-eee5-4f79-89a1-a0a20467b604) <br><br> <br><br>


**5.Get Single Vibe Endpoint (Success Case):** <br>
**-->Making a GET request to http://localhost:5000/api/v1/vibes/2** <br>

![Screenshot (70)](https://github.com/user-attachments/assets/208d5a2a-5900-417f-8ef2-895429cea813)<br> <br><br><br>

**6. Get Single Vibe Endpoint (Failure Case):** <br>
**-->Making a GET request to http://localhost:5000/api/v1/vibes/99** <br>
![Screenshot (71)](https://github.com/user-attachments/assets/86c80d60-e992-4aec-9b02-237806c1788f)<br> <br><br><br><br><br><br>


**Assignment 2: The User Era (Medium)** <br><br><br><br>
**2. Database Connection** <br>
![Screenshot (72)](https://github.com/user-attachments/assets/5dcb38f4-9ade-497b-9ef0-10be9b76c2fc) <br> <br><br><br>

**In our MongoDB Atlas dashboard, under "Collections," we can see that the vibecheck database has been created with empty users and vibes collections.** <br>

![Screenshot (73)](https://github.com/user-attachments/assets/670eb66c-2034-46bb-9156-f0097011b4fd) <br> <br><br><br>


**3. User Signup:** <br>
**Making a POST request to /api/v1/auth/signup with a new user's username, email, and password in the body:** <br>

![Screenshot (74)](https://github.com/user-attachments/assets/46c36173-5e4b-470f-b456-2ffe614c7ff6)  <br> <br>
![Screenshot (75)](https://github.com/user-attachments/assets/6058d33c-8d1d-47c7-97ee-35a45d0df554) <br><br><br><br>

**4. User Login:** <br>

**Making a POST request to /api/v1/auth/login with the correct credentials for the user you just created** <br>

![Screenshot (76)](https://github.com/user-attachments/assets/6d3146ea-6da4-41ea-bfe1-fbc6adc76b14) <br><br><br><br>

**Trying to log in with the wrong password returns a 401 Unauthorized status** <br>
![Screenshot (77)](https://github.com/user-attachments/assets/3eb683de-726c-4b76-a614-726dc1e66404) <br><br><br><br>


**5.Protected Route - Posting a Vibe:** <br>
**Make a POST request to /api/v1/vibes with valid vibe data in the body but without an Authorization header.** <br>
![Screenshot (78)](https://github.com/user-attachments/assets/60b665c9-979a-45b7-9865-145305aa09e8) <br><br><br><br>

**Make the same POST request again, but this time add the Authorization header with Bearer <your_jwt_token>.**
![Screenshot (79)](https://github.com/user-attachments/assets/7e7b9ae4-d1ed-4ac1-aae7-afb0d4c13071) <br><br> 
**In MongoDB Atlas, you can see a new document in the vibes collection, and its user field should contain the ObjectId of the user who posted it.**
![Screenshot (81)](https://github.com/user-attachments/assets/612fbbc6-79d5-482c-b7b0-1835108bec21) <br><br><br><br>

**6. Populated Get All Vibes Endpoint:** <br>
**Making a GET request to /api/v1/vibes now returns the vibes from the database. The user field for each vibe should be "populated" with the user's username, not just their ObjectId**
![Screenshot (82)](https://github.com/user-attachments/assets/98c6ac63-14d7-45c4-b65f-be0b0d7f91a5) <br><br><br><br><br><br>

**Assignment 3: The Social Experience (Hard)** <br><br><br><br>
**User A-> Akash    User B-> Ram**

**Like/Unlike Functionality:** <br>
**Make a PUT request to /api/v1/vibes/<VibeID>/like (with User B's (Ram's) token).** <br>
![Screenshot (83)](https://github.com/user-attachments/assets/39c1ebb2-ee7d-422c-98d4-e2ba4540b7ce) <br><br><br><br>

**Verify in the database that User B's (Ram's) ObjectId is now in the likes array of that vibe.** <br>
![Screenshot (84)](https://github.com/user-attachments/assets/9a79d5b7-a0d5-4697-9663-02101547635a) <br><br><br><br>

**Verify that User B's ObjectId has been removed from the likes array.**
![Screenshot (85)](https://github.com/user-attachments/assets/ba84f518-9b6b-4f2e-9fc1-23f00cd7e384)<br><br><br><br>

**3. Comments Functionality:** <br>

**As User B (Ram), make a POST request to /api/v1/vibes/<VibeID>/comments with comment text.**
![Screenshot (86)](https://github.com/user-attachments/assets/827617c3-3937-4ed1-80ab-479cac33f002)<br><br><br><br>

**4. Follow & Personalized Feed:** <br>
**As User A (Akash), make a POST request to /api/v1/users/<UserB_ID>/follow**
![Screenshot (87)](https://github.com/user-attachments/assets/f0ff7ede-5108-40de-9362-2dd0e81dfcad)<br><br><br><br>

**Verify in the DB that User B's ID is in User A's following array, and User A's ID is in User B's followers array.**
![Screenshot (88)](https://github.com/user-attachments/assets/4e183868-5dd2-48ef-a0d9-dd9c63b94361)

**As User B, post a new vibe.**
![Screenshot (89)](https://github.com/user-attachments/assets/3d6eb5b2-3999-4e42-a068-e8a189f10344)<br><br><br><br>

**As User A, make a GET request to the personalized feed endpoint /api/v1/feed**
![Screenshot (90)](https://github.com/user-attachments/assets/1f9634b5-3865-4b8e-9e21-20efdb234bdc)<br><br><br><br>

**5. Authorization (Security Check):** <br>

**Log in as User B. Try to make a DELETE request to /api/v1/vibes/<VibeID_of_UserA>**
![Screenshot (91)](https://github.com/user-attachments/assets/f6519187-4ab7-4927-a2bb-cdd33cc1690d)<br><br><br><br>

**Log in as User A. Make a DELETE request to /api/v1/vibes/<VibeID_of_UserA>**
![Screenshot (92)](https://github.com/user-attachments/assets/a2b03cae-a2c4-496f-aeb1-faa3b97286e6)<br><br><br><br>

**7. Pagination:** <br>
**Make a GET request to /api/v1/vibes?limit=2**
![Screenshot (93)](https://github.com/user-attachments/assets/ae934998-b983-4261-8afa-102cbd6e5521)<br><br><br><br>

**Make a GET request to /api/v1/vibes?limit=2&page=2**
![Screenshot (94)](https://github.com/user-attachments/assets/260e55a9-9f0f-457f-8c5a-36a1122fefe2) <br><br><br><br> <br><br><br><br> <br><br><br><br>





**CHEAT-BUSTER OUTPUTS**<br><br>
**Putting It All Together (Easy) -** <br><br>
**searching for an email that's there in database** <br>
![Screenshot (96)](https://github.com/user-attachments/assets/08e11ec1-c2a4-490b-bc97-f3d9ac168730) <br><br><br><br>  

**searching for an email you know is not in the database**<br>
![Screenshot (97)](https://github.com/user-attachments/assets/8ea25ac8-1ba4-454c-b194-3c8a74af5bf3) <br><br><br><br>  

**submitting an invalid email to see your Zod validation work!**
![Screenshot (98)](https://github.com/user-attachments/assets/1b89f290-9db1-4f76-a52f-012af9239704) <br><br><br><br>  

**The "Medium" Cheat Buster App: Enhancements** <br> <br>
**1. Search by Name:** <br>
**Add a second input field for the name and adjust the axios call to send the correct parameter.**
![Screenshot (100)](https://github.com/user-attachments/assets/d2831af3-f96b-40b9-a14a-a57269e57143)<br><br>  

![Screenshot (99)](https://github.com/user-attachments/assets/2a1c0436-1d20-4632-98a9-6abb16ae0ae5) <br><br>

![Screenshot (101)](https://github.com/user-attachments/assets/c90eb4f8-6a4d-4091-aeb2-f9d3f32902d0)<br><br><br><br>  

**2. A Better Loading State:** <br>
![Screenshot (102)](https://github.com/user-attachments/assets/f9734b4a-ffbb-43c2-bc76-01a2070c6b32)<br><br><br><br>  <br><br><br><br>  

**Assignment : Implement open API spec**<br><br>
**List of all possible responses**
![Screenshot (105)](https://github.com/user-attachments/assets/abdbc47b-896d-4901-8702-0ca9e51d3030)<br><br>  <br><br> 

**Get request using email "tiffany.chapman@example.com"** <br>
![Screenshot (103)](https://github.com/user-attachments/assets/b7b673c7-78eb-4447-b216-3212ec2651c1)<br><br>  

![Screenshot (104)](https://github.com/user-attachments/assets/66fac48f-a4fb-4e02-9255-08df87a9b427) <br><br> 



