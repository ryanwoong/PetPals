import { Button, Container, Grid, SegmentedControl, Text, Transition } from '@mantine/core';
import React, { useState } from 'react';
import inventoryImage from '../assets/Images/backpack.png';
import catGif from '../assets/Images/cat.gif';
import glassesImage from '../assets/Images/glasses.png';
import heartImage from '../assets/Images/heart.png';
import kibbleImage from '../assets/Images/kibble.png';
import textImage from '../assets/Images/pet_text.png';
import shopImage from '../assets/Images/shop.png';
import hatImage from '../assets/Images/wizard_hat.png';
import backgroundImage from '../assets/Images/background.jpeg'; // Make sure to add your background image
import HomeNavBar from '../components/HomeNavBar';

const HomePage = () => {
  const [showHeart, setShowHeart] = useState(false);
  const [showTextbox, setShowTextbox] = useState(false);
  const [activeTab, setActiveTab] = useState('shop');
  const [userBalance, setUserBalance] = useState(200);
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, title: 'YumYums', quantity: 5, image: kibbleImage },
    { id: 2, title: 'Wizard Hat', quantity: 1, image: hatImage },
  ]);

  const shopItems = [
    { id: 1, title: 'YumYums', price: 10, image: kibbleImage },
    { id: 2, title: 'Wizard Hat', price: 50, image: hatImage },
    { id: 3, title: 'Sunglasses', price: 30, image: glassesImage },
  ];

  const handleCatClick = () => {
    setShowHeart(true);
    setShowTextbox(true);
    setTimeout(() => {
      setShowHeart(false);
      setShowTextbox(false);
    }, 5000);
  };

  const handleBuyItem = (item) => {
    if (userBalance >= item.price) {
      setUserBalance((prevBalance) => prevBalance - item.price);

      setInventoryItems((prevInventory) => {
        const existingItem = prevInventory.find((invItem) => invItem.id === item.id);
        if (existingItem) {
          return prevInventory.map((invItem) =>
            invItem.id === item.id ? { ...invItem, quantity: invItem.quantity + 1 } : invItem
          );
        } else {
          return [...prevInventory, { id: item.id, title: item.title, quantity: 1, image: item.image }];
        }
      });
    }
  };

  return (
    <>
      <HomeNavBar />
      <div 
        style={{ 
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />
      <Container 
        fluid 
        style={{ 
          position: 'relative', 
          height: '100vh',
          overflow: 'hidden',
          paddingTop: '80px' // Add padding for the navbar
        }}
      >
        <img 
          src={catGif} 
          alt="Cat" 
          style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '140px', 
            cursor: 'pointer', 
            width: '200px', 
            height: 'auto',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            zIndex: 2
          }}
          onClick={handleCatClick}
        />

        {showHeart && (
          <img 
            src={heartImage} 
            style={{ 
              position: 'absolute', 
              bottom: '170px', 
              left: '105px', 
              width: '70px', 
              height: 'auto',
              zIndex: 3 
            }} 
            alt="Heart" 
          />
        )}

        <Transition mounted={showTextbox} transition="fade" duration={500} timingFunction="ease">
          {(styles) => (
            <img
              src={textImage}
              alt="Text"
              style={{
                ...styles,
                position: 'absolute',
                top: '40%',
                left: '35%',
                transform: 'translate(-50%, -50%)',
                width: '450px',
                height: 'auto',
                zIndex: 3
              }}
            />
          )}
        </Transition>

        <Container 
          style={{ 
            position: 'absolute', 
            top: '15%', 
            bottom: '15%', 
            right: '20px', 
            width: '500px', 
            height: '500px', 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '20px', 
            overflowY: 'auto',
            zIndex: 2
          }}
        >
          <SegmentedControl
            fullWidth
            value={activeTab}
            onChange={setActiveTab}
            data={[
              {
                label: (
                  <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>
                    <img src={shopImage} alt="Shop" style={{ width: '24px', height: 'auto', marginBottom: '4px' }} />
                    <Text size="xs" style={{ color: 'black', textAlign: 'center' }}>Shop</Text>
                  </Container>
                ),
                value: 'shop',
              },
              {
                label: (
                  <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }}>
                    <img src={inventoryImage} alt="Inventory" style={{ width: '24px', height: '24px', marginBottom: '4px' }} />
                    <Text size="xs" style={{ color: 'black' }}>Inventory</Text>
                  </Container>
                ),
                value: 'inventory',
              },
            ]}
            styles={{
              root: {
                backgroundColor: '#FFCF9F',
                borderRadius: '8px',
                fontFamily: 'Fuzzy Bubbles',
              },
              label: {
                color: 'black',
              },
              active: {
                backgroundColor: '#FFFAC3',
                color: 'black',
              },
              control: {
                '&:hover': {
                  backgroundColor: '#FFFAC3',
                },
              },
            }}
            style={{ marginBottom: '20px' }}
          />

          {/* Shop Items */}
          {activeTab === 'shop' && (
            <Grid>
              {shopItems.map((item) => (
                <Grid.Col span={4} key={item.id}>
                  <Container
                    style={{
                      border: '3px solid #FFCF9F',
                      borderRadius: '8px',
                      padding: '10px',
                      backgroundColor: 'white',
                      textAlign: 'center',
                    }}
                  >
                    <img src={item.image} alt={item.title} style={{ width: '50px', height: 'auto', marginBottom: '10px' }} />
                    <Text weight={500} size="sm" style={{ marginBottom: '5px', fontFamily: 'Fuzzy Bubbles' }}>{item.title}</Text>
                    <Text size="xs" color="gray" style={{ marginBottom: '10px' }}>${item.price}</Text>
                    <Button
                      fullWidth
                      variant="filled"
                      color={userBalance >= item.price ? 'yellow' : 'gray'}
                      style={{ opacity: userBalance >= item.price ? 1 : 0.6 }}
                      disabled={userBalance < item.price}
                      onClick={() => handleBuyItem(item)}
                    >
                      Buy
                    </Button>
                  </Container>
                </Grid.Col>
              ))}
            </Grid>
          )}

          {/* Inventory Items */}
          {activeTab === 'inventory' && (
            <Grid>
              {inventoryItems.map((item) => (
                <Grid.Col span={4} key={item.id}>
                  <Container
                    style={{
                      border: '3px solid #FFCF9F',
                      borderRadius: '8px',
                      padding: '10px',
                      backgroundColor: 'white',
                      textAlign: 'center'
                    }}
                  >
                    <img src={item.image} alt={item.title} style={{ width: '50px', height: 'auto', marginBottom: '10px' }} />
                    <Text weight={500} size="sm" style={{ marginBottom: '5px', fontFamily: 'Fuzzy Bubbles' }}>{item.title}</Text>
                    <Text size="xs" color="gray" style={{ marginBottom: '10px' }}>Quantity: {item.quantity}</Text>
                    <Button
                      fullWidth
                      variant="outline"
                      color="yellow"
                      style={{
                        marginTop: '10px',
                        transition: 'background-color 0.3s',
                        backgroundColor: item.isHovered ? '#FFFAC3' : 'white',
                      }}
                      onMouseEnter={() => setInventoryItems((prev) => prev.map((invItem) =>
                        invItem.id === item.id ? { ...invItem, isHovered: true } : invItem
                      ))}
                      onMouseLeave={() => setInventoryItems((prev) => prev.map((invItem) =>
                        invItem.id === item.id ? { ...invItem, isHovered: false } : invItem
                      ))}
                    >
                      Use
                    </Button>
                  </Container>
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Container>
      </Container>
    </>
  );
};

export default HomePage;