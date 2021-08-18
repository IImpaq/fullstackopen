# phonebook-backend

Deployed using Heroku: https://protected-garden-15209.herokuapp.com

## Notes

The way of deploying was done a little bit differently compared to the
theory of the course. Against the advise, the phonebook backend was kept
within the same repository of the rest of the exercises. As already stated
in theory, this made it harder/different to deploy using Heroku. To still
be able to work within a single repository the git subtree command was used.
I wrote a short deployment shell script (deploy-full-phonebook.sh), because 
of the more complex way to deploy the website to the internet.