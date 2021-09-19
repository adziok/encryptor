# Encryptor

## Authorization
Bearer authorization, after login you receive auth token, next add this header:
```json
{
  "Authorization": "Bearer {authToken}"
}
```

## Available methods:
### Sign in to predefined accounts:
<details>
    <summary>Accounts credentials</summary>

    #### Account 1:
    email: test@test.com
    password: zaq1@WSX

    #### Account 2:
    email: test2@test.com
    password: zaq1@WSX 
</details>

``` 
POST api/sing-in
```
* body
```json
{
    "email": "email",
    "password": "password"
}
```
* returns
```json
{
    "authToken": "authToken"
}
```
***
### Generate key pair for logged user:

``` 
POST api/generate-key-pair
```
* returns
```json
{
  "privateKey": "privateKey",
  "publicKey": "publicKey"
}
```
***
### Get encoded file:

``` 
POST api/encode
```
* returns
```chunck
Base64
```
* headers
```json
{
  "encryption-key": "Base64 key encrypted by your public key"
}
``` 