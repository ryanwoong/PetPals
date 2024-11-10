import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Button,
  SimpleGrid,
  Box,
  Switch,
  TextInput,
  Textarea,
  Group,
  Loader,
} from '@mantine/core';
import HomeNavBar from '../components/HomeNavBar';
import { addEntry } from '../functions/database/addEntry';
import { fetchUserPosts } from '../functions/database/fetchUserPosts';
import { useAuth } from '../util/AuthContext';

const Journal = () => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch user's posts when component mounts
  useEffect(() => {
    const loadUserPosts = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const posts = await fetchUserPosts(user.uid);
        setEntries(posts);
        setError(null);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load your entries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadUserPosts();
  }, [user]);

  const handleNextClick = async () => {
    if (!entry.trim()) {
      console.log('Entry text is required');
      return;
    }

    try {
      console.log('Submitting entry...'); // Debug log
      const result = await addEntry({
        text: entry,
        title: title,
        isPublic: isPublic,
        authorId: user.uid
      });

      console.log('Entry submitted:', result); // Debug log

      // Fetch updated posts
      const updatedPosts = await fetchUserPosts(user.uid);
      setEntries(updatedPosts);
      
      // Clear form
      setTitle('');
      setEntry('');
      setIsPublic(false);

    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  return (
    <>
      <HomeNavBar />
      <Box style={{ backgroundColor: '#FDF5E6', padding: '20px', height: '100vh' }} pt="7rem">
        <SimpleGrid 
          cols={2} 
          spacing={40}
          breakpoints={[
            { maxWidth: 'md', cols: 1 }
          ]}
        >
          {/* Left Column: Previous Entries */}
          <Box
            style={{
              padding: '20px',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 100px)',
            }}
          >
            <Text
              style={{
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: '#333',
                fontSize: '1.8em',
                fontWeight: 'bold',
                marginBottom: '15px',
              }}
            >
              Previous Entries
            </Text>

            {loading ? (
              <Box style={{ textAlign: 'center', padding: '20px' }}>
                <Loader size="xl" />
              </Box>
            ) : error ? (
              <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            ) : entries.length === 0 ? (
              <Text style={{ 
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: '#333',
                fontSize: '1.2em',
                textAlign: 'center' 
              }}>
                No entries yet. Create your first entry!
              </Text>
            ) : (
              entries.map((entry) => (
                <Box
                  key={entry.id}
                  style={{
                    backgroundColor: '#FFCF9F',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                    width: '100%',
                    maxWidth: '600px',
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
                    {entry.title || 'Untitled'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Fuzzy Bubbles', sans-serif",
                      color: '#333',
                      fontSize: '1.2em',
                      marginBottom: '5px',
                      wordWrap: 'break-word',
                    }}
                  >
                    {entry.body || entry.text}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Fuzzy Bubbles', sans-serif",
                      color: '#333',
                      fontSize: '1em',
                      fontStyle: 'italic',
                    }}
                  >
                    {new Date(entry.dateCreated).toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Fuzzy Bubbles', sans-serif",
                      color: '#333',
                      fontSize: '1em',
                      fontStyle: 'italic',
                    }}
                  >
                    {entry.isPublic ? 'Public' : 'Private'}
                  </Text>
                </Box>
              ))
            )}
          </Box>

          {/* Right Column: Create New Entry */}
          <Box
            style={{
              width: '600px',
              padding: '20px',
              height: '600px',
              backgroundColor: '#FFCF9F',
              borderRadius: '20px',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: '#333',
                fontSize: '1.8em',
                fontWeight: 'bold',
                marginBottom: '15px',
              }}
            >
              Create an Entry:
            </Text>

            <Text
              style={{
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: '#333',
                fontSize: '1.4em',
                fontWeight: 'bold',
                marginBottom: '5px',
              }}
            >
              Title
            </Text>

            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              style={{
                width: '100%',
                fontSize: '1em',
                borderRadius: '8px',
                marginBottom: '15px',
                backgroundColor: 'white',
              }}
            />

            <Text
              style={{
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: '#333',
                fontSize: '1.4em',
                fontWeight: 'bold',
                marginBottom: '5px',
              }}
            >
              Entry
            </Text>

            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Type here..."
              minRows={50}
              style={{
                width: '100%',
                fontSize: '1em',
                borderRadius: '8px',
                backgroundColor: 'white',
                marginBottom: '15px',
              }}
            />

            <Text
              style={{
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: '#333',
                fontSize: '1.4em',
                marginBottom: '15px',
              }}
            >
              Make this entry public?
            </Text>

            <Group position="center">
              <Switch
                checked={isPublic}
                onChange={(e) => setIsPublic(e.currentTarget.checked)}
                color="yellow"
                label="Yes, post on community feed"
              />
            </Group>

            <Button
              variant="filled"
              color="#FFFAC3"
              style={{
                marginTop: '20px',
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                fontSize: '1.2rem',
                padding: '10px 20px',
                color: 'black',
              }}
              onClick={handleNextClick}
            >
              Save Entry
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Journal;