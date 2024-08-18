const { User } = require('../models')

const resolvers = {
    Query: {
       users: async () => {
// find all users in the database
        return await User.find({}).populate('books').populate({
    // populate the saved books for each user
            path: 'savedBooks',
    // further populates the details of each book
            populate: {
                path: 'books'
              }
        })
       },
// find all books in the database
       books: async () => {
        return await Book.find({});
      }
    }
}

module.exports = resolvers;
