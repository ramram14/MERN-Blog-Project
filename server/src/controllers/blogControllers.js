import { generateSlug } from '../lib/utils.js';
import Blog from '../models/blogModel.js';

export const createBlog = async (req, res) => {
  try {
    const user = req.userData;
    const imageUrl = req.imageUrl;
    const { title, content, category } = req.body;
    const slug = await generateSlug(title);

    const blog = await Blog.create({
      title,
      content,
      image: imageUrl,
      slug,
      category,
      author: user
    })

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    })
  } catch (error) {
    console.log('Error in createBlog controller', error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({},
      '_id title image content, slug author likeUsers createdAt updatedAt'
    )
      .populate({
        path: 'author',
        select: '_id fullName username'
      })



    return res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      data: blogs
    })
  } catch (error) {
    console.log('Error in getAllBlogs controller', error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({
      slug
    })
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Blog fetched successfully',
      data: blog
    })
  } catch (error) {
    console.log('Error in getBlogBySlug controller', error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};

export const updateBlogData = async (req, res) => {
  try {
    const { slug } = req.params;
    const { content, category } = req.body;
    const blog = await Blog.findOneAndUpdate({
      slug
    }, {
      // If user not give any data then it will not update
      content: content || blog.content,
      category: category || blog.category
    }, {
      new: true
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    };

    return res.status(200).json({
      success: true,
      message: 'Blog updated successfully'
    })
  } catch (error) {
    console.log('Error in updateBlogData controller', error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
};


// Update blog tile, we seperate it because if title change it means slug has need to be change either
export const updateBlogTitle = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title } = req.body;
    const newSlug = await generateSlug(title);

    const blog = await Blog.findOneAndUpdate({
      slug
    }, {
      title,
      slug: newSlug
    }, {
      new: true
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    };

    return res.status(200).json({
      success: true,
      message: 'Blog title updated successfully',
      data: blog
    })
  } catch (error) {
    console.log('Error in updateBlogTitle controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

// We do the first prevention if the slug given by the user is not in the database, this is done to prevent the image from being uploaded when the blog does not exist or prevent processing the data when the blog does not exist to.
export const checkBlogSlugIsValid = async (req, res, next) => {
  const { slug } = req.params;
  const blog = await Blog.findOne({ slug });
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog not found'
    })
  }
  next()
};

export const updateBlogImage = async (req, res) => {
  try {
    const { slug } = req.params;
    const imageUrl = req.imageUrl;
    const blog = await Blog.findOneAndUpdate({
      slug
    }, {
      image: imageUrl
    }, {
      new: true
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    };

    return res.status(200).json({
      success: true,
      message: 'Blog image updated successfully'
    });
  } catch (error) {
    console.log('Error in updateBlogImage controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOneAndDelete({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    };
    return res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    console.log('Error in deleteBlog controller', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}