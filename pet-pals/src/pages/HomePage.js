import { Button, Container, Grid, SegmentedControl, Text, Transition, Image } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useAuth } from "../util/AuthContext";
import { getFirestore, doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs, deleteDoc, onSnapshot } from "firebase/firestore";
import axios from "axios";
import inventoryImage from "../assets/Images/backpack.png";
import catGif from "../assets/Images/cat.gif";
import snakeGif from "../assets/Images/snake.gif";
import monkeyGif from "../assets/Images/monkey.gif";
import hatCatGif from "../assets/Images/hat_cat.gif";
import glassesCatGif from "../assets/Images/glasses_cat.gif";
import glassesImage from "../assets/Images/glasses.png";
import heartImage from "../assets/Images/heart.png";
import kibbleImage from "../assets/Images/kibble.png";
import textImage from "../assets/Images/pet_text.png";
import shopImage from "../assets/Images/shop.png";
import hatImage from "../assets/Images/wizard_hat.png";
import HomeNavBar from "../components/HomeNavBar";
import backgroundImage from "../assets/Images/background.png";
import coin from "../assets/Images/coin.png";
import affirmationsData from "../assets/affirmations.json";

const HomePage = () => {
  const [hearts, setHearts] = useState([]);
  const [showTextbox, setShowTextbox] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [canShowNewAffirmation, setCanShowNewAffirmation] = useState(true);
  const [activeTab, setActiveTab] = useState("shop");
  const [petImage, setPetImage] = useState(catGif);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShopLoading, setIsShopLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shopError, setShopError] = useState(null);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const db = getFirestore();

  const updatePetAppearance = async (itemId) => {
    if (!user?.uid) return;
    
    try {
      // Map item IDs to their corresponding images
      const itemToImageMap = {
        '9gVOZKK7KXwHUWL39T4l': hatCatGif, // Hat
        'yavJOOQYYFxKra1tk4KQ': glassesCatGif, // Glasses
      };
      
      if (itemToImageMap[itemId]) {
        setPetImage(itemToImageMap[itemId]);
      }
    } catch (error) {
      console.error('Error updating pet appearance:', error);
    }
  };

  const updateUserCoins = async (newCoins) => {
    if (!user?.uid) return;

    const userRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userRef, { coins: newCoins });
      setUserData((prev) => ({ ...prev, coins: newCoins }));
    } catch (error) {
      console.error("Error updating user coins:", error);
      throw error;
    }
  };

  const handleBuyItem = async (item) => {
    if (!userData || userData.coins < item.price || !user?.uid) return;

    try {
      const newBalance = userData.coins - item.price;
      await updateUserCoins(newBalance);

      const inventoryRef = collection(db, 'users', user.uid, 'inventory');
      const q = query(inventoryRef, where('id', '==', item.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const inventoryDoc = querySnapshot.docs[0];
        const currentQuantity = inventoryDoc.data().quantity;
        await updateDoc(doc(inventoryRef, inventoryDoc.id), {
          quantity: currentQuantity + 1,
        });
      } else {
        await addDoc(inventoryRef, {
          id: item.id,
          quantity: 1,
        });
      }

      

      setInventoryItems((prevInventory) => {
        const existingItem = prevInventory.find((invItem) => invItem.id === item.id);
        if (existingItem) {
          return prevInventory.map((invItem) =>
            invItem.id === item.id
              ? { ...invItem, quantity: invItem.quantity + 1 }
              : invItem
          );
        } else {
          return [
            ...prevInventory,
            {
              id: item.id,
              title: item.title,
              quantity: 1,
              image: item.image,
            },
          ];
        }
      });
    } catch (error) {
      console.error('Error purchasing item:', error);
    }
  };

  const handleUseItem = async (item) => {
    if (!user?.uid) return;

    try {
      const inventoryRef = collection(db, "users", user.uid, "inventory");
      const q = query(inventoryRef, where("id", "==", item.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const inventoryDoc = querySnapshot.docs[0];
        const currentQuantity = inventoryDoc.data().quantity;

        // Update database first
        if (currentQuantity <= 1) {
          await deleteDoc(doc(inventoryRef, inventoryDoc.id));
        } else {
          await updateDoc(doc(inventoryRef, inventoryDoc.id), {
            quantity: currentQuantity - 1,
          });
        }

        // Update pet appearance if it's a hat or glasses
      if (item.id === '9gVOZKK7KXwHUWL39T4l' || item.id === 'yavJOOQYYFxKra1tk4KQ') {
        await updatePetAppearance(item.id);
      }

        // Update local inventory state
        setInventoryItems((prevInventory) =>
          prevInventory
            .map((invItem) =>
              invItem.id === item.id
                ? {
                    ...invItem,
                    quantity: invItem.quantity - 1,
                    isHovered: false,
                  }
                : invItem
            )
            .filter((item) => item.quantity > 0)
        );

        // Only show "Yummy!" message for food items (kibble)
        if (item.id === 'egyc7nx9JjsUYlvK4OF6') { // Kibble ID
          setCurrentAffirmation("Yummy!");
          setShowTextbox(true);
          
          setTimeout(() => {
            setShowTextbox(false);
            setCurrentAffirmation("");
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Error using item:", error);
    }
  };

  const determineItemImage = (itemId) => {
    const imageMap = {
      egyc7nx9JjsUYlvK4OF6: kibbleImage,
      "9gVOZKK7KXwHUWL39T4l": hatImage,
      yavJOOQYYFxKra1tk4KQ: glassesImage,
    };
    return imageMap[itemId] || kibbleImage;
  };

  const handleCatClick = () => {
    const newHeart = { id: Date.now() };
    setHearts((prevHearts) => [...prevHearts, newHeart]);
    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
    }, 1500);

    if (canShowNewAffirmation) {
      const randomIndex = Math.floor(Math.random() * affirmationsData.affirmations.length);
      const randomAffirmation = affirmationsData.affirmations[randomIndex];
      setCurrentAffirmation(randomAffirmation);
      setShowTextbox(true);
      setCanShowNewAffirmation(false);

      setTimeout(() => {
        setShowTextbox(false);
        setCurrentAffirmation("");
        setTimeout(() => {
          setCanShowNewAffirmation(true);
        }, 500);
      }, 3000);
    }
  };

  // Set up real-time listener for user data
  useEffect(() => {
    if (!user?.uid) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribeUser = onSnapshot(
      userRef,
      async (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUserData(userData);
        }
      },
      (error) => {
        console.error("Error listening to user data:", error);
      }
    );

    // Set up real-time listener for inventory
    const inventoryRef = collection(db, "users", user.uid, "inventory");
    const unsubscribeInventory = onSnapshot(
      inventoryRef,
      async (snapshot) => {
        try {
          const itemPromises = snapshot.docs.map(async (doc) => {
            const itemRef = doc.ref.parent.parent.parent.collection("items").doc(doc.data().id);
            const itemDoc = await getDoc(itemRef);
            if (itemDoc.exists()) {
              return {
                id: doc.data().id,
                inventoryId: doc.id,
                title: itemDoc.data().name || "Unknown Item",
                quantity: doc.data().quantity,
                image: determineItemImage(doc.data().id),
              };
            }
            return null;
          });

          const resolvedItems = await Promise.all(itemPromises);
          setInventoryItems(resolvedItems.filter((item) => item !== null));
        } catch (error) {
          console.error("Error processing inventory update:", error);
        }
      },
      (error) => {
        console.error("Error listening to inventory:", error);
      }
    );

    return () => {
      unsubscribeUser();
      unsubscribeInventory();
    };
  }, [user, db]);

  // Fetch shop items
  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        setIsShopLoading(true);
        setShopError(null);
        const response = await axios.get("http://localhost:5100/shop/items");
        setShopItems(
          response.data.items.map((item) => ({
            ...item,
            image: determineItemImage(item.id),
          }))
        );
      } catch (error) {
        console.error("Error fetching shop items:", error);
        setShopError("Failed to load shop items. Please try again.");
      } finally {
        setIsShopLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  return (
    <>
      <HomeNavBar userCoins={userData?.coins} />
      <Container
        fluid
        style={{
          position: "relative",
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={petImage}
          alt="Pet"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "140px",
            cursor: "pointer",
            width: "20%",
            height: "auto",
          }}
          onClick={handleCatClick}
        />

        {hearts.map((heart) => (
          <img
            key={heart.id}
            src={heartImage}
            alt="Heart"
            style={{
              position: "absolute",
              bottom: "190px",
              left: "100px",
              width: "5rem",
              height: "auto",
              animation: "slide-up 1.5s ease forwards",
            }}
          />
        ))}

        <style>{`
          @keyframes slide-up {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-50px); }
          }
        `}</style>

        <Transition
          mounted={showTextbox}
          transition={{
            in: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
            out: { opacity: 0, transform: "translate(-50%, -50%) scale(0.9)" },
            common: { transition: "opacity 0.5s ease, transform 0.5s ease" },
          }}
          duration={500}
          timingFunction="ease"
        >
          {(styles) => (
            <div
              style={{
                ...styles,
                position: "absolute",
                top: "40%",
                left: "35%",
                transform: "translate(-50%, -50%)",
                width: "40%",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={textImage}
                alt="Text"
                style={{
                  width: "100%",
                  height: "auto",
                  position: "relative",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  width: "80%",
                  fontFamily: "Fuzzy Bubbles",
                  fontSize: "1.2rem",
                  color: "#4A4A4A",
                  padding: "10px",
                  opacity: styles.opacity,
                  transition: "opacity 0.5s ease",
                }}
              >
                {currentAffirmation}
              </div>
            </div>
          )}
        </Transition>

        <Container
          style={{
            position: "absolute",
            top: "15%",
            bottom: "15%",
            right: "20px",
            width: "500px",
            height: "500px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            overflowY: "auto",
            zIndex: 2,
          }}
        >
          <SegmentedControl
            fullWidth
            value={activeTab}
            onChange={setActiveTab}
            data={[
              {
                label: (
                  <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 0 }}>
                    <img
                      src={shopImage}
                      alt="Shop"
                      style={{ width: "24px", height: "auto", marginBottom: "4px" }}
                    />
                    <Text
                      size="xs"
                      style={{ color: "black", textAlign: "center" }}
                    >
                      Shop
                    </Text>
                  </Container>
                ),
                value: "shop",
              },
              {
                label: (
                  <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 0 }}>
                    <img
                      src={inventoryImage}
                      alt="Inventory"
                      style={{ width: "24px", height: "24px", marginBottom: "4px" }}
                    />
                    <Text
                      size="xs"
                      style={{ color: "black" }}
                    >
                      Inventory
                    </Text>
                  </Container>
                ),
                value: "inventory",
              },
            ]}
            styles={{
              root: {
                backgroundColor: "#FFCF9F",
                borderRadius: "8px",
                fontFamily: "Fuzzy Bubbles",
              },
              label: {
                color: "black",
              },
              active: {
                backgroundColor: "#FFFAC3",
                color: "black",
              },
              control: {
                "&:hover": {
                  backgroundColor: "#FFFAC3",
                },
              },
            }}
            style={{ marginBottom: "20px" }}
          />

          {activeTab === "shop" && (
            <Grid>
              {isShopLoading ? (
                <Grid.Col span={12}>
                  <Container style={{ textAlign: "center", padding: "20px" }}>
                    <Text>Loading shop items...</Text>
                  </Container>
                </Grid.Col>
              ) : shopError ? (
                <Grid.Col span={12}>
                  <Container style={{ textAlign: "center", padding: "20px" }}>
                    <Text color="red">{shopError}</Text>
                  </Container>
                </Grid.Col>
              ) : shopItems.length === 0 ? (
                <Grid.Col span={12}>
                  <Container style={{ textAlign: "center", padding: "20px" }}>
                    <Text>No items available in shop</Text>
                  </Container>
                </Grid.Col>
              ) : (
                shopItems.map((item) => (
                  <Grid.Col
                    span={4}
                    key={item.id}
                  >
                    <Container
                      style={{
                        border: "3px solid #FFCF9F",
                        borderRadius: "8px",
                        padding: "10px",
                        backgroundColor: "white",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "50px", height: "auto", marginBottom: "10px" }}
                      />
                      <Text
                        weight={500}
                        size="sm"
                        style={{ marginBottom: "5px", fontFamily: "Fuzzy Bubbles" }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        size="xs"
                        color="gray"
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <Image
                          src={coin}
                          h="20px"
                          w="20px"
                          style={{ display: "inline" }}
                        />
                        {item.price}
                      </Text>
                      <Button
                        fullWidth
                        variant="filled"
                        color={userData?.coins >= item.price ? "yellow" : "gray"}
                        style={{ opacity: userData?.coins >= item.price ? 1 : 0.6 }}
                        disabled={!userData?.coins || userData.coins < item.price}
                        onClick={() => handleBuyItem(item)}
                      >
                        Buy
                      </Button>
                    </Container>
                  </Grid.Col>
                ))
              )}
            </Grid>
          )}

          {activeTab === "inventory" && (
            <Grid>
              {isLoading ? (
                <Grid.Col span={12}>
                  <Container style={{ textAlign: "center", padding: "20px" }}>
                    <Text>Loading inventory...</Text>
                  </Container>
                </Grid.Col>
              ) : error ? (
                <Grid.Col span={12}>
                  <Container style={{ textAlign: "center", padding: "20px" }}>
                    <Text color="red">{error}</Text>
                  </Container>
                </Grid.Col>
              ) : inventoryItems.length === 0 ? (
                <Grid.Col span={12}>
                  <Container style={{ textAlign: "center", padding: "20px" }}>
                    <Text>No items in inventory</Text>
                  </Container>
                </Grid.Col>
              ) : (
                inventoryItems.map((item) => (
                  <Grid.Col
                    span={4}
                    key={item.id}
                  >
                    <Container
                      style={{
                        border: "3px solid #FFCF9F",
                        borderRadius: "8px",
                        padding: "10px",
                        backgroundColor: "white",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "50px", height: "auto", marginBottom: "10px" }}
                      />
                      <Text
                        weight={500}
                        size="sm"
                        style={{ marginBottom: "5px", fontFamily: "Fuzzy Bubbles" }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        size="xs"
                        color="gray"
                        style={{ marginBottom: "10px" }}
                      >
                        Quantity: {item.quantity}
                      </Text>
                      <Button
                        fullWidth
                        variant="outline"
                        color="yellow"
                        style={{
                          marginTop: "10px",
                          transition: "background-color 0.3s",
                          backgroundColor: item.isHovered ? "#FFFAC3" : "white",
                        }}
                        onMouseEnter={() => setInventoryItems((prev) => prev.map((invItem) => (invItem.id === item.id ? { ...invItem, isHovered: true } : invItem)))}
                        onMouseLeave={() => setInventoryItems((prev) => prev.map((invItem) => (invItem.id === item.id ? { ...invItem, isHovered: false } : invItem)))}
                        onClick={() => handleUseItem(item)}
                      >
                        Use
                      </Button>
                    </Container>
                  </Grid.Col>
                ))
              )}
            </Grid>
          )}
        </Container>
      </Container>
    </>
  );
};

export default HomePage;