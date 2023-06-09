### Never ever store the plan-password to the database


if we give the very large salt value to the password then it will take a lot of time to crack the password 
- It  will also take a lot of time to hash the password also (you can check on your own system also )
## Salting  

### What is Salting?

Salting is a technique used to strengthen password hashes by adding random data to them. A new salt is randomly generated for each password. The salt is added to the password before the hashing algorithm is applied. The resulting hash is stored with the salt and the original password and is used to validate passwords.

Cryptography is the science of using mathematics to encrypt and decrypt data. Cryptography enables you to store sensitive information or transmit it across insecure networks (like the Internet) so that it cannot be read by anyone except the intended recipient.


#### what is cost value in bcrypt


The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.

The default value is 10, the valid range is 4 to 31.

#### What is the difference between bcrypt and bcryptjs?

bcryptjs is a pure JavaScript implementation of BCrypt and can be used on any platform with a JavaScript environment. It uses a standalone cryptographic library and has no dependencies, making it portable. bcrypt is a native implementation of BCrypt for NodeJS and has to be compiled. It does not work on Windows out of the box.




## What is JWT? 

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.



How JWT works?

- User sends the username and password to the server
- Server verifies the username and password
- Server sends the JWT token to the client
- Client stores the JWT token in the local storage or cookie
- Client sends the JWT token to the server for every request
- Server verifies the JWT token and sends the response
- Client logs out and clears the local storage or cookie
- Server rejects the JWT token and sends the unauthorized response
- Client redirects to the login page


## What a jwt looks like?

A JWT is a string that has three parts, separated by dots (.). Those parts are:

Header
Payload
Signature

## What is the header?

The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.

## What is the payload?

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

## What is the signature?

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

## HOW SIGNING AND VERIFYING WORKS 


### Signing 

- The signing algorithm takes the header and payload as input and combines them into a single string. It then takes that string and signs it using the secret key. The output of the signing algorithm is the signature.
- The signature is then appended to the header and payload, and the resulting string is the JWT.
- The JWT is then sent to the client.

### Verifying

- The client receives the JWT and sends it back to the server on every request.
- The server then takes the JWT and splits it into its three parts: header, payload, and signature.
- The server then takes the header and payload and runs them through the same signing algorithm that was used to create the signature. (compare of test signature and the signature that we have received from the client (original signature))
- If the signature that the server generates matches the signature that was sent with the JWT, then the server knows that the JWT is valid and can be trusted.
- If the signature that the server generates does not match the signature that was sent with the JWT, then the server knows that the JWT is invalid and cannot be trusted.

(test signature === signature that we have received from the client (original signature))  ---> Authentication is done

(test signature !== signature that we have received from the client (original signature))  ---> Authentication is not done


`without the secret ,one will be able to mainpuate the JWT DATA because they can't create a valid signature to new data`


## singup and login 



### What is protected routes 

Protected routes are routes that only logged in users can access. If a user is not logged in and tries to access a protected route, the application will redirect them to the login page.

### test-headers 

send a json web token as a header 

`There is a standard to that ,we have to send the token in the header as a key value pair`

Example:

Authorization : Bearer (token)



promisify in nodejs :


It is used to convert the callback based function to promise based function

- Error in json web token

invalid signature



## AVDANCE POSTMON SETUP

## AUTHORIZATION 

- Authorization is the process of verifying what a user has access to.
- Authentication is the process of verifying who a user is.


### RestPassword FUNCTIONALITY

- User enters their email address
- The server generates a reset token and sends it to the user's email address
- The user clicks on the link in the email and is redirected to the reset password page
- The user enters their new password and submits the form
- The server verifies the reset token and updates the user's password
- The user is redirected to the login page

  
`createPasswordResetToken` function is used to create the reset token and send it to the user's email address.



## NODEMAILER 

It is a npm package that is used to send the email to the user


There are basically two types of email services

- Sendgrid
- Mailgun


## How to send the email to the user

- Create an account on the sendgrid



## Security Best Practices and suggestions 

1. Compromised database 

- Strongly encrypted password with salt and hash (bcrypt)
- Strongly encrypted password reset token (SHA-256)


2. Brute force attacks 

- Use rate limiting to limit the number of requests per IP
- Implement a CAPTCHA to prevent bots from submitting forms
- Implement maximum login attempts to prevent brute force attacks

3. Cross-site scripting (XSS) attacks

- Use a content security policy (CSP) to prevent XSS attacks
- Use a cookie with the httpOnly flag to prevent access from JavaScript
- Sanitize user input to prevent malicious code from being injected into the application
- set speical http header to prevent the browser from loading the malicious code



4. Denial-of-service (DoS) attacks 

1. Implement rate limiting (express-rate-limit)
2. Limit body payload (in body-parser)
3. Avoid evil regular expressions (ReDoS)

5. NoSQL injection attacks

- use mongoose for mongodb (because of SchemaTypes)
- Santize user input data 


## What is Cookie 

A cookie is a small piece of data that a server sends to the user's web browser. The browser may store it and send it back with the next request to the same server. Typically, it's used to tell if two requests came from the same browser — keeping a user logged-in, for example. It remembers stateful information for the stateless HTTP protocol.


## What is Rate Limiting

Rate limiting is a strategy for limiting an attacker's ability to send requests to a server or API. Rate limiting can be used to prevent denial-of-service attacks, brute-force password attacks, and other types of attacks.

It the no of attempts of login from a ip address is more than a specific limit then we will block that ip address for a specific time period


## What is Helmet 


Helmet is a collection of 14 smaller middleware functions that set HTTP response headers. Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!


## Data Sanitization

Data sanitization is the process of cleaning user input to prevent malicious code from being injected into the application. Data sanitization is a good practice to implement in any application, but it's especially important in applications that accept user input.


`Simulatoin of no sql query injection`


```json

{
    "email":{"$gt":""},
    "password":"pass1234"
}

```


```
npm i express-mongo-sanitize 
npm i xss-clean
```



## Prevent Parameter Pollution

Paramter pollution : 

- Parameter pollution is an attack that injects parameters into a web application, usually through a URL. Parameter pollution can be used to bypass security filters, cause a denial-of-service, or execute arbitrary code.


```bash
``` 
```
npm i hpp  (hpp : http parameter pollution)


```

what is the whitelisting of the paramters: 

- Whitelisting is the process of filtering out unwanted characters from user input. Whitelisting is a good practice to implement in any application, but it's especially important in applications that accept user input.