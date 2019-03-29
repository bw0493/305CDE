# DEMO URL

https://youtu.be/VQgQ7s3Ey4U

### Dummy Account for testing

```sh
username - cw@e.com
password - 123456
```

# Credits

### Website Template

https://www.w3schools.com

### Libraries

jQuery

NODE.js

# API Endpoints

### User Login
```sh
URI       https://127.0.0.1:9999/login
Method	  POST
Data	  {
          "email": "user@xxxx.com",
          "password": "hahahahahah"
}
Result	{
    "id": "_00000000"|| "null"
}
```

### User Registration
```sh
URI       https://127.0.0.1:9999/register
Method	  POST
Data	  {
          "name": "user1",
          "email": "user@xxxx.com",
          "password": "hahahahahah"
}
Result	{
          "done"||"fail"
}
```
### User's Favourites List
```sh
URI       https://127.0.0.1:9999/faves
Method	  GET
Data	  {
          "id": "_00000000"
}
Result	{[
          	a,
		b,
		c
	 ]
}

```
### Add to Favourites List
```sh
URI       https://127.0.0.1:9999/index
Method	  POST
Data	  {
          "id":_00000000,
          "faves": xxxxxxx
}
Result	{
	"insert success"|| "insert failed"
}

```
### Remove from Favourites List
```sh
URI       https://127.0.0.1:9999/faves
Method	  POST
Data	  {
          "id":_00000000,
          "faves": xxxxxxx || all
}
Result	{
	"done"||"fail"
}

```
