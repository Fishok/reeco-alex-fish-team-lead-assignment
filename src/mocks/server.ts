import { createServer } from 'miragejs';

export function makeServer() {
  let users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', active: true },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', active: true },
    { id: 3, name: 'Carol White', email: 'carol@example.com', active: false },
  ];

  return createServer({
    logging: true,
    routes() {
      this.namespace = 'api';

      this.get('/users', () => {
        return users;
      });

      this.post('/users', (_, request) => {
        const newUser = JSON.parse(request.requestBody);
        const id = Math.floor(Math.random() * 10000);
        const created = { ...newUser, id };
        users.push(created);
        return created;
      });
      this.delete("/users/:id", (_, request) => {
        const id = request.params.id;
        users = users.filter((user) => user.id !== +id);
        return "deleted"
      })
      this.put('/users/:id', (_, request) => {
        const id = Number(request.params.id);
        const updatedFields = JSON.parse(request.requestBody);

        users = users.map(user =>
          user.id === id ? { ...user, ...updatedFields } : user
        );

        const updatedUser = users.find(user => user.id === id);
        return updatedUser || { error: 'User not found' };
      });
    },
  });
}
