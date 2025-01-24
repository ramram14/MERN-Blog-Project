import { updateImage, uploadImageOnCloudinary } from '../lib/cloudinary.js';
import { generateSlug } from '../lib/utils.js';
import Blog from '../models/blogModel.js';
import Comment from '../models/commentModel.js';


export const createBlog = async (req, res) => {
  try {
    const user = req.userData;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is Required',
        errorMessage: 'Image is Reqired'
      });
    }
    const localFilePath = req.file.path;
    const imageUrl = await uploadImageOnCloudinary(localFilePath);
    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        message: 'Cannot upload image, please try again',
      })
    }
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
      }).sort({ createdAt: -1 });



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
      .populate({
        path: 'author',
        select: '_id fullName username profileImage'
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: '_id username profileImage',
          sort: { createdAt: -1 }
        }
      })
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }
    const comments = await Comment.find({
      blog: blog._id
    })

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
    const { title, content, category } = req.body;
    const blog = req.blog;
    let imageUrl = null;
    if (req.file) {
      const localFilePath = req.file.path;
      const newImageUrl = await updateImage(localFilePath, blog.image);
      if (!newImageUrl) {
        return res.status(500).json({
          success: false,
          message: 'Cannot upload image, please try again',
        })
      }

      imageUrl = newImageUrl
    }
    const newBlog = await Blog.findOneAndUpdate({
      slug
    }, {
      // If user not give any data then it will not update
      title: title || blog.title,
      content: content || blog.content,
      category: category || blog.category,
      image: imageUrl || blog.image
    }, {
      new: true
    });

    if (!newBlog) {
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
  req.blog = blog;
  next()
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