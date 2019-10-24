const users = [
  {
    id: '1',
    name: 'Andrey Ramirez',
    email: 'andrey@example.com',
  },
  {
    id: '2',
    name: 'Ringo Star',
    email: 'ringo@example.com',
  },
  {
    id: '3',
    name: 'Mike Enriquez',
    email: 'mike@example.com',
  },
  {
    id: '4',
    name: 'Juan de la Cruz',
    email: 'juan@example.com',
  }
];

const posts = [
  {
    id: '1',
    body: 'Reading: 7 Habits of Highly Effective People',
    author: '1'
  },
  {
    id: '2',
    body: 'Done Reading: Rich Dad, Poor Dad',
    author: '2'
  },
  {
    id: '3',
    body: 'Eloquent Javascript - what a nice book',
    author: '3'
  },
];

let comments = [
  {
    id: '1',
    text: 'Wtf is this?',
    author: '1',
    post: '2'
  },
  {
    id: '2',
    text: 'Can someone explain what this is?',
    author: '1',
    post: '2'
  },
  {
    id: '3',
    text: 'Nani?!',
    author: '2',
    post: '3'
  },
  {
    id: '4',
    text: 'Bro...',
    author: '3',
    post: '1'
  }
];

const db = {
  comments,
  posts,
  users
};

export default db;
