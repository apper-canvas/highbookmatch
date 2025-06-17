import matchesData from '../mockData/matches.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let matches = [...matchesData];

const matchService = {
  async getAll() {
    await delay(300);
    return [...matches];
  },

  async getById(id) {
    await delay(200);
    const match = matches.find(m => m.Id === parseInt(id, 10));
    if (!match) {
      throw new Error('Match not found');
    }
    return { ...match };
  },

  async create(match) {
    await delay(250);
    const maxId = Math.max(...matches.map(m => m.Id), 0);
    const newMatch = {
      ...match,
      Id: maxId + 1
    };
    matches.push(newMatch);
    return { ...newMatch };
  },

  async update(id, data) {
    await delay(250);
    const index = matches.findIndex(m => m.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Match not found');
    }
    const updatedMatch = { ...matches[index], ...data, Id: matches[index].Id };
    matches[index] = updatedMatch;
    return { ...updatedMatch };
  },

  async delete(id) {
    await delay(200);
    const index = matches.findIndex(m => m.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Match not found');
    }
    matches.splice(index, 1);
    return true;
  },

  async getUserMatches(userId) {
    await delay(250);
    return matches.filter(match => 
      match.userId1 === userId || match.userId2 === userId
    );
  }
};

export default matchService;