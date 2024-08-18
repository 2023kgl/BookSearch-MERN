const typeDefs = `

 # Define which fields are accessible from the User model
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
}

 # Define which fields are accessible from the Book model
type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type Query {
    users: [User]
    books: [Book]
}
`;

module.exports = typeDefs