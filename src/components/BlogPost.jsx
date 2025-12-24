
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '../data/posts';
import SEO from './SEO';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <SEO title="페이지를 찾을 수 없습니다" />
                <h1 className="text-3xl font-bold mb-4">게시글을 찾을 수 없습니다.</h1>
                <Link to="/" className="text-blue-600 hover:underline">홈으로 돌아가기</Link>
            </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto px-6 py-20">
            <SEO
                title={post.title}
                description={post.description}
                keywords={post.keywords || `${post.category}, 연차, 휴가`}
                url={`/blog/${post.id}`}
            />

            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                <ArrowLeft size={20} />
                <span>홈으로 돌아가기</span>
            </Link>

            <header className="mb-12">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                        <Tag size={14} />
                        {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                    {post.title}
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-6">
                    {post.description}
                </p>
            </header>

            <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="mt-20 pt-10 border-t border-slate-200">
                <h3 className="text-xl font-bold mb-6">다른 글 더보기</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogPosts.filter(p => p.id !== id).slice(0, 2).map(p => (
                        <Link key={p.id} to={`/blog/${p.id}`} className="block p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                            <div className="font-bold text-slate-800 mb-2">{p.title}</div>
                            <div className="text-sm text-slate-500">{p.date}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
