const { User, Thought } = require('../models');

const resolvers = {
    Query: {

        users: async () => { //get all users
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

        user: async (parent, { username }) => { //get a user by username
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },

        thought: async (parent, { _id }) => { //single thought 
            return Thought.findOne({ _id });
        }
    }


};

module.exports = resolvers;