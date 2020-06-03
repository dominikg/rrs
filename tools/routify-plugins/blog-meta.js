const defaultOpts = {
  path: '/blog', // root path for blog
  extensions: ['md'], // extensions used for posts (must be subset of routify extensions)

  sort: (postA, postB) => {
    const a = postA.meta.blog.published;
    const b = postB.meta.blog.published;
    return a > b ? 1 : a === b ? 0 : -1;
  },

  filter: (post) => !!post.meta.blog.published,

  // you can specify a string (gray-matter excerpt_separator), function or boolean (gray-matter)
  excerpt: {
    start: '<!-- excerpt:start -->',
    end: '<!-- excerpt:end -->',
  },

  metaKey: 'blog',
  //  virtualRoutes: {
  // year: true,
  // tag: true,
  // author: true,
  //  }
  // slug: true, // create safe slug from title
  // readingTime: true,  // TODO add reading-time
};

const adder = (middlewares, options) => (builder) => {
  const blogMiddleware = builder(options);
  if (!blogMiddleware) {
    return;
  }
  if (middlewares.find((mw) => mw.name === blogMiddleware.name)) {
    throw new Error(`Middleware named ${blogMiddleware.name} already exists`);
  }
  const index = middlewares.findIndex((mw) => mw.name === blogMiddleware.after);
  const { name, middleware } = blogMiddleware;
  if (index > -1 && index < middlewares.length - 1) {
    middlewares.splice(index + 1, 0, { name, middleware });
  } else {
    middlewares.push({ name, middleware });
  }
};

let blogNode; // cache for blog, we're working with this in different middlewares, no need to search for it every time

const findBlog = (options) => ({
  name: 'blog-meta-find-blog',
  after: 'removeNonSvelteFiles',
  middleware: async (payload) => {
    // TODO scan subdirectories
    const blog = payload.tree.children.find((child) => child.isDir && child.filepath === options.path);
    if (!blog) {
      throw new Error(`did not find blog at path "${options.path}"`);
    }

    blog.children.forEach((child) => (child.isBlogPost = child.isPage && options.extensions.includes(child.ext)));
    blogNode = blog;
  },
});

const grayMatterStartEndExerptExtractor = (start, end) => (file) => {
  const excerptStartMarker = (file.data.excerpt && file.data.excerpt.start) || start;
  const excerptEndMarker = (file.data.excerpt && file.data.excerpt.end) || end;
  const startIndex = file.content.indexOf(excerptStartMarker);
  if (startIndex > -1) {
    const endIndex = file.content.indexOf(excerptEndMarker, startIndex);
    if (endIndex > -1) {
      file.excerpt = file.content.slice(startIndex + excerptStartMarker.length, endIndex);
    }
  }
};

const grayMatterOptions = (options) => {
  const result = {};
  if (options.excerpt) {
    const excerptType = typeof options.excerpt;

    if (excerptType === 'string') {
      result.excerpt_separator = options.excerpt;
    } else if (excerptType === 'function' || excerptType === 'boolean') {
      result.excerpt = options.excerpt;
    } else if (excerptType === 'object' && options.excerpt.start && options.excerpt.end) {
      result.excerpt = grayMatterStartEndExerptExtractor(options.excerpt.start, options.excerpt.end);
    } else {
      throw new Error(`invalid value in options.excerpt: ${JSON.stringify(options.excerpt)}`);
    }
  }
  return result;
};

const frontmatterParser = (options) => ({
  name: 'blog-meta-frontmatter',
  after: 'applyMetaTofiles',
  middleware: async () => {
    const posts = blogNode.children.filter((child) => child.isBlogPost);

    if (posts && posts.length) {
      const matter = require('gray-matter');
      const matterOptions = grayMatterOptions(options);
      await Promise.all(
        posts.map((post) => {
          const fm = matter.read(post.absolutePath, matterOptions);
          post.meta[options.metaKey] = fm.data;
          if (fm.excerpt) {
            post.meta[options.metaKey].excerpt = fm.excerpt;
          }
        }),
      );
    }
  },
});

const filterPosts = (options) => ({
  name: 'blog-meta-filter',
  after: 'blog-meta-frontmatter',
  middleware: () => {
    blogNode.children = blogNode.children.filter((child) => !child.isBlogPost || options.filter(child));
  },
});

const setSortIndex = (options) => ({
  name: 'blog-meta-sorter',
  after: 'blog-meta-frontmatter',
  middleware: () => {
    // set meta.index
    blogNode.children
      .filter((child) => child.isBlogPost)
      .sort(options.sort)
      .map((post, i) => (post.meta.index = i + 1));

    // sort it
    blogNode.children.sort((a, b) => {
      if (a.isBlogPost && b.isBlogPost) {
        return options.sort(a, b);
      } else if (a.isBlogPost) {
        return 1;
      } else if (b.isBlogPost) {
        return -1;
      }
      return 0;
    });
  },
});

module.exports = function (middlewares, pl, opts) {
  const options = { ...defaultOpts, ...opts };
  const addMiddleware = adder(middlewares, options);
  addMiddleware(findBlog);
  addMiddleware(frontmatterParser);
  if (options.sort) {
    addMiddleware(setSortIndex);
  }
  if (options.filter) {
    addMiddleware(filterPosts);
  }

  return middlewares;
};
