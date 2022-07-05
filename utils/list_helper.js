const dummy = (blogs) => {
    console.log('dummy blogs:', blogs)
    return 1
}
  
const totalLikes = (blogs) => {
    var total = 0
    blogs.forEach(blog => {
        total += blog.likes
    }
    )
    return total
}

module.exports = {
    dummy, totalLikes
}