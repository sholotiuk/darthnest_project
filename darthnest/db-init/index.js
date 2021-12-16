db.createUser({
  user: 'darthven',
  pwd: 'darthven123',
  roles: [
    {
      role: 'readWrite',
      db: 'darthdb',
    },
  ],
});
