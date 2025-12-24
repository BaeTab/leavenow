import React from 'react';
import { ChevronRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/posts';

const BlogSection = () => {
    return (
        <section className="mt-24">
            <div className="flex items-center gap-2 mb-8">
                <Newspaper className="text-blue-500" />
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">최신 연차 & 휴가 정보 (Blog)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <Link
                        to={`/blog/${post.id}`}
                        key={post.id}
                        className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all cursor-pointer group flex flex-col"
                    >
                        <div className="text-xs font-bold text-blue-500 mb-3 px-2 py-1 bg-blue-50 rounded-full w-fit">
                            {post.category}
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-1">
                            {post.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                            <span className="text-xs text-slate-400">{post.date}</span>
                            <div className="flex items-center gap-1 text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                읽어보기 <ChevronRight size={14} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <Link to="/blog" className="mt-10 mx-auto block w-fit bg-slate-100 hover:bg-slate-200 text-slate-600 px-10 py-3 rounded-xl font-bold transition-all">
                전체 포스팅 더보기
            </Link>
        </section>
    );
};

export default BlogSection;
