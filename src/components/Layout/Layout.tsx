import React, { useState } from 'react';
import './Layout.css';
import EmotionVentingHole from '../EmotionVentingHole/EmotionVentingHole';
import IsletDiscovery from '../IsletDiscovery/IsletDiscovery';

interface EmotionPost {
  id: string;
  content: string;
  tags: string[];
  isPrivate: boolean;
  author: string;
  timestamp: Date;
  reactions: {
    type: string;
    count: number;
  }[];
}

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emotion-hole' | 'islet-discovery'>('emotion-hole');
  const [posts, setPosts] = useState<EmotionPost[]>([]);

  // 添加新帖子的回调函数，将传递给EmotionVentingHole组件
  const handleAddPost = (newPost: EmotionPost) => {
    setPosts([newPost, ...posts]);
  };

  // 处理反应的回调函数
  const handleReaction = (postId: string, reactionType: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedReactions = post.reactions.map(reaction => {
          if (reaction.type === reactionType) {
            return { ...reaction, count: reaction.count + 1 };
          }
          return reaction;
        });
        return { ...post, reactions: updatedReactions };
      }
      return post;
    }));
  };

  // 获取所有公开帖子
  const publicPosts = posts.filter(post => !post.isPrivate);

  return (
    <div className="layout">
      <header className="header">
        <h1>心灵孤岛</h1>
        <p>一个安全表达情绪、寻找共鸣的空间</p>
      </header>

      <nav className="navigation">
        <button 
          className={`nav-btn ${activeTab === 'emotion-hole' ? 'active' : ''}`}
          onClick={() => setActiveTab('emotion-hole')}
        >
          情绪树洞
        </button>
        <button 
          className={`nav-btn ${activeTab === 'islet-discovery' ? 'active' : ''}`}
          onClick={() => setActiveTab('islet-discovery')}
        >
          孤岛寻迹
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'emotion-hole' && (
          <EmotionVentingHole 
            posts={posts} 
            onAddPost={handleAddPost} 
            onReaction={handleReaction} 
          />
        )}
        {activeTab === 'islet-discovery' && (
          <IsletDiscovery 
            publicPosts={publicPosts} 
            onReaction={handleReaction} 
          />
        )}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} 心灵孤岛 - 一个安全的情绪表达空间</p>
      </footer>
    </div>
  );
};

export default Layout;