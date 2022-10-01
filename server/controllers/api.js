module.exports = class API {
    // fetch all posts
    static async fetchAllPost(req, res) {
        res.send('Hello from API');
    }

    // fetch post by ID
    static async fetchPostByID(req, res) {
        res.send('Fetch Post by ID');
    }

}