import React, { useState, useEffect } from 'react';
import './IsletDiscovery.css';

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

interface IsletDiscoveryProps {
  publicPosts: EmotionPost[];
  onReaction?: (postId: string, reactionType: string) => void;
}

const IsletDiscovery: React.FC<IsletDiscoveryProps> = ({ publicPosts, onReaction }) => {
  const [recommendedPosts, setRecommendedPosts] = useState<EmotionPost[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [emotionFilter, setEmotionFilter] = useState<string>('all');
  const [isRandomMode, setIsRandomMode] = useState<boolean>(false);

  // 从所有公开帖子中提取可用标签
  useEffect(() => {
    const tags = new Set<string>();
    publicPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    setAvailableTags(Array.from(tags));
  }, [publicPosts]);

  // 根据选择的标签和情绪过滤器推荐帖子
  useEffect(() => {
    let filtered = [...publicPosts];
    
    // 如果选择了标签，按标签过滤
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    // 随机模式下打乱顺序
    if (isRandomMode) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    } else {
      // 非随机模式下按时间排序（最新的在前）
      filtered = [...filtered].sort((a, b) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      );
    }
    
    // 限制显示数量
    setRecommendedPosts(filtered.slice(0, 5));
  }, [publicPosts, selectedTags, emotionFilter, isRandomMode]);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleReaction = (postId: string, reactionType: string) => {
    if (onReaction) {
      onReaction(postId, reactionType);
    } else {
      console.log(`对帖子 ${postId} 添加反应: ${reactionType}`);
    }
  };

  return (
    <div className="islet-discovery">
      <h2>孤岛寻迹</h2>
      <p className="description">发现与你相似的灵魂，或获得意外的慰藉与启发</p>
      
      <div className="discovery-controls">
        <div className="tags-filter">
          <h4>按标签筛选：</h4>
          <div className="tags-container">
            {availableTags.map(tag => (
              <button 
                key={tag} 
                className={`tag-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </button>
            ))}
            {availableTags.length === 0 && (
              <p className="no-tags">暂无可用标签</p>
            )}
          </div>
        </div>
        
        <div className="mode-selector">
          <label className="mode-label">
            <input
              type="checkbox"
              checked={isRandomMode}
              onChange={() => setIsRandomMode(!isRandomMode)}
              className="mode-checkbox"
            />
            随机漂流瓶模式
          </label>
          <p className="mode-description">
            {isRandomMode 
              ? "开启随机模式，让系统为你随机推荐其他岛民的分享" 
              : "关闭随机模式，系统将根据标签为你推荐相关内容"}
          </p>
        </div>
      </div>
      
      <div className="recommended-posts">
        <h3>为你推荐的内容</h3>
        {recommendedPosts.length === 0 ? (
          <p className="no-posts">暂无推荐内容，请尝试调整筛选条件或等待更多用户分享</p>
        ) : (
          recommendedPosts.map(post => (
            <div key={post.id} className="post">
              <div className="post-header">
                <span className="post-author">{post.author}</span>
                <span className="post-time">
                  {post.timestamp.toLocaleString()}
                </span>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="post-tag">{tag}</span>
                ))}
              </div>
              <div className="post-reactions">
                {post.reactions.map(reaction => (
                  <button
                    key={reaction.type}
                    onClick={() => handleReaction(post.id, reaction.type)}
                    className="reaction-btn"
                  >
                    {reaction.type} ({reaction.count})
                  </button>
                ))}
              </div>
              <div className="connection-message">
                <p>这条分享与你产生了共鸣吗？或许你们有相似的经历或感受。</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IsletDiscovery;