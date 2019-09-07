const users = [
  {
    id: '1',
    name: 'Andrey',
    email: 'andrey@example.com',
    age: 26,
  },
  {
    id: '2',
    name: 'Ringo',
    email: 'ringo@example.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    age: 24
  }
];

const posts = [
  {
    id: '1',
    title: '7 Habits of Highly Effective People',
    body: 'asd lka kaklab ndmajao n',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Rich Dad, Poor Dad',
    body: 'da lk1o 91idfm juas9du',
    published: true,
    author: '2'
  },
  {
    id: '3',
    title: 'Eloquent Javascript',
    body: 'asd i19 mnd9 1nfc8cbna',
    published: true,
    author: '3'
  },
];

let comments = [
  {
    id: '1',
    text: 'asdn ans n 1n1 ndl na nakjns n na',
    author: '1',
    post: '2'
  },
  {
    id: '2',
    text: 'asdkn iosd napsdni aps8',
    author: '1',
    post: '2'
  },
  {
    id: '3',
    text: 'askmd pio89u kasm o8 nasn',
    author: '2',
    post: '3'
  },
  {
    id: '4',
    text: 'axkmd; aisdj as9u a9jsd9asd',
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
