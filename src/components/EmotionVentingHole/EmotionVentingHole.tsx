import React, { useState } from 'react';
import './EmotionVentingHole.css';

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

interface EmotionVentingHoleProps {
  posts?: EmotionPost[];
  onAddPost?: (post: EmotionPost) => void;
  onReaction?: (postId: string, reactionType: string) => void;
}

const EmotionVentingHole: React.FC<EmotionVentingHoleProps> = ({ posts = [], onAddPost, onReaction }) => {
  const [localPosts, setLocalPosts] = useState<EmotionPost[]>([]);
  const [newPost, setNewPost] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('匿名');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: EmotionPost = {
      id: Date.now().toString(),
      content: newPost,
      tags,
      isPrivate,
      author: authorName || '匿名',
      timestamp: new Date(),
      reactions: [
        { type: '抱抱', count: 0 },
        { type: '理解', count: 0 },
        { type: '共鸣', count: 0 },
      ],
    };

    if (onAddPost) {
      onAddPost(post);
    } else {
      setLocalPosts([post, ...localPosts]);
    }
    setNewPost('');
    setTags([]);
    setTagInput('');
  };

  const handleAddTag = () => {
    if (!tagInput.trim() || tags.includes(tagInput.trim())) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleReaction = (postId: string, reactionType: string) => {
    if (onReaction) {
      onReaction(postId, reactionType);
    } else {
      setLocalPosts(localPosts.map(post => {
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
    }
  };

  return (
    <div className="emotion-venting-hole">
      <h2>情绪树洞</h2>
      <p className="description">在这里，你可以安全地表达你的情绪和想法，无需担心评判。</p>
      
      <form onSubmit={handlePostSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="author-name">你的名字（留空为匿名）：</label>
          <input
            type="text"
            id="author-name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="匿名"
            className="author-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="post-content">分享你的想法：</label>
          <textarea
            id="post-content"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="在这里倾诉你的心情..."
            className="content-input"
            required
          />
        </div>
        
        <div className="form-group tags-group">
          <label>添加标签：</label>
          <div className="tag-input-container">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="输入标签"
              className="tag-input"
            />
            <button type="button" onClick={handleAddTag} className="add-tag-btn">添加</button>
          </div>
          <div className="tags-container">
            {tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button 
                  type="button" 
                  onClick={() => handleRemoveTag(tag)} 
                  className="remove-tag-btn"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="form-group privacy-group">
          <label className="privacy-label">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
              className="privacy-checkbox"
            />
            设为私密（仅自己可见）
          </label>
        </div>
        
        <button type="submit" className="submit-btn">发布</button>
      </form>
      
      <div className="posts-container">
        <h3>情绪广场</h3>
        {(posts.length > 0 ? posts : localPosts).filter(post => !post.isPrivate).length === 0 ? (
          <p className="no-posts">暂无公开分享，成为第一个分享者吧！</p>
        ) : (
          (posts.length > 0 ? posts : localPosts)
            .filter(post => !post.isPrivate)
            .map(post => (
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
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default EmotionVentingHole;