// Basic strings
'coucou';
'coucou';

// Inject variable
'coucou ' + username + ' !';
'FavCount' + (active ? ' active' : '');

// Multiline
('coucou \
toto');

// Template literals
`coucou
toto`;

`coucou ${username} !`;
`FavCount${active ? ' active' : ''}`;

sql`SELECT * FROM table WHERE name = ${bidule}`;
