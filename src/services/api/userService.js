import usersData from '../mockData/users.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let users = [...usersData];

const userService = {
  async getAll() {
    await delay(300);
    return [...users];
  },

  async getById(id) {
    await delay(200);
    const user = users.find(u => u.Id === parseInt(id, 10));
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  },

  async create(user) {
    await delay(250);
    const maxId = Math.max(...users.map(u => u.Id), 0);
    const newUser = {
      ...user,
      Id: maxId + 1
    };
    users.push(newUser);
    return { ...newUser };
  },

  async update(id, data) {
    await delay(250);
    const index = users.findIndex(u => u.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('User not found');
    }
    const updatedUser = { ...users[index], ...data, Id: users[index].Id };
    users[index] = updatedUser;
    return { ...updatedUser };
  },

  async delete(id) {
    await delay(200);
    const index = users.findIndex(u => u.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('User not found');
    }
    users.splice(index, 1);
    return true;
  },

  async getCurrentUser() {
    await delay(200);
    // Return the first user as the current user for demo purposes
    return { ...users[0] };
  }
};

export default userService;