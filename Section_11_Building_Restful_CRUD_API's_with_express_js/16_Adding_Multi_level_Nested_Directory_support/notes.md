## Types of ROuting

    Dynamic Routing
        Use : to define route parameters.
        Example: /users/:id → req.params.id

    Optional Routing
        Add {/:} to make params optional.
        Example: /books{/:id} matches /books and /books/123

    Wildcard Routing
        Use `{*any}` to match any trailing path.
        Example: /files{/*any} or /files/path/to/file
        usefull for nested folders/files

    Regex Routing
        Use regex to match routes precisely.
        Example: /^\/user\/(\d+)$/\

    /directory/* wildcard pattern will not work in Express v5.

    The only working wildcard pattern is: /directory{/*any}

    Express v5 uses the new path pattern syntax powered by the path-to-regexp library. This syntax is stricter and more explicit.

    -> {*any} is valid (a named wildcard). any is just placeholder

    -> {*any}? makes the wildcard optional.
