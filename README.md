#Author: Varun Jain

#Description: Node js with typescript demo project

#Setup Instructions

1. git clone REPO_URL
2. cd node_typescript_sample
3. npm install
4. npm run dev (Local)
5. npm run tsc (Build typescript) && run node build/server.js


#Rest endpoints
1. api/register 
(body_params : email,first_name,last_name,password)

2. api/login
(body_params: email,password)

3. api/forgot_password
(body_params: email)

4. api/reset_password/{token}
(body_params: password,confirm_password)

#Mail configuration

/src/modules/common/mail.ts

#enviroment variables

/src/enviroment.ts







