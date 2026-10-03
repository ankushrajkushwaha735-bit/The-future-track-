import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { BookOpen, Calendar, Clock, ArrowRight, User, X, Sparkles, Tag } from 'lucide-react';

interface BlogSectionProps {
  onEnquireClick: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onEnquireClick }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-[#26002F] text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100">
            <BookOpen className="w-3.5 h-3.5 text-[#D83A27]" />
            Career Guidance &amp; Insights
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#26002F] tracking-tight">
            Latest Updates &amp; Technology Articles
          </h2>
          <p className="mt-3 text-[#66616A] text-sm sm:text-base leading-relaxed">
            Expert articles from our faculty on in-demand computer skills, government job criteria, and accounting practices.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
            <article
              key={post.id}
              className="bg-[#F7F5F8] rounded-2xl overflow-hidden border border-purple-100/60 shadow-sm hover:shadow-md transition flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#26002F]/90 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#66616A] mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D83A27]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D83A27]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#26002F] leading-snug group-hover:text-[#D83A27] transition line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#66616A] mt-2.5 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-purple-100/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#26002F] flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#66616A]" />
                    {post.author.split('(')[0]}
                  </span>

                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#D83A27] hover:text-[#b82e1d] group-hover:translate-x-0.5 transition"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-purple-100 relative animate-fadeIn my-auto">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block bg-purple-50 text-[#26002F] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              {selectedPost.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-[#26002F] leading-snug mt-1">
              {selectedPost.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#66616A] mt-3 pb-4 border-b border-gray-100">
              <span className="font-bold text-[#1E1B20]">By {selectedPost.author}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <div className="my-5 rounded-2xl overflow-hidden max-h-64">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#1E1B20] leading-relaxed">
              {selectedPost.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#66616A]" />
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] bg-purple-50 text-[#26002F] font-bold px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedPost(null);
                  onEnquireClick();
                }}
                className="bg-[#D83A27] hover:bg-[#b82e1d] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E4B52D]" />
                Enquire Related Course
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
