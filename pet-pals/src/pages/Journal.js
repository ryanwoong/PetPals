import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button, Container, Group, Box, Switch, TextInput, Textarea } from '@mantine/core';  // Correct imports
import HomeNavBar from '../components/HomeNavBar'; // Assuming HomeNavBar is in the components folder

const Journal = () => {
  const [title, setTitle] = useState('');  // Current journal entry title
  const [entry, setEntry] = useState('');  // Current journal entry input
  const [isPublic, setIsPublic] = useState(false);  // Switch for public entry
  const [entries, setEntries] = useState([]);  // Stores all journal entries
  const navigate = useNavigate();

  const handleNextClick = () => {
    // Create a new journal entry and add it to the list
    const newEntry = {
      title: title,
      text: entry,
      date: new Date(),
      isPublic: isPublic,
    };

    // Add new entry to the list, sorted by date
    setEntries([newEntry, ...entries].sort((a, b) => b.date - a.date));

    // Clear the input fields after saving the entry
    setTitle('');
    setEntry('');
    setIsPublic(false);
  };

  return (
    <>
      <HomeNavBar />  {/* Including the navigation bar at the top */}

      <div style={{ position: 'relative', height: '100vh', backgroundColor: '#FDF5E6', display: 'flex' }}>
        {/* Left Section: Previous Entries */}
        <Box
          style={{
            flex: 1,  // Takes up remaining space on the left side
            padding: '20px',
            overflowY: 'auto',  // Make it scrollable if the list is long
            marginRight: '20px',

          }}
        >
          <Text
            style={{
              fontFamily: "'Fuzzy Bubbles', sans-serif",
              color: '#333',
              fontSize: '1.8em',
              fontWeight: 'bold',
              marginBottom: '15px',
              marginTop: '150px',
            }}
          >
            Previous Entries
          </Text>

          {/* Render entries */}
          {entries.map((entry, index) => (
            <Box
              key={index}
              style={{
                backgroundColor: '#FFCF9F',  // Orange background for each entry
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '10px',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                width: '100%', // Ensure entry takes up full width of the container
                maxWidth: '600px', // Fixed max-width for each entry
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
              <Text
                style={{
                  fontFamily: "'Fuzzy Bubbles', sans-serif",
                  color: '#333',
                  fontSize: '1.2em',
                  marginBottom: '5px',
                  wordWrap: 'break-word',  // Wrap long words inside the box
                }}
              >
                {entry.text} {/* Display the entry text */}
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
            </Box>
          ))}
        </Box>

        {/* Right Section: Create New Entry */}
        <Box
          style={{
            width: '600px', // Fixed width for the right section
            padding: '20px',
            height: '600px', // Adjust height as needed
            backgroundColor: '#FFCF9F',  // Orange background for the creation form
            borderRadius: '20px',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: '150px',
            marginInlineEnd: '20px',
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

          {/* Title Heading */}
          <Text
            style={{
              fontFamily: "'Fuzzy Bubbles', sans-serif",
              color: '#333',
              fontSize: '1.4em',
              fontWeight: 'bold',
              marginBottom: '5px',  // Reduced margin to bring Title and textbox closer
            }}
          >
            Title
          </Text>

          {/* Title Input Field */}
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={{
              width: '100%',
              fontSize: '1em',
              borderRadius: '8px',
              marginBottom: '15px',  // Reduced margin to bring Title and textbox closer
              backgroundColor: 'white',
            }}
          />

          {/* Entry Heading */}
          <Text
            style={{
              fontFamily: "'Fuzzy Bubbles', sans-serif",
              color: '#333',
              fontSize: '1.4em',
              fontWeight: 'bold',
              marginBottom: '5px',  // Reduced margin to bring Entry and textbox closer
            }}
          >
            Entry
          </Text>

          {/* Entry Text Area */}  
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Type here..."
            minRows={50} // Adjust this to make the textarea larger
            style={{
              width: '100%',
              fontSize: '1em',
              borderRadius: '8px',
              backgroundColor: 'white',
              marginBottom: '15px',  // Adjust margin to ensure there's enough space
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
      </div>
    </>
  );
};

export default Journal;
