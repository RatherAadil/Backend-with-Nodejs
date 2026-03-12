# Problem with implicit Grant Type Flow

- The issue with this is that when we login using implicit grant type the id_token is accessed via frontEnd and the id_token remains in the URL of the page, and hence in the history. If the hacker gets access to the history he could just use that url and login without anything.
