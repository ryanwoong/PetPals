import React, { useState, useEffect } from 'react';
import { Text, Box, Button, Textarea } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import HomeNavBar from '../components/HomeNavBar'; // Assuming HomeNavBar is in the components folder
import { BiComment, BiExpandAlt, BiCollapseAlt } from 'react-icons/bi'; // Import the icons

const CommunityFeed = () => {
  const [entries, setEntries] = useState([]); // Stores all journal entries
  const [comments, setComments] = useState({}); // Store comments per entry
  const [expanded, setExpanded] = useState({}); // Track expanded posts
  const [showAddComment, setShowAddComment] = useState({}); // Track add comment visibility
  const navigate = useNavigate();

  // Simulate fetching entries from a database or API
  useEffect(() => {
    const fetchedEntries = [
      {
        title: 'A Beautiful Day',
        text: 'I had a great day today! Went for a walk in the park and spent time with friends. It was an amazing experience and I really enjoyed it.',
        date: new Date(),
        isPublic: true,
      },
      {
        title: 'My First Journal',
        text: 'This is my first entry in the journal. Feeling excited! I have so much to share about my experiences, thoughts, and adventures!',
        date: new Date(),
        isPublic: true,
      },
      {
        title: 'Private Entry',
        text: 'This is a private entry, so it should not be shown in the community.',
        date: new Date(),
        isPublic: false,
      },
    ];

    // Filter entries to only show public ones
    const publicEntries = fetchedEntries.filter(entry => entry.isPublic);

    setEntries(publicEntries); // Set the filtered entries
  }, []);

  // Handle new comment submission
  const handleCommentSubmit = (entryId, commentText) => {
    if (commentText.trim() === '') return; // Do not submit empty comments

    // Add a new comment to the comments object
    setComments(prevComments => ({
      ...prevComments,
      [entryId]: [...(prevComments[entryId] || []), commentText],
    }));

    // Hide the comment input and clear the input field after submission
    setShowAddComment(prev => ({ ...prev, [entryId]: false }));
    document.querySelector(`#comment-input-${entryId}`).value = ''; // Clear the input field
  };

  // Toggle post expansion
  const handleToggleExpand = (entryId) => {
    setExpanded(prev => ({
      ...prev,
      [entryId]: !prev[entryId],
    }));
  };

  // Show the comment input
  const handleToggleAddComment = (entryId) => {
    setShowAddComment(prev => ({
      ...prev,
      [entryId]: !prev[entryId],
    }));
  };

  return (
    <>
      <HomeNavBar /> {/* Including the navigation bar at the top */}

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#FDF5E6',
      }}>
        {/* Centered Section: Community Entries */}
        <Box
          style={{
            padding: '20px',
            overflowY: 'auto',
            marginRight: '20px',
            width: '100%',
            maxWidth: '800px', // Center the content with a max width
          }}
        >
          <Text
            style={{
              fontFamily: "'Fuzzy Bubbles', sans-serif",
              color: '#333',
              fontSize: '1.8em',
              fontWeight: 'bold',
              marginBottom: '15px',
              textAlign: 'center',
            }}
          >
            Community Entries
          </Text>

          {/* Render entries */}
          {entries.length === 0 ? (
            <Text style={{ fontFamily: "'Fuzzy Bubbles', sans-serif", color: '#333', fontSize: '1.2em', textAlign: 'center' }}>
              No public entries available.
            </Text>
          ) : (
            entries.map((entry, index) => (
              <Box
                key={index}
                style={{
                  backgroundColor: '#FFCF9F',  // Orange background for each entry
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Text
                  style={{
                    fontFamily: "'Fuzzy Bubbles', sans-serif",
                    color: '#333',
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                  }}
                >
                  {entry.title} {/* Display the title */}
                </Text>

                {/* Display preview of the text in a list format */}
                {!expanded[index] && (
                  <Text
                    style={{
                      fontFamily: "'Fuzzy Bubbles', sans-serif",
                      color: '#333',
                      fontSize: '1.2em',
                      marginBottom: '5px',
                      wordWrap: 'break-word',  // Wrap long words inside the box
                    }}
                  >
                    {entry.text.length > 70 ? entry.text.substring(0, 70) + '...' : entry.text} {/* Show a preview */}
                  </Text>
                )}

                {/* Right-aligned Icon Buttons */}
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {/* Expand/Collapse Icon */}
                  <Button
                    variant="subtle"
                    onClick={() => handleToggleExpand(index)}
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                      color: '#333',
                    }}
                  >
                    {expanded[index] ? <BiCollapseAlt size={24} /> : <BiExpandAlt size={24} />}
                  </Button>
                </Box>

                {/* Expanded Post View */}
                {expanded[index] && (
                  <Box
                    style={{
                      marginTop: '20px',
                      padding: '10px',
                      borderTop: '2px solid #333',
                    }}
                  >
                    {/* Full text when expanded (only show when expanded) */}
                    <Text
                      style={{
                        fontFamily: "'Fuzzy Bubbles', sans-serif",
                        color: '#333',
                        fontSize: '1.2em',
                        marginBottom: '10px',
                      }}
                    >
                      {entry.text} {/* Show full text when expanded */}
                    </Text>

                    <Text
                      style={{
                        fontFamily: "'Fuzzy Bubbles', sans-serif",
                        color: '#333',
                        fontSize: '1em',
                        fontStyle: 'italic',
                      }}
                    >
                      {new Date(entry.date).toLocaleString()} {/* Display date in a readable format */}
                    </Text>

                    {/* Comment Section */}
                    <Box
                      style={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "'Fuzzy Bubbles', sans-serif",
                          color: '#333',
                          fontSize: '1.4em',
                          marginBottom: '10px',
                        }}
                      >
                        Comments
                      </Text>

                      {/* Comment Button */}
                      <Button
                        variant="subtle"
                        onClick={() => handleToggleAddComment(index)}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                          color: '#333',
                        }}
                      >
                        <BiComment size={24} />
                      </Button>
                    </Box>

                    {/* Render Comments for each entry */}
                    {(comments[index] || []).map((comment, commentIndex) => (
                      <Box
                        key={commentIndex}
                        style={{
                          marginBottom: '15px',
                          padding: '10px',
                          borderRadius: '8px',
                          backgroundColor: '#FFD9A4',  // Lighter orange background
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "'Fuzzy Bubbles', sans-serif",
                            color: '#333',
                            fontSize: '1.1em',
                            wordWrap: 'break-word',
                          }}
                        >
                          {comment}
                        </Text>
                      </Box>
                    ))}

                    {/* Add Comment Input */}
                    {showAddComment[index] && (
                      <Box style={{ marginTop: '10px' }}>
                        <Textarea
                          id={`comment-input-${index}`}  // Assign unique id to each textarea
                          placeholder="Write your comment..."
                          minRows={3}
                          style={{
                            width: '100%',
                            fontSize: '1em',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            marginBottom: '10px',
                          }}
                        />
                        <Button
                          onClick={() => handleCommentSubmit(index, document.querySelector(`#comment-input-${index}`).value)}
                          style={{
                            backgroundColor: '#FFFAC3',
                            borderColor: '#FFFAC3',                              
                            color: '#333',
                            width: '100%',
                          }}
                        >
                          Send
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
