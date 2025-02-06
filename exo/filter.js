const articles = [
  { id: 101, title: "Introduction à NestJS", author: "Alice", published: true },
  { id: 102, title: "Comprendre les JWT", author: "David", published: true },
  { id: 103, title: "Sécurité en API REST", author: "Charlie", published: false },
  { id: 104, title: "Les WebSockets en Node.js", author: "David", published: true },
  { id: 105, title: "Les bases de TypeScript", author: "Alice", published: false }
];

const filterArticles = () => {
  articles.filter(article => {
    console.log('Article\'s author', article.author, article.author == 'Alice');
  })
}

const filter = filterArticles()