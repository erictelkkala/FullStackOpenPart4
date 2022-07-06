const dummy = (blogs) => {
    console.log('dummy blogs:', blogs)
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach((blog) => {
        total += blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    let max = 0
    let maxBlog = blogs[0]
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

const mostBlogs = (blogs) => {
    const lodash = require('lodash')
    // Create a list of unique authors using Lodash
    // const authors = lodash.uniq(blogs.map((blog) => blog.author))
    let maxBlogs = 0
    let maxAuthor = ''

    let authors = lodash.countBy(blogs, 'author')
    console.log('authors:', authors)

    for (let author in authors) {
        if (authors[author] > maxBlogs) {
            maxBlogs = authors[author]
            maxAuthor = author
        }
    }

    console.log('mostBlogs:', maxAuthor, ',', maxBlogs)
    return {
        author: maxAuthor,
        blogs: maxBlogs,
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}
