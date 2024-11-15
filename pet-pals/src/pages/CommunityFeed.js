import React, { useState, useEffect } from 'react';
import { Text, Box, Button, Textarea, Loader } from '@mantine/core';
import HomeNavBar from '../components/HomeNavBar';
import { BiComment, BiExpandAlt, BiCollapseAlt } from 'react-icons/bi';
import axios from 'axios';
import { useAuth } from '../util/AuthContext';
import { addComment } from '../functions/database/addComment';
import { fetchComments } from '../functions/database/fetchComments';

const CommunityFeed = () => {
  // State for managing posts, comments, expanded posts, and loading states
  const [entries, setEntries] = useState([]);
  const [comments, setComments] = useState({});
  const [expanded, setExpanded] = useState({});
  const [showAddComment, setShowAddComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentLoading, setCommentLoading] = useState({});
  const { user } = useAuth();
  const [userTags, setUserTags] = useState([]);

  // Calculate similarity score between two arrays of tags
  const calculateSimilarityScore = (tags1 = [], tags2 = []) => {
    if (!tags1.length || !tags2.length) return 0;
    
    // Create Sets for faster lookup
    const set1 = new Set(tags1);
    const set2 = new Set(tags2);
    
    // Count matching tags
    let matchingTags = 0;
    for (const tag of set1) {
      if (set2.has(tag)) {
        matchingTags++;
      }
    }
    
    // Calculate Jaccard similarity coefficient
    const union = new Set([...tags1, ...tags2]).size;
    return matchingTags / union;
  };

  // Fetch user's posts to get their tags
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;
      
      try {
        const response = await axios.get(`http://localhost:5100/posts/user/${user.uid}`);
        
        // Collect all unique tags from user's posts
        const allUserTags = new Set();
        response.data.posts.forEach(post => {
          if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => allUserTags.add(tag));
          }
        });
        
        setUserTags(Array.from(allUserTags));
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [user]);

  // Fetch and sort public posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5100/posts/public');
        
        // Format posts data for display
        const formattedPosts = response.data.posts.map(post => ({
          id: post.id || Math.random().toString(),
          title: post.title || 'Untitled',
          text: post.body || '',
          date: post.dateCreated || new Date().toISOString(),
          authorId: post.userId || '',
          isPublic: true,
          tags: post.tags || [],
          similarityScore: 0 // Will be calculated below
        }));

        // Calculate similarity scores and sort posts
        const postsWithScores = formattedPosts.map(post => ({
          ...post,
          similarityScore: calculateSimilarityScore(userTags, post.tags)
        }));

        // Sort by similarity score (highest to lowest)
        const sortedPosts = postsWithScores.sort((a, b) => b.similarityScore - a.similarityScore);

        console.log('Sorted posts:', sortedPosts);
        setEntries(sortedPosts);
        setError(null);
      } catch (error) {
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };
    fetchPosts();
  }, [userTags]); // Re-run when userTags change

  
  const loadCommentsForPost = async (userId, postId) => {
    console.log(`Loading comments for post ${postId} by user ${userId}`);
    try {
      setCommentLoading(prev => ({ ...prev, [postId]: true }));
      const fetchedComments = await fetchComments(userId, postId);
      console.log(`Fetched comments for post ${postId}:`, fetchedComments);
      setComments(prev => ({
        ...prev,
        [postId]: fetchedComments
      }));
    } catch (error) {
      console.error(`Error loading comments for post ${postId}:`, error);
      setError(`Failed to load comments for post ${postId}`);
    } finally {
      setCommentLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleToggleExpand = async (entryId) => {
    const newExpandedState = !expanded[entryId];
    setExpanded(prev => ({
      ...prev,
      [entryId]: newExpandedState
    }));

    if (newExpandedState) {
      const post = entries.find(entry => entry.id === entryId);
      if (post && post.authorId) {
        await loadCommentsForPost(post.authorId, entryId);
      }
    }
  };

  // Toggle the add comment input field for a specific post
  const handleToggleAddComment = (entryId) => {
    if (!user) {
      alert('Please log in to comment');
      return;
    }
    setShowAddComment(prev => ({ ...prev, [entryId]: !prev[entryId] }));
  };

  const handleCommentSubmit = async (entryId, commentText) => {
    if (!user) {
      alert('Please log in to comment');
      return;
    }
    
    if (!commentText?.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      setCommentLoading(prev => ({ ...prev, [entryId]: true }));
      
      console.log('Starting comment submission process...');
      const post = entries.find(entry => entry.id === entryId);
      if (!post) {
        throw new Error('Post not found');
      }

      await addComment({
        postId: entryId,
        userId: post.authorId,
        authorId: user.uid,
        commentBody: commentText
      });

      await loadCommentsForPost(post.authorId, entryId);

      setShowAddComment(prev => ({ ...prev, [entryId]: false }));
      const inputElement = document.querySelector(`#comment-input-${entryId}`);
      if (inputElement) {
        inputElement.value = '';
      }

    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert(error.message || 'Unable to submit comment. Please try again later.');
    } finally {
      setCommentLoading(prev => ({ ...prev, [entryId]: false }));
    }
  };

  return (
    <>
      <HomeNavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', backgroundColor: '#FDF5E6', paddingTop: '7rem' }}>
        <Box style={{ padding: '20px', overflowY: 'auto', width: '100%', maxWidth: '800px' }}>
          <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333', fontSize: '1.8em', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
            Community Entries
          </Text>

          {loading ? (
            <Box style={{ textAlign: 'center', padding: '20px' }}>
              <Loader size="xl" />
            </Box>
          ) : error ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
          ) : entries.length === 0 ? (
            <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333', fontSize: '1.2em', textAlign: 'center' }}>
              No public entries available.
            </Text>
          ) : (
            entries.map((entry) => (
              <Box key={entry.id} style={{ backgroundColor: '#FFCF9F', padding: '15px', borderRadius: '10px', marginBottom: '10px', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)' }}>
                <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333', fontSize: '1.5em', fontWeight: 'bold', marginBottom: '5px' }}>{entry.title}</Text>
                {!expanded[entry.id] && (
                  <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333', fontSize: '1.2em', marginBottom: '5px', wordWrap: 'break-word' }}>
                    {entry.text && entry.text.length > 70 ? entry.text.substring(0, 70) + '...' : entry.text}
                  </Text>
                )}

                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="subtle" onClick={() => handleToggleExpand(entry.id)} style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#333' }}>
                    {expanded[entry.id] ? <BiCollapseAlt size={24} /> : <BiExpandAlt size={24} />}
                  </Button>
                </Box>

                {expanded[entry.id] && (
                  <Box>
                    <Text
                      style={{
                        fontFamily: "'Fuzzy Bubbles', sans-serif",
                        color: '#333',
                        fontSize: '1.2em',
                        marginBottom: '10px',
                      }}
                    >
                      {entry.text || 'No content'}
                    </Text>

                    <Box style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333', fontSize: '1.4em', marginBottom: '10px' }}>
                        Comments {commentLoading[entry.id] && <Loader size="sm" />}
                      </Text>

                      <Button variant="subtle" onClick={() => handleToggleAddComment(entry.id)} style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#333' }}>
                        <BiComment size={24} />
                      </Button>
                    </Box>

                    {(comments[entry.id] || []).map((comment) => (
                      <Box key={comment.id} style={{ marginBottom: '15px', padding: '10px', borderRadius: '8px', backgroundColor: '#FFD9A4', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333', fontSize: '1.1em', wordWrap: 'break-word' }}>{comment.body}</Text>
                        <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#666', fontSize: '0.9em', fontStyle: 'italic', marginTop: '5px' }}>{new Date(comment.dateCreated).toLocaleString()}</Text>
                      </Box>
                    ))}

                    {showAddComment[entry.id] && (
                      <Box style={{ marginTop: '10px' }}>
                        <Textarea
                          id={`comment-input-${entry.id}`}
                          placeholder="Write your comment..."
                          minRows={3}
                          disabled={commentLoading[entry.id]}
                          style={{ width: '100%', fontSize: '1em', borderRadius: '8px', backgroundColor: 'white', marginBottom: '10px' }}
                        />
                        <Button
                          onClick={() => handleCommentSubmit(entry.id, document.querySelector(`#comment-input-${entry.id}`).value)}
                          disabled={commentLoading[entry.id]}
                          style={{ backgroundColor: '#FFFAC3', borderColor: '#FFFAC3', color: '#333', width: '100%' }}
                        >
                          {commentLoading[entry.id] ? 'Sending...' : 'Send'}
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            ))
          )}
        </Box>
      </div>
    </>
  );
};

export default CommunityFeed;
