const dummy = (blogs) => {
    console.log('dummy blogs:', blogs)
    return 1
}

const totalLikes = (blogs) => {
    var total = 0
    blogs.forEach((blog) => {
        total += blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    var max = 0
    var maxBlog = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > max) {
            max = blog.likes
            maxBlog = blog
        }
    })
    console.log('favoriteBlog:', maxBlog)
    // Remove unnecessary properties from the object
    delete maxBlog.__v && delete maxBlog._id && delete maxBlog.url
    return maxBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
